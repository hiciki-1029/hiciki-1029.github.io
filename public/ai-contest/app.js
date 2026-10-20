const $=id=>document.getElementById(id);
const head=(n,eyebrow,title,sub='')=>`<div class="section-head"><div><div class="eyebrow">${eyebrow}</div><h2>${title}</h2>${sub?`<p class="sub">${sub}</p>`:''}</div><span class="big-number" aria-hidden="true">${n}</span></div>`;
const takeaway=text=>`<div class="takeaway"><span class="tag">带走一个问题</span><span>${text}</span></div>`;

function caseIcon(kind){
 const start='<svg viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">',end='</svg>';
 const arrow='<path d="M116 45H162M154 37L162 45L154 53" stroke="#c3663c" stroke-width="2"/>';
 if(kind==='tasks')return start+'<rect x="28" y="16" width="67" height="48" rx="9" fill="#e7ecdd" stroke="#355645"/><path d="M42 31H80M42 41H73M42 51H65" stroke="#355645" stroke-width="2"/>'+arrow+'<rect x="185" y="12" width="66" height="65" rx="7" fill="#fbfbf6" stroke="#355645"/><path d="M199 30L203 34L211 25M218 30H239M199 49L203 53L211 44M218 49H239M199 65H238" stroke="#355645" stroke-width="2"/>'+end;
 if(kind==='bot')return start+'<rect x="30" y="15" width="56" height="62" rx="5" fill="#e7ecdd" stroke="#355645"/><path d="M43 29H73M43 39H73M43 49H65M43 59H69" stroke="#355645" stroke-width="2"/>'+arrow+'<rect x="180" y="24" width="72" height="48" rx="13" fill="#fbfbf6" stroke="#355645"/><path d="M216 24V13M208 13H224M195 59H237" stroke="#355645" stroke-width="2"/><circle cx="200" cy="44" r="4" fill="#355645"/><circle cx="232" cy="44" r="4" fill="#355645"/>'+end;
 return start+'<path d="M39 29C44 16 85 16 91 29L103 61C108 76 94 80 84 65L75 57H56L46 66C34 81 20 74 26 59L39 29Z" fill="#e7ecdd" stroke="#355645"/><path d="M42 39H60M51 30V48" stroke="#355645" stroke-width="2"/><circle cx="81" cy="36" r="3" fill="#c3663c"/>'+arrow+'<rect x="179" y="15" width="77" height="57" rx="6" fill="#fbfbf6" stroke="#355645"/><path d="M179 29H256M196 64L209 48L220 57L233 41L245 64" stroke="#355645" stroke-width="2"/><circle cx="188" cy="22" r="2" fill="#c3663c"/>'+end;
}

const slides=[
{chapter:'开场',title:'从“想办一场”到“真正办起来”',html:`<div class="hero"><div><div class="eyebrow">2025—2026 · AI大赛组织实践</div><h1><span>从“想办一场”</span><span>到<span class="accent" style="display:inline">“真正办起来”</span></span></h1><p class="sub">HR 组织 AI 大赛的关键选择</p><div class="hero-bottom"><button class="primary" data-next>开始这场分享　→</button><div class="author">Ciki<br>游戏公司｜组织与人才发展</div></div></div><div class="hero-art" aria-label="五个相互关联的选择：目的、任务、支持、评审、延续"><div class="orbit"></div><div class="orb-center">关键选择<small>结合实际情况讨论</small></div><span class="orbit-label ol1">01　为什么办</span><span class="orbit-label ol2">02　交出什么</span><span class="orbit-label ol3">03　如何支持</span><span class="orbit-label ol4">04　怎样评价</span><span class="orbit-label ol5">05　如何延续</span></div></div>`},
{chapter:'分享的起点',title:'听完以后，能开始做什么',html:head('↗','这次想和大家讨论什么','办一场AI大赛，<br>需要提前想清楚哪些问题？')+`<div class="grid3"><div class="panel"><div class="num">01</div><h3>能判断</h3><p>结合业务和人的情况，<br>我们希望通过比赛解决什么问题？</p></div><div class="panel"><div class="num">02</div><h3>能设计</h3><p>任务和规则怎样安排？<br>需要哪些人、工具和时间支持？</p></div><div class="panel green"><div class="num">03</div><h3>能延续</h3><p>比赛结束以后，<br>作品怎样继续应用，参与者能得到什么反馈？</p></div></div>`+takeaway('如果明天要办，你最希望比赛帮助解决什么问题？')},
{chapter:'两年的实践',title:'同样是AI实践，两年的任务不同',html:head('↔','两年的安排有什么不同','两年的培养需求不同，<br>任务也做了调整。')+`<div class="grid2"><div class="panel"><div class="label">2025 / 共同任务</div><h3>用 AI 做小游戏，<br>发布到游戏平台。</h3><p>希望新人通过不同角色的协作，了解游戏创作、发布与玩家反馈的过程。</p><div class="statline" style="border-color:var(--line)"><div><b>6</b><small>款小游戏</small></div><div><b>3</b><small>款进入游戏新人榜</small></div><div><b>7.1万+</b><small>累计游玩量*</small></div></div></div><div class="panel green"><div class="label">2026 / 自主找问题</div><h3>围绕工作与创意，<br>交出可演示的作品。</h3><p>结合各自的工作问题或创作兴趣完成作品，通过交流获得反馈，也让大家更多地了解彼此。</p><div class="statline"><div><b>32</b><small>位新人</small></div><div><b>24</b><small>件作品</small></div><div><b>21</b><small>天创作期</small></div></div></div></div><p class="note">* 2025年游玩量为截至当年10月的累计记录，不是去重玩家人数。21天指创作期，完整项目另含评审和路演。</p>`},
{chapter:'选择一 · 为什么办',title:'如果只能留下一个结果',html:head('01','选择一 · 先明确目的','这次比赛，<br>最希望解决什么问题？','可以点击一个方向，先确定本次比赛的主要目标。')+`<div class="grid3"><button class="choice" data-goal="普及体验" aria-pressed="false"><div class="num">A</div><h3>更多人开始用</h3><p>普及体验<br>关注起步门槛、工具与基础支持。</p></button><button class="choice" data-goal="业务应用" aria-pressed="false"><div class="num">B</div><h3>几个问题被解决</h3><p>业务应用<br>关注使用者、试用条件与效果验证。</p></button><button class="choice" data-goal="人才发展与连接" aria-pressed="false"><div class="num">C</div><h3>通过实践了解和发展新人</h3><p>人才发展与连接<br>关注协作、过程与具体反馈。</p></button></div><div class="question" id="goal-response">这些目标可以兼顾，但需要结合当下的情况确定重点，再安排相应的支持与评价方式。</div>`},
{chapter:'选择二 · 交出什么',title:'今年的大赛，具体怎样参加',html:head('02','选择二 · 今年的任务设计','从一个问题或想法出发，<br>做出可演示的作品。')+`<div class="contest-layout"><figure class="contest-shot"><button data-screenshot aria-label="放大脱敏后的大赛网页截图"><img src="assets/contest-overview.png" alt="今年AI创作大赛网页首页截图，已去除公司与内部项目标识"></button><figcaption>今年的大赛网页 · 公司及项目标识已脱敏 · 点击放大</figcaption></figure><div class="contest-brief"><div class="track-pair"><div><span>赛道 01</span><h3>整体提效</h3><p>业务问题 / 可复用的个人工作流</p></div><div><span>赛道 02</span><h3>脑洞创新</h3><p>新玩法 / 互动体验 / AIGC应用</p></div></div><dl><div><dt>谁参加</dt><dd>本届校招生，个人或2—3人组队</dd></div><div><dt>用多久</dt><dd>21天创作，工具不限</dd></div><div><dt>交什么</dt><dd>项目说明 + 可演示原型</dd></div><div><dt>怎样展示</dt><dd>5分钟作品介绍 + 答辩</dd></div></dl></div></div>`},
{chapter:'选择二 · 交付与反馈',title:'这一轮做出了什么，收到了什么反馈',html:head('02','这一轮的交付与反馈','作品做出来以后，<br>也有了交流和试用的机会。')+`<div class="result-stats"><div><b>32</b><span>位新人 · 20个部门</span></div><div><b>24</b><span>件作品 · 提交率100%</span></div><div><b>277</b><span>名员工互动 · 504赞 / 60评</span></div><div><b>7</b><span>件作品进入路演</span></div></div><div class="result-cases"><article><div class="case-pictogram" aria-hidden="true">${caseIcon('tasks')}</div><h3>需求整理工具</h3><p>把聊天和文档里的需求整理到一起</p><span class="evidence-chip">完成演示 · 获55个赞</span></article><article><div class="case-pictogram" aria-hidden="true">${caseIcon('bot')}</div><h3>本地化支持机器人</h3><p>整理术语、语料与经验，支持群内问答</p><span class="evidence-chip">业务群试用 · 同事正反馈</span></article><article><div class="case-pictogram" aria-hidden="true">${caseIcon('game')}</div><h3>游戏与互动作品</h3><p>部分游戏已发布，获得玩家体验与反馈</p><span class="evidence-chip">可玩版本 · 公开发布</span></article></div><p class="note">按本轮复盘记录。交付、互动与试用已发生，持续应用和实际效果还需要后续跟进。</p>`},
{chapter:'选择三 · 如何支持',title:'参与者的四句话',html:head('03','选择三 · 提供具体支持','参与者卡在哪里，<br>就具体提供什么支持。')+`<table class="resource-table"><thead><tr><th>员工心里的话</th><th>组织者需要准备什么</th></tr></thead><tbody><tr><td>“这跟我有什么关系？”</td><td>从真实问题和兴趣切入，把参与收益讲具体。</td></tr><tr><td>“我不知道做什么。”</td><td>提供场景示例、工具入口和必要的基础练习。</td></tr><tr><td>“我有想法，但没时间。”</td><td>与主管、参与者确认时间，缩小交付范围。</td></tr><tr><td>“我做了一半，卡住了。”</td><td>安排答疑与中途反馈，帮助找到下一步。</td></tr></tbody></table>`+takeaway('你们的参与者，最可能卡在哪一句？')},
{chapter:'选择三 · 节奏',title:'创作需要节奏，非脱产也需要时间',html:head('03','创作期怎样安排','非脱产开展，<br>也需要提前协调投入时间。','以下创作节奏来自2026年实践；评审、体验和路演另行安排。')+`<div class="timeline"><div class="time-block"><div class="label">第一周</div><b>01</b><h3>找问题 · 找伙伴</h3><p>寻找痛点，自主组队。<br>确认做什么，以及如何分工。</p></div><div class="time-block" style="background:#e7ecdd"><div class="label">接下来两周</div><b>02—03</b><h3>把想法做成可演示作品</h3><p>控制范围，推进交付。<br>建议中途看一次最小演示，及时处理卡点。</p></div></div><div class="question">启动前谈清：可投入多少时间？主管是否知情？业务冲突怎样处理？</div>`},
{chapter:'选择三 · 资源',title:'一个人统筹，需要哪些支持',html:head('03','需要哪些协作','一个人统筹，<br>需要哪些同事支持？')+`<table class="resource-table"><tbody><tr><td>统筹者</td><td>目标、规则、节奏、关键判断和异常处理。</td></tr><tr><td>业务伙伴与试用者</td><td>判断问题，提供反馈，承接赛后试用。</td></tr><tr><td>工具与技术支持</td><td>账号、使用条件、答疑入口和故障支持。</td></tr><tr><td>主管与参与者</td><td>投入时间、角色分工与业务冲突协调。</td></tr><tr><td>评委与活动支持</td><td>评价材料、场地、物料、设备与展示安排。</td></tr></tbody></table><p class="note">本案例由TD单人统筹，跨团队同事与业务评委共同支持。预算还应考虑创作、协调、评审与维护的时间投入。</p>`},
{chapter:'选择三 · 信息与工具',title:'先把信息接起来',html:head('03','工具与信息衔接','先看哪些信息需要衔接，<br>再选择工具和平台。')+`<div class="review-line"><div class="review-node"><strong>参与者</strong><p>看规则 → 报名组队<br>交作品 → 收反馈</p></div><span class="arrow">→</span><div class="review-node"><strong>组织者</strong><p>看进度 → 处理卡点<br>整理材料 → 组织展示</p></div><span class="arrow">→</span><div class="review-node"><strong>评委与业务</strong><p>体验作品 → 留下理由<br>讨论判断 → 对接试用</p></div></div><div class="grid2"><div class="panel"><div class="label">2025</div><h3>多维表格与节点提醒</h3><p>关联学员档案、任务进度和反馈。</p></div><div class="panel"><div class="label">2026</div><h3>赛事入口与 AI 助手</h3><p>衔接报名、提交、展示与评审；助手参与答疑、通知与查询。</p></div></div><p class="note">小规模第一轮，可以从一页说明与几张关联表开始。工具选择结合本公司的既有条件。</p>`},
{chapter:'选择四 · 怎样评价',title:'未进决赛的人，还能得到什么',html:head('04','选择四 · 评价与反馈','没有进入决赛的参与者，<br>也需要交流和反馈。')+`<div class="grid2"><div class="panel"><div class="label">更广泛的交流</div><h3>作品广场 · 试玩交流</h3><p>让作品被体验，让作者解释自己的选择，听到具体反馈，也看到其他人的做法。</p><div class="case-divider"></div><span class="micro">提供体验与交流的机会</span></div><div class="panel green"><div class="label">更集中的讨论</div><h3>7 件作品 · 精品路演</h3><p>高管与业务负责人到场，为部分作品提供集中展示和深入交流的机会。</p><div class="case-divider" style="background:#ffffff26"></div><span class="micro" style="color:#c8d5c4">进一步讨论作品与应用条件</span></div></div>`+takeaway('为未晋级者准备体验、评价理由和改进机会。')},
{chapter:'选择四 · 评审机制',title:'先独立判断，再讨论理由',html:head('04','评审怎样组织','评委先独立判断，<br>再结合具体理由一起讨论。')+`<div class="review-line"><div class="review-node"><strong>独立判断</strong><p>5位初筛评委<br>通过 / 待定 / 淘汰<br>意见在评审期间互不可见</p></div><span class="arrow">→</span><div class="review-node"><strong>留下理由</strong><p>每件作品说明依据<br>区分信息不足、理解差异<br>与标准本身的问题</p></div><span class="arrow">→</span><div class="review-node"><strong>合议讨论</strong><p>把不同视角放在一起<br>对齐判断，记录结论<br>向参赛者提供反馈</p></div></div><div class="question">整体提效看业务价值，脑洞创新看创新性；同时关注完成度、可推广性与展示效果。</div>`},
{chapter:'选择四 · 现场讨论',title:'你会先追问什么',html:head('?','一起讨论一个情境','两个作品，你会先追问什么？')+`<div class="grid2"><div class="panel"><div class="label">作品 A</div><h3>演示很惊艳</h3><p>创意突出，效果吸引人。<br>还没有真实使用者反馈。</p></div><div class="panel"><div class="label">作品 B</div><h3>看起来很朴素</h3><p>解决每天发生的小麻烦。<br>已有同事持续使用。</p></div></div><div class="wide-quote serif">结合比赛目的，<span class="accent">还需要了解什么？</span></div><div class="micro">业务价值　/　创新性　/　完成度　/　可推广性　/　展示效果</div>`},
{chapter:'选择五 · 如何延续',title:'比赛结束后，哪些事情需要跟进',html:head('05','选择五 · 赛后继续做什么','比赛结束以后，<br>哪些事情需要继续跟进？')+`<div class="grid3"><div class="panel"><div class="num">作品</div><h3>作品怎样继续应用</h3><p>谁愿意用？谁负责？<br>下一步验证什么？<br>什么时候回看？</p></div><div class="panel"><div class="num">人</div><h3>结合过程了解参与者</h3><p>为什么选这个问题？<br>卡住后怎样推进？<br>收到反馈后改了什么？</p></div><div class="panel green"><div class="num">方法</div><h3>下一轮可以保留什么</h3><p>任务与提交模板<br>评审理由与常见卡点<br>使用记录与调整依据</p></div></div><p class="note">作品名次是继续了解人的线索。长期能力与工作表现，需要结合更多过程记录和后续观察。</p>`},
{chapter:'选择五 · 看什么证据',title:'不同结果，要用不同证据回答',html:head('05','怎样了解项目效果','怎样了解项目效果？')+`<table class="resource-table"><thead><tr><th>想了解什么</th><th>可以看哪些证据</th></tr></thead><tbody><tr><td>大家参与了吗？</td><td>报名、参与、交付与中途退出情况。</td></tr><tr><td>得到了什么反馈？</td><td>作品体验、评审理由与参与者反馈。</td></tr><tr><td>作品真的有用吗？</td><td>实际使用者、频率、质量、改进与维护投入。</td></tr><tr><td>人有哪些变化？</td><td>具体贡献、过程行为、后续岗位中的应用。</td></tr></tbody></table>`+takeaway('先选择少量有明确使用者的作品，持续跟进。')},
{chapter:'带回公司 · 开始设计',title:'带着七个问题，开始第一轮',html:`<div class="closing"><div><div class="eyebrow">回到各自公司的情况</div><h2>如果准备开展，<br>可以先讨论<span class="accent">这几个问题。</span></h2><p class="sub">结合业务需求和参与者的情况，<br>先和业务伙伴、可能的参与者讨论，再确定第一轮怎么安排。</p><button class="primary" data-canvas>填写我的大赛设计画布　↗</button><p class="note">可在浏览器填写、复制、下载或打印。</p></div><div class="panel"><div class="label">大赛设计的几个问题</div><ol><li>我们希望改变什么？</li><li>最希望谁参与？</li><li>鼓励解决什么问题，交出什么？</li><li>提供哪些支持？</li><li>谁负责什么？</li><li>怎么评价，怎么反馈？</li><li>比赛结束后，谁继续跟进？</li></ol></div></div><details><summary>案例依据与说明</summary><p>案例来自某游戏公司2025—2026年新人培养项目的总结、任务方案及实践材料。页面呈现复盘后的方法提炼，执行建议需要结合各公司条件调整。</p></details>`}
];
let index=0,goal='';
function getLocal(k){try{return localStorage.getItem(k)}catch{return null}}
function setLocal(k,v){try{localStorage.setItem(k,v);return true}catch{return false}}
function render(){const s=slides[index];$('stage').innerHTML=`<section class="slide" aria-label="${s.title}">${s.html}</section>`;$('chapter-name').textContent=s.chapter;$('page').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;$('progress').style.width=`${(index+1)/slides.length*100}%`;$('prev').disabled=index===0;$('next').disabled=index===slides.length-1;document.title=`${s.title} · HR组织AI大赛`;document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>go(index+1));document.querySelectorAll('[data-canvas]').forEach(b=>b.onclick=openCanvas);document.querySelectorAll('[data-goal]').forEach(b=>{b.classList.toggle('selected',b.dataset.goal===goal);b.setAttribute('aria-pressed',String(b.dataset.goal===goal));b.onclick=()=>{goal=b.dataset.goal;render();$('goal-response').textContent=`你优先选择了「${goal}」。接着想一想：需要给参与者哪些条件？`}});enhanceSlide();document.querySelectorAll('[data-screenshot]').forEach(b=>b.onclick=()=>{$('image-dialog').showModal()});$('stage').querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>requestAnimationFrame(fitSlide)));window.scrollTo(0,0);$('stage').querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>requestAnimationFrame(fitSlide),{once:true}));requestAnimationFrame(fitSlide)}
function go(n){index=Math.max(0,Math.min(slides.length-1,n));history.replaceState(null,'',`#${index+1}`);render()}
function fromHash(){const n=Number(location.hash.slice(1));index=Number.isInteger(n)&&n>=1&&n<=slides.length?n-1:0;render()}
$('prev').onclick=()=>go(index-1);$('next').onclick=()=>go(index+1);window.addEventListener('hashchange',fromHash);
const outline=$('outline-dialog'),canvas=$('canvas-dialog');
$('overview').onclick=()=>{$('outline-grid').innerHTML=slides.map((s,i)=>`<button class="thumb ${i===index?'active':''}" data-page="${i}"><b>${String(i+1).padStart(2,'0')} · ${s.chapter}</b>${s.title}</button>`).join('');outline.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{go(Number(b.dataset.page));outline.close()});outline.showModal()};
const fields=[['希望改变什么？','主要目标；希望看到的行为或结果。'],['希望谁参与？','参与人群、AI基础，以及最可能卡住的地方。'],['交出什么？','问题范围、作品形式、完成标准与AI参与要求。'],['提供什么支持？','可用工具、投入时间、答疑与中途反馈。'],['谁负责什么？','统筹、业务、工具支持、主管与评委。'],['怎么评价、怎么反馈？','主要标准、接受的证据、未晋级者的反馈。'],['赛后谁继续跟进？','作品负责人、试用者、回看时间与发展讨论。']];
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
document.addEventListener('keydown',e=>{if(e.defaultPrevented||outline.open||canvas.open||$('image-dialog').open||e.target.matches('input,textarea,select,button,a,[role=button]')||e.ctrlKey||e.metaKey||e.altKey)return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(index+1)}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(index-1)}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}if(e.key.toLowerCase()==='g')$('overview').click()});
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
 const stage=$('stage');
 // Keep the original content readable; interaction adds a focus and a question.
 function focusCards(selector,messages){
  const nodes=[...stage.querySelectorAll(selector)]; if(!nodes.length)return;
  const response=document.createElement('div');response.className='interaction-response';response.setAttribute('role','status');
  response.textContent='点击一项，查看可以继续讨论的问题。';(nodes[0].closest('table')||nodes[0].parentElement).after(response);
  nodes.forEach((node,i)=>{
   let target=node;
   if(node.tagName==='TR'){target=document.createElement('button');target.className='row-trigger';const cell=node.cells[0];target.innerHTML=cell.innerHTML;cell.replaceChildren(target)}
   else {target.setAttribute('role','button');target.tabIndex=0;target.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();target.click()}})}
   target.classList.add('interactive-item');target.setAttribute('aria-pressed','false');
   const activate=()=>{interactions[index]=i;nodes.forEach((n,j)=>{n.classList.toggle('is-focused',i===j);(n.tagName==='TR'?n.querySelector('button'):n).setAttribute('aria-pressed',String(i===j))});response.textContent=messages[i];response.classList.add('answered');requestAnimationFrame(fitSlide)};
   target.addEventListener('click',activate);if(interactions[index]===i)activate();
  });
 }
 if(index===0){
  [3,4,6,10,13].forEach((page,i)=>{const label=stage.querySelector('.ol'+(i+1));const button=document.createElement('button');button.className=label.className;button.textContent=label.textContent;button.title='前往'+label.textContent;button.onclick=()=>go(page);label.replaceWith(button)});
 }
 if(index===4)focusCards('.flow-item',[
  '对象：请说出一个具体的使用者，或一种希望带来的创作体验。',
  '问题：用一句话描述现在最不方便的地方。',
  '作品：明确最小交付范围，以及暂时不做什么。',
  'AI：说明AI承担的环节，以及作者自己的判断。',
  '条件：给出截止时间和一个能找到人的答疑入口。']);
 if(index===6)focusCards('tbody tr',[
  '先问参与者：你每天遇到的哪件小事，最想尝试改变？',
  '准备两三个贴近岗位的示例，再给一个能开始的小练习。',
  '先和主管确认可投入的时间，再缩小作品范围。',
  '中途看一次最小演示，帮助作者找到可以继续的下一步。']);
 if(index===7)focusCards('.time-block',[
  '这一阶段先确认：问题是谁的，伙伴是谁，各自负责什么？',
  '这一阶段先确认：最小版本能演示什么，当前卡点由谁协助？']);
 if(index===8)focusCards('tbody tr',[
  '启动前：谁拥有目标、规则与异常处理的最终协调责任？',
  '找一位愿意判断问题、并在赛后继续试用的业务伙伴。',
  '提前确认账号、使用条件、答疑人员和故障处理入口。',
  '把投入时间与业务冲突的协调方式谈清楚。',
  '提前约好评审时间，列出展示当天的设备与活动支持清单。']);
 if(index===11)focusCards('.review-node',[
  '独立判断：让每位评委先留下自己的结论，减少彼此影响。',
  '留下理由：意见不同，是材料不足、关注点不同，还是标准不清？',
  '合议讨论：记录为什么作出这个判断，并形成作者能够理解的反馈。']);
 if(index===12)focusCards('.grid2 .panel',[
  '你先关注了A。可以继续追问：希望谁来体验？怎样验证创意之外的价值？',
  '你先关注了B。可以继续追问：谁在持续使用？质量和维护投入怎么样？']);
 if(index===13)focusCards('.grid3 .panel',[
  '为作品补一张跟进卡：使用者、负责人、下一步验证与回看时间。',
  '用一次交流补充个人贡献：选题、协作、处理卡点和调整过程。',
  '选一份最值得保留的模板，记录下一轮继续使用的条件。']);
}
fromHash();
