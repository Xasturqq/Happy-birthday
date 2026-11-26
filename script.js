const COL=['#ff2e88','#ffd23f','#1fd1c2','#ff7a1a','#b28bff'];
const $=id=>document.getElementById(id);

/* заголовок из цветных плиток */
const tiles=[['#ff2e88','#fff'],['#ffd23f','#2b1450'],['#1fd1c2','#2b1450'],['#ff7a1a','#fff'],['#fff','#6c3cf0']];
let k=0;
['С Днём','Рождения!'].forEach(word=>{
  const w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
  [...word].forEach(ch=>{
    if(ch===' '){const s=document.createElement('span');s.className='sp';w.appendChild(s);return}
    const t=document.createElement('span');t.className='t';t.textContent=ch;
    const c=tiles[k%tiles.length];t.style.background=c[0];t.style.color=c[1];
    t.style.setProperty('--r',((k%3)-1)*4+'deg');t.style.animationDelay=(k*0.12)+'s';k++;w.appendChild(t);
  });
  $('title').appendChild(w);
});

/* флажки */
(()=>{let s='<path d="M0 6Q600 26 1200 6" stroke="#fff" stroke-width="2" fill="none"/>';
 for(let i=0;i<20;i++){const x=i*60,y=6+Math.sin(i/19*Math.PI)*10;
  s+=`<polygon points="${x+4},${y} ${x+56},${y} ${x+30},${y+36}" fill="${COL[i%5]}"/>`}
 $('bunt').innerHTML=s})();

/* шарики */
for(let i=0;i<12;i++){const c=COL[i%5],d=document.createElement('div');d.className='bl';
 d.style.cssText=`left:${3+i*8}%;--d:${16+Math.random()*12}s;--dl:${-Math.random()*26}s;--s:${.6+Math.random()*.7}`;
 d.innerHTML=`<svg viewBox="0 0 60 100" width="60" height="100"><ellipse cx="30" cy="32" rx="24" ry="30" fill="${c}"/><ellipse cx="21" cy="20" rx="6" ry="9" fill="#fff" opacity=".35"/><path d="M26 61l4 6 4-6z" fill="${c}"/><path d="M30 67c-6 10 6 18 0 30" stroke="#fff" stroke-opacity=".7" fill="none" stroke-width="1.5"/></svg>`;
 $('balloons').appendChild(d)}

/* конфетти */
const cv=$('cf'),cx=cv.getContext('2d');let P=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}addEventListener('resize',size);size();
function burst(x,y,n=140){
 for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=4+Math.random()*9;
  P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,w:6+Math.random()*7,h:4+Math.random()*6,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:[...COL,'#fff'][i%6],l:0})}
 if(!run){run=true;requestAnimationFrame(tick)}}
function tick(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.y<cv.height+20&&p.l<260);
 for(const p of P){p.l++;p.vy+=.25;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;
  cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()}
 if(P.length)requestAnimationFrame(tick);else run=false}
setTimeout(()=>{burst(innerWidth*.25,innerHeight*.5,90);burst(innerWidth*.75,innerHeight*.5,90)},400);

/* свечи */
const cg=$('candles'),NS='http://www.w3.org/2000/svg';
[100,125,150,175,200].forEach((x,i)=>{
 const g=document.createElementNS(NS,'g');g.setAttribute('class','candle');g.setAttribute('tabindex','0');g.setAttribute('role','button');g.setAttribute('aria-label','Свеча '+(i+1)+': задуть или зажечь');
 g.innerHTML=`<rect x="${x-14}" y="4" width="28" height="62" fill="transparent"/><rect x="${x-4}" y="36" width="8" height="30" rx="2" fill="${COL[(i+1)%5]}"/><rect x="${x-4}" y="44" width="8" height="4" fill="#fff" opacity=".7"/><g class="flame" style="animation-delay:${i*.1}s"><ellipse cx="${x}" cy="26" rx="7" ry="11" fill="#ff7a1a"/><ellipse cx="${x}" cy="29" rx="3.5" ry="6.5" fill="#ffe36e"/></g>`;
 cg.appendChild(g)});
const cs=[...document.querySelectorAll('.candle')];
const H1='Загадай желание и задуй свечи: нажимай на огоньки';
$('hint').textContent=H1;
function check(){const out=cs.every(c=>c.classList.contains('off'));
 $('hint').textContent=out?'Желание загадано! Пусть сбудется ✨':H1;
 if(out){const r=cg.getBoundingClientRect();burst(r.left+r.width/2,r.top,170)}}
cs.forEach(c=>{const t=()=>{c.classList.toggle('off');check()};
 c.addEventListener('click',t);
 c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
$('relight').onclick=()=>{cs.forEach(c=>c.classList.remove('off'));$('hint').textContent=H1};

/* имя */
$('name').addEventListener('input',e=>{const v=e.target.value.trim();$('who').textContent=v?('🎉 '+v+' 🎉'):''});

/* подарок */
const gs=$('giftsvg');
function openGift(){const g=$('gift');if(g.classList.contains('open'))return;g.classList.add('open');
 $('gm').textContent='Внутри — море радости, миллион улыбок и ещё немного конфетти! 🎁';
 const r=gs.getBoundingClientRect();burst(r.left+r.width/2,r.top+40,150)}
gs.addEventListener('click',openGift);
gs.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openGift()}});
