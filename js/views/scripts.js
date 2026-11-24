import { h, S } from '../core.js';
import { SCRIPTS, SCRIPT_NOTE } from '../data/scripts.js';

export default async function (root) {
  let f = 'Todos'; const kinds = ['Todos', ...new Set(SCRIPTS.map((s) => s.kind))]; const list = h('div', { class: 'grid g2 mt' }); const chips = h('div', { class: 'chips' });
  const draw = () => {
    chips.innerHTML = ''; kinds.forEach((k) => chips.append(h('button', { class: 'chip' + (f === k ? ' on' : ''), onclick: () => { f = k; draw(); } }, k)));
    list.innerHTML = ''; SCRIPTS.filter((s) => f === 'Todos' || s.kind === f).forEach((s) => list.append(h('a', { class: 'glass', href: `#/guion/${s.id}`, style: { textDecoration: 'none', color: '#fff' } },
      h('div', { class: 'row gap wrap' }, h('span', { class: 'pill o' }, s.kind), s.day ? h('span', { class: 'pill' }, `Día ${s.day}`) : null, h('span', { class: 'pill' }, s.dur), S.checks['g:' + s.id] ? h('span', { class: 'pill' }, '✓ Grabado') : null), h('h3', { style: { margin: '10px 0 4px' } }, s.title), h('p', { class: 'muted small' }, s.obj))));
  };
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Guiones virales'), h('div', { class: 'banner' }, SCRIPT_NOTE),
    h('a', { class: 'btn primary mt', href: '#/guion/nuevo' }, '✨ Estudio de guiones (generador con IA opcional)'), chips, list); draw();
}
