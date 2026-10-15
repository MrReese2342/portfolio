
import { animateNode, animateRadar } from '../animations.js';
import { renderTech } from '../utils/tech-icons.js';

const ns = 'http://www.w3.org/2000/svg';

// Pictogrammes SVG pour les six domaines du profil général.
// Ils utilisent la couleur du thème et ne dépendent d'aucun service externe.
const domainIcons = {
  'dev backend': '<rect x="3" y="3" width="18" height="8" rx="2"/><rect x="3" y="13" width="18" height="8" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
  'dev fullstack': '<path d="m12 2-9 5 9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
  'dev frontend': '<rect x="3" y="3" width="18" height="15" rx="2"/><path d="M8 22h8M12 18v4M9 8l-2 2 2 2M15 8l2 2-2 2"/>',
  'data': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
  'ia': '<path d="M12 18V5a3 3 0 0 0-6 0 4 4 0 0 0-2 6 4 4 0 0 0 2 7 3 3 0 0 0 6 0ZM12 18V5a3 3 0 0 1 6 0 4 4 0 0 1 2 6 4 4 0 0 1-2 7 3 3 0 0 1-6 0Z"/><path d="M8 9h2M14 9h2M8 14h2M14 14h2"/>',
  'devops': '<circle cx="6" cy="4" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="20" r="2"/><path d="M6 6v12M18 8v4a4 4 0 0 1-4 4H6"/>'
};

function element(tag, attrs = {}, text) {
  const node = document.createElementNS(ns, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (text !== undefined) node.textContent = text;
  return node;
}

function getDomainIconMarkup(label) {
  return domainIcons[label.trim().toLowerCase()] || '';
}

function getDomainLabelLines(label) {
  if (label.startsWith('Dev ')) {
    const [first, ...rest] = label.split(' ');
    return [first, rest.join(' ')];
  }
  return [label];
}

// Crée un groupe unique icône + texte, dont la largeur réelle sera
// mesurée après insertion dans le DOM SVG (évite les approximations).
function createDomainAxisLabel(skill, x, y, anchor) {
  const group = element('g', {class: 'radar-axis-group'});
  const lines = getDomainLabelLines(skill.label);
  const iconSize = 20;
  const gap = 9;

  const icon = element('svg', {
    class: 'radar-axis-icon',
    viewBox: '0 0 24 24',
    x: 0,
    y: -iconSize / 2,
    width: iconSize,
    height: iconSize,
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.8',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    focusable: 'false'
  });
  icon.innerHTML = getDomainIconMarkup(skill.label);
  group.append(icon);

  const textNodes = lines.map((line, index) => {
    const yText = lines.length === 2 ? (index === 0 ? -12 : 14) : 1;
    const text = element('text', {
      x: iconSize + gap,
      y: yText,
      'text-anchor': 'start',
      'dominant-baseline': 'middle',
      class: 'radar-axis-label radar-axis-text'
    }, line);
    group.append(text);
    return text;
  });

  if (skill.value >= .85) group.classList.add('radar-axis-strong');

  const position = () => {
    // Mesure la police réellement rendue, quelle que soit la taille d'écran.
    const textWidth = Math.max(...textNodes.map(node => {
      const measured = node.getComputedTextLength();
      return measured > 0 ? measured : node.textContent.length * 14;
    }));
    const width = iconSize + gap + textWidth;
    const offset = anchor === 'middle' ? -width / 2 : anchor === 'end' ? -width : 0;
    group.setAttribute('transform', `translate(${x + offset} ${y})`);
  };

  return {group, textNodes, position};
}

// Les cinq pictogrammes du profil accompagnent la souris sur tout le site.
// Animation décorative : aucune interception des clics et aucune animation
// sur écran tactile ou avec la préférence « réduire les animations ».
export function initCursorTrail() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.querySelector('.site-cursor-trail')) return;

  // Le SVG est positionné sur le viewport. Ses coordonnées sont donc
  // celles de clientX/clientY, même lorsque la page défile.
  const trail = element('svg', {
    class: 'site-cursor-trail',
    'aria-hidden': 'true',
    'pointer-events': 'none',
    focusable: 'false'
  });

  const specs = [
    {name: 'dev backend',  offsetX: -26, offsetY: -22, size: 18, ease: .18},
    {name: 'dev frontend', offsetX:  31, offsetY:  -8, size: 16, ease: .13},
    {name: 'ia',           offsetX:  -9, offsetY:  32, size: 16, ease: .10},
    {name: 'data',         offsetX: -45, offsetY:  20, size: 15, ease: .12},
    {name: 'devops',       offsetX:  39, offsetY:  32, size: 15, ease: .09}
  ];

  const icons = specs.map(spec => {
    const node = element('g', {class: 'site-cursor-icon'});
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
    return {...spec, node, x: 0, y: 0};
  });
  document.body.append(trail);

  let pointer = null;
  let frameId = 0;
  const withinViewport = (x, y) => ({
    x: Math.max(12, Math.min(window.innerWidth - 12, x)),
    y: Math.max(12, Math.min(window.innerHeight - 12, y))
  });

  function draw() {
    frameId = 0;
    if (!pointer) return;
    let moving = false;

    icons.forEach(icon => {
      const goal = withinViewport(
        pointer.x + icon.offsetX,
        pointer.y + icon.offsetY
      );
      const dx = goal.x - icon.x;
      const dy = goal.y - icon.y;
      icon.x += dx * icon.ease;
      icon.y += dy * icon.ease;
      icon.node.setAttribute('transform',
        `translate(${icon.x.toFixed(2)} ${icon.y.toFixed(2)})`);
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

  window.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const x = event.clientX;
    const y = event.clientY;
    if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
      hide();
      return;
    }

    if (!pointer) {
      icons.forEach(icon => {
        const start = withinViewport(x + icon.offsetX, y + icon.offsetY);
        icon.x = start.x;
        icon.y = start.y;
        icon.node.setAttribute('transform',
          `translate(${icon.x.toFixed(2)} ${icon.y.toFixed(2)})`);
      });
    }
    pointer = {x, y};
    trail.classList.add('is-visible');
    if (!frameId) frameId = requestAnimationFrame(draw);
  }, {passive: true});

  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hide();
  });
}

function renderRadar(key, profile) {
  const stage = document.getElementById(`radar-${key}`);
  if (!stage) return;
  const isStack = key === 'stack', cx = 300, cy = 232, radius = 152;
  const labelRadius = isStack ? 193 : 197, skills = profile.skills;
  const angle = index => -Math.PI / 2 + index * Math.PI * 2 / skills.length;
  const point = (index, scale = 1, r = radius) => [cx + Math.cos(angle(index)) * r * scale, cy + Math.sin(angle(index)) * r * scale];
  const coords = scale => skills.map((_, index) => point(index, scale).join(',')).join(' ');
  const svg = element('svg', {viewBox: '0 0 600 460', role: 'img', 'aria-labelledby': `chart-title-${key} chart-desc-${key}`, class: `radar-svg ${isStack ? 'radar-stack-svg' : ''}`});
  svg.append(element('title', {id: `chart-title-${key}`}, profile.title));
  svg.append(element('desc', {id: `chart-desc-${key}`}, profile.summary + ' Chaque axe représente une compétence. La surface est plus étendue vers les compétences les plus pratiquées. Les boutons sous le graphe donnent le contexte de chaque axe.'));
  const grid = element('g', {class: 'radar-grid', 'aria-hidden': 'true'});
  for (let level = 1; level <= 5; level++) grid.append(element('polygon', {points: coords(level / 5), class: level === 5 ? 'radar-grid-outer' : ''}));
  skills.forEach((_, index) => {const [px, py] = point(index);grid.append(element('line', {x1: cx, y1: cy, x2: px, y2: py}));});
  svg.append(grid);
  const data = element('g', {class: 'radar-data', 'aria-hidden': 'true'});
  data.append(element('polygon', {points: skills.map((s, i) => point(i, Math.max(0, Math.min(1, s.value))).join(',')).join(' '), class: 'radar-shape'}));
  const dots = [], labels = [], domainLabels = [];
  skills.forEach((skill, index) => {
    const [dx, dy] = point(index, Math.max(0, Math.min(1, skill.value)));
    const dot = element('circle', {cx: dx, cy: dy, r: isStack ? 3.3 : 4, class: 'radar-dot'});
    dots.push(dot);data.append(dot);
    const [lx, ly] = point(index, 1, labelRadius), cos = Math.cos(angle(index));
    const anchor = Math.abs(cos) < .15 ? 'middle' : cos > 0 ? 'start' : 'end';

    if (isStack) {
      const label = element('text', {x: lx, y: ly, 'text-anchor': anchor, 'dominant-baseline': 'middle', class: 'radar-axis-label'}, skill.label);
      if (skill.value >= .85) label.classList.add('radar-axis-strong');
      svg.append(label);
      const number = element('text', {x: lx, y: ly, 'text-anchor': anchor, 'dominant-baseline': 'middle', class: 'radar-axis-number'}, String(index + 1).padStart(2, '0'));
      svg.append(number);
      labels.push([label, number]);
    } else {
      const label = createDomainAxisLabel(skill, lx, ly, anchor);
      svg.append(label.group);
      labels.push([label.group, ...label.textNodes]);
      domainLabels.push(label);
    }
  });
  svg.append(data);
  svg.append(element('circle', {cx, cy, r: 2, class: 'radar-origin', 'aria-hidden': 'true'}));
  const spotlight = element('g', {class: 'radar-spotlight', 'aria-hidden': 'true', visibility: 'hidden'});
  const beam = element('line', {x1: cx, y1: cy, x2: cx, y2: cy, class: 'radar-beam'});
  const halo = element('circle', {cx, cy, r: 13, class: 'radar-halo'});
  spotlight.append(beam, halo);svg.append(spotlight);
  const legend = document.createElement('div');
  legend.className = `radar-legend ${isStack ? 'radar-legend-stack' : 'radar-legend-domains'}`;
  legend.setAttribute('role', 'group');legend.setAttribute('aria-label', `Explorer les axes : ${profile.title}`);
  const insight = document.getElementById(`insight-${key}`), controls = [];
  const insightNodes = [insight.querySelector('.insight-label'), insight.querySelector('p'), insight.querySelector('span:last-child')];
  const defaultInsight = insightNodes.map(node => node.textContent);
  insight.setAttribute('aria-live', 'polite');
  let selectedIndex = null;
  function activate(index) {
    selectedIndex = selectedIndex === index ? null : index;
    controls.forEach((button, i) => {button.classList.toggle('is-selected', i === selectedIndex);button.setAttribute('aria-pressed', String(i === selectedIndex));});
    dots.forEach((dot, i) => dot.classList.toggle('is-highlighted', i === selectedIndex));
    labels.forEach((axisLabels, i) => axisLabels.forEach(label => label.classList.toggle('is-active-axis', i === selectedIndex)));
    svg.classList.toggle('has-active-axis', selectedIndex !== null);
    spotlight.setAttribute('visibility', selectedIndex === null ? 'hidden' : 'visible');
    if (selectedIndex === null) {
      insightNodes.forEach((node, i) => {node.textContent = defaultInsight[i];});
    } else {
      const skill = skills[selectedIndex];
      insightNodes[0].textContent = 'COMPÉTENCE / ' + String(selectedIndex + 1).padStart(2, '0');
      insightNodes[1].textContent = skill.label;
      insightNodes[2].textContent = skill.detail;
      const [hx, hy] = point(selectedIndex, Math.max(0, Math.min(1, skill.value)));
      beam.setAttribute('x2', hx);beam.setAttribute('y2', hy);
      halo.setAttribute('cx', hx);halo.setAttribute('cy', hy);
      animateNode(spotlight, [{opacity: 0}, {opacity: 1}], 240);
      animateNode(halo, [{r: '8px', opacity: 1}, {r: '26px', opacity: 0}], 700);
    }
    animateNode(insight, [{opacity: .3, transform: 'translateY(5px)'}, {opacity: 1, transform: 'translateY(0)'}], 260);
  }
  skills.forEach((skill, index) => {
    const button = document.createElement('button');
    button.type = 'button';button.className = 'radar-skill' + (skill.value >= .85 ? ' radar-skill-strong' : '');
    button.setAttribute('aria-pressed', 'false');button.setAttribute('aria-controls', `insight-${key}`);
    const number = document.createElement('span');number.className = 'mono';number.textContent = String(index + 1).padStart(2, '0');
    button.append(number);
    if (isStack) button.insertAdjacentHTML('beforeend', renderTech(skill.label));
    else {
      button.insertAdjacentHTML('beforeend', `<svg class="radar-domain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${getDomainIconMarkup(skill.label)}</svg>`);
      button.append(document.createTextNode(skill.label));
    }
    button.addEventListener('click', () => activate(index));
    controls.push(button);legend.append(button);
  });
  stage.replaceChildren(svg, legend);
  // Le graphe doit être dans le DOM pour que SVG mesure les vrais textes.
  domainLabels.forEach(label => label.position());
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => domainLabels.forEach(label => label.position()));
  }
}

export function initRadars(profiles) {
  Object.entries(profiles).forEach(([key, profile]) => renderRadar(key, profile));
  const tabs = [...document.querySelectorAll('[data-chart]')];
  function selectTab(tab) {
    tabs.forEach(button => {
      const active = button === tab;button.setAttribute('aria-selected', String(active));button.tabIndex = active ? 0 : -1;
      document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
    });
    animateRadar(document.getElementById(tab.getAttribute('aria-controls')));
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();selectTab(tabs[next]);tabs[next].focus();
    });
  });
}
