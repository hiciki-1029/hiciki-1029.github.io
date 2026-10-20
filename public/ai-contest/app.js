const $=id=>document.getElementById(id);
const head=(n,eyebrow,title,sub='')=>`<div class="section-head"><div><div class="eyebrow">${eyebrow}</div><h2>${title}</h2>${sub?`<p class="sub">${sub}</p>`:''}</div><span class="big-number" aria-hidden="true">${n}</span></div>`;
const takeaway=text=>`<div class="takeaway"><span class="tag">带走一个问题</span><span>${text}</span></div>`;
const slides=[
{chapter:'开场',title:'从“想办一场”到“真正办起来”',html:`<div class="hero"><div><div class="eyebrow">A FIELD GUIDE FOR HR · 2025—2026</div><h1><span>从“想办一场”</span><span>到<span class="accent" style="display:inline">“真正办起来”</span></span></h1><p class="sub">HR 组织 AI 大赛的关键选择</p><div class="hero-bottom"><button class="primary" data-next>开始这场分享　→</button><div class="author">龚文熙 · 熙熙<br>心动｜组织与人才发展</div></div></div><div class="hero-art" aria-label="五个相互关联的选择：目的、任务、支持、评审、延续"><div class="orbit"></div><div class="orb-center">关键选择<small>LEARN BY DOING</small></div><span class="orbit-label ol1">01　为什么办</span><span class="orbit-label ol2">02　交出什么</span><span class="orbit-label ol3">03　如何支持</span><span class="orbit-label ol4">04　怎样评价</span><span class="orbit-label ol5">05　如何延续</span></div></div>`},
{chapter:'分享的起点',title:'听完以后，能开始做什么',html:head('↗','WHAT YOU CAN TAKE AWAY','带回公司的，<br>是一份可以开始讨论的方案。')+`<div class="grid3"><div class="panel"><div class="num">01</div><h3>能判断</h3><p>我们现在适合办吗？<br>希望谁发生什么变化？</p></div><div class="panel"><div class="num">02</div><h3>能设计</h3><p>任务怎么定，规则怎么写？<br>需要谁、工具和多少时间？</p></div><div class="panel green"><div class="num">03</div><h3>能延续</h3><p>比赛结束以后，<br>谁接住作品、人和方法？</p></div></div>`+takeaway('如果明天要办，你最希望比赛帮助解决什么问题？')},
{chapter:'两年的实践',title:'同样是AI实践，两年的任务不同',html:head('↔','TWO YEARS, DIFFERENT CHOICES','同样办比赛，任务会跟着需求变化。')+`<div class="grid2"><div class="panel"><div class="label">2025 / 共同任务</div><h3>用 AI 做小游戏，<br>发布到 TapTap。</h3><p>在策划、开发、美术与运营等角色的协作中，理解业务生态，获得真实玩家反馈。</p><div class="statline" style="border-color:var(--line)"><div><b>6</b><small>款小游戏</small></div><div><b>3</b><small>款进入游戏新人榜</small></div><div><b>7.1万+</b><small>累计游玩量*</small></div></div></div><div class="panel green"><div class="label">2026 / 自主找问题</div><h3>围绕工作与创意，<br>交出可演示的作品。</h3><p>为不同岗位提供入口，让新人把想法做出来，在交流和反馈中被了解。</p><div class="statline"><div><b>32</b><small>位新人</small></div><div><b>24</b><small>件作品</small></div><div><b>21</b><small>天创作期</small></div></div></div></div><p class="note">* 2025年游玩量为截至当年10月的累计记录，不是去重玩家人数。21天指创作期，完整项目另含评审和路演。</p>`},
{chapter:'选择一 · 为什么办',title:'如果只能留下一个结果',html:head('01','START WITH THE PURPOSE','如果只能留下一个结果，<br>你最想要哪一个？','点击一个方向，想想本公司的优先目标。')+`<div class="grid3"><button class="choice" data-goal="普及体验" aria-pressed="false"><div class="num">A</div><h3>更多人开始用</h3><p>普及体验<br>关注起步门槛、工具与基础支持。</p></button><button class="choice" data-goal="业务应用" aria-pressed="false"><div class="num">B</div><h3>几个问题被解决</h3><p>业务应用<br>关注使用者、试用条件与效果验证。</p></button><button class="choice" data-goal="人才发展与连接" aria-pressed="false"><div class="num">C</div><h3>更多人在实践中成长</h3><p>人才发展与连接<br>关注协作、过程与具体反馈。</p></button></div><div class="question" id="goal-response">可以兼顾，但先排顺序。不同目标，需要不同的支持与评价。</div>`},
{chapter:'选择二 · 交出什么',title:'把目的翻译成具体任务',html:head('02','MAKE THE TASK CONCRETE','“积极探索 AI”之后，<br>员工还需要知道什么？')+`<div class="flow"><div class="flow-item"><div class="step">01 / 对象</div><h3>为谁解决</h3><p>明确一个使用者，或一种创作体验。</p></div><div class="flow-item"><div class="step">02 / 问题</div><h3>解决什么</h3><p>从工作里的具体不便，或自己的创作意图出发。</p></div><div class="flow-item"><div class="step">03 / 作品</div><h3>最后交什么</h3><p>能打开、能演示、能体验，说明当前限制。</p></div><div class="flow-item"><div class="step">04 / AI</div><h3>AI 参与什么</h3><p>呈现AI的作用，也说明作者自己的选择。</p></div><div class="flow-item"><div class="step">05 / 条件</div><h3>何时交、找谁问</h3><p>有时间安排，也有能找到人的支持入口。</p></div></div>`+takeaway('把任务写成五句话，参与者能否据此开始行动？')},
{chapter:'选择二 · 真实案例',title:'让不同岗位找到参与入口',html:head('02','FROM EVERYDAY WORK','值得做的作品，<br>可以从日常的小问题开始。')+`<div class="grid2"><div class="panel"><span class="case-label">需求整理 / 跨业务协作</span><h3 class="case-title">TooManyTasks</h3><p>需求散落在私聊、群聊和文档里，容易跟丢。</p><div class="case-divider"></div><div class="case-row"><b>尝试</b>整理需求背景和时间节点，形成集中入口。</div><div class="case-row"><b>已知</b>完成工具演示，获得公司内部关注。</div><div class="case-row"><b>继续问</b>谁持续在用？实际改变了什么？</div></div><div class="panel"><span class="case-label">日语本地化 / 非技术岗位</span><h3 class="case-title">KOTONOHA 小言</h3><p>把术语、语料与经验，整理成可调用的工作支持。</p><div class="case-divider"></div><div class="case-row"><b>尝试</b>通过自然语言与大模型协作，制作群内机器人。</div><div class="case-row"><b>已知</b>在真实业务群试用，得到同事正反馈。</div><div class="case-row"><b>继续问</b>质量如何？哪些情况仍需人工判断？</div></div></div>`},
{chapter:'选择三 · 如何支持',title:'参与者的四句话',html:head('03','SUPPORT THE PEOPLE','让员工愿意来，<br>也有条件做下去。')+`<table class="resource-table"><thead><tr><th>员工心里的话</th><th>组织者需要准备什么</th></tr></thead><tbody><tr><td>“这跟我有什么关系？”</td><td>从真实问题和兴趣切入，把参与收益讲具体。</td></tr><tr><td>“我不知道做什么。”</td><td>提供场景示例、工具入口和必要的基础练习。</td></tr><tr><td>“我有想法，但没时间。”</td><td>与主管、参与者确认时间，缩小交付范围。</td></tr><tr><td>“我做了一半，卡住了。”</td><td>安排答疑与中途反馈，帮助找到下一步。</td></tr></tbody></table>`+takeaway('你们的参与者，最可能卡在哪一句？')},
{chapter:'选择三 · 节奏',title:'创作需要节奏，非脱产也需要时间',html:head('03','DESIGN THE RHYTHM','非脱产，仍然需要明确时间。','以下创作节奏来自2026年实践；评审、体验和路演另行安排。')+`<div class="timeline"><div class="time-block"><div class="label">第一周</div><b>01</b><h3>找问题 · 找伙伴</h3><p>寻找痛点，自主组队。<br>确认做什么，以及如何分工。</p></div><div class="time-block" style="background:#e7ecdd"><div class="label">接下来两周</div><b>02—03</b><h3>把想法做成可演示作品</h3><p>控制范围，推进交付。<br>建议中途看一次最小演示，及时处理卡点。</p></div></div><div class="question">启动前谈清：可投入多少时间？主管是否知情？业务冲突怎样处理？</div>`},
{chapter:'选择三 · 资源',title:'一个人统筹，需要哪些支持',html:head('03','THE RESOURCE MAP','一个人可以统筹，<br>项目需要多种角色投入。')+`<table class="resource-table"><tbody><tr><td>统筹者</td><td>目标、规则、节奏、关键判断和异常处理。</td></tr><tr><td>业务伙伴与试用者</td><td>判断问题，提供反馈，承接赛后试用。</td></tr><tr><td>工具与技术支持</td><td>账号、使用条件、答疑入口和故障支持。</td></tr><tr><td>主管与参与者</td><td>投入时间、角色分工与业务冲突协调。</td></tr><tr><td>评委与活动支持</td><td>评价材料、场地、物料、设备与展示安排。</td></tr></tbody></table><p class="note">本案例由TD单人统筹，跨团队同事与业务评委共同支持。预算还应考虑创作、协调、评审与维护的时间投入。</p>`},
{chapter:'选择三 · 信息与工具',title:'先把信息接起来',html:head('03','TOOLS SERVE THE FLOW','先把信息接起来，<br>再决定需要什么平台。')+`<div class="review-line"><div class="review-node"><strong>参与者</strong><p>看规则 → 报名组队<br>交作品 → 收反馈</p></div><span class="arrow">→</span><div class="review-node"><strong>组织者</strong><p>看进度 → 处理卡点<br>整理材料 → 组织展示</p></div><span class="arrow">→</span><div class="review-node"><strong>评委与业务</strong><p>体验作品 → 留下理由<br>讨论判断 → 对接试用</p></div></div><div class="grid2"><div class="panel"><div class="label">2025</div><h3>多维表格与节点提醒</h3><p>关联学员档案、任务进度和反馈。</p></div><div class="panel"><div class="label">2026</div><h3>赛事入口与 AI 助手</h3><p>衔接报名、提交、展示与评审；助手参与答疑、通知与查询。</p></div></div><p class="note">小规模第一轮，可以从一页说明与几张关联表开始。工具选择结合本公司的既有条件。</p>`},
{chapter:'选择四 · 怎样评价',title:'未进决赛的人，还能得到什么',html:head('04','PARTICIPATION & SELECTION','没有进入决赛的人，<br>还能得到什么？')+`<div class="grid2"><div class="panel"><div class="label">更广泛的交流</div><h3>作品广场 · 试玩交流</h3><p>让作品被体验，让作者解释自己的选择，听到具体反馈，也看到其他人的做法。</p><div class="case-divider"></div><span class="micro">让投入有回应</span></div><div class="panel green"><div class="label">更集中的讨论</div><h3>7 件作品 · 精品路演</h3><p>高管与业务负责人到场，为部分作品提供集中展示和深入交流的机会。</p><div class="case-divider" style="background:#ffffff26"></div><span class="micro" style="color:#c8d5c4">让好的尝试继续被了解</span></div></div>`+takeaway('为未晋级者准备体验、评价理由和改进机会。')},
{chapter:'选择四 · 评审机制',title:'先独立判断，再讨论理由',html:head('04','MAKE REASONS VISIBLE','一个分数之外，<br>还需要留下判断的理由。')+`<div class="review-line"><div class="review-node"><strong>独立判断</strong><p>5位初筛评委<br>通过 / 待定 / 淘汰<br>意见在评审期间互不可见</p></div><span class="arrow">→</span><div class="review-node"><strong>留下理由</strong><p>每件作品说明依据<br>区分信息不足、理解差异<br>与标准本身的问题</p></div><span class="arrow">→</span><div class="review-node"><strong>合议讨论</strong><p>把不同视角放在一起<br>对齐判断，记录结论<br>向参赛者提供反馈</p></div></div><div class="question">作品目的不同，需要的评委与证据也不同。提效作品，要听使用者怎么说。</div>`},
{chapter:'选择四 · 现场讨论',title:'你会先追问什么',html:head('?','LET’S DISCUSS','两个作品，你会先追问什么？')+`<div class="grid2"><div class="panel"><div class="label">作品 A</div><h3>演示很惊艳</h3><p>创意突出，效果吸引人。<br>还没有真实使用者反馈。</p></div><div class="panel"><div class="label">作品 B</div><h3>看起来很朴素</h3><p>解决每天发生的小麻烦。<br>已有同事持续使用。</p></div></div><div class="wide-quote serif">先回到目标，<span class="accent">再看证据。</span></div><div class="micro">问题与对象　/　AI参与　/　完成度　/　价值与反馈　/　后续条件</div>`},
{chapter:'选择五 · 如何延续',title:'奖颁完了，谁来接住',html:head('05','AFTER THE AWARDS','奖颁完了，谁来接住？')+`<div class="grid3"><div class="panel"><div class="num">作品</div><h3>从演示走向使用</h3><p>谁愿意用？谁负责？<br>下一步验证什么？<br>什么时候回看？</p></div><div class="panel"><div class="num">人</div><h3>从作品继续了解作者</h3><p>为什么选这个问题？<br>卡住后怎样推进？<br>收到反馈后改了什么？</p></div><div class="panel green"><div class="num">方法</div><h3>让下一轮少做重复工作</h3><p>任务与提交模板<br>评审理由与常见卡点<br>使用记录与调整依据</p></div></div><p class="note">作品名次是继续了解人的线索。长期能力与工作表现，需要结合更多过程记录和后续观察。</p>`},
{chapter:'选择五 · 看什么证据',title:'不同结果，要用不同证据回答',html:head('05','LOOK FOR THE RIGHT EVIDENCE','参与、交付和持续使用，<br>回答的是不同问题。')+`<table class="resource-table"><thead><tr><th>想了解什么</th><th>可以看哪些证据</th></tr></thead><tbody><tr><td>大家参与了吗？</td><td>报名、参与、交付与中途退出情况。</td></tr><tr><td>得到了什么反馈？</td><td>作品体验、评审理由与参与者反馈。</td></tr><tr><td>作品真的有用吗？</td><td>实际使用者、频率、质量、改进与维护投入。</td></tr><tr><td>人有哪些变化？</td><td>具体贡献、过程行为、后续岗位中的应用。</td></tr></tbody></table>`+takeaway('先选择少量有明确使用者的作品，持续跟进。')},
{chapter:'带回公司 · 开始设计',title:'带着七个问题，开始第一轮',html:`<div class="closing"><div><div class="eyebrow">YOUR NEXT STEP</div><h2>带着七个问题，<br>开始你们的<span class="accent">第一轮。</span></h2><p class="sub">先找到一个业务伙伴和几位可能的参与者，<br>把想尝试的事情谈具体。</p><button class="primary" data-canvas>填写我的大赛设计画布　↗</button><p class="note">可在浏览器填写、复制、下载或打印。</p></div><div class="panel"><div class="label">THE SEVEN QUESTIONS</div><ol><li>我们希望改变什么？</li><li>最希望谁参与？</li><li>鼓励解决什么问题，交出什么？</li><li>提供哪些支持？</li><li>谁负责什么？</li><li>怎么评价，怎么反馈？</li><li>比赛结束后，谁继续跟进？</li></ol></div></div><details><summary>案例依据与说明</summary><p>案例来自心动SSR 2025年总结、任务方案及2026年培养实践材料。页面呈现复盘后的方法提炼，执行建议需要结合各公司条件调整。</p></details>`}
];
let index=0,goal='';
function getLocal(k){try{return localStorage.getItem(k)}catch{return null}}
function setLocal(k,v){try{localStorage.setItem(k,v);return true}catch{return false}}
function render(){const s=slides[index];$('stage').innerHTML=`<section class="slide" aria-label="${s.title}">${s.html}</section>`;$('chapter-name').textContent=s.chapter;$('page').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;$('progress').style.width=`${(index+1)/slides.length*100}%`;$('prev').disabled=index===0;$('next').disabled=index===slides.length-1;document.title=`${s.title} · HR组织AI大赛`;document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>go(index+1));document.querySelectorAll('[data-canvas]').forEach(b=>b.onclick=openCanvas);document.querySelectorAll('[data-goal]').forEach(b=>{b.classList.toggle('selected',b.dataset.goal===goal);b.setAttribute('aria-pressed',String(b.dataset.goal===goal));b.onclick=()=>{goal=b.dataset.goal;render();$('goal-response').textContent=`你优先选择了「${goal}」。接着想一想：需要给参与者哪些条件？`}});enhanceSlide();window.scrollTo(0,0)}
function go(n){index=Math.max(0,Math.min(slides.length-1,n));history.replaceState(null,'',`#${index+1}`);render()}
function fromHash(){const n=Number(location.hash.slice(1));index=Number.isInteger(n)&&n>=1&&n<=slides.length?n-1:0;render()}
$('prev').onclick=()=>go(index-1);$('next').onclick=()=>go(index+1);window.addEventListener('hashchange',fromHash);
const outline=$('outline-dialog'),canvas=$('canvas-dialog');
$('overview').onclick=()=>{$('outline-grid').innerHTML=slides.map((s,i)=>`<button class="thumb ${i===index?'active':''}" data-page="${i}"><b>${String(i+1).padStart(2,'0')} · ${s.chapter}</b>${s.title}</button>`).join('');outline.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{go(Number(b.dataset.page));outline.close()});outline.showModal()};
const fields=[['希望改变什么？','主要目标；希望看到的行为或结果。'],['希望谁参与？','参与人群、AI基础，以及最可能卡住的地方。'],['交出什么？','问题范围、作品形式、完成标准与AI参与要求。'],['提供什么支持？','可用工具、投入时间、答疑与中途反馈。'],['谁负责什么？','统筹、业务、工具支持、主管与评委。'],['怎么评价、怎么反馈？','主要标准、接受的证据、未晋级者的反馈。'],['赛后谁接住？','作品负责人、试用者、回看时间与发展讨论。']];
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
document.addEventListener('keydown',e=>{if(outline.open||canvas.open||e.target.matches('input,textarea,select')||e.ctrlKey||e.metaKey||e.altKey)return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(index+1)}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(index-1)}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}if(e.key.toLowerCase()==='g')$('overview').click()});
const interactions={};
function enhanceSlide(){
 const stage=$('stage');
 // Keep the original content readable; interaction adds a focus and a question.
 function focusCards(selector,messages){
  const nodes=[...stage.querySelectorAll(selector)]; if(!nodes.length)return;
  const response=document.createElement('div');response.className='interaction-response';response.setAttribute('role','status');
  response.textContent='点击一项，把问题谈具体。';(nodes[0].closest('table')||nodes[0].parentElement).after(response);
  nodes.forEach((node,i)=>{
   let target=node;
   if(node.tagName==='TR'){target=document.createElement('button');target.className='row-trigger';const cell=node.cells[0];target.innerHTML=cell.innerHTML;cell.replaceChildren(target)}
   else {target.setAttribute('role','button');target.tabIndex=0;target.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();target.click()}})}
   target.classList.add('interactive-item');target.setAttribute('aria-pressed','false');
   const activate=()=>{interactions[index]=i;nodes.forEach((n,j)=>{n.classList.toggle('is-focused',i===j);(n.tagName==='TR'?n.querySelector('button'):n).setAttribute('aria-pressed',String(i===j))});response.textContent=messages[i];response.classList.add('answered')};
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
