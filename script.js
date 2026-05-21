// ======= PRELOADER =======
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
  }, 2200);
});

// ======= CUSTOM CURSOR =======
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
});
(function animateFollower() {
  followerX += (mouseX - followerX - 20) * 0.1;
  followerY += (mouseY - followerY - 20) * 0.1;
  follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  requestAnimationFrame(animateFollower);
})();

// ======= NAVBAR SCROLL =======
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 80) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) btn.classList.add('show');
  else btn.classList.remove('show');
});

// ======= PARTICLES =======
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 30 + 10;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%;
    animation-duration:${Math.random()*15+10}s;
    animation-delay:${Math.random()*10}s;
  `;
  particlesEl.appendChild(p);
}



// ======= AOS =======
AOS.init({ duration: 800, once: true, offset: 80 });

// ======= SWIPER =======
new Swiper('.testimonialsSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});

// ======= VIDEO TOGGLE =======
function toggleVideo() {
  const v = document.getElementById('bgVideo');
  const icon = document.getElementById('playIcon');
  if (v.paused) { v.play(); icon.className = 'fas fa-pause'; }
  else { v.pause(); icon.className = 'fas fa-play'; }
}

// ======= PORTFOLIO =======
const portfolioData = [
  { type: 'image', src: '/Css/1.jpeg', title: 'تنظيف منازل', cat: 'image' },
  { type: 'image', src: '/Css/2.jpeg', title: 'تنظيف فلل', cat: 'image' },
  { type: 'image', src: '/Css/3.jpeg', title: 'تنظيف شركات', cat: 'image' },
  { type: 'image', src: '/Css/4.jpeg', title: 'تنظيف واجهات', cat: 'image' },
  { type: 'video', src: '/Css/v1.mp4', title: 'تنظيف احترافي 1', cat: 'video' },
  { type: 'video', src: '/Css/v2.mp4', title: 'تنظيف احترافي 2', cat: 'video' },
  { type: 'video', src: '/Css/v3.mp4', title: 'تنظيف احترافي 3', cat: 'video' },
  { type: 'video', src: '/Css/v4.mp4', title: 'تنظيف احترافي 4', cat: 'video' },
  { type: 'video', src: '/Css/v5.mp4', title: 'تنظيف احترافي 5', cat: 'video' },
  { type: 'video', src: '/Css/v6.mp4', title: 'تنظيف احترافي 6', cat: 'video' },
  { type: 'video', src: '/Css/v7.mp4', title: 'تنظيف احترافي 7', cat: 'video' },
  { type: 'video', src: '/Css/v8.mp4', title: 'تنظيف احترافي 8', cat: 'video' },
];

function renderPortfolio(filter = 'all') {
  const grid = document.getElementById('portfolioGrid');
  const items = filter === 'all' ? portfolioData : portfolioData.filter(i => i.cat === filter);
  grid.innerHTML = items.map((item, idx) => `
    <div class="portfolio-card" onclick="openModal('${item.type}','${item.src}')" 
         style="animation-delay:${idx*0.08}s" data-aos="zoom-in">
      <span class="portfolio-type-badge">${item.type === 'video' ? '<i class="fas fa-video"></i> فيديو' : '<i class="fas fa-image"></i> صورة'}</span>
      ${item.type === 'image'
        ? `<img src="${item.src}" alt="${item.title}" loading="lazy" />`
        : `<video src="${item.src}" muted loop playsinline preload="none" 
             onmouseenter="this.play()" onmouseleave="this.pause()" loading="lazy"></video>`
      }
      <div class="portfolio-overlay">
        <div class="portfolio-info">
          <h6>${item.title}</h6>
          <span>${item.type === 'video' ? 'فيديو تنظيف احترافي' : 'صورة من أعمالنا'}</span>
        </div>
      </div>
      ${item.type === 'video' ? '<div class="portfolio-play"><i class="fas fa-play"></i></div>' : ''}
    </div>
  `).join('');
  AOS.refresh();
}
renderPortfolio();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderPortfolio(this.dataset.filter);
  });
});

// ======= MODAL =======
function openModal(type, src) {
  const modal = document.getElementById('mediaModal');
  const content = document.getElementById('modalMediaContent');
  content.innerHTML = type === 'image'
    ? `<img src="${src}" alt="صورة" style="width:100%;border-radius:12px;">`
    : `<video src="${src}" controls autoplay style="width:100%;border-radius:12px;"></video>`;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMediaModal() {
  const modal = document.getElementById('mediaModal');
  modal.classList.remove('show');
  document.getElementById('modalMediaContent').innerHTML = '';
  document.body.style.overflow = '';
}
function closeModal(e) {
  if (e.target === document.getElementById('mediaModal')) closeMediaModal();
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeMediaModal(); });

// ======= COUNTERS =======
function animateCounters(selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target.toLocaleString('ar'); clearInterval(timer); }
      else el.textContent = Math.floor(current).toLocaleString('ar');
    }, 16);
  });
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters('.counter');
      animateCounters('.stat-counter');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#statistics, #why-us').forEach(el => counterObserver.observe(el));

// ======= FORM SUBMIT =======
function handleFormSubmit(event, form) {
  event.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const originalHtml = btn.innerHTML;
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin ms-2"></i> جاري التحويل...';
  btn.disabled = true;

  const name = form.name.value;
  const phone = form.phone.value;
  const service = form.service.value;
  const message = form.message.value;

  const text = `*طلب خدمة جديد من الموقع*\n\n*الاسم:* ${name}\n*الجوال:* ${phone}\n*الخدمة المطلوبة:* ${service}\n*الرسالة:* ${message}`;
  const waLink = `https://wa.me/966542760724?text=${encodeURIComponent(text)}`;

  setTimeout(() => {
    window.open(waLink, '_blank');
    btn.innerHTML = '<i class="fas fa-check-circle ms-2"></i> تم التحويل للواتساب!';
    btn.style.background = 'linear-gradient(135deg,#43a047,#66bb6a)';
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  }, 1000);
}



// ======= SMOOTH SCROLL =======
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const navMenu = document.getElementById('navMenu');
      if (navMenu.classList.contains('show')) {
        new bootstrap.Collapse(navMenu).hide();
      }
    }
  });
});