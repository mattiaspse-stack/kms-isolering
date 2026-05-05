// ── Header scroll effect ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav ──
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ── Scroll-in animations ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

// Staggered service cards
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.classList.add('fade-in');
  card.style.transitionDelay = `${i * 80}ms`;
  observer.observe(card);
});

// Other fade elements
[
  '.section__header',
  '.about__visual',
  '.about__content',
  '.supplier-item',
  '.contact-card',
  '.footer__brand',
  '.footer__links',
].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });
});

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--clr-text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
