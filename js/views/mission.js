import { h, S, save, getDays, modal, toast } from '../core.js';
import { tkey, dayDone, storyCard, progress, missingLinksNote } from '../shared.js';
import { STORIES } from '../data/days.js';
import { SCRIPTS } from '../data/scripts.js';
import { SIMPLE } from '../data/guide.js';

export default async function (root, r) {
  const DAYS = await getDays(); const n = Math.min(7, Math.max(1, +r.arg || 1)); const d = DAYS[n - 1];
  const bar = h('i'); const count = h('b'); const upd = () => { const k = dayDone(d); bar.style.width = Math.round(k / d.tasks.length * 100) + '%'; count.textContent = `${k}/${d.tasks.length}`; return k; };
  const list = d.tasks.map((t, i) => { const key = tkey(n, i); const row = h('label', { class: 'task' + (S.checks[key] ? ' on' : '') }, h('input', { type: 'checkbox', checked: !!S.checks[key], onchange: (e) => { if (e.target.checked) S.checks[key] = true; else delete S.checks[key]; save(); row.classList.toggle('on', e.target.checked); const k = upd(); if (e.target.checked) { toast('✓ Hecho'); if (k === d.tasks.length && !S.mdone[n]) celebrate(); } } }), h('span', {}, t)); return row; });
  function celebrate() {
    S.mdone[n] = true; save(); const P = progress(DAYS); const next = DAYS[n];
    modal('¡Misión completada!', h('div', { class: 'celebrate' }, h('div', { class: 'crystal' }), h('h2', {}, `Misión ${String(n).padStart(2, '0')} — ${d.name}`), h('p', { class: 'muted' }, 'Ejecutaste lo importante de hoy. Eso es constancia real.'), h('div', { class: 'bar mt' }, h('i', { style: { width: P.pct + '%' } })), h('p', { class: 'small mt' }, `Progreso general: ${P.pct}% · Tareas de hoy: ${d.tasks.length}/${d.tasks.length}`)), next ? [h('a', { class: 'btn primary', href: `#/mision/${n + 1}`, onclick: () => document.querySelector('.modal-back')?.remove() }, `Ver misión ${n + 1} →`)] : [h('a', { class: 'btn primary', href: '#/resultados', onclick: () => document.querySelector('.modal-back')?.remove() }, 'Ver mis resultados')]);
  }
  const stories = STORIES.filter((s) => s.d === n); const sc = SCRIPTS.find((s) => s.id === d.reel);
  root.append(
    h('a', { href: '#/misiones', class: 'muted small' }, '← Misiones'),
    h('section', { class: 'glass glow mt' }, h('span', { class: 'pill o' }, `MISIÓN ${String(n).padStart(2, '0')} · ${d.dow} ${d.date.slice(8)} de noviembre`), h('h1', { style: { margin: '10px 0' } }, d.name), h('p', {}, d.mission), h('p', { class: 'small mt' }, h('b', {}, '💬 En palabras simples: '), SIMPLE[n]), h('div', { class: 'row gap mt' }, h('div', { class: 'bar', style: { flex: 1 } }, bar), count)),
    missingLinksNote() ? h('div', { class: 'mt' }, missingLinksNote()) : null,
    h('section', { class: 'glass mt' }, h('h2', {}, 'Checklist del día'), h('div', {}, list)),
    h('h2', { class: 'mt2' }, 'Tus recursos de hoy'),
    h('div', { class: 'grid g3 mt' }, h('a', { class: 'btn', href: `#/historias?d=${n}` }, `▤ ${stories.length} historias`), sc ? h('a', { class: 'btn', href: `#/guion/${sc.id}` }, '🎬 Reel: ' + sc.title.slice(0, 26)) : null, d.carousel ? h('a', { class: 'btn', href: `#/carruseles/${d.carousel}` }, '▦ Carrusel') : null, h('a', { class: 'btn', href: `#/whatsapp?d=${d.wa}` }, '✉ WhatsApp del día'), d.live ? h('a', { class: 'btn', href: `#/live?d=${d.live}` }, '● Live Selling') : null, h('a', { class: 'btn', href: '#/prospectos' }, '☰ Prospectos')),
    h('h2', { class: 'mt2' }, 'Historias de hoy'), h('div', { class: 'col mt' }, stories.map(storyCard)),
    h('div', { class: 'row gap mt2' }, h('button', { class: 'btn primary', onclick: () => { if (S.mdone[n]) { toast('Esta misión ya está completada'); } else celebrate(); } }, S.mdone[n] ? '✓ Misión completada' : 'Marcar misión como completada'), n < 7 ? h('a', { class: 'btn', href: `#/mision/${n + 1}` }, 'Ver la siguiente →') : null));
}
