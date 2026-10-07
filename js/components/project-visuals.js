// Illustrations de présentation des projets.
// Les contenus et technologies sont dans ../data/projects.js.
export const projectVisuals = {
  penpot: `
<div class="project-visual penpot-visual" aria-label="Schéma de fonctionnement de l’assistant IA pour Penpot">
          <div class="visual-heading"><span>PENPOT / AI ASSISTANT</span><span class="mini-symbol" aria-hidden="true">✳</span></div>
          <div class="prompt"><span class="prompt-spark" aria-hidden="true">✦</span> « Modifie cette maquette. »<span class="prompt-cursor" aria-hidden="true"></span></div>
          <div class="workflow"><span>Intention</span><i aria-hidden="true"></i><span>Tool Calling</span><i aria-hidden="true"></i><span>Action</span></div>
          <div class="design-preview" aria-hidden="true"><div class="design-sidebar"><b>Layers</b><span>Frame</span><span>Heading</span><span>Button</span></div><div class="design-stage"><div class="selection-box"><div class="selection-title">Une idée,<br>une interface.</div><span class="selection-button">Commencer</span><i></i><i></i><i></i><i></i></div></div></div>
          <span class="visual-caption">LANGAGE NATUREL → ACTION SUR LA MAQUETTE</span>
        </div>
  `,
  replyzero: `
<div class="project-visual reply-visual" aria-label="Illustration du concept de l’extension ReplyZero">
          <div class="visual-heading"><span>REPLYZERO / CHROME EXTENSION</span><span class="mini-symbol" aria-hidden="true">r.</span></div>
          <div class="reply-window"><div class="window-top"><span class="window-mark">r<span>.</span></span><b>ReplyZero</b><span class="window-avatar" aria-hidden="true">A</span></div><div class="reply-subtitle">Moins de commentaires oubliés.</div><div class="reply-tabs"><span class="selected">Sans réponse</span><span>Traités</span></div><div class="comment-line"><div class="comment-avatar" aria-hidden="true"></div><div><span>Merci pour cette vidéo !</span><small>Une conversation à poursuivre</small></div><span class="comment-check" aria-hidden="true">✓</span></div><div class="comment-line"><div class="comment-avatar second" aria-hidden="true"></div><div><span>Comment ça fonctionne ?</span><small>Une question à traiter</small></div><span class="comment-check" aria-hidden="true">✓</span></div></div>
          <span class="visual-caption">INTERFACE ILLUSTRÉE · PROJET EN COURS</span>
        </div>
  `,
  bigdata: `
<div class="project-visual data-visual"><div class="visual-heading"><span>BIGDDMINING / SCIENTIFIC DATA</span><span class="mini-symbol" aria-hidden="true">{ }</span></div><div class="data-diagram" aria-label="Transformation de corpus scientifiques en relations entre termes"><span class="data-node n1">Corpus</span><span class="data-node n2">Termes</span><span class="data-node n3">Règles</span><span class="data-node n4">Relations</span><svg viewBox="0 0 500 200" preserveAspectRatio="none" aria-hidden="true"><path d="M60 100C130 100 130 45 235 45M60 100C140 100 140 155 240 155M235 45C340 45 340 100 435 100M240 155C340 155 340 100 435 100"/></svg><span class="data-tiny t1 mono">XML / JSON</span><span class="data-tiny t2 mono">NEO4J</span></div><span class="visual-caption">DE LA DONNÉE BRUTE AUX RELATIONS</span></div>
  `,
  mathquest: `
<div class="project-visual math-visual"><div class="visual-heading"><span>MATHQUEST / LEARNING PLATFORM</span><span class="mini-symbol" aria-hidden="true">π</span></div><div class="deployment-diagram" aria-label="Pipeline de déploiement de MathQuest"><div class="branch"><span class="mono">git push</span><b>Une plateforme.<br>Deux environnements.</b></div><div class="deploy-targets"><div><span class="mono">dev</span><strong>TEST</strong><small>Vérifier & itérer</small></div><div><span class="mono">main</span><strong>PROD</strong><small>Déployer & servir</small></div></div></div><span class="visual-caption">REACT · SPRING BOOT · CI/CD</span></div>
  `
};
