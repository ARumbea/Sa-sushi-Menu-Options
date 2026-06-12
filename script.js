/* ── Nav scroll effect ── */
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile burger menu ── */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Menu tabs ── */
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

/* ── Testimonials carousel ── */
const slides = document.querySelectorAll('.t-slide');
const dotsContainer = document.getElementById('tDots');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 't-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  slides[current].classList.remove('active');
  dotsContainer.children[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsContainer.children[current].classList.add('active');
}

document.getElementById('tPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('tNext').addEventListener('click', () => goTo(current + 1));

let autoplay = setInterval(() => goTo(current + 1), 5000);
document.querySelector('.testimonials-carousel').addEventListener('mouseenter', () => clearInterval(autoplay));
document.querySelector('.testimonials-carousel').addEventListener('mouseleave', () => {
  autoplay = setInterval(() => goTo(current + 1), 5000);
});

/* ── Gallery ── */
const galleryItems = [
  { label: 'Signature Platter', hue: 120 },
  { label: 'Sashimi Selection', hue: 127 },
  { label: 'Crispy Rolls', hue: 115 },
  { label: 'Chef Specials', hue: 133 },
  { label: 'Salmon Lovers', hue: 118 },
  { label: 'Temaki Night', hue: 124 },
  { label: 'Party Tray', hue: 130 },
  { label: 'Elegant Catering', hue: 121 },
];

const grid = document.getElementById('galleryGrid');
galleryItems.forEach(item => {
  const el = document.createElement('div');
  el.className = 'gallery-item';
  el.style.background = `linear-gradient(160deg, hsl(${item.hue}, 50%, 14%), hsl(${item.hue - 8}, 38%, 26%))`;
  const lbl = document.createElement('div');
  lbl.className = 'gallery-label';
  lbl.textContent = item.label;
  el.appendChild(lbl);
  grid.appendChild(el);
});

/* ── Animated counters ── */
function animateCount(el, target, suffix) {
  let start = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + suffix;
    if (start >= target) clearInterval(timer);
  }, 40);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(document.getElementById('stat-rolls'), 50, '+');
      animateCount(document.getElementById('stat-events'), 200, '+');
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) observer.observe(statsStrip);

/* ── Contact form ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = 'none';
    success.classList.add('visible');
    this.reset();
  }, 900);
});

/* ── Newsletter form ── */
document.getElementById('nlForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = 'Subscribed!';
  btn.disabled = true;
  this.querySelector('input').value = '';
});

/* ── Footer year ── */
document.getElementById('year').textContent = new Date().getFullYear();
