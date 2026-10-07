import { escapeHtml as escape } from '../utils/html.js';

export function renderSkills(categories, education) {
  const grid = document.getElementById('skills-grid');
  if (grid) grid.innerHTML = categories.map((category, index) => `
    <div class="skill-row">
      <span class="skill-number mono">${String(index + 1).padStart(2, '0')} /</span>
      <h3>${escape(category.title)}</h3>
      <p>${category.lines.map(line => line.map(escape).join(' · ')).join('<br>')}</p>
    </div>`).join('');
  const formation = document.getElementById('education');
  if (formation) formation.innerHTML = `
    <span class="mono">FORMATION</span>
    <div><h3>${escape(education.title)}</h3><p>${escape(education.description)}</p></div>
    <span class="education-mark" aria-hidden="true">${escape(education.mark)}</span>`;
}
