import { projectVisuals } from './project-visuals.js';
import { escapeHtml as escape } from '../utils/html.js';

function renderLink(link) {
  return link ? `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">${escape(link.label)}</a>` : '';
}

function renderLinkedIn(project) {
  if (!project.linkedin) return '';
  const { embedUrl, postUrl, height } = project.linkedin;
  return `<details class="project-post">
    <summary>Présentation sur LinkedIn <span aria-hidden="true">+</span></summary>
    <div class="linkedin-post">
      <iframe src="${escape(embedUrl)}" width="504" height="${escape(height)}"
        loading="lazy" allowfullscreen title="Présentation du projet ${escape(project.title)} sur LinkedIn"></iframe>
      ${renderLink({ url: postUrl, label: 'Ouvrir le post sur LinkedIn' })}
    </div>
  </details>`;
}

function renderCard(project, index) {
  return `<article class="project-card ${escape(project.id)}">
    ${projectVisuals[project.id] || ''}
    <div class="project-body">
      <div class="project-meta"><span>${escape(project.context)}</span><span>${String(index + 1).padStart(2, '0')}</span></div>
      <h3>${escape(project.title)}</h3>
      <p>${escape(project.description)}</p>
      <ul class="tags" aria-label="${escape(project.tagsLabel || 'Technologies')}">
        ${project.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}
      </ul>
      <details>
        <summary>${escape(project.detailsLabel || 'Ma contribution')} <span aria-hidden="true">+</span></summary>
        <div class="project-details">${escape(project.contribution)}${renderLink(project.link)}</div>
      </details>
      ${renderLinkedIn(project)}
    </div>
  </article>`;
}

export function renderProjects(projects) {
  const grid = document.getElementById('project-grid');
  if (grid) grid.innerHTML = projects.map(renderCard).join('');
}
