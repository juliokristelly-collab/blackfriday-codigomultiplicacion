import { h, S, getDays, todayIdx, copyText, fmtDT, now, tzName } from '../core.js';
import { HOY_SLOTS, HOY_IDEAS } from '../data/guide.js';
import { WA } from '../data/messages.js';
import { missingLinksNote } from '../shared.js';

export default async function (root) {
  const DAYS = await getDays(); const idx = todayIdx(DAYS); const d = idx >= 1 && idx <= 7 ? DAYS[idx - 1] : DAYS[0]; const w = WA.find((x) => x.id === d.wa);
  root.append(h('a', { href: '#/inicio', class: 'muted small' }, '← Inicio'), h('h1', {}, 'Ponte al día'),
    h('p', { class: 'muted' }, `Hoy es ${fmtDT(now(), tzName(), { hour: undefined, minute: undefined })}. Es posible que otras personas ya hayan publicado. No pasa nada: aún estás a tiempo, y tu historia es tuya. Empieza por lo más sencillo.`),
    missingLinksNote(),
    h('section', { class: 'glass mt' }, h('h2', {}, 'Tu plan de hoy, sin presión'), h('p', { class: 'small muted' }, 'Los horarios son solo sugerencias. Ajústalos a tu rutina y a la hora en la que tu comunidad suele estar conectada.'),
      h('div', { class: 'col mt' }, HOY_SLOTS.map(([t, x], i) => h('div', { class: 'row gap' }, h('span', { class: 'pill o' }, t), h('span', { class: 'small' }, x))))),
    w ? h('section', { class: 'glass mt' }, h('h2', {}, '✉ Envía esto hoy a tus grupos de WhatsApp'), h('p', { class: 'small muted' }, `Mensaje de «${d.name}» listo para copiar. Cámbialo con tus palabras si quieres.`), h('pre', { class: 'copy' }, w.msg), h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary sm', onclick: () => copyText(w.msg) }, 'Copiar mensaje'), h('a', { class: 'btn sm', href: `#/whatsapp?d=${d.wa}` }, 'Ver más mensajes'))) : null,
    h('h2', { class: 'mt2' }, 'Historias relajadas, súper orgánicas'), h('p', { class: 'muted small' }, 'No hace falta diseño. Una foto tuya en casa, algo cotidiano y una frase honesta. Elige 2 o 3.'),
    h('div', { class: 'grid g2 mt' }, HOY_IDEAS.map((i) => h('div', { class: 'glass' }, h('div', { class: 'row between' }, h('b', {}, `${i.icon} ${i.t}`)), h('p', { class: 'small muted' }, i.how), h('p', { class: 'small', style: { fontStyle: 'italic' } }, `«${i.cap}»`), h('button', { class: 'btn sm mt', onclick: () => copyText(i.cap) }, 'Copiar texto')))),
    h('div', { class: 'grid g3 mt2' }, h('a', { class: 'btn primary', href: `#/historias?d=${d.n}` }, '▤ Historias completas de hoy'), h('a', { class: 'btn', href: '#/ideas' }, '💡 Más ideas y escenas'), h('a', { class: 'btn', href: `#/mision/${d.n}` }, '◆ Mi misión de hoy')));
}
