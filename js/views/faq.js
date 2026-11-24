import { h, S, save, copyText, fill } from '../core.js';
import { FAQ, FAQ_CATS } from '../data/guide.js';
import { missingLinksNote } from '../shared.js';

const bold = (t) => String(t).split(/(\*[^*]+\*)/).map((p) => (/^\*[^*]+\*$/.test(p) ? h('b', {}, p.slice(1, -1)) : p));
export default async function (root) {
  if (!S.ok.faq) { S.ok.faq = true; save(); }
  let cat = -1, q = '';
  const list = h('div', { class: 'col mt' }); const chips = h('div', { class: 'chips', role: 'tablist' });
  const search = h('input', { type: 'search', placeholder: 'Busca una pregunta: precio, garantía, tiempo…', 'aria-label': 'Buscar pregunta', oninput: (e) => { q = e.target.value.toLowerCase(); draw(); } });
  const draw = () => {
    chips.innerHTML = ''; ['Todas', ...FAQ_CATS].forEach((n, i) => chips.append(h('button', { class: 'chip' + (cat === i - 1 ? ' on' : ''), role: 'tab', onclick: () => { cat = i - 1; draw(); } }, n)));
    list.innerHTML = '';
    const items = FAQ.filter((f) => (cat < 0 || f.c === cat) && (!q || (f.q + ' ' + f.a).toLowerCase().includes(q)));
    if (!items.length) list.append(h('div', { class: 'glass' }, h('p', {}, 'No encontré esa pregunta. Responde con honestidad: «Déjame confirmarlo con el equipo y te respondo hoy».')));
    items.forEach((f) => list.append(h('details', { class: 'glass faq' },
      h('summary', {}, h('span', { class: 'pill' }, FAQ_CATS[f.c]), h('b', {}, f.q)),
      h('div', { class: 'say' }, h('p', { class: 'tiny', style: { color: 'var(--o)', fontWeight: 800, letterSpacing: '.08em' } }, 'RESPONDE ASÍ'), h('div', { class: 'saytxt' }, bold(fill(f.a).text)), h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary sm', onclick: () => copyText(f.a) }, 'Copiar respuesta'))),
      f.no ? h('p', { class: 'small avoid' }, h('b', {}, 'Evita: '), f.no) : null,
      f.tip ? h('p', { class: 'small tipn' }, h('b', {}, 'Ten en cuenta: '), f.tip) : null)));
  };
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Preguntas frecuentes'),
    h('p', { class: 'muted' }, 'Lo que te van a preguntar sobre Código Multiplicación PRO y qué responder. Toca una pregunta, copia la respuesta y adáptala con tu voz.'),
    h('div', { class: 'banner' }, 'Regla de oro: si no sabes algo, no lo inventes. Di «déjame confirmarlo con el equipo y te respondo hoy». Esa honestidad genera confianza.'),
    missingLinksNote(), h('div', { class: 'mt' }, search), chips, list);
  draw();
}
