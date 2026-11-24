import { h, S, save, copyText, fill, phase } from '../core.js';
import { LIVES, LIVE_FAQ, LIVE_TITLE } from '../data/messages.js';
import { openTele } from './tele.js';
import { missingLinksNote } from '../shared.js';

export default async function (root, r) {
  let k = LIVES[r.q.d] ? r.q.d : 'vie'; const body = h('div', { class: 'mt' }); const chips = h('div', { class: 'chips' });
  const draw = () => {
    chips.innerHTML = ''; Object.entries(LIVES).forEach(([id, l]) => chips.append(h('button', { class: 'chip' + (k === id ? ' on' : ''), onclick: () => { k = id; history.replaceState(null, '', `#/live?d=${id}`); draw(); } }, l.name.split('—')[0].trim())));
    const L = LIVES[k]; body.innerHTML = ''; const script = L.blocks.map((b) => `[${b.min} min] ${b.title}\n${b.say}`).join('\n\n');
    body.append(h('section', { class: 'glass glow' }, h('span', { class: 'pill o' }, L.dur), h('h2', { style: { margin: '8px 0' } }, L.name), h('p', { class: 'serif', style: { fontSize: '1.3rem' } }, L.title),
      h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary', onclick: () => openTele(script, L.name) }, '▶ Teleprompter'), h('button', { class: 'btn', onclick: () => copyText(script) }, 'Copiar guion'),
        h('label', { class: 'row gap', style: { cursor: 'pointer' } }, h('input', { type: 'checkbox', checked: !!S.checks['l:' + k], onchange: (e) => { if (e.target.checked) { S.checks['l:' + k] = true; S.counters.lives = (+S.counters.lives || 0) + 1; } else { delete S.checks['l:' + k]; S.counters.lives = Math.max(0, (+S.counters.lives || 0) - 1); } save(); } }), 'Live realizado'))),
      h('div', { class: 'mt' }, missingLinksNote()),
      ...L.blocks.map((b) => h('div', { class: 'glass mt' }, h('div', { class: 'row between' }, h('b', {}, b.title), h('span', { class: 'pill' }, b.min + ' min')), h('ul', { class: 'small muted' }, b.pts.map((x) => h('li', {}, x))), h('p', {}, fill(b.say).text))),
      h('section', { class: 'glass mt' }, h('h2', {}, 'Preguntas frecuentes (respuestas confirmadas)'), ...LIVE_FAQ.map(([q, a]) => h('details', { class: 'mt' }, h('summary', { style: { cursor: 'pointer', fontWeight: 700 } }, q), h('p', { class: 'muted' }, a)))),
      h('div', { class: 'banner mt' }, 'No presentes testimonios, capturas ni resultados que no sean reales y autorizados. No prometas ingresos.'));
  };
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Live Selling'), h('p', { class: 'muted' }, LIVE_TITLE), chips, body); draw();
}
