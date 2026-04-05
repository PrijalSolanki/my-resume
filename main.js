
/* ══════════════════════════════════
   1. CUSTOM GOLD CURSOR
══════════════════════════════════ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();

/* ══════════════════════════════════
   2. SCROLL PROGRESS BAR
══════════════════════════════════ */
window.addEventListener('scroll',()=>{
  const pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
  document.getElementById('progress-bar').style.width=pct+'%';
});

/* ══════════════════════════════════
   3. BACK TO TOP
══════════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('back-top').classList.toggle('show',window.scrollY>400);
});

/* ══════════════════════════════════
   4. DARK / LIGHT MODE TOGGLE
══════════════════════════════════ */
function toggleTheme(){
  const html=document.documentElement;
  const dark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',dark?'light':'dark');
  document.getElementById('theme-icon').className=dark?'fas fa-sun theme-icon':'fas fa-moon theme-icon';
}

/* ══════════════════════════════════
   5. TYPED TEXT EFFECT
══════════════════════════════════ */
const typedEl=document.getElementById('typed-text');
const phrases=['Full-Stack Developer 💻','MERN Stack Engineer ⚛️','MCA Student 🎓','Problem Solver 🧠','Creativity on Work ✨'];
let pi=0,ci=0,deleting=false;
function typeLoop(){
  const phrase=phrases[pi];
  typedEl.textContent=deleting?phrase.slice(0,ci--):phrase.slice(0,ci++);
  if(!deleting&&ci>phrase.length){deleting=true;setTimeout(typeLoop,1400);return;}
  if(deleting&&ci<0){deleting=false;pi=(pi+1)%phrases.length;ci=0;setTimeout(typeLoop,400);return;}
  setTimeout(typeLoop,deleting?45:80);
}
typeLoop();

/* ══════════════════════════════════
   6. PARTICLE BACKGROUND
══════════════════════════════════ */
const canvas=document.getElementById('particles-canvas');
const ctx=canvas.getContext('2d');
function resizeCanvas(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;}
resizeCanvas(); window.addEventListener('resize',resizeCanvas);
class Particle{
  constructor(){this.reset();}
  reset(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.r=Math.random()*2+.5;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.alpha=Math.random()*.5+.1;}
  update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height)this.reset();}
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,169,110,${this.alpha})`;ctx.fill();}
}
const particles=[];
for(let i=0;i<70;i++)particles.push(new Particle());
function animParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{p.update();p.draw();});
  particles.forEach((a,i)=>{
    particles.slice(i+1).forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<100){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(200,169,110,${.12*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}
    });
  });
  requestAnimationFrame(animParticles);
}
animParticles();

/* ══════════════════════════════════
   7. COUNT UP NUMBERS
══════════════════════════════════ */
const countObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el=entry.target,target=+el.dataset.target;
      let count=0;
      const timer=setInterval(()=>{
        count=Math.min(count+1,target);
        el.textContent=count+'+';
        if(count>=target)clearInterval(timer);
      },50);
      countObs.unobserve(el);
    }
  });
},{threshold:.5});
document.querySelectorAll('.stat-num[data-target]').forEach(el=>countObs.observe(el));

/* ══════════════════════════════════
   8. TILT CARD EFFECT
══════════════════════════════════ */
document.querySelectorAll('.tilt-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;
    card.style.transform=`perspective(800px) rotateX(${-(y/rect.height)*12}deg) rotateY(${(x/rect.width)*12}deg) scale3d(1.02,1.02,1.02)`;
    card.style.transition='transform .1s';
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    card.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';
  });
});

/* ══════════════════════════════════
   9. RIPPLE CLICK EFFECT
══════════════════════════════════ */
document.querySelectorAll('.btn,.form-submit,.fsoc').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const rect=this.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height);
    const ripple=document.createElement('span');
    ripple.className='ripple-effect';
    ripple.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    this.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
  });
});

/* ══════════════════════════════════
   10. MAGNETIC BUTTONS
══════════════════════════════════ */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const rect=btn.getBoundingClientRect();
    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;
    btn.style.transform=`translate(${x*.25}px,${y*.35}px)`;
    btn.style.transition='transform .1s';
  });
  btn.addEventListener('mouseleave',()=>{
    btn.style.transform='translate(0,0)';
    btn.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';
  });
});

/* ══════════════════════════════════
   BASE LOGIC
══════════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20);
});
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}

const reveals=document.querySelectorAll('.reveal');
const revObs=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*80);revObs.unobserve(e.target);}
  });
},{threshold:.12});
reveals.forEach(el=>revObs.observe(el));

const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.skill-fill').forEach(bar=>{bar.style.width=bar.dataset.w+'%';});
      skillObs.unobserve(entry.target);
    }
  });
},{threshold:.3});
document.querySelectorAll('.skill-group').forEach(el=>skillObs.observe(el));

const navSections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let current='';
  navSections.forEach(s=>{if(window.scrollY>=s.offsetTop-100)current=s.getAttribute('id');});
  navLinks.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+current?'var(--accent2)':'';});
});

document.querySelector('.form-submit').addEventListener('click',function(){
  this.innerHTML='<i class="fas fa-check"></i>&nbsp; Message Sent!';
  this.style.background='#22c55e';
  setTimeout(()=>{this.innerHTML='<i class="fas fa-paper-plane"></i>&nbsp; Send Message';this.style.background='';},2500);
});
