
import { escapeHtml } from './html.js';

// Logos Devicon : aucun script externe, uniquement des SVG affichés comme images.
const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const logos = {
  'java': 'java/java-original.svg',
  'spring boot': 'spring/spring-original.svg',
  'spring ai': 'spring/spring-original.svg',
  'python': 'python/python-original.svg',
  'fastapi': 'fastapi/fastapi-original.svg',
  'angular': 'angular/angular-original.svg',
  'react': 'react/react-original.svg',
  'typescript': 'typescript/typescript-original.svg',
  'javascript': 'javascript/javascript-original.svg',
  'django': 'django/django-plain.svg',
  'postgresql': 'postgresql/postgresql-original.svg',
  'mongodb': 'mongodb/mongodb-original.svg',
  'neo4j': 'neo4j/neo4j-original.svg',
  'pandas': 'pandas/pandas-original.svg',
  'ollama': 'ollama/ollama-original.svg',
  'docker': 'docker/docker-original.svg',
  'git': 'git/git-original.svg',
  'gitlab ci/cd': 'gitlab/gitlab-original.svg',
  'kafka': 'apachekafka/apachekafka-original.svg',
  'linux': 'linux/linux-original.svg',
  'bash': 'bash/bash-original.svg',
  'nginx': 'nginx/nginx-original.svg',
  'mysql': 'mysql/mysql-original.svg',
  'sql server': 'microsoftsqlserver/microsoftsqlserver-plain.svg',
  'extension chrome': 'chrome/chrome-original.svg',
  'google oauth': 'google/google-original.svg'
};

// Les concepts sans logo officiel ont un pictogramme simple plutôt qu'un faux logo.
const symbols = {
  'apis rest': '<path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  'rag': '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5M8 16h4"/>',
  'tool calling': '<rect x="3" y="4" width="7" height="6" rx="1"/><rect x="14" y="14" width="7" height="6" rx="1"/><path d="M10 7h4a3 3 0 0 1 3 3v4M7 10v7h7"/>',
  'suivi persistant': '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  'weka': '<path d="M4 19V5M4 19h16M8 15l4-5 3 2 5-7"/><circle cx="8" cy="15" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="15" cy="12" r="1"/>',
  'basex': '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>'
};

export function renderTech(name) {
  const label = String(name);
  const key = label.trim().toLowerCase();
  const logo = logos[key];
  let icon = '';

  if (logo) {
    icon = `<img class="tech-icon" src="${ICON_BASE}${logo}" alt="" loading="lazy" decoding="async">`;
  } else if (symbols[key]) {
    icon = `<svg class="tech-icon tech-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[key]}</svg>`;
  }

  return `<span class="tech-item">${icon}<span class="tech-name">${escapeHtml(label)}</span></span>`;
}

// En cas de connexion bloquée au CDN, le libellé reste lisible sans image cassée.
if (typeof document !== 'undefined') {
  document.addEventListener('error', event => {
    if (event.target instanceof HTMLImageElement && event.target.classList.contains('tech-icon')) {
      event.target.hidden = true;
      event.target.style.display = 'none';
    }
  }, true);
}
