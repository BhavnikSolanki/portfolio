// script.js

document.addEventListener('DOMContentLoaded', () => {
  // CTA navigation
  document.querySelectorAll('.cta[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Animated counters
  const counters = document.querySelectorAll('.stat .number');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 200));
        const int = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(int);
          } else {
            el.textContent = current;
          }
        }, 10);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  // Fade‑in sections
  const sections = document.querySelectorAll('.section');
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(s => fadeObserver.observe(s));
});
// Custom cursor movement
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add hover effect for interactive elements
const hoverElements = document.querySelectorAll('a, button, .cta, .project-card, .skill-bar');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});
