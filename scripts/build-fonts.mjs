#!/usr/bin/env node
/**
 * build-fonts.mjs —— 把 Google Fonts 搬到 hiciki.me 自己的域名下，并按站点实际用字裁剪。
 *
 * 为什么要有这个脚本：
 *   线上字体走 fonts.googleapis.com / fonts.gstatic.com，大陆常规网络不可达，
 *   衬线标题退化成本机宋体。搬到自有域名后，同样的字体文件从 hiciki.me 发出，
 *   不再依赖被墙的域名，视觉 100% 不变。
 *
 * 为什么不是「全量下载」：
 *   Noto Sans SC / Noto Serif SC 每个字重有 101 个 unicode-range 分片，全站要 600+ 个文件。
 *   这个脚本读 dist 里真正出现的字符，只保留用得上的分片——实测 37 个左右，约 2 MB。
 *   unicode-range 原样保留，所以浏览器仍然只下载当页用到的分片，和现在一样。
 *
 * 用法：
 *   1. npm run build          （先产出 dist，脚本从 dist 里读取实际用字）
 *   2. node scripts/build-fonts.mjs
 *
 * 什么时候要重跑：
 *   正文里新增了大量从前没出现过的汉字（比如引了一篇满是生僻字的文章）。
 *   少量新字不用管——会退到系统字体（Songti SC / PingFang SC），视觉几乎无感。
 *
 * 依赖：只用 Node 内置模块，不需要 playwright。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const OUT_DIR = path.join(ROOT, 'public', 'fonts');
const CSS_OUT = path.join(ROOT, 'src', 'styles', 'fonts.css');
const CACHE = path.join(ROOT, 'scripts', '.cache', 'google-fonts.css');

/* 站点用到的字体与字重。斜体没有用武之地（全站无 <em>/font-style:italic），所以不请求。 */
const GF_CSS_URL =
  'https://fonts.googleapis.com/css2?' +
  [
    'family=Inter:wght@400;500;600;700',
    'family=Noto+Sans+SC:wght@400;500;600;700',
    'family=Noto+Serif+SC:wght@600;700',
  ].join('&') +
  '&display=swap';

/* 要 UA 声称是现代浏览器，否则 Google 只肯给 ttf */
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const SLUG = { Inter: 'inter', 'Noto Sans SC': 'noto-sans-sc', 'Noto Serif SC': 'noto-serif-sc' };

/* 兜底字符集：即使页面暂时没用到，也保证这些常见符号不退化 */
const ALWAYS = (() => {
  let s = '';
  for (let c = 0x20; c <= 0x7e; c++) s += String.fromCharCode(c); // ASCII 可见字符
  s += '　、。〈〉《》「」『』【】〔〕・ー—–…‥·×÷±°％‰¥€£§¶†‡•‰′″√∞≠≤≥≈≡∈∉∏∑−∘∼';
  s += '①②③④⑤⑥⑦⑧⑨⑩❶❷❸❹❺✦✓✔✕✗✘←→↑↓↔⇒⇔';
  return s;
})();

const log = (...a) => console.log(...a);

/* ---------------------------------------------------------------- 1. 取字符集 */

function decodeEntities(s) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', middot: '\u00b7', hellip: '\u2026' };
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z]+);/gi, (m, n) => (named[n.toLowerCase()] ?? m));
}

function collectChars() {
  const files = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) files.push(p);
    }
  })(DIST);

  const chars = new Set();
  for (const f of files) {
    const s = fs.readFileSync(f, 'utf8');
    // 只统计会以字体渲染的文字：去掉 script/style，再剥标签
    const visible = decodeEntities(
      s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')
    );
    for (const ch of visible) chars.add(ch);
    // 属性里的文字同样会出现在页面上（title/alt/aria-label/占位符）
    for (const m of s.matchAll(/(?:content|alt|aria-label|title|placeholder)\s*=\s*"([^"]*)"/g)) {
      for (const ch of decodeEntities(m[1])) chars.add(ch);
    }
  }
  for (const ch of ALWAYS) chars.add(ch);
  return { chars, pages: files.length };
}

/* ---------------------------------------------------------- 2. 解析 Google CSS */

function parseCss(css) {
  const out = [];
  const re = /(?:\/\*\s*(.*?)\s*\*\/\s*)?@font-face\s*\{([\s\S]*?)\}/g;
  for (const m of css.matchAll(re)) {
    const body = m[2];
    const fam = /font-family:\s*'([^']+)'/.exec(body);
    const sty = /font-style:\s*(\w+)/.exec(body);
    const wt = /font-weight:\s*(\d+)/.exec(body);
    const url = /url\((https:\/\/[^)]+\.woff2)\)/.exec(body);
    const ur = /unicode-range:\s*([^;]+);/.exec(body);
    if (!fam || !url || !ur) continue;
    const ranges = [];
    for (const part of ur[1].split(',')) {
      const p = part.trim().replace(/^U\+/i, '');
      if (p.includes('-')) {
        const [a, b] = p.split('-');
        ranges.push([parseInt(a, 16), parseInt(b, 16)]);
      } else {
        const v = parseInt(p, 16);
        ranges.push([v, v]);
      }
    }
    out.push({
      family: fam[1],
      style: sty ? sty[1] : 'normal',
      weight: wt ? +wt[1] : 400,
      url: url[1],
      rangeText: ur[1].trim().replace(/^U\+/i, 'U+'),
      ranges,
      label: m[1] || '',
    });
  }
  return out;
}

const intersects = (faces, codepoints) =>
  faces.filter((f) => {
    for (const cp of codepoints) for (const [a, b] of f.ranges) if (cp >= a && cp <= b) return true;
    return false;
  });

/* ------------------------------------------------------------------ 3. 下载 */

/**
 * 文件名按「字体 + 分片在 Google CSS 中的出现顺序」编号。
 * 不能直接用 Google 文件名里的 .4. / .12. 序号——Inter 的文件名里没有序号，
 * 8 个分片会全部撞到同一个文件名。Google 的排列顺序是按用字频率从高到低，
 * 所以编号小 = 更常用，也方便读日志。
 */
function buildNameMap(faces) {
  const seenPerFamily = new Map();
  const names = new Map();
  for (const f of faces) {
    if (names.has(f.url)) continue;
    const n = seenPerFamily.get(f.family) || 0;
    const slug = SLUG[f.family] || f.family.toLowerCase().replace(/\s+/g, '-');
    names.set(f.url, `${slug}.${String(n).padStart(2, '0')}.woff2`);
    seenPerFamily.set(f.family, n + 1);
  }
  return names;
}

async function fetchWithRetry(url, tries = 4) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA } });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
      lastErr = new Error(`HTTP ${r.status}`);
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, 400 * (i + 1)));
  }
  throw lastErr;
}

async function pool(items, n, fn) {
  const it = items[Symbol.iterator]();
  const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
    for (;;) {
      const { value, done } = it.next();
      if (done) return;
      await fn(value);
    }
  });
  await Promise.all(workers);
}

/* -------------------------------------------------------------------- main */

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('找不到 dist/。请先跑 `npm run build`，脚本要从构建产物里读实际用字。');
    process.exit(1);
  }

  const { chars, pages } = collectChars();
  const codepoints = new Set([...chars].map((c) => c.codePointAt(0)));
  log(`读取 dist/${pages} 个页面 · 唯一字符 ${chars.size} 个`);

  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  if (!fs.existsSync(CACHE)) {
    log('下载 Google Fonts CSS（会缓存到 scripts/.cache/）…');
    const buf = await fetchWithRetry(GF_CSS_URL);
    fs.writeFileSync(CACHE, buf);
  }
  const css = fs.readFileSync(CACHE, 'utf8');
  const all = parseCss(css);
  const needed = intersects(all, codepoints);

  const byFam = new Map();
  for (const f of needed) byFam.set(f.family, (byFam.get(f.family) || 0) + 1);
  log(`Google CSS 共 ${all.length} 条 @font-face，命中 ${needed.length} 条`);
  for (const [fam, n] of byFam) log(`  ${fam.padEnd(15)} ${n} 条`);

  const urls = [...new Set(needed.map((f) => f.url))];
  const names = buildNameMap(needed);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let downloaded = 0;
  let bytes = 0;
  await pool(urls, 12, async (url) => {
    const dest = path.join(OUT_DIR, names.get(url));
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      bytes += fs.statSync(dest).size;
      return;
    }
    const buf = await fetchWithRetry(url);
    fs.writeFileSync(dest, buf);
    downloaded++;
    bytes += buf.length;
  });
  // 清掉上一轮留下的、这轮不再需要的分片，避免 public/fonts 越积越多
  const keep = new Set(names.values());
  let removed = 0;
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.endsWith('.woff2') && !keep.has(f)) {
      fs.unlinkSync(path.join(OUT_DIR, f));
      removed++;
    }
  }
  log(
    `字体文件：共 ${urls.length} 个（新下载 ${downloaded} 个，清理 ${removed} 个）· ${(bytes / 1024 / 1024).toFixed(2)} MB -> public/fonts/`
  );

  /* 只保留命中的分片，URL 换成本地路径，unicode-range 原样保留。
   *
   * 注意：同一条 URL 在 Google 的 CSS 里会以 4 个字重各出现一次（400/500/600/700）——
   * 文件本身是可变字体，一个文件就能覆盖整段字重。这里按 URL 合并成一条 `font-weight: 400 700`，
   * 既保留同样的大小写行为，又把 @font-face 条数从 188 压到 68（CSS 从 238 KB 压到 ~85 KB）。
   */
  const collapsed = new Map();
  for (const f of needed) {
    const key = `${f.family}\u0000${f.url}`;
    const prev = collapsed.get(key);
    if (prev) {
      prev.wMin = Math.min(prev.wMin, f.weight);
      prev.wMax = Math.max(prev.wMax, f.weight);
    } else {
      collapsed.set(key, { ...f, wMin: f.weight, wMax: f.weight });
    }
  }

  const renamed = names;
  const blocks = [...collapsed.values()]
    .sort((a, b) => a.family.localeCompare(b.family) || a.wMin - b.wMin || a.url.localeCompare(b.url))
    .map((f) => {
      const weight = f.wMin === f.wMax ? `${f.wMin}` : `${f.wMin} ${f.wMax}`;
      return `@font-face {
  font-family: '${f.family}';
  font-style: ${f.style};
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${renamed.get(f.url)}') format('woff2');
  unicode-range: ${f.rangeText};
}`;
    })
    .join('\n\n');

  const header = `/* 由 scripts/build-fonts.mjs 生成，请勿手改。
 *
 * 字体原来取自 Google Fonts，现自托管于 /fonts/。
 * 原因：fonts.googleapis.com / fonts.gstatic.com 在大陆常规网络不可达，
 * 衬线标题会退化成本机宋体。
 *
 * 分片按 dist 里的实际用字裁剪，unicode-range 保持 Google 原样，
 * 所以浏览器仍只下载当页用到的分片，行为与走 Google 时一致。
 * 新增内容后重跑：npm run build && node scripts/build-fonts.mjs
 */

`;
  fs.writeFileSync(CSS_OUT, header + blocks + '\n');
  log(
    `已写入 src/styles/fonts.css（${collapsed.size} 条 @font-face，合并自 ${needed.length} 条，${(fs.statSync(CSS_OUT).size / 1024).toFixed(0)} KB）`
  );
}

main().catch((e) => {
  console.error('失败：', e);
  process.exit(1);
});
