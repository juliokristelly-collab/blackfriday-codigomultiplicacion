import { h } from '../core.js';
import { RULES, DISCLOSURE } from '../data/messages.js';
export default async function (root) {
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Reglas de oro'), h('p', { class: 'muted' }, 'Vender bien es vender con verdad. Estas reglas protegen a tu audiencia y a tu reputación.'), h('ol', { class: 'col mt' }, RULES.map((r) => h('li', { class: 'glass' }, r))), h('section', { class: 'glass mt' }, h('h2', {}, 'Aviso de afiliación sugerido'), h('p', {}, DISCLOSURE)));
}
