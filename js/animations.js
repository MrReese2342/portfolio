const reduced = matchMedia('(prefers-reduced-motion: reduce)');

export function animateNode(node, frames, duration = 600) {
  if (!node || reduced.matches || typeof node.animate !== 'function') return;
  node.getAnimations().forEach(animation => animation.cancel());
  node.animate(frames, {duration, easing: 'cubic-bezier(.16,1,.3,1)'});
}
export function animateRadar(panel) {
  animateNode(panel.querySelector('.radar-data'), [{opacity: 0, transform: 'scale(.3)'}, {opacity: 1, transform: 'scale(1)'}], 850);
  const shape = panel.querySelector('.radar-shape');
  if (shape && !reduced.matches) {
    animateNode(shape, [{strokeDasharray: '1200', strokeDashoffset: '1200'}, {strokeDasharray: '1200', strokeDashoffset: '0'}], 1050);
  }
}

export function initScrollAnimations() {
  // Les contenus restent visibles si les animations ne sont pas disponibles.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains('skill-profile')) {
          animateRadar(document.getElementById('panel-domains'));
        } else {
          animateNode(entry.target, [{opacity: .4, transform: 'translateY(22px)'}, {opacity: 1, transform: 'translateY(0)'}], 650);
        }
        observer.unobserve(entry.target);
      });
    }, {threshold: .12});
    document.querySelectorAll('.skill-profile, .project-card, .section-head').forEach(node => observer.observe(node));
  } else {
    animateRadar(document.getElementById('panel-domains'));
  }
}

export function initProfileGlow() {
  const card = document.querySelector('.skill-profile');
  card?.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduced.matches) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', `${(event.clientX - box.left) / box.width * 100}%`);
    card.style.setProperty('--pointer-y', `${(event.clientY - box.top) / box.height * 100}%`);
  });
  card?.addEventListener('pointerleave', () => {
    card.style.removeProperty('--pointer-x');card.style.removeProperty('--pointer-y');
  });
}
