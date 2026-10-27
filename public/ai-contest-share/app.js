const $=id=>document.getElementById(id);
const head=(n,eyebrow,title,sub='')=>`<div class="section-head"><div><div class="eyebrow">${eyebrow}</div><h2>${title}</h2>${sub?`<p class="sub">${sub}</p>`:''}</div><span class="big-number" aria-hidden="true">${n}</span></div>`;
const takeaway=text=>`<div class="takeaway"><span class="tag">一起想一想</span><span>${text}</span></div>`;

function caseIcon(kind){
 const start='<svg viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">',end='</svg>';
 const arrow='<path d="M116 45H162M154 37L162 45L154 53" stroke="#c3663c" stroke-width="2"/>';
 if(kind==='tasks')return start+'<rect x="28" y="16" width="67" height="48" rx="9" fill="#e7ecdd" stroke="#355645"/><path d="M42 31H80M42 41H73M42 51H65" stroke="#355645" stroke-width="2"/>'+arrow+'<rect x="185" y="12" width="66" height="65" rx="7" fill="#fbfbf6" stroke="#355645"/><path d="M199 30L203 34L211 25M218 30H239M199 49L203 53L211 44M218 49H239M199 65H238" stroke="#355645" stroke-width="2"/>'+end;
 if(kind==='bot')return start+'<rect x="30" y="15" width="56" height="62" rx="5" fill="#e7ecdd" stroke="#355645"/><path d="M43 29H73M43 39H73M43 49H65M43 59H69" stroke="#355645" stroke-width="2"/>'+arrow+'<rect x="180" y="24" width="72" height="48" rx="13" fill="#fbfbf6" stroke="#355645"/><path d="M216 24V13M208 13H224M195 59H237" stroke="#355645" stroke-width="2"/><circle cx="200" cy="44" r="4" fill="#355645"/><circle cx="232" cy="44" r="4" fill="#355645"/>'+end;
 return start+'<path d="M39 29C44 16 85 16 91 29L103 61C108 76 94 80 84 65L75 57H56L46 66C34 81 20 74 26 59L39 29Z" fill="#e7ecdd" stroke="#355645"/><path d="M42 39H60M51 30V48" stroke="#355645" stroke-width="2"/><circle cx="81" cy="36" r="3" fill="#c3663c"/>'+arrow+'<rect x="179" y="15" width="77" height="57" rx="6" fill="#fbfbf6" stroke="#355645"/><path d="M179 29H256M196 64L209 48L220 57L233 41L245 64" stroke="#355645" stroke-width="2"/><circle cx="188" cy="22" r="2" fill="#c3663c"/>'+end;
}

const goalDesigns={"普及体验": ["给明确的小任务，降低选题和起步难度。", "准备工具入口、示范和基础答疑。", "看能否完成一次应用，收集参与体验。"], "业务应用": ["围绕具体使用者的问题，完成可试用版本。", "请业务伙伴参与，提供资料和试用条件。", "看使用者反馈、问题改善和后续维护条件。"], "员工发展与交流": ["安排协作或作品互评，留下创作过程。", "提供交流机会、中途反馈和过程记录。", "结合选题、协作和调整给反馈，名次只是部分信息。"]};
function updateGoalResponse(){
 const box=$('goal-response'),design=goalDesigns[goal];if(!box||!design)return;
 const labels=['任务怎么定','支持怎么准备','评价看什么'];
 box.innerHTML='<div class="goal-design">'+design.map((text,i)=>'<div><b>'+labels[i]+'</b><p>'+text+'</p></div>').join('')+'</div>';
}

const slides=[
{chapter:'开场',title:'从“想办一场”到“真正办起来”',html:`<div class="hero"><div><div class="eyebrow">2025—2026 · AI大赛组织实践</div><h1><span>从“想办一场”</span><span>到<span class="accent" style="display:inline">“真正办起来”</span></span></h1><p class="sub">HR 组织 AI 大赛的关键选择</p><div class="hero-bottom"><button class="primary" data-next>开始这场分享　→</button><div class="author">Ciki<br>游戏公司｜组织与人才发展</div></div></div><div class="hero-art" aria-label="五个相互关联的选择：目的、任务、支持、评审、延续"><div class="orbit"></div><div class="orb-center">五个关键选择<small>结合两年的组织实践</small></div><span class="orbit-label ol1">01　为什么办</span><span class="orbit-label ol2">02　任务怎么设计</span><span class="orbit-label ol3">03　如何支持</span><span class="orbit-label ol4">04　怎样评价</span><span class="orbit-label ol5">05　赛后怎么跟进</span></div></div>`},
{chapter:"分享的起点",title:"五个关键选择",html:head("","分享的起点","组织AI大赛，<br>有哪些事需要提前想清楚？")+`<table class="resource-table"><tbody><tr><td>01 为什么办</td><td>组织期待什么，哪些目标是这次的重点？</td></tr><tr><td>02 任务怎么设计</td><td>做什么、怎样组队、做到什么程度？</td></tr><tr><td>03 如何支持</td><td>需要谁的支持，时间、工具和运营怎么准备？</td></tr><tr><td>04 怎样评价</td><td>作品怎么展示，评委看什么，分歧怎么讨论？</td></tr><tr><td>05 赛后怎么跟进</td><td>怎样反馈，作品后续由谁试用和维护？</td></tr></tbody></table>`},
{chapter:"选择一 · 为什么办",title:"这场比赛，组织的期待是什么？",html:head("01","选择一 · 为什么办","这场比赛，<br>组织的期待是什么？")+`<div class="grid3"><button class="choice" data-goal="普及体验" aria-pressed="false"><div class="num">A</div><h3>让更多人开始应用AI</h3><p>降低起步门槛，准备工具和基础支持。</p></button><button class="choice" data-goal="业务应用" aria-pressed="false"><div class="num">B</div><h3>尝试解决工作问题</h3><p>找到使用者，准备试用条件和效果记录。</p></button><button class="choice" data-goal="员工发展与交流" aria-pressed="false"><div class="num">C</div><h3>促进实践与交流</h3><p>安排协作和反馈，了解创作过程。</p></button></div><div class="question" id="goal-response">点击一个目的，看看任务、支持和评价的侧重怎样变化。目的可以兼顾，没有统一答案。</div>`},
{chapter:"选择一 · 实际案例",title:"我在规划AI创作大赛时的思考",html:head("01","选择一 · 实际案例","结合参与者的基础，<br>安排实践和交流的机会。")+`<div class="context-grid case-choices"><div><div class="label">已有事实 · 2026年内部调研</div><h3>很多参与者已经使用AI，<br>也有岗位实习经历。</h3><p>对工具和岗位已有接触，继续关注实际应用。</p></div><div class="context-decision"><div class="label">本轮安排</div><h3>开放工作与创意选题，<br>通过作品体验和交流。</h3><p>从熟悉的问题或兴趣出发，完成可演示作品。</p></div></div>`},
{chapter:'两年的实践',title:'同样是AI实践，两年的任务不同',html:head('↔','两年的安排有什么不同 · 案例背景','同样组织AI大赛，<br>为什么两年的任务不同？')+`<div class="grid2"><div class="panel"><div class="label">2025 / 共同任务</div><h3>用 AI 做小游戏，<br>发布到游戏平台。</h3><p>希望新人通过不同角色的协作，了解游戏创作、发布与玩家反馈的过程。</p><div class="statline" style="border-color:var(--line)"><div><b>6</b><small>款小游戏</small></div><div><b>3</b><small>款进入游戏新人榜</small></div><div><b>7.1万+</b><small>累计游玩量*</small></div></div></div><div class="panel green"><div class="label">2026 / 自主找问题</div><h3>围绕工作与创意，<br>完成可演示的作品。</h3><p>结合各自的工作问题或创作兴趣完成作品，通过交流获得反馈，也让大家更多地了解彼此。</p><div class="statline"><div><b>32</b><small>位新人</small></div><div><b>24</b><small>件作品</small></div><div><b>21</b><small>天创作期</small></div></div></div></div><p class="note">* 2025年截至当年10月：累计游玩71,590次、评论206条；3款进入游戏新人榜，最好第6名。游玩量不是去重人数。<br>2026年21天指创作期，评审、试玩和路演另行安排。</p>`},
{chapter:'选择二 · 任务怎么设计',title:'今年的比赛怎么安排',html:head('02','选择二 · 今年的任务设计','两条赛道，21天创作，<br>提交可以演示的作品。')+`<div class="contest-layout"><figure class="contest-shot"><button data-screenshot aria-label="放大脱敏后的大赛网页截图"><img width="1610" height="977" src="assets/contest-overview.png" alt="今年AI创作大赛网页首页截图，已去除公司与内部项目标识"></button><figcaption>今年的大赛网页 · 公司及项目标识已脱敏 · 点击放大</figcaption></figure><div class="contest-brief"><div class="track-pair"><div><span>赛道 01</span><h3>整体提效</h3><p>业务问题 / 可复用的个人工作流</p></div><div><span>赛道 02</span><h3>脑洞创新</h3><p>新玩法 / 互动体验 / AIGC应用</p></div></div><dl><div><dt>谁参加</dt><dd>本届校招生，个人或2—3人组队</dd></div><div><dt>创作时间</dt><dd>21天创作，工具不限</dd></div><div><dt>作品要求</dt><dd>项目说明 + 可演示原型</dd></div><div><dt>怎样展示</dt><dd>说明页：5分钟介绍 + 答辩；实际决赛每组8分钟</dd></div></dl></div></div><p class="note">实际提交：18件个人作品、6件团队作品。允许组队之外，还需要安排作品体验和交流。</p>`},
{chapter:"选择三 · 资源准备",title:"组织比赛，需要哪些资源支持",html:head("03","选择三 · 资源准备","组织比赛，<br>需要哪些资源支持")+`<table class="resource-table"><tbody><tr><td>组织者</td><td>确定目的和规则，安排进度，协调异常。</td></tr><tr><td>业务伙伴与试用者</td><td>判断问题是否值得做，提供反馈，支持赛后试用。</td></tr><tr><td>工具与技术支持</td><td>准备账号和额度，确认使用条件、答疑和故障联系人。</td></tr><tr><td>业务负责人及参赛者</td><td>确认业务支持、人员投入，以及工作与参赛的时间协调。</td></tr><tr><td>评委与活动支持</td><td>约好评审时间，准备材料、场地、设备与展示安排。</td></tr></tbody></table><p class="note">这次由我统筹，运营、场地物料、摄影、IT和评审均有同事支持。预算还要考虑大家投入的时间。</p>`},
{chapter:"选择三 · 创作与提交支持",title:"参与者可能遇到哪些困难",html:head("03","选择三 · 创作与提交支持","创作和提交阶段，<br>参与者需要什么支持？")+`<table class="resource-table"><thead><tr><th>可能遇到的困难</th><th>组织者可以提供的支持</th></tr></thead><tbody><tr><td>选题没有方向</td><td>给场景示例，帮助明确为谁解决什么问题。</td></tr><tr><td>工具使用卡住</td><td>提供工具说明、答疑入口和必要的额度支持。</td></tr><tr><td>作品范围太大</td><td>讨论先做哪些功能，先完成可演示的部分。</td></tr><tr><td>演示和提交不清楚</td><td>说明材料要求，提醒节点，核对提交情况。</td></tr></tbody></table><p class="note">本轮截止时仍有9件未交，经宽限和支持后，24个报名项目最终全部提交。</p>`},
{chapter:"选择三 · 工作时间协调",title:"非脱产参赛，怎么协调时间",html:head("03","选择三 · 工作时间协调","非脱产参赛，<br>先把时间和工作安排谈清楚。")+`<div class="grid2"><article class="panel"><div class="label">和业务负责人</div><h3>业务怎样支持，<br>人员和时间怎样安排？</h3><p>说明比赛目的和所需投入，了解业务高峰；<br>遇到工作冲突，一起确认可以怎样调整。</p></article><article class="panel green"><div class="label">和参赛者</div><h3>能投入多少时间，<br>重要节点能否兼顾？</h3><p>结合当前工作讨论参赛时间和分工，<br>提前说明冲突，及时沟通进度变化。</p></article></div><div class="reason-line">本轮创作安排：第1周找问题、找伙伴，接下来两周完成可演示作品。评审、试玩和路演另行安排。</div>`},
{chapter:'选择三 · 技术资源',title:'技术资源：工具和赛事平台',html:head('03','技术资源 · 工具、账号与赛事平台','工具和平台，<br>要按实际使用流程提前检查。')+`<div class="role-tabs" role="group" aria-label="赛事平台角色"><button data-role-view="0">参与者</button><button data-role-view="1">体验者</button><button data-role-view="2">初筛评委</button><button data-role-view="3">路演评委</button><button data-role-view="4">组织者</button></div><div id="role-view" aria-live="polite"></div><p class="figure-caption">这次我用低代码搭建赛事平台，未申请研发资源。筹备时仍要确认工具与额度、角色权限、访问和提交测试，以及故障联系人和备用演示。</p>`},
{chapter:'选择三 · 赛事运营',title:'比赛过程中的信息怎么管理',html:head('03','报名、创作和评审的管理','报名、创作、评审，<br>信息和责任怎么衔接？')+`<div class="layer-map"><div class="map-owner">Ciki · 大赛统筹<span>规则、节奏、异常处理</span></div><div class="layer-lanes"><button data-layer="0"><span class="lane-no">01</span><strong>报名与组队</strong><span>参与对象 → 选题方向 → 组队方式</span></button><button data-layer="1"><span class="lane-no">02</span><strong>创作与提交</strong><span>任务进度 → 节点提醒 → 作品材料</span></button><button data-layer="2"><span class="lane-no">03</span><strong>评审与反馈</strong><span>独立意见 → 合议讨论 → 后续跟进</span></button></div></div><div class="stage-detail" id="layer-detail" aria-live="polite"></div><div class="year-switch" role="group" aria-label="查看两年赛事运营方式"><button data-year="2025">看2025年的做法</button><button data-year="2026">看2026年的做法</button></div><p class="figure-caption">结合大赛实践整理 · 点击查看各环节的安排</p>`},
{chapter:'选择三 · AI运营助手',title:'群内助手：通知、答疑和查询',html:head('03','运营支持 · 群里的助手','通知、答疑和查询，<br>怎样减少重复工作？')+`<div class="assistant-layout"><div class="assistant-scenarios"><div class="label">点击查看通知、答疑和查询的示例</div><button data-assistant="0">报名通知怎样到群里？</button><button data-assistant="1">参与者提问怎样回应？</button><button data-assistant="2">当前作品数据怎样查询？</button><p class="note">以下为预设场景演示，按实际功能说明整理。</p></div><div class="assistant-demo"><div class="chat-title"><span class="bot-avatar">AI</span>群内运营助手</div><div id="assistant-chat" aria-live="polite"></div></div></div><div class="responsibility-strip"><span><b>工作流</b>节点与提醒</span><span><b>AI助手</b>理解问题与查询</span><span><b>人与业务评委</b>目标、规则、取舍</span></div>`},
{chapter:'选择四 · 展示与路演',title:'作品广场、试玩与路演',html:head('04','作品交流 · 展示与路演','24件作品，<br>都有被体验和交流的机会。')+`<div class="journey-controls" role="group" aria-label="展示与路演阶段"><button data-showcase="0">01 作品广场</button><button data-showcase="1">02 试玩与交流</button><button data-showcase="2">03 精品路演</button></div><div id="showcase-view" class="showcase-view" aria-live="polite"></div><p class="figure-caption">24件作品保留广场展示，17人参加试玩交流；未进入路演的17件作品仍可被体验和评论。</p>`},
{chapter:"选择四 · 独立评审与合议",title:"评委先独立审阅，再合议",html:head("04","选择四 · 独立评审与合议","先独立审阅，<br>再合议确定入围作品。")+`<div class="review-switch" role="group" aria-label="评审展示方式"><button class="outline active" id="review-photo-tab" aria-pressed="true">评委工作台实拍</button><button class="outline" id="review-process-tab" aria-pressed="false">独立评审流程</button></div><div id="review-photo" class="review-photo-layout local-review"><figure><div class="review-photo-frame"><img src="assets/initial-review.jpg" width="1079" height="1457" alt="实际初审评委工作台：左侧作品列表、右侧通过待定淘汰判断和必填理由，人员和部门已遮挡"></div><figcaption>复盘中的实际界面 · 姓名与部门已脱敏</figcaption><button class="quiet" data-screenshot="review">放大查看评委工作台 ↗</button></figure><div class="review-principles"><div><b>5位评委 × 24件作品</b><span>每件5份独立判断，共120份意见</span></div><div class="review-counts local-opinion-counts" aria-label="120份初审意见的分布"><div><b>36</b><span>份通过意见</span></div><div><b>43</b><span>份待定意见</span></div><div><b>41</b><span>份淘汰意见</span></div></div><p class="local-opinion-caption">合计120份评审意见，不是作品数量。</p><div><b>合议 → 7件入围路演</b><span>路演由5位决赛评委评审，每组8分钟</span></div></div></div><div id="review-process" class="local-review-process" hidden><div class="local-review-summary">5位评委 × 24件作品 = 120份独立评审意见</div><div class="sealed-reviews" id="sealed-reviews"></div><div class="review-actions"><button class="primary" id="reveal-reviews">进入合议：展开判断理由</button><button class="outline" id="reset-reviews">重新演示</button></div><div id="review-discussion" class="stage-detail" aria-live="polite">评审期间意见互不可见，每件作品都需要结论和理由。</div><div class="review-counts local-opinion-counts" aria-label="120份初审意见的分布"><div><b>36</b><span>份通过意见</span></div><div><b>43</b><span>份待定意见</span></div><div><b>41</b><span>份淘汰意见</span></div></div><p class="local-opinion-caption">合计120份评审意见，不是作品数量。</p><p class="figure-caption">流程卡片为示意，不对应真实评委或意见。合议后7件入围，进入5位决赛评委参与的路演。</p></div><p class="local-review-criteria">评价维度：业务价值、创新性、完成度、可推广性、展示效果。<br>两条赛道入围：提效8件中1件，创意16件中6件。</p>`},
{chapter:'成果展示',title:'这次比赛的成果',html:head('↗','这次比赛的成果','有了作品和交流，<br>也开始有业务试用。')+`<div class="result-stats"><div><b>32</b><span>位新人 · 20个部门</span></div><div><b>24</b><span>件作品 · 提交率100%</span></div><div><b>277</b><span>名员工互动 · 504赞 / 60评</span></div><div><b>7</b><span>件作品进入路演</span></div></div><div class="result-cases"><article><div class="case-pictogram" aria-hidden="true">${caseIcon('tasks')}</div><h3>需求整理工具</h3><p>整理聊天和文档中的需求，减少信息分散</p><span class="evidence-chip">可演示版本 · 人气冻结时54赞</span><button class="case-open" data-case="0">展开案例 ↗</button></article><article><div class="case-pictogram" aria-hidden="true">${caseIcon('bot')}</div><h3>本地化支持机器人</h3><p>整理本地化术语和经验，在业务群中问答</p><span class="evidence-chip">已在业务群试用</span><button class="case-open" data-case="1">展开案例 ↗</button></article><article><div class="case-pictogram" aria-hidden="true">${caseIcon('game')}</div><h3>游戏与互动作品</h3><p>部分游戏公开发布，获得玩家体验和反馈</p><span class="evidence-chip">已可体验 · 仍可继续迭代</span><button class="case-open" data-case="2">展开案例 ↗</button></article></div><p class="note">提交率按24个报名项目最终提交统计，无人中途退出。演示、公开体验和业务试用已有记录；持续使用及实际效果还需跟进。</p>`},
{chapter:'选择五 · 参赛者反馈',title:'比赛后，和创作者聊什么',html:head('05','赛后和创作者交流','赛后可以结合哪些材料，<br>和创作者交流？')+`<div class="signal-layout"><div class="artifact-stack"><div class="artifact-sheet back-sheet"></div><div class="artifact-sheet"><span class="label">已留下的材料</span><h3>作品 + 评审理由</h3><div class="artifact-lines"></div><span class="evidence-chip">作为后续交流的依据</span></div><svg class="signal-arrow" viewBox="0 0 100 30" aria-hidden="true"><path d="M4 15H89M78 5L90 15L78 25" fill="none" stroke="currentColor" stroke-width="2"/></svg></div><div><div class="signal-questions"><button data-signal="0">为什么选择这个问题？</button><button data-signal="1">遇到卡点尝试了什么？</button><button data-signal="2">不同岗位怎样协作？</button><button data-signal="3">收到反馈后改了什么？</button></div><div id="signal-detail" class="stage-detail" aria-live="polite"></div></div></div><div class="boundary-note">作品和评审理由已经留下；具体交流还需结合过程记录及本人补充。团队作品也要了解个人贡献。</div>`},
{chapter:'选择五 · 继续验证',title:'赛后还需要跟进什么',html:head('05','赛后跟进','后续还需要了解：<br>哪些尝试持续了下来？')+`<div class="followup-tabs" role="tablist" aria-label="后续跟踪方向"><button role="tab" data-followup="0">作品持续使用</button><button role="tab" data-followup="1">工作中继续应用</button><button role="tab" data-followup="2">组织经验能否复用</button></div><div id="followup-view" class="followup-view" aria-live="polite"></div><p class="figure-caption">目前缺少对后续采用的持续记录。以下是待跟进的方向，尚不能作为长期成效。</p>`},
{chapter:'带回公司 · 开始设计',title:'如果准备办，先讨论这些问题',html:`<div class="closing"><div><div class="eyebrow">回到各自公司的情况</div><h2>如果准备办一场，<br>可以先讨论<span class="accent">这些问题。</span></h2><p class="sub">找一位业务伙伴和几位可能的参与者，<br>结合问题、参与者和资源条件，讨论第一轮怎么安排。</p><div class="resource-links"><button class="primary" data-canvas>填写我的大赛设计画布　↗</button></div><p class="note">填写、复制、下载或打印，内容仅保存在当前浏览器。</p></div><div class="panel"><div class="label">大赛筹备与赛后跟进</div><ol><li>组织最希望看到什么变化？</li><li>谁参与，AI基础怎么样？</li><li>对作品有什么要求？怎样说明AI的使用过程？</li><li>工具、时间、答疑由谁支持？</li><li>哪些流程交给系统，哪些由人判断？</li><li>怎样展示、评审和反馈？</li><li>作品与人的后续，由谁跟进？</li></ol></div></div><details><summary>资料与图示说明</summary><p>本分享结合某游戏公司2025—2026年AI创作大赛实践。资料仅选用与大赛任务、创作支持、赛事运营、展示评审及赛后跟进相关的内容；对话、流程图和评委卡片为脱敏示意。</p></details>`}
];
let index=0,goal='',slideResizeObserver,showcaseMotionStop;
function getLocal(k){try{return localStorage.getItem(k)}catch{return null}}
function setLocal(k,v){try{localStorage.setItem(k,v);return true}catch{return false}}
function render(){showcaseMotionStop?.();const s=slides[index];$('stage').innerHTML=`<section class="slide" aria-label="${s.title}">${s.html}</section>`;$('chapter-name').textContent=s.chapter;$('page').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;$('progress').style.width=`${(index+1)/slides.length*100}%`;$('prev').disabled=index===0;$('next').disabled=index===slides.length-1;document.title=`${s.title} · HR组织AI大赛`;document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>go(index+1));document.querySelectorAll('[data-canvas]').forEach(b=>b.onclick=openCanvas);document.querySelectorAll('[data-goal]').forEach(b=>{b.classList.toggle('selected',b.dataset.goal===goal);b.setAttribute('aria-pressed',String(b.dataset.goal===goal));b.onclick=()=>{goal=b.dataset.goal;render()}});updateGoalResponse();enhanceSlide();enhancePractice();if(typeof ResizeObserver!=='undefined'){slideResizeObserver?.disconnect();slideResizeObserver=new ResizeObserver(()=>requestAnimationFrame(fitSlide));slideResizeObserver.observe($('stage').querySelector('.slide'))}document.querySelectorAll('[data-screenshot]').forEach(b=>b.onclick=()=>openSourceImage(b.dataset.screenshot||'overview'));$('stage').querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>requestAnimationFrame(fitSlide)));window.scrollTo(0,0);$('page-jump').setAttribute('aria-label','跳转页面，当前第'+(index+1)+'页，共'+slides.length+'页');$('stage').querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>requestAnimationFrame(fitSlide),{once:true}));requestAnimationFrame(fitSlide)}
function go(n){index=Math.max(0,Math.min(slides.length-1,n));history.replaceState(null,'',`#${index+1}`);render()}
function fromHash(){const n=Number(location.hash.slice(1));index=Number.isInteger(n)&&n>=1&&n<=slides.length?n-1:0;render()}
$('prev').onclick=()=>go(index-1);$('next').onclick=()=>go(index+1);window.addEventListener('hashchange',fromHash);
const outline=$('outline-dialog'),canvas=$('canvas-dialog');
$('overview').onclick=()=>{$('outline-grid').innerHTML=slides.map((s,i)=>`<button class="thumb ${i===index?'active':''}" data-page="${i}"><b>${String(i+1).padStart(2,'0')} · ${s.chapter}</b>${s.title}</button>`).join('');outline.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{go(Number(b.dataset.page));outline.close()});outline.showModal()};
const fields=[['这场比赛，组织的期待是什么？','主要目标；希望看到的行为或结果。'],['希望哪些人参加？','参与人群、AI基础，以及最可能卡住的地方。'],['任务怎么设计？','问题范围、作品形式、完成标准与AI参与要求。'],['需要提供哪些支持？','可用工具、投入时间、答疑与中途反馈。'],['谁负责什么？','统筹、业务、工具支持、主管与评委。'],['怎么评价、怎么反馈？','主要标准、接受的证据、未晋级者的反馈。'],['赛后谁继续跟进？','作品负责人、试用者、回看时间与发展讨论。']];
$('canvas-grid').innerHTML=fields.map((f,i)=>`<div class="canvas-field"><label for="field-${i}"><span>${String(i+1).padStart(2,'0')}</span>${f[0]}</label><p>${f[1]}</p><textarea id="field-${i}" placeholder="写下你们的第一版想法……"></textarea></div>`).join('');
let draft={};try{draft=JSON.parse(getLocal('ciki-ai-canvas-v1')||'{}')}catch{}
$('team-name').value=draft.team||'';fields.forEach((f,i)=>$('field-'+i).value=draft['f'+i]||'');
function save(){draft={team:$('team-name').value};fields.forEach((f,i)=>draft['f'+i]=$('field-'+i).value);$('save-state').textContent=setLocal('ciki-ai-canvas-v1',JSON.stringify(draft))?'已保存在当前浏览器':'浏览器未允许保存，请复制或下载备份'}
canvas.querySelectorAll('input,textarea').forEach(el=>el.addEventListener('input',save));
function openCanvas(){canvas.showModal()}$('canvas').onclick=openCanvas;
function markdown(){return '# 组织内AI大赛设计画布\n\n公司 / 团队：'+$('team-name').value+'\n\n'+fields.map((f,i)=>`## ${i+1}. ${f[0]}\n\n${$('field-'+i).value||'（待填写）'}`).join('\n\n')+'\n'}
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2200)}
$('copy-canvas').onclick=async()=>{try{await navigator.clipboard.writeText(markdown());toast('已复制你的设计画布')}catch{toast('复制暂不可用，请下载 Markdown')}};
$('download-canvas').onclick=()=>{const url=URL.createObjectURL(new Blob([markdown()],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='AI大赛设计画布.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
$('print-canvas').onclick=()=>{canvas.querySelectorAll('textarea').forEach(t=>{t.style.height='auto';t.style.height=Math.max(t.scrollHeight,95)+'px'});window.print()};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement){await document.exitFullscreen()}else{await document.documentElement.requestFullscreen()}}catch{toast('可使用浏览器的全屏功能进行演示')}};
document.addEventListener('keydown',e=>{if(e.defaultPrevented||document.querySelector('dialog[open]')||e.target.matches('input,textarea,select,[contenteditable=true]')||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key===' '&&e.target.matches('button,a,[role=button]'))return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(index+1)}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(index-1)}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}if(e.key.toLowerCase()==='g')$('overview').click();if(e.key.toLowerCase()==='f')$('fullscreen').click();});
function fitSlide(){
 const stage=$('stage'),slide=stage.querySelector('.slide');if(!slide)return;
 if(matchMedia('(max-width:800px)').matches){slide.style.removeProperty('--slide-scale');return}
 const styles=getComputedStyle(stage),available=stage.clientHeight-parseFloat(styles.paddingTop)-parseFloat(styles.paddingBottom);
 const scale=Math.min(1,available/slide.offsetHeight);
 slide.style.setProperty('--slide-scale',String(scale));
}
window.addEventListener('resize',()=>requestAnimationFrame(fitSlide));
if(document.fonts)document.fonts.ready.then(()=>requestAnimationFrame(fitSlide));
const interactions={};
function enhanceSlide(){
 enhanceRoles();enhanceCases();enhanceThinking();
 const stage=$('stage');
 // Keep the original content readable; interaction adds a focus and a question.
 function focusCards(selector,messages){
  const nodes=[...stage.querySelectorAll(selector)]; if(!nodes.length)return;
  const response=document.createElement('div');response.className='interaction-response';response.setAttribute('role','status');
  response.textContent='点击一项，查看可以继续讨论的问题。';(nodes[0].closest('table')||nodes[0].parentElement).after(response);
  let restoreSelection;
  nodes.forEach((node,i)=>{
   let target=node;
   if(node.tagName==='TR'){target=document.createElement('button');target.className='row-trigger';const cell=node.cells[0];target.innerHTML=cell.innerHTML;cell.replaceChildren(target)}
   else {target.setAttribute('role','button');target.tabIndex=0;target.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();target.click()}})}
   target.classList.add('interactive-item');target.setAttribute('aria-pressed','false');
   const activate=()=>{interactions[index]=i;nodes.forEach((n,j)=>{n.classList.toggle('is-focused',i===j);(n.tagName==='TR'?n.querySelector('button'):n).setAttribute('aria-pressed',String(i===j))});response.textContent=messages[i];response.classList.add('answered');requestAnimationFrame(fitSlide)};
   target.addEventListener('click',activate);if(interactions[index]===i)restoreSelection=activate;
  });
  restoreSelection?.();
 }
 if(index===0){
  [2,5,6,13,16].forEach((page,i)=>{const label=stage.querySelector('.ol'+(i+1));const button=document.createElement('button');button.className=label.className;button.textContent=label.textContent;button.title='前往'+label.textContent;button.onclick=()=>go(page);label.replaceWith(button)});
 }
 if(index===5)focusCards('.flow-item',[
  '对象：请说出一个具体的使用者，或一种希望带来的创作体验。',
  '问题：用一句话描述现在最不方便的地方。',
  '作品：明确最小作品范围，以及暂时不做什么。',
  'AI：说明AI承担的环节，以及创作者自己的判断。',
  '条件：给出截止时间和一个能找到人的答疑入口。']);
 if(index===7)focusCards('tbody tr',[
  '先明确作品希望帮助谁，再结合熟悉的问题或兴趣缩小选题。',
  '让参赛者知道工具说明、答疑人员和额度支持在哪里。',
  '先完成能说明核心想法的部分，避免作品范围持续扩大。',
  '在节点核对项目说明、演示入口和提交状态，及时跟进遗漏。']);
 if(index===8)focusCards('.panel',[
  '和业务负责人说明所需投入，了解业务高峰，协商人员支持和工作冲突时的安排。',
  '和参赛者确认可投入时间、团队分工与节点，进度变化时及时沟通。']);
 if(index===6)focusCards('tbody tr',[
  '启动前确定谁负责目标、规则、进度和异常协调，其他支持分别找谁。',
  '找一位愿意判断问题、并在赛后继续试用的业务伙伴；评价业务应用时，也需要他的使用反馈。',
  '提前确认账号、额度、角色权限、答疑和故障入口。后面会按五类使用者，说明赛事平台要准备什么。',
  '和业务负责人及参赛者确认人员投入、可用时间和业务安排。',
  '提前约好评审时间，列出展示当天的设备与活动支持清单。']);
 if(false)focusCards('.review-node',[
  '独立判断：让每位评委先留下自己的结论，减少彼此影响。',
  '留下理由：意见不同，是材料不足、关注点不同，还是标准不清？',
  '合议讨论：记录为什么作出这个判断，并形成创作者能够理解的反馈。']);
 if(false)focusCards('.grid2 .panel',[
  '你先关注了A。可以继续追问：希望谁来体验？怎样验证创意之外的价值？',
  '你先关注了B。可以继续追问：谁在持续使用？质量和维护投入怎么样？']);
 if(false)focusCards('.grid3 .panel',[
  '为作品补一张跟进卡：使用者、负责人、下一步验证与回看时间。',
  '用一次交流补充个人贡献：选题、协作、处理卡点和调整过程。',
  '选一份最值得保留的模板，记录下一轮继续使用的条件。']);
}
const practiceState={layer:1,year:'2026',assistant:0,showcase:0,revealed:false,signal:0,followup:0};
const practiceData={
 layers:[['报名与组队','写清楚谁可以参加、可以做什么、怎样组队，让有初步想法的同事知道怎么报名。','统筹者确认规则，参与者结合问题寻找伙伴。'],['创作与提交','记录创作进度，说明遇到问题可以找谁，在重要节点提醒大家准备提交材料。','系统处理固定提醒，人协助判断范围、资源和卡点。'],['评审与反馈','先收齐各位评委的结论和理由，再一起讨论，也为之后和创作者交流保留依据。','评委作判断，统筹者对齐信息、记录结论并协调后续。']],
 signals:[['选题','从作品的问题、对象和场景开始，了解创作者为什么选择这件事。','可以问：你观察到了什么，为什么觉得值得做？'],['处理卡点','查看已有的尝试与调整记录，没有留下的过程通过访谈补充。','可以问：哪里没按预期进行，你尝试了哪些办法？'],['协作','了解不同岗位怎样合作，以及每个人实际承担了什么。','可以问：哪些决定一起讨论，哪些工作由你负责？'],['反馈后的调整','把收到的反馈和后续修改放在一起看，了解创作者怎样理解和回应。','可以问：收到哪些意见，后来具体改了什么？']],
 followups:[['作品是否还在使用','完成演示 → 在业务中试用 → 继续使用','谁在用？使用频率、质量怎样？谁维护？','为准备继续应用的作品明确使用者、负责人和回看时间。'],['工作中是否继续应用','比赛中尝试 → 工作中继续应用','离开比赛后，是否在新问题里继续使用这种方法？','结合后续岗位任务和具体行为，区分持续变化与一次表现。'],['组织经验能否复用','整理这次的做法 → 下一次继续使用','规则、资料、权限和流程是否仍然适用？','记录维护与协调投入，再调整下一轮安排。']]
};
function practiceTabs(selector,key,paint){
 const buttons=[...$('stage').querySelectorAll(selector)];
 const update=()=>{buttons.forEach(b=>{const active=Number(b.dataset[Object.keys(b.dataset)[0]])===practiceState[key];b.classList.toggle('active',active);b.setAttribute(b.getAttribute('role')==='tab'?'aria-selected':'aria-pressed',String(active))});paint();requestAnimationFrame(fitSlide)};
 buttons.forEach(b=>b.onclick=()=>{practiceState[key]=Number(b.dataset[Object.keys(b.dataset)[0]]);update()});update();
}
function paintReviews(){
 const st=practiceState;const labels=['使用场景','完成情况','AI参与','使用反馈','后续条件'];
 $('sealed-reviews').innerHTML=labels.map((t,i)=>`<div class="sealed-card ${st.revealed?'unsealed':''}"><span class="judge-number">评委 ${String(i+1).padStart(2,'0')}</span><div class="seal-graphic">${st.revealed?'✓':'●'}</div><b>${st.revealed?'结论 + 判断理由':'独立填写'}</b><p>${st.revealed?'合议时可以围绕'+t+'展开追问':'其他评委意见暂不可见'}</p></div>`).join('');
 $('review-discussion').innerHTML=st.revealed?'<b>合议时再区分：</b><span>信息不足</span><span>理解差异</span><span>标准需要澄清</span><small>讨论类别为分享整理，不是对真实评审意见的逐条还原。</small>':'评审期间意见互不可见，每件作品都需要结论和理由。';
 $('reveal-reviews').disabled=st.revealed;requestAnimationFrame(fitSlide);
}
function enhancePractice(){
 if(index===10){
  const paint=()=>{const d=practiceData.layers[practiceState.layer];$('layer-detail').innerHTML=`<b>${d[0]}</b><p>${d[1]}</p><small>${d[2]}</small><div class="year-detail"><span>${practiceState.year}</span>${practiceState.year==='2025'?'先关联学员档案、任务进度和反馈，在节点自动提醒。':'赛事入口说明规则、展示作品，群内助手参与答疑、通知和数据查询。'}</div>`};
  practiceTabs('[data-layer]','layer',paint);document.querySelectorAll('[data-year]').forEach(b=>{b.onclick=()=>{practiceState.year=b.dataset.year;document.querySelectorAll('[data-year]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});paint();requestAnimationFrame(fitSlide)};b.classList.toggle('active',b.dataset.year===practiceState.year)});
 }
 if(index===11)practiceTabs('[data-assistant]','assistant',()=>{
  const scenes=[['节点到达 / 报名通知产生','工作流把通知推到群里，群内助手承接对应消息。','固定节点与提醒由流程处理，不需要把每个动作都当成AI判断。'],['示例提问：作品需要交到什么程度？','活动说明要求项目说明、可演示原型和5分钟作品介绍加答辩；实际决赛每组8分钟。','回答内容依据活动说明；这是一段演示问答。'],['示例查询：这一轮完成了多少件作品？','按本轮复盘记录，共24件作品，由32位新人参与完成。','示例查询结果；非实时数据。']];const d=scenes[practiceState.assistant];
  $('assistant-chat').innerHTML=`<div class="chat-bubble user-bubble">${d[0]}</div><div class="chat-flow">群内消息 <span>→</span> ${practiceState.assistant===0?'节点工作流':'理解问题 / 查询'}</div><div class="chat-bubble bot-bubble">${d[1]}</div><div class="chat-caption">${d[2]}</div>`;
 });
 if(index===12)practiceTabs('[data-showcase]','showcase',()=>{showcaseMotionStop?.();
  const n=practiceState.showcase;
  if(n===0){$('showcase-view').innerHTML=`<div class="real-gallery"><figure><div class="real-shot-scroll" id="gallery-scroll" tabindex="0" aria-label="作品广场脱敏截图，可上下滚动"><img src="assets/works-square.jpg" width="1690" height="931" alt="大赛实际作品广场，展示作品卡片、赛道筛选、点赞和评论入口；姓名、部门与品牌已遮挡"></div><figcaption>实际作品广场 · 品牌、姓名和部门已脱敏</figcaption><div class="real-shot-actions"><button class="outline" id="gallery-play" aria-pressed="false">滚动浏览</button><button class="outline" id="gallery-expand">放大查看 ↗</button></div></figure><div class="gallery-explain"><div class="label">让更多同事体验作品</div><h3>作品介绍、体验入口，<br>点赞与评论放在一起。</h3><p>参赛者之外的同事也能了解作品，创作者可以收到具体反馈。</p><p class="note">公司同事可体验、点赞和评论。人气奖按截止时刻冻结，截图票数仅代表截取时状态。</p></div></div>`;bindGallery();}

  if(n===1)$('showcase-view').innerHTML='<div class="conversation-picture"><div class="person-shape"></div><div class="speech-sheet"><b>创作者说明自己的选择</b><p>看见什么问题？为什么这样做？</p></div><div class="speech-sheet peer-sheet"><b>同事体验与反馈</b><p>实际使用时，哪里有帮助，哪里还不清楚？</p></div></div><div class="showcase-message"><b>交流不只发生在决赛</b><p>本轮试玩交流17人参加，面向全部作品；未晋级的17件作品也保留广场展示与互动。</p></div>';
  if(n===2)$('showcase-view').innerHTML='<div class="roadshow-picture"><div class="stage-screen"><span>7件作品 · 精品路演</span><div class="screen-line"></div><div class="screen-line short"></div></div><div class="speaker-shape"></div><div class="audience-shapes"><i></i><i></i><i></i><i></i><i></i></div></div><div class="showcase-message"><b>帮助听众记住作品背后的人</b><p>7件作品集中展示，高管和业务负责人到场。配合档案卡、展示顺序和备用材料，帮助听众了解作品与创作者。</p></div>';
 });
 if(index===13){const switchReview=photo=>{$('review-photo').hidden=!photo;$('review-process').hidden=photo;['review-photo-tab','review-process-tab'].forEach((id,i)=>{$(id).classList.toggle('active',photo===(i===0));$(id).setAttribute('aria-pressed',String(photo===(i===0)))});requestAnimationFrame(fitSlide)};$('review-photo-tab').onclick=()=>switchReview(true);$('review-process-tab').onclick=()=>switchReview(false);$('reveal-reviews').onclick=()=>{practiceState.revealed=true;paintReviews()};$('reset-reviews').onclick=()=>{practiceState.revealed=false;paintReviews()};paintReviews()}
 if(index===15)practiceTabs('[data-signal]','signal',()=>{const d=practiceData.signals[practiceState.signal];$('signal-detail').innerHTML=`<b>从${d[0]}继续了解</b><p>${d[1]}</p><small>${d[2]}</small>`});
 if(index===16)practiceTabs('[data-followup]','followup',()=>{const d=practiceData.followups[practiceState.followup];$('followup-view').innerHTML=`<div class="followup-path">${d[1].split(' → ').map((t,i)=>`<span><em>0${i+1}</em>${t}</span>`).join('<i>→</i>')}</div><div class="followup-questions"><h3>${d[0]}</h3><p>${d[2]}</p><div class="record-note"><span>可以怎样记录</span>${d[3]}</div></div>`});

}

function openSourceImage(kind){
 const shot=$('image-dialog').querySelector('img');imageZoom=1;$('image-viewport').scrollTop=0;shot.style.width='100%';$('image-zoom-level').textContent='100%';
 const work=kind==='works',review=kind==='review';shot.src=review?'assets/initial-review.jpg':work?'assets/works-square.jpg':'assets/contest-overview.png';shot.alt=review?'实际初审评委工作台脱敏截图':work?'实际作品广场脱敏截图':'大赛活动网页脱敏截图';shot.width=review?1079:work?1690:1610;shot.height=review?1457:work?931:977;
 $('image-dialog').querySelector('p').textContent=review?'初审评委工作台实际画面 · 人员、部门及内部工具信息经AI辅助脱敏':work?'作品广场实际画面 · 品牌、姓名与部门经AI辅助脱敏，票数为截取时的状态':'大赛网页截图 · 品牌与内部项目标识已脱敏';$('image-dialog').showModal();$('image-fit').focus();
}
function bindGallery(){
 const box=$('gallery-scroll'),button=$('gallery-play');let running=false,last=0,direction=1,position=0,frame;
 const stop=()=>{running=false;cancelAnimationFrame(frame);button.textContent='滚动浏览';button.setAttribute('aria-pressed','false')};
 const step=t=>{if(!running)return;const max=box.scrollHeight-box.clientHeight;if(max<=0){stop();return}const dt=last?Math.min(t-last,60):0;last=t;position=Math.max(0,Math.min(max,position+direction*dt*.025));box.scrollTop=position;if(position>=max)direction=-1;if(position<=0)direction=1;frame=requestAnimationFrame(step)};
 button.onclick=()=>{if(running){stop();return}running=true;last=0;position=box.scrollTop;button.textContent='暂停滚动';button.setAttribute('aria-pressed','true');frame=requestAnimationFrame(step)};
 box.addEventListener('wheel',stop,{passive:true});box.addEventListener('touchstart',stop,{passive:true});box.addEventListener('keydown',stop);$('gallery-expand').onclick=()=>{stop();openSourceImage('works')};showcaseMotionStop=stop;
}

const roleViews=[
 ['参与者','知道怎么参加，也能找到提交入口。','活动说明、两条赛道、创作安排与工具入口。','报名 / 入群 / 提交','overview'],
 ['体验者','找到感兴趣的作品，体验后留下反馈。','作品卡片、赛道筛选、搜索与排序，点赞、评论和详情。','发现作品 → 体验 → 反馈','works'],
 ['初筛评委','独立审阅，留下结论与理由。','查看进度；通过、待定或淘汰，必须填写理由。','意见仅本人和管理员可见','review'],
 ['路演评委','按出场顺序认识创作者与作品。','创作者介绍、演示入口与备用视频集中准备。','创作者 → 作品 → 演示材料',null],
 ['组织者','报名、作品和评审信息可以统一核对。','报名管理、成果管理、评审汇总与路演配置，支持导出。','统计 → 筛选 → 导出',null]
];
function enhanceRoles(){if(!$('role-view'))return;const paint=i=>{document.querySelectorAll('[data-role-view]').forEach(b=>{b.classList.toggle('active',+b.dataset.roleView===i);b.setAttribute('aria-pressed',String(+b.dataset.roleView===i))});const d=roleViews[i];$('role-view').innerHTML=`<div class="role-explainer"><span class="label">${d[0]}视角</span><h3>${d[1]}</h3><p>${d[2]}</p><div class="role-route">${d[3]}</div></div>${d[4]?`<button class="role-shot" aria-label="放大${d[0]}实际界面"><img src="assets/${d[4]==='overview'?'contest-overview.png':d[4]==='works'?'works-square.jpg':'initial-review.jpg'}" alt="${d[0]}实际页面，已脱敏"><span>真实界面 · 点击放大 ↗</span></button>`:`<div class="role-function-map"><span>功能说明</span><b>${d[0]==='组织者'?'报名管理 → 成果管理<br>评审汇总 → 路演配置':'创作者介绍 → Demo入口<br>备用视频 → 展示顺序'}</b><small>按复盘记录整理，非后台截图</small></div>`}`;const shot=$('role-view').querySelector('.role-shot');if(shot)shot.onclick=()=>openSourceImage(d[4]);requestAnimationFrame(fitSlide)};document.querySelectorAll('[data-role-view]').forEach(b=>b.onclick=()=>paint(+b.dataset.roleView));paint(0)}
const caseDetails=[['需求整理工具','从工作中分散的需求开始','需求散落在私聊、群聊和文档里，容易跟丢。作品尝试整理需求背景和时间节点，放进候选收件箱，并考虑修改留痕和撤销。','三位创作者来自不同业务，已有可演示版本。人气奖冻结时54赞，9月3日复盘记录55赞；两者统计时间不同。','实际节省多少时间、能否持续使用，需要进一步验证。'],['本地化支持机器人','从非技术岗位熟悉的问题开始','围绕本地化术语、资料与经验，尝试在业务群里提供问答支持。','已在实际业务群试用，收到同事正反馈。','后续需要看回答质量、使用频率与资料维护。'],['游戏与互动作品','让创意进入真实体验','通过AI辅助创作，把玩法与互动想法做成可体验版本。','部分作品已发布到游戏平台，获得玩家体验和反馈。','完成作品之后，继续看体验反馈与迭代。']];
function enhanceCases(){document.querySelectorAll('[data-case]').forEach(b=>b.onclick=()=>{const d=caseDetails[+b.dataset.case];$('case-title').textContent=d[0];$('case-body').innerHTML=`<span class="label">${d[1]}</span><h3>从什么问题开始</h3><p>${d[2]}</p><h3>现在做到哪一步</h3><p>${d[3]}</p><h3>还需要了解什么</h3><p>${d[4]}</p>`;$('case-dialog').showModal()})}

const thinkingItems = [["已有基础", "2026年调研显示，很多参与者已使用AI并有岗位实习经历。这是安排实际应用任务的依据，仍需为不同基础的参赛者提供说明和答疑。"], ["实际安排", "2025年用共同的小游戏任务，让大家经历创作、发布和玩家反馈；2026年开放到工作与创意，并安排作品广场和试玩交流。两年安排见下一页。"]];
let thinkingIndex = 0;
function enhanceThinking(){
 const cards=[...$('stage').querySelectorAll('.case-choices>div')];if(!cards.length)return;
 const detail=document.createElement('div');detail.className='choice-detail';detail.setAttribute('aria-live','polite');cards[0].parentElement.after(detail);
 const paint=i=>{thinkingIndex=i;cards.forEach((card,j)=>{card.classList.toggle('choice-active',i===j);card.setAttribute('aria-pressed',String(i===j))});detail.innerHTML='<span class="label">'+thinkingItems[i][0]+'</span><p>'+thinkingItems[i][1]+'</p>';requestAnimationFrame(fitSlide)};
 cards.forEach((card,i)=>{card.classList.add('choice-target');card.setAttribute('role','button');card.tabIndex=0;card.setAttribute('aria-label','展开：'+thinkingItems[i][0]);card.onclick=()=>paint(i);card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();paint(i)}}});paint(thinkingIndex);
}

$('page-jump').onclick=()=>$('overview').click();
let imageZoom=1;
function zoomImage(delta){imageZoom=Math.max(1,Math.min(3,imageZoom+delta));$('image-dialog').querySelector('img').style.width=(imageZoom*100)+'%';$('image-zoom-level').textContent=Math.round(imageZoom*100)+'%'}
$('image-plus').onclick=()=>zoomImage(.25);$('image-minus').onclick=()=>zoomImage(-.25);$('image-fit').onclick=()=>{imageZoom=1;zoomImage(0);$('image-viewport').scrollTop=0;$('image-viewport').scrollLeft=0};
$('image-dialog').addEventListener('click',e=>{if(e.target===$('image-dialog'))$('image-dialog').close()});

fromHash();
