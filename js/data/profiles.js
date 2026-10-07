// Repères d’auto-évaluation entre 0 et 1, sans certification de maîtrise.
export const profiles = {
    domains: {
      title: 'Profil général',
      summary: 'Profil principalement orienté backend et fullstack.',
      skills: [
        { label: 'Dev back', value: .94, detail: 'Développement d’API et de logique métier avec Java et Spring Boot.' },
        { label: 'Dev fullstack', value: .90, detail: 'Backend et interface reliés dans GESCO, Penpot AI Assistant et MathQuest.' },
        { label: 'Dev front', value: .67, detail: 'Interfaces Angular et Angular Material ; expérience avec React et TypeScript.' },
        { label: 'Data', value: .65, detail: 'Traitement de données avec Python, SQL, Pandas et exploration de graphes Neo4j.' },
        { label: 'IA', value: .68, detail: 'Spring AI, RAG, Tool Calling et intégration de modèles locaux avec Ollama.' },
        { label: 'DevOps', value: .76, detail: 'Docker, GitLab CI/CD, Linux et Nginx, notamment sur MathQuest.' },
      ],
    },
    stack: {
      title: 'Stack fullstack',
      summary: 'Java, Spring Boot, Angular, PostgreSQL et Docker sont les principaux points forts.',
      skills: [
        { label: 'Java', value: .94, detail: 'Un langage central dans mon expérience professionnelle et mes projets de master.' },
        { label: 'Spring Boot', value: .96, detail: 'API REST, services métier et intégration de fonctionnalités IA avec Spring AI.' },
        { label: 'Angular', value: .91, detail: 'Interfaces métier, composants Angular Material et plugin Penpot.' },
        { label: 'PostgreSQL', value: .92, detail: 'Base relationnelle utilisée dans l’application GESCO.' },
        { label: 'Docker', value: .88, detail: 'Conteneurisation et environnements de développement et de déploiement.' },
        { label: 'TypeScript', value: .76, detail: 'Développement des interfaces et composants Angular.' },
        { label: 'JavaScript', value: .72, detail: 'Interactions web et développement côté navigateur.' },
        { label: 'Python', value: .70, detail: 'Traitement de données, analyse et projets d’intelligence artificielle.' },
        { label: 'React', value: .59, detail: 'Expérience frontend, notamment dans le projet MathQuest.' },
        { label: 'FastAPI', value: .54, detail: 'Technologie backend complémentaire pour développer des API en Python.' },
        { label: 'Django', value: .51, detail: 'Framework web Python présent dans ma boîte à outils.' },
        { label: 'MySQL', value: .60, detail: 'Base relationnelle complémentaire à PostgreSQL.' },
        { label: 'SQL Server', value: .56, detail: 'Autre système de gestion de bases de données relationnelles.' },
        { label: 'MongoDB', value: .62, detail: 'Base documentaire utilisée dans MathQuest et des projets de données.' },
        { label: 'Neo4j', value: .64, detail: 'Modélisation et exploration de relations sous forme de graphes.' },
      ],
    },
  };
