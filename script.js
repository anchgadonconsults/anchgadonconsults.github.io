/* ── PAGE NAVIGATION ──────────────────────────────────────── */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  const map={home:0,about:1,services:2,portfolio:3};
  const links=document.querySelectorAll('.fnav-link');
  links.forEach(l=>l.classList.remove('active'));
  if(map[id]!==undefined) links[map[id]].classList.add('active');
  const mobLinks=document.querySelectorAll('.mob-link');
  mobLinks.forEach(l=>l.classList.remove('active'));
  if(map[id]!==undefined) mobLinks[map[id]].classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='portfolio') render();
}

/* ── PORTFOLIO LOGIC ──────────────────────────────────────── */
const icons={
  github:`<svg viewBox="0 0 10 10" fill="none"><path d="M5 0.5C2.5.5.5 2.5.5 5c0 2 1.3 3.7 3.1 4.3.2 0 .3-.1.3-.3V8.3c-1.2.3-1.5-.6-1.5-.6-.2-.5-.5-.7-.5-.7-.4-.3 0-.3 0-.3.4 0 .7.4.7.4.4.7 1 .5 1.3.4 0-.3.2-.5.3-.6-1-.1-2-.5-2-2.1 0-.5.2-.9.4-1.2 0-.1-.2-.6 0-1.2 0 0 .4-.1 1.2.5.3-.1.7-.1 1-.1s.7 0 1 .1c.8-.6 1.2-.5 1.2-.5.2.6 0 1.1 0 1.2.3.3.4.7.4 1.2 0 1.6-1 2-2 2.1.2.1.3.4.3.8V9c0 .2.1.3.3.3C8.2 8.7 9.5 7 9.5 5 9.5 2.5 7.5.5 5 .5z" fill="#0F6E56"/></svg>`,
  canva:`<svg viewBox="0 0 10 10" fill="none"><rect x="1" y="1" width="8" height="8" rx="2" fill="#0F6E56"/><path d="M3.5 6.5C3.5 5 4.2 4 5 4s1.5 1 1.5 2.5" stroke="#E1F5EE" stroke-width="1" stroke-linecap="round"/></svg>`,
  colab:`<svg viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#0F6E56" stroke-width="1"/><path d="M3.5 5l1.5-1.5L6.5 5 5 6.5 3.5 5z" fill="#0F6E56"/></svg>`,
  slides:`<svg viewBox="0 0 10 10" fill="none"><rect x="1" y="2" width="8" height="6" rx="1" stroke="#0F6E56" stroke-width="1"/><path d="M4 4.5l2 1-2 1V4.5z" fill="#0F6E56"/></svg>`,
  doc:`<svg viewBox="0 0 10 10" fill="none"><path d="M2 1h4.5L8 2.5V9H2V1z" stroke="#0F6E56" stroke-width="1"/><path d="M6.5 1v2H8" stroke="#0F6E56" stroke-width="1"/><path d="M3.5 4.5h3M3.5 6h3" stroke="#0F6E56" stroke-width="0.8" stroke-linecap="round"/></svg>`,
  link:`<svg viewBox="0 0 10 10" fill="none"><path d="M4 6l-1 1a1.5 1.5 0 01-2-2l2-2a1.5 1.5 0 012 0" stroke="#0F6E56" stroke-width="1" stroke-linecap="round"/><path d="M6 4l1-1a1.5 1.5 0 012 2L7 7a1.5 1.5 0 01-2 0" stroke="#0F6E56" stroke-width="1" stroke-linecap="round"/></svg>`
};

const projects=[
  {id:1,featured:true,title:"Three days of manual work — condensed into ten minutes",tags:["Data Systems"],duration:"3 weeks",desc:"Data collected from four separate sources was manually copied and reformatted each month. Designed a PostgreSQL schema and built a Python ETL pipeline to ingest, clean, and merge all sources automatically.",tools:["Python","PostgreSQL","Power BI","Excel","ETL"],outcome:"90%",outcomeLbl:"reduction in reporting time",links:[{type:"github",label:"View code",url:"#"},{type:"slides",label:"Presentation",url:"#"}]},
  {id:2,featured:true,title:"The data showed a pattern — but was the intervention the cause?",tags:["Econometrics"],duration:"5 weeks",desc:"Five years of wage data across regions. Applied Difference-in-Differences on panel data, tested parallel trends, controlled for fixed effects, and ran full robustness checks.",tools:["R","STATA","LaTeX","ggplot2","DiD"],outcome:"✓",outcomeLbl:"passed external peer review",links:[{type:"colab",label:"R notebook",url:"#"},{type:"doc",label:"Write-up",url:"#"}]},
  {id:3,featured:true,title:"Sales data existed everywhere — but forecasting was still guesswork",tags:["Data Systems","Econometrics"],duration:"8 weeks",desc:"Twelve product categories in disconnected files. Consolidated into SQL, built ARIMA and ETS time-series models per category, and delivered a live forecasting dashboard.",tools:["R","SQL","Power BI","ARIMA","ETS"],outcome:"↓23%",outcomeLbl:"overstock in first quarter",links:[{type:"github",label:"Pipeline code",url:"#"},{type:"canva",label:"Dashboard demo",url:"#"}]},
  {id:4,featured:true,title:"Analysis done — results still couldn't be explained",tags:["Tutoring"],duration:"6 sessions",desc:"Regressions had been run but outputs weren't understood. Re-specified the panel model together, applied robust standard errors, rewrote results section collaboratively.",tools:["STATA","R","Panel data","Robust SE"],outcome:"100%",outcomeLbl:"defence passed, no revisions",links:[{type:"slides",label:"Session slides",url:"#"}]},
  {id:5,featured:false,title:"Survey data across sites — stored in five inconsistent formats",tags:["Data Systems"],duration:"2 weeks",desc:"Multi-site records in incompatible formats, inconsistent column naming, mixed date codes. Cleaned, standardised, and merged into a single validated dataset.",tools:["Python","pandas","Excel"],outcome:"5→1",outcomeLbl:"formats merged, zero data loss",links:[{type:"github",label:"Script",url:"#"}]},
  {id:6,featured:false,title:"Time-series model flagged for non-stationarity — submission at risk",tags:["Econometrics"],duration:"3 weeks",desc:"Diagnosed unit root issues using ADF and KPSS tests, re-specified using VECM approach, rewrote results and methodology sections for resubmission.",tools:["EViews","R","VECM","ADF","KPSS"],outcome:"✓",outcomeLbl:"accepted on first resubmission",links:[{type:"colab",label:"EViews output",url:"#"},{type:"doc",label:"Methodology",url:"#"}]},
  {id:7,featured:false,title:"Team needed to read and interpret regression outputs independently",tags:["Tutoring"],duration:"4 sessions",desc:"Group sessions on regression fundamentals, coefficient interpretation, and diagnostics using the team's own data throughout.",tools:["R","STATA","OLS"],outcome:"4",outcomeLbl:"members independently proficient",links:[{type:"slides",label:"Training deck",url:"#"},{type:"canva",label:"Visual summary",url:"#"}]}
];

let activeFilter='all', searchQuery='';
function tagClass(t){if(t==='Data Systems')return 'tag-sys';if(t==='Econometrics')return 'tag-eco';if(t==='Tutoring')return 'tag-tut';return 'tag-mix';}
function hl(text,q,re){if(!q||!re)return text;return text.replace(re,'<mark>$1</mark>');}
function linkHTML(links){if(!links||!links.length)return '';return links.map(l=>`<a class="proj-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${icons[l.type]||icons.link}${l.label}</a>`).join('');}

function featCardHTML(p,q,re){
  const tags=p.tags.map(t=>`<span class="tag ${tagClass(t)}">${t}</span>`).join('');
  const tools=p.tools.map(t=>`<span class="tool-pill">${hl(t,q,re)}</span>`).join('');
  const lks=linkHTML(p.links);
  return `<div class="feat-card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px;">
      <div class="feat-tags">${tags}<span class="tag tag-feat">Featured</span></div>
      <span class="feat-duration">${p.duration}</span>
    </div>
    <div class="feat-title">${hl(p.title,q,re)}</div>
    <div class="feat-desc">${hl(p.desc,q,re)}</div>
    ${lks?`<div class="feat-links">${lks}</div>`:''}
    <div class="feat-bottom"><div class="feat-tools">${tools}</div><div style="display:flex;align-items:baseline;gap:4px;flex-shrink:0;"><span class="feat-val">${p.outcome}</span><span class="feat-lbl">${p.outcomeLbl}</span></div></div>
  </div>`;}

function resumeCardHTML(p,q,re,idx,total){
  const tags=p.tags.map(t=>`<span class="tag ${tagClass(t)}">${t}</span>`).join('');
  const tools=p.tools.map(t=>`<span class="tool-pill">${hl(t,q,re)}</span>`).join('');
  const lks=linkHTML(p.links);
  let br='border-radius:0;';
  if(total===1)br='border-radius:12px;';
  else if(idx===0)br='border-radius:12px 12px 0 0;';
  else if(idx===total-1)br='border-radius:0 0 12px 12px;margin-bottom:0;';
  return `<div class="resume-card" style="${br}">
    <div class="rc-top"><div class="rc-title">${hl(p.title,q,re)}</div><span class="rc-duration">${p.duration}</span></div>
    <div class="rc-tags">${tags}</div>
    <div class="rc-desc">${hl(p.desc,q,re)}</div>
    ${lks?`<div class="rc-links">${lks}</div>`:''}
    <div class="rc-bottom"><div class="rc-tools">${tools}</div><div style="display:flex;align-items:baseline;gap:5px;flex-shrink:0;"><span class="rc-val">${p.outcome}</span><span class="rc-lbl">${p.outcomeLbl}</span></div></div>
  </div>`;}

function render(){
  const q=searchQuery.toLowerCase().trim();
  const re=q?new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi'):null;
  const filtered=projects.filter(p=>{
    if(activeFilter!=='all'&&!p.tags.includes(activeFilter))return false;
    if(!q)return true;
    return p.title.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||p.tools.some(t=>t.toLowerCase().includes(q))||p.tags.some(t=>t.toLowerCase().includes(q));
  });
  const feat=filtered.filter(p=>p.featured);
  const more=filtered.filter(p=>!p.featured);
  document.getElementById('featuredGrid').innerHTML=feat.map(p=>featCardHTML(p,q,re)).join('');
  document.getElementById('resumeList').innerHTML=more.map((p,i)=>resumeCardHTML(p,q,re,i,more.length)).join('');
  document.getElementById('featDiv').style.display=feat.length?'flex':'none';
  document.getElementById('moreDiv').style.display=more.length?'flex':'none';
  const total=filtered.length;
  document.getElementById('countLabel').textContent=total===0?'No results':total===1?'1 project':total+' projects';
  const es=document.getElementById('emptyState');
  if(total===0){es.classList.add('visible');document.getElementById('emptyTerm').textContent=q?'"'+q+'"':'that filter';}
  else es.classList.remove('visible');
}
let searchTimeout;
function handleSearch(){searchQuery=document.getElementById('searchInput').value;document.getElementById('clearBtn').style.display=searchQuery?'block':'none';clearTimeout(searchTimeout);searchTimeout=setTimeout(render,150);}
function clearSearch(){document.getElementById('searchInput').value='';searchQuery='';document.getElementById('clearBtn').style.display='none';render();}
function setFilter(f,btn){activeFilter=f;document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('on'));btn.classList.add('on');render();}

/* ── CONTACT FORM ─────────────────────────────────────────── */
const SCRIPT_URL='https://script.google.com/macros/s/AKfycbw2lKa2Y18SkXE24Rz4TWvUnQaVrNO68EYXot3MvuQ9Oqufaf1YbqBUy02fa5ZcT9CA/exec';

function togglePill(el){el.classList.toggle('selected');}

function setFieldError(id,msg){
  const el=document.getElementById(id);
  el.classList.toggle('input-error',!!msg);
  const existing=el.parentElement.querySelector('.field-error-msg');
  if(msg&&!existing){const e=document.createElement('p');e.className='field-error-msg';e.textContent=msg;el.parentElement.appendChild(e);}
  else if(!msg&&existing)existing.remove();
}

async function handleSubmit(){
  const name=document.getElementById('field-name').value.trim();
  const email=document.getElementById('field-email').value.trim();
  const problem=document.getElementById('field-problem').value.trim();

  let valid=true;
  setFieldError('field-name',name?'':'Please enter your name.');
  if(!name)valid=false;
  const emailOk=email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setFieldError('field-email',emailOk?'':'Please enter a valid email address.');
  if(!emailOk)valid=false;
  setFieldError('field-problem',problem?'':'Please describe what you need help with.');
  if(!problem)valid=false;
  if(!valid)return;

  const services=Array.from(document.querySelectorAll('.pill-toggle.selected')).map(el=>el.textContent).join(', ')||'(none selected)';
  const timeline=document.getElementById('field-timeline').value||'';
  const budget=document.getElementById('field-budget').value||'';
  const source=document.getElementById('field-source').value||'';

  const btn=document.querySelector('.btn-submit');
  btn.disabled=true;
  btn.textContent='Sending…';

  try{
    await fetch(SCRIPT_URL,{
      method:'POST',
      mode:'no-cors',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({name,email,services,problem,timeline,budget,source}).toString()
    });
    document.getElementById('form-area').style.display='none';
    document.getElementById('success').classList.add('visible');
  }catch(err){
    btn.disabled=false;
    btn.textContent='Send inquiry →';
    const errEl=document.getElementById('submit-error');
    if(errEl)errEl.style.display='block';
  }
}

/* ── HOME FEATURED ────────────────────────────────────────── */
function renderHomeFeatured(){
  const featured=projects.filter(p=>p.featured).slice(0,2);
  document.getElementById('homeFeaturedGrid').innerHTML=featured.map(p=>{
    const tags=p.tags.map(t=>`<span class="tag ${tagClass(t)}">${t}</span>`).join('');
    const tools=p.tools.map(t=>`<span class="tool-pill">${t}</span>`).join('');
    const lks=linkHTML(p.links);
    return `<div class="feat-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px;">
        <div class="feat-tags">${tags}</div>
        <span class="feat-duration">${p.duration}</span>
      </div>
      <div class="feat-title">${p.title}</div>
      <div class="feat-desc">${p.desc}</div>
      ${lks?`<div class="feat-links">${lks}</div>`:''}
      <div class="feat-bottom"><div class="feat-tools">${tools}</div><div style="display:flex;align-items:baseline;gap:4px;flex-shrink:0;"><span class="feat-val">${p.outcome}</span><span class="feat-lbl">${p.outcomeLbl}</span></div></div>
    </div>`;
  }).join('');
}

/* ── BURGER MENU ──────────────────────────────────────────── */
function toggleMenu(){
  const menu=document.getElementById('mobileMenu');
  const btn=document.getElementById('burgerBtn');
  const open=menu.classList.toggle('open');
  btn.classList.toggle('open',open);
  btn.setAttribute('aria-expanded',String(open));
}
function closeMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  const btn=document.getElementById('burgerBtn');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded','false');
}
window.addEventListener('resize',function(){if(window.innerWidth>640)closeMenu();});

/* ── THEME ────────────────────────────────────────────────── */
const themeIcons={
  light:`<svg viewBox="0 0 16 16" fill="none" width="14" height="14"><circle cx="8" cy="8" r="2.8" stroke="currentColor" stroke-width="1.3"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.6 3.6l1.4 1.4M11 11l1.4 1.4M3.6 12.4l1.4-1.4M11 5l1.4-1.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  dark:`<svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M13.5 10.5A6 6 0 016.5 3.5a5.5 5.5 0 000 9 6 6 0 007-2z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
let currentTheme=localStorage.getItem('theme')||'system';

function effectiveTheme(){
  if(currentTheme!=='system') return currentTheme;
  return window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
}
function applyTheme(t){
  const html=document.documentElement;
  if(t==='system') html.removeAttribute('data-theme');
  else html.setAttribute('data-theme',t);
  const eff=t==='system'?effectiveTheme():t;
  const btn=document.getElementById('themeBtn');
  if(btn){
    btn.innerHTML=themeIcons[eff];
    const lbl=eff==='dark'?'Switch to light mode':'Switch to dark mode';
    btn.setAttribute('title',lbl);
    btn.setAttribute('aria-label',lbl);
  }
  if(t==='system') localStorage.removeItem('theme');
  else localStorage.setItem('theme',t);
  currentTheme=t;
}
function toggleTheme(){
  applyTheme(effectiveTheme()==='dark'?'light':'dark');
}

/* ── INIT ─────────────────────────────────────────────────── */
render();
renderHomeFeatured();
applyTheme(currentTheme);
