import { animateNode, animateRadar } from '../animations.js';

const ns = 'http://www.w3.org/2000/svg';
function element(tag, attrs = {}, text) {
  const node = document.createElementNS(ns, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (text !== undefined) node.textContent = text;
  return node;
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
  skills.forEach((_, index) => {const [x, y] = point(index);grid.append(element('line', {x1: cx, y1: cy, x2: x, y2: y}));});
  svg.append(grid);
  const data = element('g', {class: 'radar-data', 'aria-hidden': 'true'});
  data.append(element('polygon', {points: skills.map((s, i) => point(i, Math.max(0, Math.min(1, s.value))).join(',')).join(' '), class: 'radar-shape'}));
  const dots = [], labels = [];
  skills.forEach((skill, index) => {
    const [x, y] = point(index, Math.max(0, Math.min(1, skill.value)));
    const dot = element('circle', {cx: x, cy: y, r: isStack ? 3.3 : 4, class: 'radar-dot'});
    dots.push(dot);data.append(dot);
    const [lx, ly] = point(index, 1, labelRadius), cos = Math.cos(angle(index));
    const anchor = Math.abs(cos) < .15 ? 'middle' : cos > 0 ? 'start' : 'end';
    const label = element('text', {x: lx, y: ly, 'text-anchor': anchor, 'dominant-baseline': 'middle', class: 'radar-axis-label'}, skill.label);
    if (!isStack && skill.label.startsWith('Dev ')) {
      label.textContent = '';
      const parts = skill.label.split(' ');
      label.append(element('tspan', {x: lx, dy: '-.55em'}, parts[0]));
      label.append(element('tspan', {x: lx, dy: '1.15em'}, parts.slice(1).join(' ')));
    }
    if (skill.value >= .85) label.classList.add('radar-axis-strong');
    svg.append(label);
    const axisLabels = [label];
    if (isStack) {
      const number = element('text', {x: lx, y: ly, 'text-anchor': anchor, 'dominant-baseline': 'middle', class: 'radar-axis-number'}, String(index + 1).padStart(2, '0'));
      svg.append(number);axisLabels.push(number);
    }
    labels.push(axisLabels);
  });
  svg.append(data);
  svg.append(element('circle', {cx, cy, r: 2, class: 'radar-origin', 'aria-hidden': 'true'}));
  const spotlight = element('g', {class: 'radar-spotlight', 'aria-hidden': 'true', visibility: 'hidden'});
  const beam = element('line', {x1: cx, y1: cy, x2: cx, y2: cy, class: 'radar-beam'});
  const halo = element('circle', {cx, cy, r: 13, class: 'radar-halo'});
  spotlight.append(beam, halo);svg.append(spotlight);
  const legend = document.createElement('div');
  legend.className = `radar-legend ${isStack ? 'radar-legend-stack' : ''}`;
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
      const [x, y] = point(selectedIndex, Math.max(0, Math.min(1, skill.value)));
      beam.setAttribute('x2', x);beam.setAttribute('y2', y);
      halo.setAttribute('cx', x);halo.setAttribute('cy', y);
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
    button.append(number, document.createTextNode(skill.label));button.addEventListener('click', () => activate(index));
    controls.push(button);legend.append(button);
  });
  stage.replaceChildren(svg, legend);
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
