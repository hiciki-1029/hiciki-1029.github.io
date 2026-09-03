// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署到 GitHub Pages（user page: hiciki-1029.github.io），自定义域名 www.hiciki.me
// user page 部署在根路径，无需 base；CNAME 放在 public/ 会被原样拷到 dist
export default defineConfig({
  site: 'https://www.hiciki.me',
  integrations: [sitemap()],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
  },
});
