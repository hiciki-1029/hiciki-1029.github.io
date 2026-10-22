const config={"salt":"WOW3fQIzNoiDFu1A7wBO7Q==","iv":"JUEWU0otsAoJzarK","iterations":600000,"files":["payload-000.txt","payload-001.txt","payload-002.txt","payload-003.txt","payload-004.txt","payload-005.txt","payload-006.txt","payload-007.txt","payload-008.txt","payload-009.txt","payload-010.txt","payload-011.txt","payload-012.txt","payload-013.txt","payload-014.txt","payload-015.txt","payload-016.txt","payload-017.txt","payload-018.txt","payload-019.txt","payload-020.txt","payload-021.txt","payload-022.txt","payload-023.txt","payload-024.txt","payload-025.txt","payload-026.txt","payload-027.txt","payload-028.txt","payload-029.txt","payload-030.txt","payload-031.txt","payload-032.txt","payload-033.txt","payload-034.txt","payload-035.txt","payload-036.txt","payload-037.txt","payload-038.txt"]};
const form=document.getElementById('unlock'),input=document.getElementById('password'),status=document.getElementById('status'),button=document.getElementById('submit');
const bytes=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
form.addEventListener('submit',async event=>{event.preventDefault();button.disabled=true;status.textContent='正在解锁…';
try{if(!crypto.subtle)throw new Error('当前浏览器不支持安全解锁，请使用最新版浏览器。');
const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(input.value),'PBKDF2',false,['deriveKey']);input.value='';
const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(config.salt),iterations:config.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
const chunks=await Promise.all(config.files.map(async f=>{const r=await fetch(f,{cache:'no-store'});if(!r.ok)throw new Error('内容加载失败，请稍后重试。');return r.text()}));
let plain;try{plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(config.iv)},key,bytes(chunks.join('')))}catch{throw new Error('密码不正确，请重新输入。')}
const data=JSON.parse(await new Response(new Blob([plain]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
const assetUrls={};for(const [name,asset] of Object.entries(data.assets)){assetUrls[name]=URL.createObjectURL(new Blob([bytes(asset.data)],{type:asset.type}));}
let html=data.html,js=data.js;
for(const [name,url] of Object.entries(assetUrls)){html=html.replaceAll('assets/'+name,url);js=js.replaceAll('assets/'+name,url)}
js=js.replace("assets/${d[4]==='overview'?'contest-overview.png':d[4]==='works'?'works-square.jpg':'initial-review.jpg'}","${encryptedAssetUrls[d[4]==='overview'?'contest-overview.png':d[4]==='works'?'works-square.jpg':'initial-review.jpg']}");
js='const encryptedAssetUrls='+JSON.stringify(assetUrls)+';\n'+js;
html=html.replace(/<link[^>]+href="style\.css[^"]*"[^>]*>/,'<style>'+data.css+'</style>');
html=html.replace(/<script src="app\.js[^"]*"><\/script>/,()=>'<script>'+js.replace(/<\/script/gi,'<\\/script')+'<'+ '/script>');
html=html.replace('</head>','<meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="no-referrer"></head>');
html=html.replace('</body>','<script>const lockButton=document.createElement("button");lockButton.className="quiet";lockButton.textContent="锁定";lockButton.onclick=()=>location.reload();document.querySelector(".top-actions").append(lockButton);<'+ '/script></body>');
document.open();document.write(html);document.close();
}catch(error){status.textContent=error.message||'解锁失败，请重试。';button.disabled=false;input.focus()}});
