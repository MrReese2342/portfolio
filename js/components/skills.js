
import { escapeHtml as escape } from '../utils/html.js';
import { renderTech } from '../utils/tech-icons.js';

export function renderSkills(categories, education) {
  const grid = document.getElementById('skills-grid');
  if (grid) grid.innerHTML = categories.map((category, index) => `
    <div class="skill-row">
      <span class="skill-number mono">${String(index + 1).padStart(2, '0')} /</span>
      <h3>${escape(category.title)}</h3>
      <div class="skill-tech-list">
        ${category.lines.map(line => `
          <div class="skill-tech-line">${line.map(renderTech).join('')}</div>
        `).join('')}
      </div>
    </div>`).join('');

  const formation = document.getElementById('education');
  if (formation) formation.innerHTML = `
    <span class="mono">FORMATION</span>
    <div><h3>${escape(education.title)}</h3><p>${escape(education.description)}</p></div>
    <span class="education-mark" aria-hidden="true">${escape(education.mark)}</span>`;
}
