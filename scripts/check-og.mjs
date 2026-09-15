#!/usr/bin/env node
/**
 * check-og.mjs —— og:image 缺图守卫（零依赖）
 * ------------------------------------------------------------------
 * 为什么要有它：
 *   每个页面都会引用 /og/<某个名字>.png。新增一个案例或文章时，如果忘了跑
 *   `npm run og:build`，页面本身照常构建、照常渲染，**不会报任何错**，
 *   只是分享卡指向一个不存在的文件 —— 链接发到微信里是一张破图。
 *   这是静默失败，所以必须在构建期拦住。
 *
 * 它检查两件事：
 *   1. 站点引用的每张 og 图都存在（缺失 → 报错退出）
 *   2. public/og 里有没有谁都不引用的孤儿图（只提醒，不拦）
 *
 * 挂载方式：package.json 的 build 脚本里先跑它，再跑 astro build。
 * 临时放行（比如明知缺图也要本地出包）：OG_CHECK=warn npm run build
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OG_DIR = path.join(ROOT, 'public', 'og');
const SRC = path.join(ROOT, 'src');
const WARN_ONLY = process.env.OG_CHECK === 'warn';

/* ---------- 收集站点引用的 og 图 ---------- */

const referenced = new Map(); // 文件名 -> 引用它的来源

function note(file, from) {
  if (!referenced.has(file)) referenced.set(file, from);
}

/* 1) 源码里写死的引用：image="/og/xxx.png"、`${SITE}/og/xxx.png` 等 */
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(astro|ts|tsx|js|mjs|md|mdx)$/.test(e.name)) out.push(p);
  }
  return out;
}

for (const f of walk(SRC)) {
  const text = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f);
  for (const m of text.matchAll(/\/og\/([A-Za-z0-9._-]+\.png)/g)) note(m[1], rel);
}
/* 默认卡（BaseLayout 的 image 参数缺省值）也在这里，所以上面必然能扫到 site.png */

/* 2) 由内容条目推导：案例页用 /og/system-<slug>.png、文章页用 /og/writing-<slug>.png */
const CONVENTIONS = [
  { dir: 'systems', prefix: 'system-', label: '案例' },
  { dir: 'writing', prefix: 'writing-', label: '文章' },
];
for (const { dir, prefix, label } of CONVENTIONS) {
  const d = path.join(SRC, 'content', dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.md'))) {
    const slug = path.basename(f, '.md');
    note(prefix + slug + '.png', `${label}内容 src/content/${dir}/${slug}.md`);
  }
}

/* ---------- 核对文件是否真的在 ---------- */

const missing = [];
for (const [file, from] of [...referenced].sort()) {
  if (!fs.existsSync(path.join(OG_DIR, file))) missing.push({ file, from });
}

const onDisk = fs.existsSync(OG_DIR)
  ? fs.readdirSync(OG_DIR).filter((f) => f.endsWith('.png'))
  : [];
const orphans = onDisk.filter((f) => !referenced.has(f)).sort();

/* ---------- 报告 ---------- */

console.log(`og:image 检查：引用 ${referenced.size} 张 / 磁盘上 ${onDisk.length} 张`);

if (orphans.length) {
  console.log(`\n提示：有 ${orphans.length} 张图没有被任何页面引用（内容删了但图还在？）`);
  for (const f of orphans) console.log(`  · ${f}`);
  console.log('  这些不影响构建，可留可删（删了再跑 og:build 会重新生成回来）。');
}

if (missing.length) {
  console.error(`\n✗ 有 ${missing.length} 张 og 图缺失，页面会指向不存在的文件（分享出去是破图）：\n`);
  for (const { file, from } of missing) console.error(`  · ${file}\n      被引用自 ${from}`);
  console.error('\n修复：跑一次 `npm run og:build` 重新生成分享卡，然后重新构建。');
  if (!WARN_ONLY) process.exit(1);
  console.error('\n（OG_CHECK=warn 已开启，本次只警告不中断。）');
} else {
  console.log('✓ 全部存在，没有缺口。');
}
