import { h, S, getDays, todayIdx } from '../core.js';
import { STORIES } from '../data/days.js';
import { storyCard, missingLinksNote } from '../shared.js';
import { STORY_TIPS } from '../data/guide.js';

export default async function (root, r) {
  const DAYS = await getDays(); let sel = +r.q.d || (todayIdx(DAYS) >= 1 && todayIdx(DAYS) <= 7 ? todayIdx(DAYS) : 1);
  const list = h('div', { class: 'col mt' }); const chips = h('div', { class: 'chips', role: 'tablist' });
  const draw = () => {
    chips.innerHTML = ''; DAYS.forEach((d) => chips.append(h('button', { class: 'chip' + (sel === d.n ? ' on' : ''), role: 'tab', onclick: () => { sel = d.n; draw(); } }, `${d.dow.slice(0, 3)} ${d.date.slice(8)} · ${d.name}`)));
    list.innerHTML = ''; const items = STORIES.filter((s) => s.d === sel);
    const done = items.filter((s) => S.checks['s:' + s.id]).length;
    list.append(h('p', { class: 'muted small' }, `${items.length} historias · ${done} publicadas`), ...items.map(storyCard));
  };
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Historias estratégicas'), h('p', { class: 'muted' }, 'Cada historia viene completa: escena, texto literal, guion, sticker y llamado a la acción. Las vistas previas son referencias visuales; reemplázalas con tu foto o video real.'), missingLinksNote(),
    h('details', { class: 'glass faq mt' }, h('summary', {}, h('span', { class: 'pill o' }, 'Guía'), h('b', {}, 'Cómo hacer historias que la gente recuerde')), h('ul', { class: 'small' }, STORY_TIPS.map(([t, d]) => h('li', {}, h('b', {}, t + ': '), d))), h('a', { class: 'btn sm mt', href: '#/ideas?tab=escenas' }, 'Ver escenas para grabar con tu celular')),
    h('div', { class: 'banner mt' }, 'Dos formas de usarlas: 1) copia el texto y edita la historia directamente en Instagram (lo ideal), o 2) sube tu foto en cada tarjeta y descarga la imagen ya armada.'), chips, list);
  draw();
}
