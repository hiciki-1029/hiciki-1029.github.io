# hiciki.me · 熙熙的个人主页

个人对外站点：个人 IP / 求职 / 自我介绍。定位是「十年组织人才发展 × AI 工程化 × ICF 教练」，
展示正在运行的「组织 × AI」工作系统，而不是一份网页版简历。

- 技术栈：[Astro](https://astro.build) 5 静态生成 + Markdown Content Collections
- 部署：GitHub Actions（`withastro/action`）→ GitHub Pages，自定义域名 `www.hiciki.me`
- 风格：暖纸编辑感 × Quiet Bento × 活字排版

## 本地开发

```bash
npm install
npm run dev       # 本地开发
npm run build     # 产出到 dist/
npm run preview   # 预览构建产物
```

## 如何更新内容（不用改代码）

- 新增/修改一个「系统案例」：编辑 `src/content/systems/*.md`（问题—链路—验收—边界四段式）。
- 新增一篇「文字」：在 `src/content/writing/` 加一个 md，补好顶部 frontmatter 即可，列表与首页自动更新。
- 改「现在在做」：编辑 `src/pages/now.astro` 与首页 `/now` 区块。
- 推送到 `main` 后 Actions 会自动构建并上线。

### systems frontmatter 字段

| 字段 | 说明 |
| --- | --- |
| `layer` | `build` 造系统 / `lead` 带团队 / `judge` 判断与人 |
| `status` | `live` 在运行 / `building` 建设中 / `method` 方法脱敏 |
| `span` | 首页 Bento 跨度：`3` 半宽大卡 / `2` 三分之一 / `6` 整行 |
| `featured` | 是否用强调底色 |
| `sensitivity` 原则 | 公司内部系统只写方法与脱敏数字，不放内部链接、账号、员工数据 |

## 内容红线

- 不出现公司内部域名 / 后台截图 / 员工数据 / 生产配置；
- 数字必须口径可追溯，宁可不写也不编；
- 联系方式只保留公开邮箱与 GitHub，不放电话、生日。
