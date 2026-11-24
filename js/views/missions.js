import { h, S, getDays, todayIdx } from '../core.js';
import { dayDone } from '../shared.js';

export default async function (root) {
  const DAYS = await getDays(); const idx = todayIdx(DAYS);
  root.append(h('h1', {}, 'Las siete misiones'), h('p', { class: 'muted' }, 'Puedes consultar cualquier día por adelantado. El progreso motiva, no castiga.'),
    h('div', { class: 'col mt' }, DAYS.map((x) => h('a', { class: `glass ${idx === x.n ? 'glow' : ''}`, href: `#/mision/${x.n}`, style: { textDecoration: 'none', color: '#fff' } },
      h('div', { class: 'row between gap' }, h('div', {}, h('span', { class: 'pill o' }, `MISIÓN ${String(x.n).padStart(2, '0')}`), idx === x.n ? h('span', { class: 'pill', style: { marginLeft: '6px' } }, 'Hoy') : null, S.mdone[x.n] ? h('span', { class: 'pill', style: { marginLeft: '6px' } }, '✓ Completada') : null,
        h('h2', { style: { margin: '8px 0 2px' } }, `${x.dow} ${x.date.slice(8)} — ${x.name}`), h('p', { class: 'muted small' }, x.tag)), h('b', {}, `${dayDone(x)}/${x.tasks.length}`)),
      h('div', { class: 'bar mt' }, h('i', { style: { width: Math.round(dayDone(x) / x.tasks.length * 100) + '%' } }))))));
}
