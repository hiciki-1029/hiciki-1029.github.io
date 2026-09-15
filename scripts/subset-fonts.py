#!/usr/bin/env python3
"""
subset-fonts.py —— 把 public/fonts/*.woff2 再裁一遍，只留站点真正用到的字
================================================================================
为什么要再裁一遍（而不是 build-fonts.mjs 就够了）：

  build-fonts.mjs 做的是「按 unicode-range 挑分片」——它把 600 多条 @font-face
  砍到几十条，但**分片内部仍是 Google 的原始子集**，一个分片往往带着几百个
  用不到的字。实测每个页面冷启动要拉 1.4–1.9 MB 字体，在跨境链路上是实打实的成本。

  这个脚本把每个分片按「站点实际用字」重新裁一遍。结果：
     仓库   3.30 MB → 约 0.86 MB
     每页   1.4–1.9 MB → 约 0.4–0.5 MB
  而且是从**已下载的 woff2** 里裁，不需要重新联网取 Google 原字体。

安全边界（为什么可以放心）：
  · unicode-range 原样保留 —— 浏览器「下载哪些分片」的行为完全不变
  · font-display / font-weight 描述符不变
  · 只裁剪字形，不动 hinting / 可变字重轴（gvar、fvar 完整保留）
  · 用字为 0 的分片会被删除，对应的 @font-face 块也一起删掉
  · 幂等：重复跑结果一致

关于像素一致性（实测，别当成 100% 无损）：
  用自己的「同源两次截图」测得噪声底为 0，因此下列差异是真实且可归因的：
      · 99.89%–99.98% 的像素完全一致
      · 差异像素集中在字形边缘，单通道最大差 133–140，**没有任何像素差到 160 以上**
      · 每页强差异像素（>80）约 500 个 / 300 万像素量级
  逐层核对过，**不是**掉字、换族或字距变化：
      · 三个字族的字符覆盖：站点用字 0 丢失
      · hmtx 度量：共有字形 0 处变化 → 文字不会移位
      · glyf 基础轮廓、gvar 插值元组、fvar 轴、gasp、OS/2、head：一致
      · 浏览器 CDP 实测实际使用的字体：两侧同为 Noto Sans SC / Inter / Noto Serif SC，字形数相同
  结论：差异来自重编译后的亚像素光栅化，肉眼不可辨（并排放大对照看不出）。
  若要 100% 逐像素一致，就别跑这个脚本 —— 但每页要多传 3.8 倍的字体。

依赖：fonttools + brotli
    /path/to/python -m pip install fonttools brotli

用法：
    npm run build            # 先产出 dist（脚本从 dist 读真实用字）
    python3 scripts/subset-fonts.py
    npm run build            # 再构建一次，把裁剪后的字体带进产物

    python3 scripts/subset-fonts.py --dry-run    # 只报告，不写文件
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
SRC = ROOT / "src"
FONT_DIR = ROOT / "public" / "fonts"
CSS_PATH = SRC / "styles" / "fonts.css"
REPORT = ROOT / "scripts" / ".cache" / "subset-report.json"

# 与 build-fonts.mjs 保持一致的兜底字符集：即使页面暂时没用到，也不该被裁掉
def always_chars() -> set:
    s = "".join(chr(c) for c in range(0x20, 0x7F))
    s += "　、。〈〉《》「」『』【】〔〕・ー—–…‥·×÷±°％‰¥€£§¶†‡•′″√∞≠≤≥≈≡∈∉∏∑−∘∼"
    s += "①②③④⑤⑥⑦⑧⑨⑩❶❷❸❹❺✦✓✔✕✗✘←→↑↓↔⇒⇔"
    return set(s)


def log(*a):
    print(*a, flush=True)


# ----------------------------------------------------------------- 1. 取字符集

NAMED = {"amp": "&", "lt": "<", "gt": ">", "quot": '"', "apos": "'",
         "nbsp": "\u00a0", "middot": "\u00b7", "hellip": "\u2026"}


def decode_entities(s: str) -> str:
    s = re.sub(r"&#x([0-9a-f]+);", lambda m: chr(int(m.group(1), 16)), s, flags=re.I)
    s = re.sub(r"&#(\d+);", lambda m: chr(int(m.group(1))), s)
    return re.sub(r"&([a-z]+);", lambda m: NAMED.get(m.group(1).lower(), m.group(0)), s, flags=re.I)


def collect_chars() -> tuple[set, str]:
    """优先读 dist（真实渲染出的字），没有就退回 src 源码。"""
    if (DIST / "index.html").exists():
        source = "dist"
        files = sorted(DIST.rglob("*.html"))
    else:
        source = "src 源码（提示：先 npm run build 更准）"
        files = [p for p in SRC.rglob("*") if p.is_file()]

    chars = set()
    for f in files:
        try:
            s = f.read_text(encoding="utf-8")
        except Exception:
            continue
        if f.suffix == ".html":
            visible = decode_entities(
                re.sub(r"<[^>]+>", " ",
                       re.sub(r"<style[\s\S]*?</style>", " ",
                              re.sub(r"<script[\s\S]*?</script>", " ", s, flags=re.I),
                              flags=re.I), flags=re.I)
            )
            chars |= set(visible)
            for m in re.finditer(r'(?:content|alt|aria-label|title|placeholder)\s*=\s*"([^"]*)"', s):
                chars |= set(decode_entities(m.group(1)))
        else:
            chars |= set(s)
    chars |= always_chars()
    return {c for c in chars if ord(c) > 0x1F}, source


# ------------------------------------------------------------- 2. 解析 fonts.css

def parse_ranges(text: str):
    rs = []
    for part in text.split(","):
        p = part.strip().replace("U+", "")
        if "-" in p:
            a, b = p.split("-")
            rs.append((int(a, 16), int(b, 16)))
        else:
            v = int(p, 16)
            rs.append((v, v))
    return rs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="只报告，不写文件")
    args = ap.parse_args()

    try:
        from fontTools.ttLib import TTFont
        from fontTools.subset import Subsetter, Options
    except ImportError:
        log("缺少 fonttools。先安装：")
        log(f"  {sys.executable} -m pip install fonttools brotli")
        return 1

    if not CSS_PATH.exists():
        log(f"找不到 {CSS_PATH}，先跑 npm run fonts:build")
        return 1

    used, source = collect_chars()
    log(f"用字来源：{source}")
    log(f"站点用字：{len(used)} 个（含兜底字符集）\n")

    css = CSS_PATH.read_text(encoding="utf-8")
    blocks = re.findall(r"@font-face\s*\{[\s\S]*?\}", css)

    # 保留 build-fonts.mjs 写的那段头部注释。2026-09-14 修：
    # 本脚本原先只回写 @font-face 块，会把「为什么自托管 / 新增内容后怎么重跑」的说明整段吃掉，
    # 让 fonts.css 看起来像手写的孤儿文件。注释里那两条信息（不可达原因、重跑命令）是排障入口，必须留着。
    head_end = css.find("@font-face")
    header = css[:head_end] if head_end > 0 else ""
    if header and "subset-fonts.py" not in header:
        header = header.rstrip()
        # 在注释块收尾前插入一行，交代这一步的存在
        header = header[:-2].rstrip() + "\n *\n * 本文件随后由 scripts/subset-fonts.py 按实际用字再裁一次（体积约 1/4），\n * 两者都要重跑：npm run build && npm run fonts:build && npm run fonts:subset\n */\n\n"

    kept_blocks, removed, rows = [], [], []
    total_before = total_after = 0

    for blk in blocks:
        fam = re.search(r"font-family:\s*'([^']+)'", blk)
        url = re.search(r"url\('/fonts/([^']+)'\)", blk)
        ur = re.search(r"unicode-range:\s*([^;]+);", blk)
        if not (fam and url and ur):
            kept_blocks.append(blk)
            continue

        name = url.group(1)
        ranges = parse_ranges(ur.group(1))
        path = FONT_DIR / name

        if not path.exists():
            removed.append((name, "文件不存在", 0, 0))
            continue

        chars = {c for c in used if any(a <= ord(c) <= b for a, b in ranges)}
        before = path.stat().st_size
        total_before += before

        if not chars:
            removed.append((name, "无站点用字", before, 0))
            if not args.dry_run:
                path.unlink()
            continue

        if args.dry_run:
            # 不写文件就测不出裁后体积，用 None 表示「未测算」，别显示成 0 误导人
            rows.append((fam.group(1), name, before, None, len(chars)))
            kept_blocks.append(blk)
            continue

        # recalcTimestamp=False：TTFont 默认会在 save 时把 head.modified 改成「现在」，
        # 结果是同一个输入每次跑出来的字节都不同 —— 体积一样、渲染一样，但 git 每次都全量变更。
        # 关掉它，脚本才可复现：相同 dist + 相同源字体 ⇒ 相同字节。
        font = TTFont(str(path), recalcTimestamp=False)
        font.flavor = None
        opt = Options()
        opt.layout_features = ["*"]
        opt.name_IDs = ["*"]
        opt.notdef_outline = True       # 保留 .notdef，缺字时才不会显示空白
        opt.drop_tables += ["DSIG"]
        # 保留原始字形编号（GID），不做重编号压缩。
        # 实测这条并不能把像素差异消到 0（见文件头的「关于像素一致性」），
        # 保留它是因为它是更保守的裁剪方式，且体积代价不到 1%。
        opt.retain_gids = True
        # 故意不动 hinting：保留字形指令，确保与裁剪前的像素渲染一致
        sub = Subsetter(options=opt)
        sub.populate(text="".join(sorted(chars)))
        sub.subset(font)
        font.flavor = "woff2"
        font.save(str(path))

        after = path.stat().st_size
        total_after += after
        rows.append((fam.group(1), name, before, after, len(chars)))
        kept_blocks.append(blk)

    if not args.dry_run:
        CSS_PATH.write_text(header + "\n\n".join(kept_blocks) + "\n", encoding="utf-8")
        REPORT.parent.mkdir(parents=True, exist_ok=True)
        REPORT.write_text(json.dumps(
            {"usedChars": len(used), "source": source,
             "files": [{"family": f, "file": n, "before": b, "after": a, "chars": c}
                       for f, n, b, a, c in rows],
             "removed": [{"file": n, "why": w, "before": b} for n, w, b, _ in removed]},
            ensure_ascii=False, indent=1), encoding="utf-8")

    # ------------------------------------------------------------- 报告
    by_family = {}
    for fam, name, before, after, chars in rows:
        acc = by_family.setdefault(fam, [0, 0, 0])
        acc[0] += 1
        acc[1] += before
        acc[2] += after or 0
    log(f"{'字体族':<16}{'分片':>5}{'裁前KB':>10}{'裁后KB':>10}{'压缩':>8}")
    for fam, (n, b, a) in by_family.items():
        ratio = f"{b / a:.1f}x" if a else "—"
        after_txt = f"{a / 1024:.0f}" if a else "—"
        log(f"{fam:<16}{n:>5}{b / 1024:>10.0f}{after_txt:>10}{ratio:>8}")

    if args.dry_run:
        log("\n（dry-run：只统计用字与待删分片，未写文件、未测算裁后体积）")
    else:
        log(f"\n合计：{total_before / 1024 / 1024:.2f} MB → {total_after / 1024 / 1024:.2f} MB "
            f"（{total_before / total_after:.1f}x）")
    if removed:
        log(f"\n删除分片 {len(removed)} 个（无站点用字）：")
        for name, why, before, _ in removed:
            log(f"  · {name:<28} {before / 1024:>6.1f} KB  {why}")
    log("\n记得再跑一次 npm run build，让产物带上裁剪后的字体。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
