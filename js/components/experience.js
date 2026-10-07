import { escapeHtml as escape } from '../utils/html.js';

export function renderExperience(experience) {
  const container = document.getElementById('experience-content');
  if (!container) return;
  container.innerHTML = `
    <div class="experience-aside">
      <div class="experience-brand">
        <span class="company-logo"><img src="${escape(experience.logo)}" alt="" width="32" height="32" loading="lazy"></span>
        <span class="experience-company">${escape(experience.company)}<span>.</span></span>
      </div>
      <p>${escape(experience.role)}<br>${escape(experience.location)}</p>
      <span class="mono">${experience.tools.map(row => row.map(escape).join(' / ')).join('<br>')}</span>
    </div>
    <div class="experience-main">
      <h3>${experience.heading.map(escape).join('<br>')}</h3>
      <p>${escape(experience.description)}</p>
      <div class="experience-points">
        ${experience.points.map((point, index) => `
          <div><span class="point-index mono">${String(index + 1).padStart(2, '0')}</span>
            <div><h4>${escape(point.title)}</h4><p>${escape(point.description)}</p></div>
          </div>`).join('')}
      </div>
    </div>`;
}
