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

const slides=[
{chapter:'开场',title:'AI创作大赛，我是怎么组织的',html:`<div class="hero"><div><div class="eyebrow">2025—2026 · AI大赛组织实践</div><h1><span>AI创作大赛，</span><span>我是<span class="accent" style="display:inline">怎么组织的</span></span></h1><p class="sub">两年新人培养项目中的尝试与复盘</p><div class="hero-bottom"><button class="primary" data-next>开始这场分享　→</button><div class="author">Ciki<br>游戏公司｜组织与人才发展</div></div></div><div class="hero-art" aria-label="五个相互关联的选择：目的、任务、支持、评审、延续"><div class="orbit"></div><div class="orb-center">组织AI大赛<small>目的、安排与后续</small></div><span class="orbit-label ol1">01　为什么办</span><span class="orbit-label ol2">02　任务怎么设计</span><span class="orbit-label ol3">03　如何支持</span><span class="orbit-label ol4">04　怎样评价</span><span class="orbit-label ol5">05　赛后怎么跟进</span></div></div>`},
{chapter:'分享的起点',title:'今天想和大家分享什么',html:head('↗','这次想和大家讨论什么','组织一场AI创作大赛，<br>我考虑了哪些问题？')+`<div class="grid3"><div class="panel"><div class="num">01</div><h3>明确目的</h3><p>结合业务和人的情况，<br>我们希望通过比赛解决什么问题？</p></div><div class="panel"><div class="num">02</div><h3>安排比赛</h3><p>任务和规则怎样安排？<br>需要哪些人、工具和时间支持？</p></div><div class="panel green"><div class="num">03</div><h3>赛后跟进</h3><p>比赛结束以后，<br>作品怎样继续应用，参与者能得到什么反馈？</p></div></div>`+takeaway('如果明天要办，你最希望比赛帮助解决什么问题？')},
{chapter:'选择一 · 为什么办',title:'这场比赛，组织的期待是什么？',html:head('01','选择一 · 比赛目的','这场比赛，<br>组织的期待是什么？','组织期待不同，需要优先准备的任务、资源与评价方式也不同。')+`<div class="grid3"><button class="choice" data-goal="普及体验" aria-pressed="false"><div class="num">A</div><h3>让更多人尝试应用AI</h3><p>普及体验<br>关注起步门槛、工具与基础支持。</p></button><button class="choice" data-goal="业务应用" aria-pressed="false"><div class="num">B</div><h3>尝试解决工作中的问题</h3><p>业务应用<br>关注使用者、试用条件与效果验证。</p></button><button class="choice" data-goal="新人培养与交流" aria-pressed="false"><div class="num">C</div><h3>通过实践了解新人、促进交流</h3><p>新人培养与交流<br>关注协作、过程与具体反馈。</p></button></div><div class="question" id="goal-response">这些目标可以兼顾，但需要结合当下的情况确定重点，再安排相应的支持与评价方式。</div>`},
{chapter:'我的规划思考',title:'我在规划AI创作大赛时的思考',html:head('？','结合这一届新人的情况','我在规划AI创作大赛时<br>考虑的几个目的')+`<div class="five-choices"><div><span>01</span><h3>让大家实际应用AI</h3><p>在具体任务中尝试应用AI</p></div><div><span>02</span><h3>尝试解决工作问题</h3><p>从熟悉的工作问题开始尝试</p></div><div><span>03</span><h3>促进新人交流</h3><p>让不同岗位通过作品认识彼此</p></div><div><span>04</span><h3>了解新人和他们的想法</h3><p>了解选题、处理困难和协作的过程</p></div><div><span>05</span><h3>积累案例和方法</h3><p>保留案例、工作流和使用中的经验</p></div></div><div class="reason-line">很多新人已经在使用AI，也有岗位实习经历。结合这些情况，这次我更希望给大家实际应用AI的机会，通过作品促进同届交流，也积累一些之后可以继续用的案例和方法。</div>`},
{chapter:'两年的实践',title:'为什么两年的任务不一样',html:head('↔','结合培养需要，调整比赛任务','2025年做小游戏，<br>2026年开放选题。')+`<div class="grid2"><div class="panel"><div class="label">2025 / 共同任务</div><h3>用 AI 做小游戏，<br>发布到游戏平台。</h3><p>希望新人通过不同角色的协作，了解游戏创作、发布与玩家反馈的过程。</p><div class="statline" style="border-color:var(--line)"><div><b>6</b><small>款小游戏</small></div><div><b>3</b><small>款进入游戏新人榜</small></div><div><b>7.1万+</b><small>累计游玩量*</small></div></div></div><div class="panel green"><div class="label">2026 / 自主找问题</div><h3>围绕工作与创意，<br>完成可演示的作品。</h3><p>结合各自的工作问题或创作兴趣完成作品，通过交流获得反馈，也让大家更多地了解彼此。</p><div class="statline"><div><b>32</b><small>位新人</small></div><div><b>24</b><small>件作品</small></div><div><b>21</b><small>天创作期</small></div></div></div></div><p class="note">* 2025年游玩量为截至当年10月的累计记录，不是去重玩家人数。21天指创作期，完整项目另含评审和路演。</p>`},
{chapter:'选择二 · 任务怎么设计',title:'今年的比赛怎么安排',html:head('02','选择二 · 今年的任务设计','两条赛道，21天创作，<br>提交可以演示的作品。')+`<div class="contest-layout"><figure class="contest-shot"><button data-screenshot aria-label="放大脱敏后的大赛网页截图"><img width="1610" height="977" src="assets/contest-overview.png" alt="今年AI创作大赛网页首页截图，已去除公司与内部项目标识"></button><figcaption>今年的大赛网页 · 公司及项目标识已脱敏 · 点击放大</figcaption></figure><div class="contest-brief"><div class="track-pair"><div><span>赛道 01</span><h3>整体提效</h3><p>业务问题 / 可复用的个人工作流</p></div><div><span>赛道 02</span><h3>脑洞创新</h3><p>新玩法 / 互动体验 / AIGC应用</p></div></div><dl><div><dt>谁参加</dt><dd>本届校招生，个人或2—3人组队</dd></div><div><dt>创作时间</dt><dd>21天创作，工具不限</dd></div><div><dt>作品要求</dt><dd>项目说明 + 可演示原型</dd></div><div><dt>怎样展示</dt><dd>网页要求：5分钟介绍 + 答辩</dd></div></dl></div></div>`},
{chapter:'选择三 · 资源',title:'组织比赛，需要哪些资源支持',html:head('03','先想清楚，需要谁的支持','组织比赛，<br>需要哪些资源支持')+`<table class="resource-table"><tbody><tr><td>组织者</td><td>确定目标和规则，安排进度，协调过程中遇到的问题。</td></tr><tr><td>业务伙伴与试用者</td><td>一起判断问题是否值得做，提供反馈，支持后续试用。</td></tr><tr><td>工具与技术支持</td><td>准备工具和账号、模型额度，提供答疑和故障支持。</td></tr><tr><td>参与者的leader与参与者</td><td>讨论参加的意义、可投入的时间，以及和业务安排的冲突。</td></tr><tr><td>评委与活动支持</td><td>提前约好评审时间，准备场地、物料、设备和展示材料。</td></tr></tbody></table><p class="note">这次由我统筹，学员运营、场地物料、摄影、IT设备和评审都有其他同事支持。先想清楚需要谁，再和相关方沟通具体安排；预算也要考虑大家投入的时间。</p>`},
{chapter:'选择三 · 如何支持',title:'参与者可能遇到哪些困难',html:head('03','选择三 · 提供具体支持','先了解参与者的顾虑，<br>再考虑怎么支持。')+`<table class="resource-table"><thead><tr><th>员工心里的话</th><th>组织者需要准备什么</th></tr></thead><tbody><tr><td>“这跟我有什么关系？”</td><td>从真实问题和兴趣切入，把参与收益讲具体。</td></tr><tr><td>“我不知道做什么。”</td><td>提供场景示例、工具入口和必要的基础练习。</td></tr><tr><td>“我有想法，但没时间。”</td><td>与主管、参与者确认时间，缩小作品范围。</td></tr><tr><td>“我做了一半，卡住了。”</td><td>安排答疑与中途反馈，帮助找到下一步。</td></tr></tbody></table>`+takeaway('你们的参与者，最可能卡在哪一句？')},
{chapter:'选择三 · 沟通协调',title:'非脱产参赛，怎么协调时间',html:head('03','和leader、参与者确认具体安排','非脱产参赛，<br>需要提前沟通时间和安排。')+`<div class="grid2"><article class="panel"><div class="label">和参与者的leader沟通</div><h3>为什么参加，<br>需要投入多少时间？</h3><p>说明比赛目的、创作安排和作品要求，<br>了解当前业务节奏；如果时间有冲突，<br>讨论怎样安排、作品范围能否调整。</p></article><article class="panel green"><div class="label">和参与者沟通</div><h3>想做什么，<br>有哪些顾虑和困难？</h3><p>了解选题、工具基础和可投入的时间，<br>说明作品要求、重要节点和答疑方式；<br>做到一半有困难，也要及时沟通。</p></article></div><div class="reason-line">本轮21天创作：第一周找问题、找伙伴，接下来两周完成可演示作品；评审与路演另行安排。非脱产也需要时间，具体安排要和leader、参与者谈清楚。</div>`},
{chapter:'选择三 · 技术资源',title:'技术资源：工具和赛事平台',html:head('03','技术资源 · 工具、账号与赛事平台','除了人的支持，<br>还要准备工具和赛事平台。')+`<div class="role-tabs" role="group" aria-label="赛事平台角色"><button data-role-view="0">参与者</button><button data-role-view="1">体验者</button><button data-role-view="2">初筛评委</button><button data-role-view="3">路演评委</button><button data-role-view="4">组织者</button></div><div id="role-view" aria-live="polite"></div><p class="figure-caption">这次我用低代码工具搭建赛事平台，未申请研发资源。筹备时还需要确认工具和账号、模型额度、各角色的权限，提前测试访问与提交，并准备故障联系人和备用演示。</p>`},
{chapter:'选择三 · 赛事运营',title:'比赛过程中的信息怎么管理',html:head('03','报名、创作和评审的管理','把报名、作品和评审信息<br>放在一起管理。')+`<div class="layer-map"><div class="map-owner">Ciki · 大赛统筹<span>规则、节奏、异常处理</span></div><div class="layer-lanes"><button data-layer="0"><span class="lane-no">01</span><strong>报名与组队</strong><span>参与对象 → 选题方向 → 组队方式</span></button><button data-layer="1"><span class="lane-no">02</span><strong>创作与提交</strong><span>任务进度 → 节点提醒 → 作品材料</span></button><button data-layer="2"><span class="lane-no">03</span><strong>评审与反馈</strong><span>独立意见 → 合议讨论 → 后续跟进</span></button></div></div><div class="stage-detail" id="layer-detail" aria-live="polite"></div><div class="year-switch" role="group" aria-label="查看两年赛事运营方式"><button data-year="2025">看2025年的做法</button><button data-year="2026">看2026年的做法</button></div><p class="figure-caption">结合大赛实践整理 · 点击查看各环节的安排</p>`},
{chapter:'选择三 · AI运营助手',title:'群内助手：通知、答疑和查询',html:head('03','运营支持 · 群里的助手','群里的通知、答疑和查询，<br>由助手协助处理。')+`<div class="assistant-layout"><div class="assistant-scenarios"><div class="label">点击查看通知、答疑和查询的示例</div><button data-assistant="0">报名通知怎样到群里？</button><button data-assistant="1">新人提问怎样回应？</button><button data-assistant="2">当前作品数据怎样查询？</button><p class="note">以下为预设场景演示，按实际功能说明整理。</p></div><div class="assistant-demo"><div class="chat-title"><span class="bot-avatar">AI</span>群内运营助手</div><div id="assistant-chat" aria-live="polite"></div></div></div><div class="responsibility-strip"><span><b>工作流</b>节点与提醒</span><span><b>AI助手</b>理解问题与查询</span><span><b>人与业务评委</b>目标、规则、取舍</span></div>`},
{chapter:'选择四 · 展示与路演',title:'作品广场、试玩与路演',html:head('04','作品交流 · 展示与路演','让同事体验作品，<br>也让创作者有机会交流。')+`<div class="journey-controls" role="group" aria-label="展示与路演阶段"><button data-showcase="0">01 作品广场</button><button data-showcase="1">02 试玩与交流</button><button data-showcase="2">03 精品路演</button></div><div id="showcase-view" class="showcase-view" aria-live="polite"></div><p class="figure-caption">依据项目实际安排绘制 · 277名员工参与互动，最终7件作品进入路演</p>`},
{chapter:'选择四 · 独立评审',title:'评委先独立审阅，再合议',html:head('04','评审安排 · 独立判断与合议','先由评委独立审阅，<br>再一起讨论不同意见。')+`<div class="review-switch" role="group" aria-label="评审展示方式"><button class="outline active" id="review-photo-tab" aria-pressed="true">评委工作台实拍</button><button class="outline" id="review-process-tab" aria-pressed="false">独立评审流程</button></div><div id="review-photo" class="review-photo-layout"><figure><div class="review-photo-frame"><img src="assets/initial-review.jpg" width="1079" height="1457" alt="实际初审评委工作台：左侧作品列表、右侧通过待定淘汰判断和必填理由，人员和部门已遮挡"></div><figcaption>复盘中的实际界面 · 姓名与部门已脱敏</figcaption><button class="quiet" data-screenshot="review">放大查看评委工作台 ↗</button></figure><div class="review-principles"><div><b>5位评委</b><span>分别查看24件作品</span></div><div><b>120份意见</b><span>每件作品都有结论和理由</span></div><div><b>合议讨论</b><span>结合不同意见确定入围作品</span></div></div></div><div id="review-process" hidden><div class="sealed-reviews" id="sealed-reviews"></div><div class="review-actions"><button class="primary" id="reveal-reviews">进入合议：展开判断理由</button><button class="outline" id="reset-reviews">重新演示</button></div><div id="review-discussion" class="stage-detail" aria-live="polite">评审期间意见互不可见，每件作品都需要结论和理由。</div><p class="figure-caption">流程示意，卡片不对应真实评委或意见。</p></div>`},
{chapter:'成果展示',title:'这次比赛的成果',html:head('↗','这次比赛的成果','32位新人，24件作品，<br>也有了一些工作中的尝试。')+`<div class="result-stats"><div><b>32</b><span>位新人 · 20个部门</span></div><div><b>24</b><span>件作品 · 提交率100%</span></div><div><b>277</b><span>名员工互动 · 504赞 / 60评</span></div><div><b>7</b><span>件作品进入路演</span></div></div><div class="result-cases"><article><div class="case-pictogram" aria-hidden="true">${caseIcon('tasks')}</div><h3>需求整理工具</h3><p>把聊天和文档里的需求整理到一起</p><span class="evidence-chip">完成演示 · 9月3日记录55赞</span><button class="case-open" data-case="0">展开案例 ↗</button></article><article><div class="case-pictogram" aria-hidden="true">${caseIcon('bot')}</div><h3>本地化支持机器人</h3><p>整理术语、语料与经验，支持群内问答</p><span class="evidence-chip">业务群试用 · 同事正反馈</span><button class="case-open" data-case="1">展开案例 ↗</button></article><article><div class="case-pictogram" aria-hidden="true">${caseIcon('game')}</div><h3>游戏与互动作品</h3><p>部分游戏已发布，获得玩家体验与反馈</p><span class="evidence-chip">可玩版本 · 公开发布</span><button class="case-open" data-case="2">展开案例 ↗</button></article></div><p class="note">按本轮复盘记录。交付、互动与试用已发生，持续应用和实际效果还需要后续跟进。</p>`},
{chapter:'选择五 · 参赛者反馈',title:'比赛后，和创作者聊什么',html:head('05','赛后和创作者交流','结合创作过程，<br>和创作者交流反馈。')+`<div class="signal-layout"><div class="artifact-stack"><div class="artifact-sheet back-sheet"></div><div class="artifact-sheet"><span class="label">已留下的材料</span><h3>作品 + 评审理由</h3><div class="artifact-lines"></div><span class="evidence-chip">结合过程了解创作者</span></div><svg class="signal-arrow" viewBox="0 0 100 30" aria-hidden="true"><path d="M4 15H89M78 5L90 15L78 25" fill="none" stroke="currentColor" stroke-width="2"/></svg></div><div><div class="signal-questions"><button data-signal="0">为什么选择这个问题？</button><button data-signal="1">遇到卡点尝试了什么？</button><button data-signal="2">不同岗位怎样协作？</button><button data-signal="3">收到反馈后改了什么？</button></div><div id="signal-detail" class="stage-detail" aria-live="polite"></div></div></div><div class="boundary-note">结合参赛过程提供反馈；没有留下的记录，和创作者交流补充。团队作品还要了解个人贡献。</div>`},
{chapter:'选择五 · 继续验证',title:'赛后还需要跟进什么',html:head('05','赛后跟进','比赛结束后，<br>作品和人的变化还需要继续了解。')+`<div class="followup-tabs" role="tablist" aria-label="后续跟踪方向"><button role="tab" data-followup="0">作品持续使用</button><button role="tab" data-followup="1">工作中继续应用</button><button role="tab" data-followup="2">组织经验能否复用</button></div><div id="followup-view" class="followup-view" aria-live="polite"></div><p class="figure-caption">三项方向来自原文；记录问题为本次分享整理，可结合公司情况调整。</p>`},
{chapter:'带回公司 · 开始设计',title:'如果准备办，先讨论这些问题',html:`<div class="closing"><div><div class="eyebrow">回到各自公司的情况</div><h2>如果准备办一场，<br>可以先讨论<span class="accent">这些问题。</span></h2><p class="sub">找一位业务伙伴和几位可能的参与者，<br>结合问题、参与者和资源条件，讨论第一轮怎么安排。</p><div class="resource-links"><button class="primary" data-canvas>填写我的大赛设计画布　↗</button><a class="outline" href="share-guide.html" target="_blank" rel="noopener">会后参考资料 ↗</a></div><p class="note">填写、复制、下载或打印，内容仅保存在当前浏览器。</p></div><div class="panel"><div class="label">大赛筹备与赛后跟进</div><ol><li>组织最希望看到什么变化？</li><li>谁参与，AI基础怎么样？</li><li>对作品有什么要求？怎样说明AI的使用过程？</li><li>工具、时间、答疑由谁支持？</li><li>哪些流程交给系统，哪些由人判断？</li><li>怎样展示、评审和反馈？</li><li>作品与人的后续，由谁跟进？</li></ol></div></div><details><summary>资料与图示说明</summary><p>本分享结合某游戏公司2025—2026年AI创作大赛实践。资料仅选用与大赛任务、创作支持、赛事运营、展示评审及赛后跟进相关的内容；对话、流程图和评委卡片为脱敏示意。</p></details>`}
];
let index=0,goal='',slideResizeObserver,showcaseMotionStop;
function getLocal(k){try{return localStorage.getItem(k)}catch{return null}}
function setLocal(k,v){try{localStorage.setItem(k,v);return true}catch{return false}}
function render(){showcaseMotionStop?.();const s=slides[index];$('stage').innerHTML=`<section class="slide" aria-label="${s.title}">${s.html}</section>`;$('chapter-name').textContent=s.chapter;$('page').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;$('progress').style.width=`${(index+1)/slides.length*100}%`;$('prev').disabled=index===0;$('next').disabled=index===slides.length-1;document.title=`${s.title} · HR组织AI大赛`;document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>go(index+1));document.querySelectorAll('[data-canvas]').forEach(b=>b.onclick=openCanvas);document.querySelectorAll('[data-goal]').forEach(b=>{b.classList.toggle('selected',b.dataset.goal===goal);b.setAttribute('aria-pressed',String(b.dataset.goal===goal));b.onclick=()=>{goal=b.dataset.goal;render();$('goal-response').textContent=`如果这次主要关注「${goal}」，任务、资源和评价也需要有相应的安排。`}});enhanceSlide();enhancePractice();if(typeof ResizeObserver!=='undefined'){slideResizeObserver?.disconnect();slideResizeObserver=new ResizeObserver(()=>requestAnimationFrame(fitSlide));slideResizeObserver.observe($('stage').querySelector('.slide'))}document.querySelectorAll('[data-screenshot]').forEach(b=>b.onclick=()=>openSourceImage(b.dataset.screenshot||'overview'));$('stage').querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>requestAnimationFrame(fitSlide)));window.scrollTo(0,0);$('page-jump').setAttribute('aria-label','跳转页面，当前第'+(index+1)+'页，共'+slides.length+'页');$('stage').querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>requestAnimationFrame(fitSlide),{once:true}));requestAnimationFrame(fitSlide)}
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
document.addEventListener('keydown',e=>{if(e.defaultPrevented||document.querySelector('dialog[open]')||e.target.matches('input,textarea,select,[contenteditable=true]')||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key===' '&&e.target.matches('button,a,[role=button]'))return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(index+1)}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(index-1)}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}if(e.key.toLowerCase()==='g')$('overview').click();if(e.key.toLowerCase()==='n')toggleCue();if(e.key.toLowerCase()==='f')$('fullscreen').click();if(e.key==='Escape')closeCue()});
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
 enhanceRoles();enhanceCases();enhanceThinking();updateCue();
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
  '先问参与者：你每天遇到的哪件小事，最想尝试改变？',
  '准备两三个贴近岗位的示例，再给一个能开始的小练习。',
  '先和主管确认可投入的时间，再缩小作品范围。',
  '中途看一次最小演示，帮助创作者找到可以继续的下一步。']);
 if(index===8)focusCards('.panel',[
  '和leader说明比赛目的与时间安排，了解业务高峰；有冲突时，一起讨论时间和作品范围怎样调整。',
  '和参与者了解选题、工具基础和时间上的困难，说明提交要求、重要节点和答疑联系人。']);
 if(index===6)focusCards('tbody tr',[
  '启动前：谁拥有目标、规则与异常处理的最终协调责任？',
  '找一位愿意判断问题、并在赛后继续试用的业务伙伴；评价业务应用时，也需要他的使用反馈。',
  '提前确认账号、额度、角色权限、答疑和故障入口。后面会按五类使用者，说明赛事平台要准备什么。',
  '和参与者的leader、参与者分别讨论可投入的时间、业务安排和当前困难。',
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
  const scenes=[['节点到达 / 报名通知产生','工作流把通知推到群里，群内助手承接对应消息。','固定节点与提醒由流程处理，不需要把每个动作都当成AI判断。'],['示例提问：作品需要交到什么程度？','提交项目说明和可演示原型，展示时做5分钟作品介绍与答辩。','回答内容依据活动说明；这是一段演示问答。'],['示例查询：这一轮完成了多少件作品？','按本轮复盘记录，共24件作品，由32位新人参与完成。','示例查询结果；非实时数据。']];const d=scenes[practiceState.assistant];
  $('assistant-chat').innerHTML=`<div class="chat-bubble user-bubble">${d[0]}</div><div class="chat-flow">群内消息 <span>→</span> ${practiceState.assistant===0?'节点工作流':'理解问题 / 查询'}</div><div class="chat-bubble bot-bubble">${d[1]}</div><div class="chat-caption">${d[2]}</div>`;
 });
 if(index===12)practiceTabs('[data-showcase]','showcase',()=>{showcaseMotionStop?.();
  const n=practiceState.showcase;
  if(n===0){$('showcase-view').innerHTML=`<div class="real-gallery"><figure><div class="real-shot-scroll" id="gallery-scroll" tabindex="0" aria-label="作品广场脱敏截图，可上下滚动"><img src="assets/works-square.jpg" width="1690" height="931" alt="大赛实际作品广场，展示作品卡片、赛道筛选、点赞和评论入口；姓名、部门与品牌已遮挡"></div><figcaption>实际作品广场 · 品牌、姓名和部门已脱敏</figcaption><div class="real-shot-actions"><button class="outline" id="gallery-play" aria-pressed="false">滚动浏览</button><button class="outline" id="gallery-expand">放大查看 ↗</button></div></figure><div class="gallery-explain"><div class="label">让更多同事体验作品</div><h3>作品介绍、体验入口，<br>点赞与评论放在一起。</h3><p>参赛者之外的同事也能了解作品，创作者可以收到具体反馈。</p><p class="note">277名员工参与互动。截图中的票数为截取时的状态，人气反馈与专业评审分别看。</p></div></div>`;bindGallery();}

  if(n===1)$('showcase-view').innerHTML='<div class="conversation-picture"><div class="person-shape"></div><div class="speech-sheet"><b>创作者说明自己的选择</b><p>看见什么问题？为什么这样做？</p></div><div class="speech-sheet peer-sheet"><b>同事体验与反馈</b><p>实际使用时，哪里有帮助，哪里还不清楚？</p></div></div><div class="showcase-message"><b>交流不只发生在决赛</b><p>作品被体验，也让不同岗位的人了解彼此的做法。</p></div>';
  if(n===2)$('showcase-view').innerHTML='<div class="roadshow-picture"><div class="stage-screen"><span>7件作品 · 精品路演</span><div class="screen-line"></div><div class="screen-line short"></div></div><div class="speaker-shape"></div><div class="audience-shapes"><i></i><i></i><i></i><i></i><i></i></div></div><div class="showcase-message"><b>帮助听众记住作品背后的人</b><p>档案卡、展示顺序和有限的讲述时间，支持创作者讲清问题、选择与推进过程。</p></div>';
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
const caseDetails=[['需求整理工具','从工作中分散的需求开始','把私聊、群聊和文档里的需求整理到一起，减少信息分散带来的遗漏。','已有可演示版本；人气冻结时54赞，9月3日记录55赞。','实际节省多少时间、能否持续使用，需要进一步验证。'],['本地化支持机器人','从非技术岗位熟悉的问题开始','围绕本地化术语、资料与经验，尝试在业务群里提供问答支持。','已在实际业务群试用，收到同事正反馈。','后续需要看回答质量、使用频率与资料维护。'],['游戏与互动作品','让创意进入真实体验','通过AI辅助创作，把玩法与互动想法做成可体验版本。','部分作品已发布到游戏平台，获得玩家体验和反馈。','完成作品之后，继续看体验反馈与迭代。']];
function enhanceCases(){document.querySelectorAll('[data-case]').forEach(b=>b.onclick=()=>{const d=caseDetails[+b.dataset.case];$('case-title').textContent=d[0];$('case-body').innerHTML=`<span class="label">${d[1]}</span><h3>从什么问题开始</h3><p>${d[2]}</p><h3>现在做到哪一步</h3><p>${d[3]}</p><h3>还需要了解什么</h3><p>${d[4]}</p>`;$('case-dialog').showModal()})}

const thinkingItems = [["让大家实际应用AI", "我会先看新人已有的使用基础，再决定需要补哪些练习与答疑。完成作品，是观察实际应用的一个起点。"], ["尝试解决工作问题", "我会问哪些工作问题值得尝试、谁愿意试用。业务应用是可能方向，是否产生持续效果仍要验证。"], ["促进新人交流", "不同岗位的同届新人需要认识彼此。除了组队，还要安排作品体验与交流，让大家看见伙伴在做什么。"], ["了解新人和他们的想法", "我希望通过选题、处理卡点与调整过程更了解参与者，不把一次作品名次当作对个人能力的完整判断。"], ["积累案例和方法", "除了作品，也希望留下任务说明、工具使用和组织流程，为之后继续应用与下一轮培养提供参考。"]];
let thinkingIndex = 0;
function enhanceThinking(){
 const cards=[...$('stage').querySelectorAll('.five-choices>div')];if(!cards.length)return;
 const detail=document.createElement('div');detail.className='choice-detail';detail.setAttribute('aria-live','polite');cards[0].parentElement.after(detail);
 const paint=i=>{thinkingIndex=i;cards.forEach((card,j)=>{card.classList.toggle('choice-active',i===j);card.setAttribute('aria-pressed',String(i===j))});detail.innerHTML='<span class="label">'+thinkingItems[i][0]+'</span><p>'+thinkingItems[i][1]+'</p>';requestAnimationFrame(fitSlide)};
 cards.forEach((card,i)=>{card.classList.add('choice-target');card.setAttribute('role','button');card.tabIndex=0;card.setAttribute('aria-label','展开：'+thinkingItems[i][0]);card.onclick=()=>paint(i);card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();paint(i)}}});paint(thinkingIndex);
}
const cueLines=["今天想结合两年新人培养项目中的AI实践，分享我组织AI创作大赛时的考虑和具体安排，包括为什么办、任务怎么设计、需要哪些支持、怎样评价，以及赛后还需要做什么。 转场：先说明今天想和大家分享什么。", "组织比赛，需要先明确希望通过它促成什么，再考虑任务、规则和资源。过程中要和相关方沟通、支持参与者完成作品，结束后也要关注作品应用和参与者的反馈。今天会结合实际做法和大家讨论。 转场：先从组织的期待说起。", "结合业务和人的情况，这次是更希望大家开始尝试AI，还是解决一些具体问题，或通过实践了解新人、促进交流？这些目的可以兼顾，但需要明确重点。目的不同，需要提供的支持和评价方式也会不同。 转场：回到我们当时的情况，我在规划时考虑了哪些目的？", "规划时，我会考虑能否让大家实际应用AI、尝试解决工作问题、促进新人交流，也通过创作过程更多地了解新人，积累一些案例和方法。为什么会有这些考虑？很多新人已经在使用AI，也有岗位实习经历。结合这些情况，这次我更希望给大家实际应用的机会，通过作品认识不同岗位的同届伙伴，也留下一些之后可以继续用的实践。 转场：这两年的任务，也随着培养需要作了调整。", "2025年安排的是共同任务：用AI制作小游戏并发布，让新人通过不同角色协作，了解游戏创作、发布和玩家反馈的过程。2026年开放到工作提效与创意，大家可以从熟悉的问题或兴趣开始。 转场：接着看今年的比赛具体怎么安排。", "今年设置整体提效和脑洞创新两条赛道，允许个人或2—3人组队，21天创作，提交项目说明和可演示原型。既可以从工作问题开始，也可以做自己感兴趣的创意。实际18件是个人作品、6件是团队作品，交流还需要通过后面的作品展示和试玩来安排。 转场：这些安排要实施，需要先想清楚有哪些人、哪些资源可以支持。", "这次由我统筹，但学员运营、场地物料、摄影、IT设备和评审，都有其他同事支持。筹备时，我会先想需要哪些人的支持：谁可以帮助判断业务问题，谁提供工具和答疑，谁参与评审，参与者的leader需要支持什么。想清楚之后，再和相关方沟通各自需要投入的事情和时间。 转场：其中，和参与者、leader的沟通，先从参与者可能遇到的困难看起。", "参与者可能觉得这件事和自己关系不大，也可能不知道做什么、有想法但没时间，或做到一半卡住。了解具体顾虑后，再考虑选题示例、工具说明、时间协调和答疑。本轮有课程笔记、专家群答疑、工具选型指导与模型额度，参与者也需要知道这些支持在哪里、可以找谁。 转场：时间问题尤其需要和参与者的leader、参与者分别沟通。", "非脱产参赛仍然需要时间。和leader沟通时，需要说明比赛目的、创作安排和作品要求，了解当前业务节奏，有冲突时讨论时间和作品范围怎样调整。和参与者沟通时，需要了解想做什么、工具基础和可投入的时间，说清重要节点和答疑方式；过程中遇到困难，也要及时沟通。本轮第一周找问题、找伙伴，接下来两周完成可演示作品，评审与路演另行安排。 转场：在争取人的支持、协调安排的同时，也需要准备技术资源。", "工具、账号和模型额度要提前准备，赛事平台也是其中一项。参与者需要看规则和提交，体验者需要找作品、留下反馈，初筛评委需要独立审阅并填写理由，路演评委需要演示与备用材料，组织者需要管理报名、作品和评审信息。这次我用低代码搭建了平台，未申请研发资源；筹备时仍需要确认权限、测试访问和提交，并明确故障支持与备用方案。 转场：平台准备好之后，再看比赛过程中的信息怎么管理。", "报名时要知道谁参加、做什么、和谁组队；创作中要了解进展、遇到的困难和提交情况；评审时收齐各位评委的结论和理由，再一起讨论。2025年用多维表格关联这些信息，2026年结合赛事平台和群内助手。工具帮助记录和提醒，具体判断仍需要人来做。 转场：群里也有不少通知、答疑和查询，可以由助手协助处理。", "群内助手可以协助通知、回答活动规则问题和查询作品数据。固定节点由流程触发，规则问题依据活动说明回答，比赛目标、规则调整和评审判断仍由人负责。 转场：作品提交之后，再安排体验、交流和路演。", "作品广场让公司同事可以找到、体验和评论作品。试玩交流让创作者说明自己的想法，听到其他岗位的反馈；这一轮17人参加了试玩。最后7件作品进入路演，未晋级作品也保留广场展示和互动的机会。 转场：评审是怎样安排的？", "5位评委分别审阅24件作品，每份意见都要有结论和理由，评审时互不可见，再一起讨论。共120份意见，36份通过、43份待定、41份淘汰，是意见分布，不是作品排名。评价还要结合比赛目的：提效作品需要业务反馈，创意作品需要实际体验；依赖内部环境时，可以提前准备脱敏录屏和说明材料。 转场：介绍完安排，再看这次比赛具体做出了哪些成果。", "32位来自20个部门的新人完成了24件作品，提交率100%。277名员工参与互动，留下504个赞和60条评论，7件作品进入路演。结合具体作品看，需求整理工具完成了演示，本地化支持机器人已在业务群试用，部分游戏已公开发布。作品做出来、开始试用和持续应用，分别说明了不同的进展，后续效果还需要继续了解。 转场：除了看作品，也可以结合过程和创作者交流反馈。", "可以从为什么选这个问题、遇到困难时做过哪些尝试、怎样协作、收到反馈后改了什么，继续了解创作者。已有记录可以帮助讨论，未记录的过程需要交流补充。团队作品还要了解个人贡献，一次比赛的名次不能代替对个人的完整判断。 转场：赛后还需要继续跟进作品应用和参与者的变化。", "作品是否还在使用，参与者是否在工作中继续应用这些方法，组织比赛的经验是否能在下一次继续用，都需要后续了解。对准备继续推进的作品，明确使用者、负责人和下一次回看的时间；对组织过程，也记录哪些安排有效、哪些需要调整。 转场：如果大家也准备组织比赛，可以先讨论这些问题。", "可以先找业务伙伴和几位可能的参与者，讨论组织的期待、参与者基础、任务和资源条件，再决定第一轮怎么安排。会后资料和设计画布整理了这些问题，大家可以结合自己的情况继续讨论。 转场：请大家交流最想进一步讨论的问题。"];
function updateCue(){if($('cue-text')){$('cue-text').textContent=cueLines[index];$('cue-title').textContent='P'+(index+1)+' · '+slides[index].chapter}}
function toggleCue(){const box=$('cue-panel');box.hidden=!box.hidden;$('cue-toggle').setAttribute('aria-expanded',String(!box.hidden));updateCue()}
function closeCue(){$('cue-panel').hidden=true;$('cue-toggle').setAttribute('aria-expanded','false')}
$('cue-toggle').onclick=toggleCue;$('cue-close').onclick=closeCue;$('page-jump').onclick=()=>$('overview').click();
let imageZoom=1;
function zoomImage(delta){imageZoom=Math.max(1,Math.min(3,imageZoom+delta));$('image-dialog').querySelector('img').style.width=(imageZoom*100)+'%';$('image-zoom-level').textContent=Math.round(imageZoom*100)+'%'}
$('image-plus').onclick=()=>zoomImage(.25);$('image-minus').onclick=()=>zoomImage(-.25);$('image-fit').onclick=()=>{imageZoom=1;zoomImage(0);$('image-viewport').scrollTop=0;$('image-viewport').scrollLeft=0};
$('image-dialog').addEventListener('click',e=>{if(e.target===$('image-dialog'))$('image-dialog').close()});

fromHash();
