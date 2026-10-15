// 四个阅读入口可以指向同一培养项目的不同层次；案例原文独立保留。
export const practiceOutline = [
  {
    id: "ssr-suite", title: "新人培养", question: "怎样让新人更主动地参与、学习和成长？", number: "01",
    perspective: "整体培养设计",
    summary: "把学习旅程、真实任务和日常支持连起来。AI 创作大赛是其中的一项实践，学习平台和 AI 班班为参与过程提供支持。",
    related: [
      { id: "ai-creation-contest", label: "培养中的一项实践", title: "AI 创作大赛", description: "从真实问题出发，完成作品、体验反馈与公开展示。" },
      { id: "disc-assessment", label: "相关支持工具", title: "DISC 在线测评", description: "在线作答、行为偏好报告与结果归档的产品实践。" },
    ],
  },
  {
    id: "ai-creation-contest", title: "AI 创作大赛", question: "怎样从会用工具，走向把想法做成作品？", number: "02",
    perspective: "新人培养中的真实任务",
    summary: "沿着新人培养中的创作任务，展开赛道、组队、作品展示和评审的设计。这里看人怎样开始尝试，也看作品怎样被看见。",
    related: [
      { id: "ssr-suite", label: "回到整体培养设计", title: "新人培养", description: "看这项真实任务怎样与学习旅程、平台和日常支持相连。" },
      { id: "team-ai-movement", label: "另一项团队实践", title: "带团队做 AI", description: "黑客松、兴趣小组与同事共同尝试的记录。" },
    ],
  },
  {
    id: "critical-conversation-lab", title: "关键对话 Lab", question: "一场困难谈话之前，可以怎样准备和练习？", number: "03",
    perspective: "对话与练习",
    summary: "把困难谈话做成可以反复尝试的练习。AI 提供对练与复盘，教练学习则帮助我思考怎样的回应更能理解人。",
    related: [],
  },
  {
    id: "knowledge-portal", title: "个人知识系统", question: "怎样让阅读与思考沉淀下来，在需要时重新调用？", number: "04",
    perspective: "阅读与判断的积累",
    summary: "把书、报告与项目记录整理成可追溯的材料，再分清资料说了什么、自己认同什么。AI 帮助检索和整理，判断仍需要自己作出。",
    related: [
      { id: "hr-intel-agent", label: "相关实践", title: "资讯与报告研究助手", description: "从日常信息和长报告中整理可追溯的材料。" },
      { id: "personal-ai-ops", label: "相关实践", title: "个人 AI 工作系统", description: "把资料处理与其他日常任务放进持续使用的工作方式里。" },
    ],
  },
];
