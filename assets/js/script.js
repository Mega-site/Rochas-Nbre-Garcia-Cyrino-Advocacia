// ────────────────────────────────────────────────
//  RN & GC ROCHA NOBRE & GARCIA CYRINO ADVOGADOS
//  script.js — Nativo, Rápido e Sem Dependências
// ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: scroll shadow ── */
  const nav = document.getElementById('main-nav');
  const onScroll = () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── NAV: hamburger ── */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
    const lines = hamburger.querySelectorAll('span');
    if (mobileMenu?.classList.contains('open')) {
      if (lines[0]) lines[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
      if (lines[1]) lines[1].style.opacity = '0';
      if (lines[2]) lines[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
    } else {
      lines.forEach(l => (l.style.cssText = ''));
    }
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger?.querySelectorAll('span').forEach(l => (l.style.cssText = ''));
    });
  });

  /* ── WA WIDGET: appear after 1s ── */
  const waWidget = document.getElementById('wa-widget');
  setTimeout(() => waWidget?.classList.add('visible'), 1000);

  /* ── FAQ: accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── ANIMATE on scroll (Intersection Observer) ── */
  const animEls = document.querySelectorAll(
    '.service-card, .dif-card, .sobre-grid, .faq-item, .step-card, .req-column, .mentalidade-card'
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  animEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = nav?.offsetHeight || 78;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth'
      });
    });
  });

});
