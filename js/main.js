import { projects } from './data/projects.js';
import { experience } from './data/experience.js';
import { profiles } from './data/profiles.js';
import { skillCategories, education } from './data/skills.js';
import { renderProjects } from './components/projects.js';
import { renderExperience } from './components/experience.js';
import { renderSkills } from './components/skills.js';
import { initRadars } from './components/radar.js';
import { initNavigation } from './navigation.js';
import { initScrollAnimations, initProfileGlow } from './animations.js';

// Les modules sont différés par le navigateur : le DOM est prêt ici.
renderProjects(projects);
renderExperience(experience);
renderSkills(skillCategories, education);
initRadars(profiles);
initNavigation();
initScrollAnimations();
initProfileGlow();
