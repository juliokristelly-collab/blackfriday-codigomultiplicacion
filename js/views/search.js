import { h, plain, fill } from '../core.js';
import { STORIES } from '../data/days.js';
import { SCRIPTS } from '../data/scripts.js';
import { WA, PM, LIVES, CAROUSELS } from '../data/messages.js';

export default async function (root, r) {
  const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const idx = [
    ...STORIES.map((s) => ({ t: `Historia ${s.n} · día ${s.d}`, x: plain([s.big, s.sub, s.say, s.cta].join(' ')), href: `#/historias?d=${s.d}`, k: 'Historia' })),
    ...SCRIPTS.map((s) => ({ t: s.title, x: s.blocks.map((b) => b[2]).join(' ') + s.copy, href: `#/guion/${s.id}`, k: 'Guion' })),
    ...WA.map((w) => ({ t: w.name, x: w.msg + w.status, href: `#/whatsapp?d=${w.id}`, k: 'WhatsApp' })),
    ...PM.map((p) => ({ t: p.t, x: p.m, href: '#/whatsapp?tab=privados', k: 'Mensaje privado' })),
    ...Object.entries(LIVES).map(([id, l]) => ({ t: l.name, x: l.blocks.map((b) => b.say).join(' '), href: `#/live?d=${id}`, k: 'Live' })),
    ...Object.values(CAROUSELS).map((c) => ({ t: 'Carrusel ' + c.name, x: c.slides.map((s) => s.join(' ')).join(' '), href: `#/carruseles/${c.id}`, k: 'Carrusel' })),
  ];
  const out = h('div', { class: 'col mt' });
  const run = (v) => { out.innerHTML = ''; const q = norm(v).trim(); if (q.length < 2) { out.append(h('p', { class: 'muted' }, 'Escribe al menos 2 letras.')); return; }
    const hits = idx.filter((i) => norm(i.t + ' ' + i.x).includes(q)).slice(0, 40); if (!hits.length) out.append(h('p', { class: 'muted' }, 'Sin resultados.'));
    hits.forEach((i) => { const body = plain(i.x); const p = norm(body).indexOf(q); const snip = p < 0 ? body.slice(0, 120) : (p > 40 ? '…' : '') + body.slice(Math.max(0, p - 40), p + 90) + '…'; out.append(h('a', { class: 'glass', href: i.href, style: { textDecoration: 'none', color: '#fff' } }, h('span', { class: 'pill o' }, i.k), h('b', { style: { marginLeft: '8px' } }, i.t), h('p', { class: 'small muted', style: { margin: '6px 0 0' } }, snip))); }); };
  const inp = h('input', { type: 'search', placeholder: 'Busca una palabra: precio, hook, objeción…', value: r.q.q || '', oninput: (e) => run(e.target.value), autofocus: true });
  root.append(h('h1', {}, 'Buscar'), inp, out); run(inp.value);
}
