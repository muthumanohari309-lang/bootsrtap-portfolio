// Smooth scroll for nav links
document.querySelectorAll('a.nav-link[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  })
});

// Animated counters
function animateCounters(){
  const counters = document.querySelectorAll('.counter');
  counters.forEach(c=>{
    const target = +c.dataset.target;
    const duration = 1500;
    const start = 0;
    let startTime = null;
    function step(timestamp){
      if(!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime)/duration,1);
      c.textContent = Math.floor(progress * (target - start) + start).toLocaleString();
      if(progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  });
}

// Reveal intro on scroll
const intro = document.querySelector('.animated-intro');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); })
},{threshold:0.2});
if(intro) obs.observe(intro);

// Run counters when stats visible
const statsSection = document.querySelector('#stats');
let countersRun = false;
if(statsSection){
  const statObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting && !countersRun){ animateCounters(); countersRun=true }
    })
  },{threshold:0.3});
  statObs.observe(statsSection);
}

// Back to top button
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
  if(window.scrollY>400) backBtn.classList.add('show'); else backBtn.classList.remove('show');
});
backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Simple contribution heatmap generator
function generateHeatmap(year=2026){
  const grid = document.getElementById('heatmap');
  grid.innerHTML = '';
  let total=0;
  const days = 7*53; // roughly weeks x days
  for(let i=0;i<days;i++){
    const level = Math.floor(Math.random()*5); // 0-4
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell' + (level? ' level-'+level:'');
    cell.title = `${level} contributions`;
    grid.appendChild(cell);
    total += level;
  }
  document.getElementById('summaryCount').textContent = total;
}

// Year filter buttons
document.querySelectorAll('.year-filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.year-filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    generateHeatmap(+btn.dataset.year);
  });
});

// Initial heatmap
generateHeatmap();

// Smooth fade-ins for tech cards
document.querySelectorAll('.tech-card').forEach((el,i)=>{
  el.style.transitionDelay = (i*20)+'ms';
});

// Section hover wave effect
document.querySelectorAll('main section').forEach(section=>{
  section.classList.add('wave-hover');
  section.addEventListener('mousemove',e=>{
    const rect = section.getBoundingClientRect();
    section.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    section.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
  section.addEventListener('mouseenter',()=> section.classList.add('hovered'));
  section.addEventListener('mouseleave',()=> section.classList.remove('hovered'));
});

// Contact form simple handler
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit',e=>{
    e.preventDefault();
    alert('Thanks — your message was sent (demo).');
    contactForm.reset();
  })
}
