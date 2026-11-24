import { h, S, getDays, todayIdx, phase, fmtDT, now, closeText, localCloseText, tzName, money } from '../core.js';
import { progress, dayDone, storiesPublished, calc, countdownBox, missingLinksNote, levelCard, nextCard } from '../shared.js';
import { SIMPLE } from '../data/guide.js';

export default async function (root) {
  const DAYS = await getDays(); const idx = todayIdx(DAYS); const P = progress(DAYS); const c = calc(); const ph = phase();
  const d = idx >= 1 && idx <= 7 ? DAYS[idx - 1] : idx === 0 ? DAYS[0] : null;
  const name = S.profile.name ? S.profile.name.split(' ')[0] : '';
  const hr = +new Intl.DateTimeFormat('es', { hour: 'numeric', hour12: false, timeZone: tzName() }).format(now());
  const hi = hr < 12 ? 'Buenos días' : hr < 19 ? 'Buenas tardes' : 'Buenas noches';
  root.append(
    h('section', { class: 'hero glass glow' },
      h('p', { class: 'tiny muted' }, fmtDT(now(), tzName(), { hour: undefined, minute: undefined })),
      h('h1', {}, `${hi}${name ? ', ' : ''}`, name ? h('span', {}, name) : null, '.'),
      h('p', { class: 'serif', style: { fontSize: '1.4rem', margin: '6px 0 14px' } }, ph === 'closed' ? 'Black Week terminó. Gracias por ejecutar.' : 'Este reto lo creó Deborah para que aumentes tus ventas. Aquí sabes exactamente qué hacer hoy.'),
      ph === 'closed' ? h('div', { class: 'banner' }, 'La promoción terminó: Código Multiplicación PRO vuelve a su precio regular de $297 USD. Los llamados a comprar por $179 USD ya no están disponibles. Registra tus resultados finales.') : countdownBox(),
      ph !== 'closed' ? h('p', { class: 'tiny muted mt' }, `Cierre: ${closeText()}${localCloseText() ? ' · ' + localCloseText() : ''}`) : null),
    ph !== 'closed' ? nextCard(DAYS, idx) : null,
    missingLinksNote() ? h('div', { class: 'mt' }, missingLinksNote()) : null,
    levelCard(),
    d ? h('section', { class: 'glass mt' },
      h('div', { class: 'row between gap' }, h('div', {}, h('span', { class: 'pill o' }, idx === 0 ? 'Comienza el martes 24' : `Misión del día ${String(d.n).padStart(2, '0')}`), h('h2', { style: { margin: '8px 0 4px' } }, d.name), h('p', { class: 'muted small' }, d.mission), h('p', { class: 'small mt' }, h('b', {}, '💬 En palabras simples: '), SIMPLE[d.n])), h('div', { class: 'ring', style: { '--p': Math.round(dayDone(d) / d.tasks.length * 100) } }, h('i', {}, `${dayDone(d)}/${d.tasks.length}`))),
      h('a', { class: 'btn primary mt', href: `#/mision/${d.n}` }, idx === 0 ? 'Ver la primera misión' : 'Abrir la misión de hoy →')) : h('section', { class: 'glass mt' }, h('h2', {}, 'Campaña finalizada'), h('a', { class: 'btn primary mt', href: '#/resultados' }, 'Ver mis resultados')),
    h('div', { class: 'grid g3 mt' },
      h('div', { class: 'glass row gap' }, h('div', { class: 'ring', style: { '--p': P.pct } }, h('i', {}, P.pct + '%')), h('div', {}, h('b', {}, 'Progreso general'), h('p', { class: 'tiny muted' }, `${P.done} de ${P.total} tareas`))),
      kpi('Misiones completadas', DAYS.filter((x) => S.mdone[x.n]).length + '/7'), kpi('Tareas pendientes', P.total - P.done),
      kpi('Meta de ventas', S.profile.goal || 0), kpi('Ventas registradas', c.sales), kpi('Conversaciones iniciadas', S.counters.convs),
      kpi('Prospectos interesados', S.prospects.filter((p) => ['Interesado', 'Información enviada', 'En evaluación', 'Objeción pendiente', 'Enlace enviado', 'Compra realizada'].includes(p.status)).length), kpi('Enlaces enviados', S.counters.links), kpi('Comisión bruta estimada', money(c.comm)),
      kpi('Historias publicadas', storiesPublished())),
    h('h2', { class: 'mt2' }, 'Las siete misiones'),
    h('div', { class: 'cal mt' }, DAYS.map((x) => h('a', { class: `day ${idx === x.n ? 'today' : ''} ${S.mdone[x.n] ? 'done' : ''} ${x.n === 4 ? 'fri' : ''}`, href: `#/mision/${x.n}` }, h('span', { class: 'tiny muted' }, x.dow), h('span', { class: 'n' }, x.date.slice(8)), h('span', { class: 'nm' }, x.name), h('span', { class: 'tiny muted' }, x.tag), h('span', { class: 'pr' }, h('div', { class: 'bar' }, h('i', { style: { width: Math.round(dayDone(x) / x.tasks.length * 100) + '%' } })))))),
    h('div', { class: 'grid g2 mt2' }, h('a', { class: 'btn primary', href: '#/hoy' }, '⚡ Ponte al día hoy'), h('a', { class: 'btn primary', href: '#/preguntas' }, '？ Preguntas frecuentes'), h('a', { class: 'btn', href: '#/ideas' }, '✦ Ideas y escenas'), h('a', { class: 'btn', href: '#/historias' }, '▤ Historias del día'), h('a', { class: 'btn', href: '#/whatsapp' }, '✉ WhatsApp de hoy'), h('a', { class: 'btn', href: '#/guiones' }, '🎬 Guiones virales'), h('a', { class: 'btn', href: '#/prospectos' }, '☰ Registrar prospecto')));
}
const kpi = (l, v) => h('div', { class: 'glass kpi' }, h('b', {}, v), h('span', {}, l));
