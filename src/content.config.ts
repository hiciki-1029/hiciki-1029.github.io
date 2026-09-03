import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* 活系统案例：四段式 problem / system / proof / boundary 写在正文 */
const systems = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/systems" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    // build=造系统  lead=带团队  judge=判断与人
    layer: z.enum(["build", "lead", "judge"]),
    year: z.string(),
    // live=在运行  building=建设中  method=方法/脱敏
    status: z.enum(["live", "building", "method"]),
    featured: z.boolean().default(false),
    // bento 跨度：3=半宽大卡 2=三分之一 6=整行
    span: z.enum(["3", "2", "6"]).default("2"),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    linkLabel: z.string().optional(),
    // 可视化链路：按顺序渲染成流程节点
    pipeline: z.array(z.string()).default([]),
    // 截图 / 录屏：图片或视频放 public/systems/<slug>/ 下，这里只写相对路径
    media: z
      .array(
        z.object({
          type: z.enum(["image", "video"]),
          src: z.string(),
          caption: z.string().default(""),
          poster: z.string().optional(),
        })
      )
      .default([]),
    order: z.number().default(99),
  }),
});

/* 持续输出：报告蒸馏 / 笔记 / 复盘 —— 让站点保持「活」 */
const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["digest", "note", "retro", "essay"]),
    source: z.string().optional(),
    summary: z.string(),
    public: z.boolean().default(true),
  }),
});

export const collections = { systems, writing };
