/* ===== ALL YOUR CONTENT IS HERE - swap links/text easily ===== */
/* replace picsum links with your own, e.g. 'images/video1.jpg' */
const P=(k,n)=>n.map((t,i)=>({t,img:`https://picsum.photos/seed/${k}${i}/440/950`}));
const VID='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'; // replace with your own videos/xxx.mp4
const M=(k,n,v)=>n.map((t,i)=>({t,img:`https://picsum.photos/seed/${k}m${i}/640/400`,v:v?VID:''}));
const DATA = {
  services: [ // each door: c = glow colour, pts = list inside the door, btn = button text, items = phone images, more = extra videos/images
    {n:'Videography', c:'#f0b44a', btn:'More videos', pts:['Wedding & event films','Reels and promo videos','Colour grading','Premiere Pro editing'],
     items:P('vid',['Wedding Film','Event Highlights','Promo Reel','Brand Story','Behind the Scenes','Short Film']),
     more:M('vid',['Wedding Film','Event Highlights','Promo Reel','Brand Story','Behind the Scenes','Short Film','Birthday Reel','Product Ad','Travel Vlog'],true)},
    {n:'Digital Marketing Creatives', c:'#3aa0ff', btn:'More creatives', pts:['Instagram page handling','Post & story designs','Campaign creatives','Website marketing'],
     items:P('dm',['Instagram Feed','Story Series','Ad Creative','Festival Post','Product Launch','Carousel']),
     more:M('dm',['Instagram Feed','Story Series','Ad Creative','Festival Post','Product Launch','Carousel','Offer Banner','Reel Cover','Web Banner'])},
    {n:'Photography', c:'#22c55e', btn:'More photos', pts:['Portraits & weddings','Event albums','Product shoots','Lightroom retouching'],
     items:P('ph',['Portrait','Bridal','Event Album','Product','Street','Candid']),
     more:M('ph',['Portrait','Bridal','Event Album','Product','Street','Candid','Family','Fashion','Nature'])},
    {n:'Branding & Identity', c:'#ef4444', btn:'More brands', pts:['Logo design','Colour & typography','Brand kits','Print materials'],
     items:P('br',['Logo Suite','Brand Kit','Business Card','Packaging','Poster','Social Kit']),
     more:M('br',['Logo Suite','Brand Kit','Business Card','Packaging','Poster','Social Kit','Flyer','Letterhead','Menu'])}],
  experience: [
    {t:'Photography & Video', d:'Events, weddings, portraits and promotional films.'},
    {t:'Social Media Management', d:'Instagram page handling, content publishing and growth.'},
    {t:'Digital Marketing', d:'Campaign creatives and website marketing for businesses.'}],
  tools: [ // k = logo letters, c = logo colour, lv = skill %
    {k:'Ps',n:'Photoshop',c:'#31a8ff',lv:90,d:'Photo retouching, composites, posters and social media designs.'},
    {k:'Lr',n:'Lightroom',c:'#74b9ff',lv:92,d:'Colour grading and batch editing for weddings and event albums.'},
    {k:'Pr',n:'Premiere Pro',c:'#9999ff',lv:88,d:'Cutting films, reels and promo videos with clean pacing and sound.'},
    {k:'Ae',n:'After Effects',c:'#d291ff',lv:70,d:'Motion graphics, titles and simple animations for videos.'},
    {k:'Ai',n:'Illustrator',c:'#ff9a00',lv:80,d:'Logos, icons and brand identity artwork.'},
    {k:'Cv',n:'Canva',c:'#00c4cc',lv:95,d:'Fast, polished social media posts and marketing creatives.'}],
  journey: [ // SAMPLE years - edit to your real story. c = light colour for that stage
    {y:'2019',tag:'2019 - 2022',t:'B.Com Degree',d:'Bachelor of Commerce - the business foundation behind my creative work.',c:'#f0b44a'},
    {y:'2022',tag:'2022',t:'Photography & Photo Editing',d:'Started shooting events and editing in Lightroom and Photoshop.',c:'#e8863a'},
    {y:'2023',tag:'2023',t:'Video Editing & Reels',d:'Premiere Pro edits, event films and Instagram reels.',c:'#58a6ff'},
    {y:'2025',tag:'2025',t:'Social Media & Digital Marketing',d:'Managing Instagram pages and campaign creatives for businesses.',c:'#22c55e'},
    {y:'2026',tag:'2026 - Now',t:'Independent Creative',d:'Freelance visual designer, photographer and video editor.',c:'#f0b44a'}],
  testimonials: [
    {n:'Client Name', d:'"Creative, quick and professional. Our event album looked stunning."'},
    {n:'Business Owner', d:'"Our Instagram engagement grew after his content designs."'},
    {n:'Happy Customer', d:'"Loved the photos. Highly recommended!"'}],
  social: [{n:'Instagram', u:'https://instagram.com/'},{n:'LinkedIn', u:'https://linkedin.com/'},{n:'WhatsApp', u:'https://wa.me/'}]
};
const $ = s => document.querySelector(s), card = (t,d) => `<div class="card rv"><h3>${t}</h3><p>${d}</p></div>`;

/* render sections from DATA */
$('#doors').innerHTML = DATA.services.map(s=>`<div class="door rv" style="--c:${s.c}"><div class="arch"><div class="glow"></div><div class="inner"><h4>${s.n}</h4><ul>${s.pts.map(p=>`<li>${p}</li>`).join('')}</ul><a class="btn sm" href="#more">${s.btn} &rarr;</a></div><div class="leaf"></div></div>${s.n}</div>`).join('');
$('#doors').onclick = e => { const d=e.target.closest('.door'); if(!d) return; const i=[...d.parentNode.children].indexOf(d); if(e.target.closest('.btn')) showMore(i); else openDoor(i); };
$('#exp').innerHTML = DATA.experience.map(e=>card(e.t,e.d)).join('');
$('#testi').innerHTML = DATA.testimonials.map(t=>card(t.n,t.d)).join('');
$('#fsocial').innerHTML = $('#social').innerHTML = DATA.social.map(s=>`<a href="${s.u}" target="_blank">${s.n}</a>`).join('');

/* scroll reveal + doors open one by one */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; e.target.classList.add('in');
  if (e.target.classList.contains('door') && !e.target.previousElementSibling) setTimeout(()=>openDoor(0),700);
  io.unobserve(e.target);
}), {threshold:.25});
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* preloader: spin, camera flash, reveal */
setTimeout(()=>$('#pre').classList.add('go'), 2200);
setTimeout(()=>{ $('#pre').classList.add('out'); document.body.classList.add('ready'); }, 3000);
setTimeout(()=>$('#pre').remove(), 4000);

/* lamp: pull the cord to switch light / dark */
$('#lamp').onclick = () => { $('#lamp').classList.add('pull'); setTimeout(()=>$('#lamp').classList.remove('pull'),300); toggleTheme(); };
setTimeout(()=>{ if(scrollY<50) $('#lamp').click(); }, 6500); // auto-pull once, like the video

/* ===== MOTION CURSOR PACK (desktop only) ===== */
if (matchMedia('(hover:hover)').matches) {
  document.body.insertAdjacentHTML('beforeend','<div id="spot"></div><div id="ring"></div><div id="dot"></div>');
  const ring=$('#ring'), dot=$('#dot'), spot=$('#spot');
  let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my, px=mx, py=my, sx=mx, sy=my, lx=mx, ly=my, show=false, t=0;

  /* split hero name into letters that wave when the cursor is near */
  const h1=$('.hero h1'); h1.innerHTML=[...h1.textContent].map(c=>`<span>${c===' '?'&nbsp;':c}</span>`).join('');
  const letters=[...h1.children], magnets=[...document.querySelectorAll('nav a,.logo,button,.social a,.tools span,#lamp')];

  addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px)`;
    /* sparkle trail */
    if (Math.hypot(mx-lx,my-ly)>28) { lx=mx; ly=my;
      const s=document.createElement('span'); s.className='sp'; s.textContent='✦';
      s.style.cssText=`left:${mx}px;top:${my}px;color:${['var(--gold)','#f0b44a','#e9a5a5','#3aa0ff','#22c55e'][Math.random()*5|0]};--x:${(Math.random()-.5)*70}px;--y:${20+Math.random()*50}px`;
      document.body.appendChild(s); setTimeout(()=>s.remove(),1000); }
    /* letters wave */
    letters.forEach(l=>{ const r=l.getBoundingClientRect(), d=Math.hypot(mx-(r.left+r.width/2),my-(r.top+r.height/2)), k=Math.max(0,1-d/160);
      l.style.transform=`translateY(${-k*22}px) scale(${1+k*.3})`; l.style.color=k>.35?'var(--gold)':''; });
    /* magnetic pull */
    magnets.forEach(m=>{ const r=m.getBoundingClientRect(), dx=mx-(r.left+r.width/2), dy=my-(r.top+r.height/2);
      m.style.translate=Math.hypot(dx,dy)<90?`${dx*.35}px ${dy*.35}px`:'0 0'; m.style.transition='translate .25s'; });
    /* hero parallax */
    const ax=(mx/innerWidth-.5), ay=(my/innerHeight-.5);
    $('.me').style.translate=`${ax*-30}px ${ay*-16}px`; $('.role').style.translate=`${ax*14}px ${ay*8}px`;
    ring.classList.toggle('big', !!e.target.closest('a,button,#lamp,.tools span'));
  });
  addEventListener('click', e => { const r=document.createElement('i'); r.className='rip'; r.style.left=e.clientX+'px'; r.style.top=e.clientY+'px'; document.body.appendChild(r); setTimeout(()=>r.remove(),800); });


  /* main loop: ring, spotlight and phone all follow with different "weights" */
  (function loop(){
    t+=.04; rx+=(mx-rx)*.15; ry+=(my-ry)*.15; sx+=(mx-sx)*.06; sy+=(my-sy)*.06;
    const vx=mx-px, vy=my-py; px+=vx*.1; py+=vy*.1;
    ring.style.transform=`translate(${rx}px,${ry}px)`; spot.style.transform=`translate(${sx}px,${sy}px)`;
    const c=(v,m)=>Math.max(-m,Math.min(m,v));
    requestAnimationFrame(loop);
  })();
}

/* ===== DOORS -> PHONE SHOWCASE ===== */
let cur=0, cards=[];
function openDoor(i,quiet){
  cur=i; const s=DATA.services[i];
  if(!quiet){ document.querySelectorAll('.door').forEach((d,k)=>d.classList.toggle('open',k===i)); $('#doors').classList.add('has'); }
  $('#works').style.setProperty('--door',s.c); $('#cat').textContent=s.n;
  $('#track').innerHTML=s.items.map(w=>`<div class="ph"><img src="${w.img}" alt="${w.t}"></div>`).join(''); cards=[...$('#track').children];
}
openDoor(0,true);
let sp=0, tx=0, ty=0, fx=0, fy=0;
addEventListener('mousemove',e=>{ tx=e.clientX/innerWidth-.5; ty=e.clientY/innerHeight-.5; });
(function showLoop(){
  const sec=$('#works'), r=sec.getBoundingClientRect(), p=Math.max(0,Math.min(1,-r.top/(sec.offsetHeight-innerHeight)));
  sp+=(p-sp)*.1; fx+=(tx-fx)*.08; fy+=(ty-fy)*.08;
  const n=cards.length;
  if(n && r.bottom>0 && r.top<innerHeight){
    const cw=cards[0].offsetWidth, step=cw*1.3, vw=innerWidth, off=vw/2-cw/2-sp*(n-1)*step;
    cards.forEach((c,k)=>{ const mid=off+k*step+cw/2, f=1-Math.min(1,Math.abs(mid-vw/2)/step);
      c.style.transform=`translateX(${off+k*step}px) rotateY(${(vw/2-mid)/vw*30}deg) scale(${.8+.38*f})`; c.style.opacity=.4+.6*f; c.style.zIndex=Math.round(f*10); });
    const idx=Math.round(sp*(n-1)); $('#cap').textContent=DATA.services[cur].items[idx].t;
    $('#cnt').textContent=String(idx+1).padStart(2,'0')+' / '+String(n).padStart(2,'0'); $('#bar').style.width=(sp*100)+'%';
    $('#frame').style.transform=`translate(-50%,-50%) perspective(900px) rotateY(${fx*16}deg) rotateX(${-fy*12}deg) translate(${fx*22}px,${fy*14}px)`;
  }
  requestAnimationFrame(showLoop);
})();

/* ===== MORE WORKS (door button) + LIGHTBOX ===== */
let mcur=0;
$('#mtabs').innerHTML=DATA.services.map(s=>`<button>${s.n}</button>`).join('');
$('#mtabs').onclick=e=>{ const b=e.target.closest('button'); if(b) showMore([...b.parentNode.children].indexOf(b)); };
function showMore(i){ mcur=i; const s=DATA.services[i]; $('#mcat').textContent=s.n;
  document.querySelectorAll('#mtabs button').forEach((b,k)=>b.classList.toggle('on',k===i));
  $('#mgrid').innerHTML=s.more.map((m,k)=>`<figure class="mc" data-k="${k}"><img src="${m.img}" alt=""><span class="play">${m.v?'&#9654;':'&#10530;'}</span><figcaption>${m.t}</figcaption></figure>`).join(''); }
$('#mgrid').onclick=e=>{ const f=e.target.closest('.mc'); if(!f) return; const m=DATA.services[mcur].more[f.dataset.k];
  $('#lbc').innerHTML=m.v?`<video src="${m.v}" controls autoplay></video>`:`<img src="${m.img}" alt="">`; $('#lb').classList.add('on'); };
function closeLb(){ $('#lb').classList.remove('on'); $('#lbc').innerHTML=''; }
$('#lb').onclick=e=>{ if(e.target.id==='lb'||e.target.id==='lbx') closeLb(); }; addEventListener('keydown',e=>{ if(e.key==='Escape') closeLb(); });
showMore(0);

/* ===== TOOLS: click a logo -> logo slides left, content slides in from right ===== */
$('#tools').innerHTML=`<div class="tgrid">${DATA.tools.map((t,i)=>`<div class="tile" data-i="${i}" style="--tc:${t.c}" title="${t.n}">${t.k}</div>`).join('')}</div><div class="tdetail" id="tdet"></div>`;
$('#tools').onclick=e=>{ const t=e.target.closest('.tile'); if(!t){ if(e.target.closest('.tback')){ $('#tools').classList.remove('open'); document.querySelectorAll('.tile').forEach(x=>x.classList.remove('on')); } return; }
  const d=DATA.tools[t.dataset.i]; $('#tools').classList.add('open');
  document.querySelectorAll('.tile').forEach(x=>x.classList.toggle('on',x===t));
  $('#tdet').innerHTML=`<div class="tbig" style="--tc:${d.c}">${d.k}</div><div class="tinfo" style="--tc:${d.c}"><h3>${d.n}</h3><p>${d.d}</p><div class="lv"><u></u></div><small>Skill level ${d.lv}%</small><br><button class="tback">&larr; All tools</button></div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ $('#tdet .lv u').style.width=d.lv+'%'; })); };

/* ===== CREATIVE JOURNEY: scroll moves the timeline, light follows ===== */
$('#journey').innerHTML=DATA.journey.map(j=>`<div class="jitem"><small>${j.tag}</small><h3>${j.t}</h3><p>${j.d}</p></div>`).join('');
$('#dust').innerHTML=Array.from({length:34},()=>`<i style="left:${Math.random()*100}%;top:${30+Math.random()*70}%;animation-delay:${-Math.random()*8}s;animation-duration:${6+Math.random()*6}s"></i>`).join('');
let jp=0, jidx=-1;
(function jLoop(){
  const sec=$('#jsec'), r=sec.getBoundingClientRect();
  document.body.classList.toggle('injr', r.top<50 && r.bottom>50);
  if(r.bottom>0 && r.top<innerHeight){
    const p=Math.max(0,Math.min(1,-r.top/(sec.offsetHeight-innerHeight))), items=[...$('#journey').children], n=items.length, ih=innerHeight*.36;
    jp+=(p-jp)*.08; const pos=jp*(n-1);
    $('#journey').style.transform=`translateY(${innerHeight/2-(pos+.5)*ih}px)`;
    items.forEach((it,k)=>{ const f=1-Math.min(1,Math.abs(k-pos)); it.style.opacity=.2+.8*f; it.style.transform=`translateX(${(1-f)*30}px) scale(${.92+.08*f})`; it.classList.toggle('act',f>.6); });
    const idx=Math.round(pos), j=DATA.journey[idx];
    if(idx!==jidx){ jidx=idx; const y=$('#yr'); y.textContent=j.y; y.classList.remove('roll'); void y.offsetWidth; y.classList.add('roll');
      $('.jstick').style.setProperty('--jl',j.c); $('#jc').textContent=String(idx+1).padStart(2,'0')+' / '+String(n).padStart(2,'0'); }
    $('#jf').style.height=jp*100+'%'; $('.jglow').style.setProperty('--gx',(28+Math.sin(jp*7)*12)+'%'); $('.jglow').style.setProperty('--gy',(18+jp*64)+'%');
  }
  requestAnimationFrame(jLoop);
})();

/* ===== THEME / COLOUR / FONT OPTIONS (saved in the browser) ===== */
const ACC=['#b8975f','#3aa0ff','#22c55e','#ef4444','#a855f7','#ec4899','#f97316'];
const BGS={Light:'',Charcoal:'dark',Navy:'dark navy',Black:'dark black'};
const FONTS={Classic:['Cormorant Garamond','Montserrat'],Elegant:['Playfair Display','Poppins'],Modern:['Space Grotesk','DM Sans'],Bold:['Syne','Manrope'],Script:['Dancing Script','Quicksand']};
let S={acc:ACC[0],bg:'Light',font:'Classic'};
try{ Object.assign(S,JSON.parse(localStorage.getItem('aa-theme')||'{}')); }catch(e){}
function applyTheme(){
  const root=document.documentElement.style; root.setProperty('--gold',S.acc);
  root.setProperty('--fh',`'${FONTS[S.font][0]}'`); root.setProperty('--fb',`'${FONTS[S.font][1]}'`);
  document.body.classList.remove('dark','navy','black'); (BGS[S.bg]||'').split(' ').filter(Boolean).forEach(c=>document.body.classList.add(c));
  document.querySelectorAll('#cfg [data-k]').forEach(b=>b.classList.toggle('on',S[b.dataset.k]===b.dataset.v));
  try{ localStorage.setItem('aa-theme',JSON.stringify(S)); }catch(e){}
}
function toggleTheme(){ S.bg = S.bg==='Light' ? 'Charcoal' : 'Light'; applyTheme(); }
$('#cfg').innerHTML=`<b>Accent colour</b><div class="row">${ACC.map(a=>`<button class="sw" data-k="acc" data-v="${a}" style="background:${a}"></button>`).join('')}<input type="color" id="cc" value="${S.acc}" title="Custom colour"></div>
<b>Background</b><div class="row">${Object.keys(BGS).map(k=>`<button data-k="bg" data-v="${k}">${k}</button>`).join('')}</div>
<b>Font style</b><div class="row">${Object.keys(FONTS).map(k=>`<button data-k="font" data-v="${k}">${k}</button>`).join('')}</div>`;
$('#cfg').onclick=e=>{ const b=e.target.closest('[data-k]'); if(b){ S[b.dataset.k]=b.dataset.v; applyTheme(); } };
$('#cc').oninput=e=>{ S.acc=e.target.value; applyTheme(); };
$('#cfgb').onclick=()=>$('#cfg').classList.toggle('vis');
applyTheme();

/* ===== HERO PHOTO TRAVELS TO ABOUT (one photo, moves as you scroll) ===== */
(function(){
  const mv=$('#mover'), im=mv.querySelector('img'), slot=$('#slot'), ps=$('#pslot'); let a,b,sm=0,n=0;
  const box=el=>{ let x=0,y=0,e=el; while(e){ x+=e.offsetLeft; y+=e.offsetTop; e=e.offsetParent; } return {x,y,w:el.offsetWidth,h:el.offsetHeight}; };
  const ar=()=>{ if(im.naturalWidth) document.documentElement.style.setProperty('--ar',im.naturalWidth/im.naturalHeight); };
  const measure=()=>{ a=box(slot); b=box(ps); };
  if(im.complete) ar(); else im.addEventListener('load',ar);
  addEventListener('load',()=>{ ar(); measure(); }); addEventListener('resize',measure);
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  (function loop(){
    if(!(n++%20)) measure();
    const end=Math.max(1,b.y-innerHeight*.25), t=Math.max(0,Math.min(1,scrollY/end));
    sm+=(t-sm)*.12; const e=ease(sm), L=(p,q)=>p+(q-p)*e, bump=Math.sin(e*Math.PI);
    mv.style.width=L(a.w,b.w)+'px'; mv.style.height=L(a.h,b.h)+'px';
    mv.style.transform=`translate(${L(a.x,b.x)}px,${L(a.y,b.y)}px) rotate(${-bump*5}deg) scale(${1+bump*.06})`;
    document.body.classList.toggle('landed', sm>.96);
    requestAnimationFrame(loop);
  })();
})();
