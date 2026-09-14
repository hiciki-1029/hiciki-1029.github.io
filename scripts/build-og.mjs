/**
 * og:image 批量生成器（数据驱动 · 方形安全区版）
 * ------------------------------------------------------------------
 * 从站点内容目录读取 frontmatter，为每个项目 / 每篇文章各生成一张 1200×630 分享卡。
 * 以后新增案例或文章，只要跑一次 `node scripts/build-og.mjs` 即可，不需要手动画图。
 *
 * 版式为什么长这样：
 *   飞书 / 领英 / X / Slack 严格按 1.91:1 展示，看到的是整张 1200×630；
 *   但微信的缩略图取中心正方形裁切 —— 中心 630×630 之外的内容会被切掉。
 *   所以核心内容（报头 / 标签 / 标题 / 摘要 / 署名）全部约束在正中 630px 宽的安全区里，
 *   左右两侧的信息栏（栏目名、链路、网址）只在宽幅平台上露脸。
 *   结果是：宽幅看是一张有信息层级的名片，被裁成方图后依然是一张完整的名片。
 *
 * 位置：站点仓库 `scripts/build-og.mjs`
 * 运行：node scripts/build-og.mjs
 * 产出：public/og/*.png
 * 依赖：playwright-core（npm i -D playwright-core），需要本机有 Chrome
 */
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

/* playwright-core 优先用仓库里的，没有就退回受管 Node 工作区（ESM 不认 NODE_PATH，显式解析）。 */
function loadPlaywright() {
  const require = createRequire(import.meta.url);
  try {
    return require('playwright-core');
  } catch {}
  const fallback = '/Users/gongwenxi/.workbuddy/binaries/node/workspace/package.json';
  if (fs.existsSync(fallback)) return createRequire(fallback)('playwright-core');
  console.error(
    '缺少 playwright-core。请在站点仓库里安装：\n  npm i -D playwright-core\n' +
      '（它不含浏览器，会用本机已装的 Chrome；也可用 CHROME_PATH 指定）'
  );
  process.exit(1);
}
const { chromium } = loadPlaywright();

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  try {
    const p = chromium.executablePath();
    if (p && fs.existsSync(p)) return p;
  } catch {}
  console.error('找不到 Chrome。请设 CHROME_PATH=/path/to/chrome 后重试。');
  process.exit(1);
}
const CHROME = findChrome();

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(here, '..'); // 站点根目录
const OUT = path.join(SITE, 'public', 'og'); // 产出到 public/og
const SRC = path.join(SITE, 'src', 'content');
const SPECIMEN = path.join(SITE, 'scripts', '.cache', 'og-cards.html'); // 版式样张，方便肉眼核对
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.dirname(SPECIMEN), { recursive: true });

/* ---------- 头像与字体都用仓库里的本地文件，断网也能出图 ---------- */
const AVATAR_FILE = path.join(SITE, 'public', 'me', 'avatar.jpg');
const AVATAR = fs.existsSync(AVATAR_FILE)
  ? pathToFileURL(AVATAR_FILE).href
  : 'https://www.hiciki.me/me/avatar.jpg';

/* 字体自托管在 public/fonts/，把 fonts.css 里的 /fonts/x.woff2 改写成 file:// 后内联进样张。 */
function fontFaceCss() {
  const fontsCssPath = path.join(SITE, 'src', 'styles', 'fonts.css');
  if (!fs.existsSync(fontsCssPath)) {
    console.warn('提示：未找到 src/styles/fonts.css，回退到 Google Fonts（大陆网络可能拿不到衬线体）。');
    return {
      css: '',
      link:
        '<link rel="preconnect" href="https://fonts.googleapis.com">' +
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&display=swap" rel="stylesheet">',
    };
  }
  const fontsDir = path.join(SITE, 'public', 'fonts');
  const css = fs
    .readFileSync(fontsCssPath, 'utf8')
    .replace(/url\(['"]?\/fonts\/([^'")]+)['"]?\)/g, (_, f) => `url("${pathToFileURL(path.join(fontsDir, f)).href}")`);
  return { css, link: '' };
}
const FONTS = fontFaceCss();

/* ---------- 极简 frontmatter 读取（只需要单行的标量/行内数组） ---------- */
function readFrontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let [, key, val] = kv;
    val = val.trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      out[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      out[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

const listMd = (dir) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => path.join(dir, f)) : [];

/* ---------- 枚举要出图的内容 ---------- */
const STATUS = { live: '在运行 LIVE', building: '建设中 BUILDING', method: '方法 METHOD' };
const KIND = { retro: '复盘', digest: '报告蒸馏', note: '笔记', essay: '随笔' };
const IDENTITY = { name: '龚文熙 · 熙熙 Ciki', role: '上海 · 组织与人才发展' };

/**
 * 手工断行表（按卡片 id）。
 * 中文没有词边界，自动断行只会把两行「排得一样长」，于是常常断在词里面
 * （「一群新 / 人」「真 / 正在公网运行」「数 / 字化底座」）。
 * 这里点名几处。新增内容默认走自动断行：优先在「：」后断，其余交给 text-wrap:balance，
 * 断得不顺眼时往这张表加一行即可（用 OG_DEBUG=1 跑一次可以看到实际断在哪）。
 */
const TITLE_LINES = {
  site: ['把重复的工作任务', '交给 AI，', '把人留给自己。'],
  'sys-ai-creation-contest': ['AI 创作大赛：让一群新人', '用 AI 把想法做成作品'],
  'sys-critical-conversation-lab': ['关键对话 Lab：让管理者', '和 AI 对练一场困难谈话'],
  'sys-disc-assessment': ['DISC 在线测评：一个', '真正在公网运行的小产品'],
  'sys-hr-intel-agent': ['HR 情报中台：每天 9 点', '自动送达的研究助手'],
  'sys-knowledge-portal': ['个人知识库门户：', '让每一份沉淀都能被再调用'],
  'sys-personal-ai-ops': ['个人 AI 工作系统：', '数十个技能、十余个常驻', '自动化与一套路由'],
  'sys-ssr-suite': ['校招生培养系统：', '一场数月项目的', '数字化底座与 AI 班班'],
  'sys-team-ai-movement': ['带团队做 AI：', '从一个人用到一群人会用'],
  'wri-judgment-over-certainty': ['用判断力换确定性：', '一次主动叫停项目的复盘'],
  'wri-agentic-organization': ['读《代理型组织》：', '当 AI 成为新的组织层'],
  'wri-grounded-answers': ['为什么我坚持', '让 AI 的每个回答', '都能指回原文'],
};

/**
 * 没有手工断行时的兜底：标题里带「：」就断在冒号后 —— 这类标题天然是「标签：说明」两段。
 * 其余交给 text-wrap:balance。
 */
function autoLines(title) {
  if (title.includes('<')) return null; // 带 HTML 的标题自己管断行
  const m = /^(.{1,14}：)(.+)$/.exec(title);
  return m ? [m[1], m[2]] : null;
}

const cards = [];

// 0) 站点通用卡：/, /about/, /resume/, /now/, /systems/, /writing/
cards.push({
  id: 'site',
  out: 'site.png',
  railLabel: '组织 × AI 工作系统',
  railStack: ['www.hiciki.me', 'gongwenxi912@outlook.com'],
  eyebrow: '组织与人才发展 × AI 实践 × ICF 认证教练 · 上海',
  title: '把重复的工作任务交给 AI，把<span class="hl">人</span>留给自己。',
  lines: ['把重复的工作任务', '交给 AI，', '把<span class="hl">人</span>留给自己。'],
  size: 'xl',
  sub: '十余年组织与人才发展，以教练洞察人性，用 AI 把想法做成真正能用的产品',
});

// 1) 项目卡：/systems/<slug>/
for (const file of listMd(path.join(SRC, 'systems'))) {
  const d = readFrontmatter(file);
  const slug = path.basename(file, '.md');
  if (!d.title) continue;
  const pipe = d.pipeline || [];
  cards.push({
    id: 'sys-' + slug,
    out: `system-${slug}.png`,
    railLabel: ['AI 实践', d.year].filter(Boolean).join(' · '),
    railSig: '问题 · 做法 · 验证 · 边界',
    railList: pipe,
    eyebrow: [STATUS[d.status] ?? d.status, d.year].filter(Boolean).join(' · '),
    title: d.title,
    size: 'md',
    sub: d.short || d.tagline || '',
    chips: (d.tags || []).slice(0, 4),
  });
}

// 2) 文章卡：/writing/<slug>/
for (const file of listMd(path.join(SRC, 'writing'))) {
  const d = readFrontmatter(file);
  const slug = path.basename(file, '.md');
  if (!d.title) continue;
  const dt = String(d.date || '');
  const ym = dt ? `${dt.slice(0, 4)} 年 ${Number(dt.slice(5, 7))} 月` : '';
  cards.push({
    id: 'wri-' + slug,
    out: `writing-${slug}.png`,
    railLabel: ['一些思考', ym].filter(Boolean).join(' · '),
    railStack: ['www.hiciki.me', 'gongwenxi912@outlook.com'],
    eyebrow: [KIND[d.kind] ?? d.kind, ym].filter(Boolean).join(' · '),
    title: d.title,
    size: 'sm',
    sub: d.summary || '',
  });
}

/* ---------- 渲染 ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/* 去掉空格与收尾标点，用来判断 short 是否只是标题的一部分 */
const stripPunct = (s) => String(s).replace(/[\s，。、：；！？,.:;!?]/g, '');

function renderCard(c) {
  const sizeCls = { xl: 'h-xl', md: 'h-md', sm: 'h-sm' }[c.size] || 'h-md';
  // 手工断行优先；其次按「：」自动断；再没有就交给 text-wrap:balance
  const lines = c.lines || TITLE_LINES[c.id] || autoLines(c.title);
  const titleHtml = lines ? lines.join('<br>') : c.title;
  // 有些案例的 short 就是标题的后半句，画在卡上会变成重复；只要它已被标题包含就不再重复显示
  const plainTitle = stripPunct(titleHtml.replace(/<[^>]+>/g, ''));
  const sub = c.sub && !plainTitle.includes(stripPunct(c.sub)) ? c.sub : '';

  const chips = c.chips && c.chips.length
    ? `<div class="chips">${c.chips.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>`
    : '';

  // 右侧栏：项目卡放链路 + 四段式；其余放网址与邮箱
  let railRight = '';
  if (c.railList && c.railList.length) {
    railRight =
      `<div class="rail rail-r"><div class="rlist">` +
      c.railList.map((s) => `<span>${esc(s)}</span>`).join('') +
      `</div>` +
      (c.railSig ? `<div class="rsig">${esc(c.railSig)}</div>` : '') +
      `</div>`;
  } else if (c.railStack) {
    railRight =
      `<div class="rail rail-r"><div class="rstack">` +
      c.railStack.map((s) => `<span>${esc(s)}</span>`).join('') +
      `</div></div>`;
  }

  return `<div class="card" id="${c.id}">
  <div class="rail rail-l"><div class="vlabel">${esc(c.railLabel || '')}</div></div>
  ${railRight}
  <div class="core">
    <div class="core-top"><div class="brand"><span class="dot"></span>熙熙<span class="z">Ciki</span></div></div>
    <div class="core-mid">
      ${c.eyebrow ? `<span class="eyebrow"><i></i>${esc(c.eyebrow)}</span>` : ''}
      <h1 class="${sizeCls}">${titleHtml}</h1>
      ${sub ? `<p class="sub">${esc(sub)}</p>` : ''}
      ${chips}
    </div>
    <div class="core-bot">
      <img class="ava" src="${AVATAR}" alt="">
      <div><div class="nm">${esc(IDENTITY.name)}</div><div class="rl">${esc(IDENTITY.role)}</div></div>
    </div>
  </div>
</div>`;
}

const CSS = `
:root{
  --paper:#faf8f4; --paper-2:#f3efe7; --card:#fff;
  --ink:#241b15; --ink-soft:#473d35; --muted:#786f66; --sage:#716c63;
  --ochre:#b8492a; --ochre-deep:#96341b; --cream:#f7efe3;
  --line:#eae4d9; --line-strong:#d9d1c3;
  --serif:"Noto Serif SC","Songti SC","STSong","SimSun",Georgia,serif;
  --sans:"Inter","Noto Sans SC",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
  /* 微信方图中心裁切的安全区：1200 × 630 的中心 630 × 630 */
  --safe-w: 590px;   /* 实际排字宽度，两侧各留 20px 余量 */
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#8d8478;font-family:var(--sans);display:flex;flex-direction:column;gap:40px;padding:40px;align-items:center}

.card{width:1200px;height:630px;position:relative;overflow:hidden;
  background-color:var(--paper);
  background-image:radial-gradient(1100px 560px at 90% -14%,rgba(184,73,42,.09),transparent 60%),
                   radial-gradient(900px 520px at -8% 6%,rgba(207,122,80,.06),transparent 58%);
  color:var(--ink)}
.card::after{content:"";position:absolute;right:-160px;bottom:-210px;width:520px;height:520px;border-radius:50%;
  background:radial-gradient(circle at 40% 40%,rgba(184,73,42,.13),rgba(184,73,42,0) 68%)}
/* 陶土色段居中：微信方图只保留中心 24%–76%，居中的色段才能留在裁切后的画面里 */
.card::before{content:"";position:absolute;left:0;right:0;top:0;height:5px;
  background:linear-gradient(90deg,var(--line) 0 38%,var(--ochre) 38% 62%,var(--line) 62% 100%)}

/* ---------- 两侧信息栏：只在宽幅平台可见，被方图裁掉也不损失信息 ---------- */
.rail{position:absolute;top:62px;bottom:62px;width:196px;z-index:1;display:flex;flex-direction:column;justify-content:center}
.rail-l{left:66px;align-items:center}
.rail-r{right:66px;align-items:flex-end;text-align:right}
/* 竖排栏目名 */
.vlabel{writing-mode:vertical-rl;font-family:var(--serif);font-weight:600;font-size:16px;
  letter-spacing:.18em;color:var(--ochre-deep);white-space:nowrap}
/* 右侧：链路步骤 */
.rlist{display:flex;flex-direction:column;gap:11px;margin-bottom:20px}
.rlist span{font-size:13.5px;color:var(--muted);line-height:1.35}
.rlist span::after{content:"";display:block;width:16px;height:1px;background:var(--line-strong);margin:11px 0 0 auto}
.rlist span:last-child::after{display:none}
.rsig{font-family:var(--serif);font-size:14px;font-weight:600;color:var(--ochre-deep);line-height:1.6}
/* 右侧：网址与邮箱 */
.rstack{display:flex;flex-direction:column;gap:10px}
.rstack span{font-size:14px;color:var(--muted);white-space:nowrap}

/* ---------- 核心列：居中 580px，落在微信方图安全区内 ---------- */
.core{position:absolute;top:0;bottom:0;left:50%;width:var(--safe-w);margin-left:calc(var(--safe-w) / -2);
  display:flex;flex-direction:column;padding:48px 0 42px;z-index:2}
.core-top{flex:none}
.core-mid{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
.core-bot{flex:none;display:flex;align-items:center;gap:13px;
  border-top:1px solid var(--line);padding-top:18px}

.brand{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-weight:700;font-size:20px;letter-spacing:.02em}
.dot{width:10px;height:10px;border-radius:50%;background:var(--ochre);box-shadow:0 0 0 4px rgba(184,73,42,.13);flex:none}
.brand .z{font-family:var(--sans);color:var(--sage);font-weight:500;font-size:13px;letter-spacing:.16em}

.eyebrow{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;max-width:100%;
  font-size:14px;font-weight:600;letter-spacing:.02em;color:var(--ochre-deep);
  background:#fff;border:1px solid #e8cfc3;border-radius:999px;padding:6px 15px;margin-bottom:24px;line-height:1.3}
.eyebrow i{width:6px;height:6px;border-radius:50%;background:var(--ochre);display:block;flex:none}

h1{font-family:var(--serif);font-weight:700;letter-spacing:.005em;
  line-break:strict;text-wrap:balance}
.h-xl{font-size:60px;line-height:1.36}
.h-md{font-size:48px;line-height:1.4}
.h-sm{font-size:44px;line-height:1.42}
.hl{display:inline-block;background:var(--ochre);color:#fff;border-radius:9px;padding:0 10px 3px;margin:0 2px}

.sub{font-size:19px;line-height:1.62;color:var(--ink-soft);margin-top:20px;line-break:strict}
.chips{display:flex;gap:9px;margin-top:22px;flex-wrap:wrap}
.chip{font-size:14px;color:var(--ink-soft);background:var(--paper-2);border:1px solid var(--line);
  border-radius:999px;padding:5px 14px;white-space:nowrap}

.ava{width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid var(--line-strong);background:var(--cream);flex:none}
.core-bot .nm{font-size:16px;font-weight:600;line-height:1.3}
.core-bot .rl{font-size:13px;color:var(--muted);margin-top:2px}
`;

const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<title>og 分享卡版式样张</title>
${FONTS.link}<style>${FONTS.css}${CSS}</style></head><body>
${cards.map(renderCard).join('\n')}
</body></html>`;

fs.writeFileSync(SPECIMEN, html, 'utf8');

/* ---------- 截图 ---------- */
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(SPECIMEN).href, { waitUntil: 'load', timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);

// 自动收缩：标题/摘要过长时降字号，保证永远不出框（新增内容不用手调模板）。
// 同时管纵向（mid 撑高）和横向（手工断行的一行超过安全区宽度）。
await page.evaluate(() => {
  // 逐字测量，取最右边界 —— scrollWidth 对会换行的块级元素测不出溢出
  function maxLineRight(el, box) {
    const range = document.createRange();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let max = 0;
    let n;
    while ((n = walker.nextNode())) {
      const len = n.nodeValue.length;
      for (let i = 0; i < len; i++) {
        range.setStart(n, i);
        range.setEnd(n, i + 1);
        for (const r of range.getClientRects()) {
          const right = r.right - box.left;
          if (right > max) max = right;
        }
      }
    }
    return max;
  }

  document.querySelectorAll('.card').forEach((card) => {
    const core = card.querySelector('.core');
    const mid = card.querySelector('.core-mid');
    const h1 = card.querySelector('h1');
    const sub = card.querySelector('.sub');
    if (!core || !mid || !h1) return;
    const box = core.getBoundingClientRect();
    let size = parseFloat(getComputedStyle(h1).fontSize);
    let subSize = sub ? parseFloat(getComputedStyle(sub).fontSize) : 0;
    let guard = 0;
    const fits = () => maxLineRight(h1, box) <= box.width + 1;
    while ((mid.scrollHeight > mid.clientHeight + 1 || !fits()) && guard++ < 80) {
      if (size > 30) {
        size -= 1.5;
        h1.style.fontSize = size + 'px';
      } else if (sub && subSize > 15) {
        subSize -= 1;
        sub.style.fontSize = subSize + 'px';
      } else break;
    }
  });
});
await page.waitForTimeout(400);

let n = 0;
for (const c of cards) {
  const el = await page.$('#' + c.id);
  if (!el) {
    console.error('MISSING ' + c.id);
    continue;
  }
  // 逐张检查：核心列有没有溢出，以及有没有内容跑到安全区外
  const probe = await el.evaluate((node) => {
    const core = node.querySelector('.core');
    const safeW = 630;
    const mid = node.querySelector('.core-mid');
    const h1 = node.querySelector('h1');
    return {
      midOverflow: mid ? mid.scrollHeight - mid.clientHeight : 0,
      h1Size: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : 0,
      coreWideEnough: core ? core.getBoundingClientRect().width <= safeW : true,
      anyOverflowX: [...node.querySelectorAll('.core *')].some((e) => {
        const r = e.getBoundingClientRect();
        const c = core.getBoundingClientRect();
        return r.right > c.right + 1 || r.left < c.left - 1;
      }),
      // 实际断行结果：用来发现「9 / 点」这类被拆开的位置
      titleLines: (() => {
        const range = document.createRange();
        const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
        const byTop = new Map();
        let n;
        while ((n = walker.nextNode())) {
          for (let i = 0; i < n.nodeValue.length; i++) {
            range.setStart(n, i);
            range.setEnd(n, i + 1);
            const r = range.getClientRects()[0];
            if (!r) continue;
            const key = Math.round(r.top);
            if (!byTop.has(key)) byTop.set(key, []);
            byTop.get(key).push(n.nodeValue[i]);
          }
        }
        return [...byTop.entries()].sort((a, b) => a[0] - b[0]).map(([, cs]) => cs.join(''));
      })(),
    };
  });
  const shot = path.join(OUT, c.out);
  await el.screenshot({ path: shot });
  const kb = (fs.statSync(shot).size / 1024).toFixed(1);
  const flag = probe.midOverflow > 1 || probe.anyOverflowX ? '  ⚠ 溢出' : '';
  console.log(`OK  ${c.out.padEnd(44)} ${String(kb).padStart(6)} KB  字号 ${probe.h1Size}px${flag}`);
  // OG_DEBUG=1 时打印实际断行，用来发现被拆开的词组
  if (process.env.OG_DEBUG) {
    probe.titleLines.forEach((l, i) => console.log(`      ${i + 1}| ${l}`));
  }
  n++;
}
await browser.close();
console.log(`\n共 ${n} 张 → ${OUT}`);
console.log(`版式样张（可直接用浏览器打开核对）→ ${SPECIMEN}`);
