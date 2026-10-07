// Native disclosure controls stay accessible without JavaScript.
// Mark the current navigation section when supported.
const navLinks = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        for (const link of navLinks) {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }
  }, {rootMargin: '-15% 0px -60% 0px'});
  for (const link of navLinks) {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  }
}
