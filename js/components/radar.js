
function createRadarCursorTrail(svg, cx, cy, radius) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const trail = element('g', {
    class: 'radar-cursor-trail',
    'aria-hidden': 'true',
    'pointer-events': 'none'
  });

  const specs = [
    {name: 'dev backend', offsetX: -26, offsetY: -22, size: 18, ease: .18},
    {name: 'dev frontend', offsetX: 31, offsetY: -8, size: 16, ease: .13},
    {name: 'ia', offsetX: -9, offsetY: 32, size: 16, ease: .10}
  ];

  const icons = specs.map(spec => {
    const node = element('g', {class: 'radar-cursor-icon'});
    const symbol = element('svg', {
      x: -spec.size / 2,
      y: -spec.size / 2,
      width: spec.size,
      height: spec.size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.65',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      focusable: 'false'
    });

    symbol.innerHTML = getDomainIconMarkup(spec.name);
    node.append(symbol);
    trail.append(node);

    return {...spec, node, x: cx, y: cy};
  });

  svg.append(trail);

  let pointer = null;
  let frameId = 0;
  const boundary = radius - 18;

  function withinRadar(x, y) {
    const dx = x - cx, dy = y - cy;
    const distance = Math.hypot(dx, dy);
    const ratio = distance > boundary ? boundary / distance : 1;

    return {
      x: cx + dx * ratio,
      y: cy + dy * ratio
    };
  }

  function draw() {
    frameId = 0;
    if (!pointer) return;

    let moving = false;

    icons.forEach(icon => {
      const goal = withinRadar(
        pointer.x + icon.offsetX,
        pointer.y + icon.offsetY
      );

      const dx = goal.x - icon.x;
      const dy = goal.y - icon.y;

      icon.x += dx * icon.ease;
      icon.y += dy * icon.ease;

      icon.node.setAttribute(
        'transform',
        `translate(${icon.x.toFixed(2)} ${icon.y.toFixed(2)})`
      );

      if (Math.abs(dx) + Math.abs(dy) > .35) moving = true;
    });

    if (moving) frameId = requestAnimationFrame(draw);
  }

  function hide() {
    pointer = null;
    trail.classList.remove('is-visible');

    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  }

  svg.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;

    const matrix = svg.getScreenCTM();
    if (!matrix) return;

    const cursor = svg.createSVGPoint();
    cursor.x = event.clientX;
    cursor.y = event.clientY;

    const {x, y} = cursor.matrixTransform(matrix.inverse());

    if (Math.hypot(x - cx, y - cy) > radius - 5) {
      hide();
      return;
    }

    if (!pointer) {
      icons.forEach(icon => {
        const start = withinRadar(
          x + icon.offsetX,
          y + icon.offsetY
        );

        icon.x = start.x;
        icon.y = start.y;

        icon.node.setAttribute(
          'transform',
          `translate(${icon.x.toFixed(2)} ${icon.y.toFixed(2)})`
        );
      });
    }

    pointer = {x, y};
    trail.classList.add('is-visible');

    if (!frameId) frameId = requestAnimationFrame(draw);
  });

  svg.addEventListener('pointerleave', hide);
  svg.addEventListener('pointercancel', hide);
}
