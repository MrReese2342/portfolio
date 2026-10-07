# Portfolio Abderrahmane El Hathout

Portfolio personnel en français, réalisé en HTML, CSS et JavaScript. Pas de framework, de compilation ou de dépendance à installer pour utiliser le site.

## Contenu

- Présentation et contacts.
- Deux radars de compétences : profil général (6 axes) et stack fullstack (15 technologies).
- Projets : Penpot AI Assistant, ReplyZero, BigDDMining et MathQuest.
- Expérience chez Dedalus, compétences et formation.
- CV PDF téléchargeable.

Le radar général met en avant le backend et le fullstack. Le radar technique met en avant Java, Spring Boot, Angular, PostgreSQL et Docker. Les valeurs sont des repères relatifs proposés, à ajuster selon votre propre auto-évaluation ; elles ne représentent pas des pourcentages de maîtrise.

## Fichiers de la version GitHub

| Fichier / dossier | Rôle |
| --- | --- |
| `index.html` | Contenu, projets, expérience et liens |
| `style.css` | Mise en page, couleurs, responsive et styles des radars |
| `app.js` | Technologies, valeurs des radars, interactions et onglets |
| `fonts/` | Polices locales : DM Sans et Instrument Serif |
| `Abderrahmane-El-Hathout-CV.pdf` | CV téléchargeable |
| `.nojekyll` | Publication du site statique sur GitHub Pages |
| `README.md` | Ce guide |

Tous les chemins sont relatifs. Le site fonctionne à la racine d’un domaine et sous un chemin comme `/portfolio/`.

## Mettre le site sur GitHub Pages

1. Sur GitHub, créez un dépôt **public** nommé `portfolio`.
2. Décompressez l’archive fournie.
3. Importez **le contenu du dossier décompressé** à la racine du dépôt : `index.html`, `style.css`, `app.js`, le dossier `fonts`, le PDF, `.nojekyll` et ce README. L’entrée du site doit être à la racine : `index.html`, et non `portfolio/index.html` dans un sous-dossier supplémentaire.
4. Validez l’ajout sur la branche `main`.
5. Ouvrez **Settings → Pages**.
6. Dans **Build and deployment → Source**, sélectionnez **Deploy from a branch**.
7. Choisissez **main** et **/(root)**, puis **Save**.
8. Attendez la fin du déploiement. Le lien publié apparaît dans **Settings → Pages**. Pour le compte `MrReese2342` et le dépôt `portfolio`, l’adresse attendue est `https://mrreese2342.github.io/portfolio/`.

Si vous utilisez l’import par le navigateur, glissez les fichiers ET le dossier `fonts` dans la zone d’import pour conserver son arborescence. Si `.nojekyll` n’a pas été importé, utilisez **Add file → Create new file** et créez un fichier nommé `.nojekyll` avec une ligne contenant `# Site statique`.

Documentation officielle :
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Alternative : avec Git

Après avoir créé un dépôt vide `portfolio` sur GitHub, ouvrez un terminal dans le dossier décompressé :

```bash
git init
git add .
git commit -m "feat: portfolio avec radars de competences"
git branch -M main
git remote add origin https://github.com/MrReese2342/portfolio.git
git push -u origin main
```

Ces commandes supposent un nouveau dossier local sans dépôt Git et un dépôt GitHub vide. Utilisez vos méthodes habituelles de connexion à GitHub. Configurez ensuite Pages comme décrit plus haut.

## Personnaliser les radars

Dans `app.js`, modifiez l’objet `profiles` au début du fichier.

```javascript
{ label: 'Spring Boot', value: .96, detail: 'API REST et services métier.' }
```

- `label` : nom de l’axe.
- `value` : intensité relative entre `0` et `1`. Plus elle est haute, plus le polygone s’étend vers cet axe.
- `detail` : texte affiché quand on clique sur la compétence dans la légende.

`profiles.domains.skills` contient le radar général. `profiles.stack.skills` contient les technologies. Ajouter ou retirer un objet met automatiquement à jour les axes et la légende. Les cinq valeurs les plus fortes ont été orientées vers les technologies demandées ; vous pouvez ajuster librement les valeurs.

Un clic sur une compétence affiche son contexte et souligne son axe. Un deuxième clic sur la même compétence annule la sélection et restaure le résumé initial (backend + fullstack pour le profil général). Ce comportement fonctionne aussi sur le radar technique. Les graphiques se dessinent à leur apparition et au changement d’onglet ; les détails et cartes de projets ont des transitions discrètes. La préférence système de réduction des animations est respectée.

Sur les petits écrans, le radar technique utilise les numéros d’axes. La légende juste en dessous associe chaque numéro au nom de sa technologie. Les boutons restent accessibles au clavier et au toucher. Les onglets peuvent être parcourus avec les touches gauche/droite, Début et Fin.

## Modifier le contenu

- Projets, textes et contacts : `index.html`.
- Couleurs et mise en page : `style.css`.
- CV : remplacez le PDF en conservant son nom, ou modifiez les deux liens de téléchargement dans `index.html`.
- LinkedIn : ajoutez votre URL exacte à la zone de contact de `index.html`.

Les illustrations des projets sont des schémas et des interfaces de présentation, pas des captures de leurs applications. ReplyZero est présenté comme un projet en développement.

## Tester localement

Ouvrez `index.html` dans un navigateur, ou utilisez un petit serveur local :

```bash
python -m http.server 8000
```

Puis ouvrez `http://localhost:8000/`. Aucune installation npm n’est nécessaire.

## Polices

DM Sans et Instrument Serif sont distribuées avec leurs licences dans `fonts/`. Elles sont servies localement, sans appel à Google Fonts pendant la visite.
