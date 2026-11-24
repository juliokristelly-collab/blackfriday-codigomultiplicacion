import { h, S, save, copyText, fill, toast, phase, isPromoText } from '../core.js';
import { WA, WA_PHASES, PM } from '../data/messages.js';
import { missingLinksNote } from '../shared.js';

const ST = ['Pendiente', 'Publicado', 'Con respuestas'];
export default async function (root, r) {
  let tab = r.q.tab || 'grupos'; const want = r.q.d; const body = h('div', { class: 'mt' }); const tabs = h('div', { class: 'chips' });
  const T = [['grupos', 'Grupos'], ['estados', 'Estados'], ['privados', 'Mensajes privados']];
  const locked = (t) => phase() === 'closed' && isPromoText(t);
  const stSel = (key) => { const sel = h('select', { 'aria-label': 'Estado', onchange: (e) => { S.checks[key] = e.target.value; save(); } }, ST.map((s) => h('option', { value: s, selected: (S.checks[key] || 'Pendiente') === s }, s))); return sel; };
  const grupos = () => { body.append(h('div', { class: 'banner' }, 'Reactivar un grupo no es escribir «compren». Primero conversa; luego educa; luego invita. Respeta a quien no quiera recibir información.'), missingLinksNote());
    WA_PHASES.forEach((p) => { body.append(h('h2', { class: 'mt2' }, `Fase ${p.n} · ${p.name}`), h('p', { class: 'muted small' }, p.tip));
      WA.filter((w) => w.phase === p.n).forEach((w) => { const l = locked(w.msg + (w.status || '')); body.append(h('article', { class: 'glass mt', id: 'wa-' + w.id, style: want === w.id ? { outline: '2px solid var(--o)' } : {} },
        h('div', { class: 'row between gap wrap' }, h('h3', { style: { margin: 0 } }, w.name), stSel('w:' + w.id)), l ? h('p', { class: 'pill red' }, 'Promoción finalizada: no se puede copiar') : null,
        h('pre', { class: 'copy mt' }, fill(w.msg).text),
        w.poll ? h('div', { class: 'blk' }, h('b', {}, 'ENCUESTA'), h('p', {}, w.poll.q), h('ul', {}, w.poll.o.map((o) => h('li', {}, o))), h('button', { class: 'btn sm', onclick: () => copyText(`${w.poll.q}\n${w.poll.o.map((o) => '• ' + o).join('\n')}`) }, 'Copiar encuesta')) : null,
        h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary sm', disabled: l, onclick: () => copyText(w.msg) }, 'Copiar mensaje'), h('a', { class: 'btn sm', target: '_blank', rel: 'noopener', href: l ? '#' : 'https://wa.me/?text=' + encodeURIComponent(fill(w.msg).text) }, 'Abrir en WhatsApp')))); }); }); };
  const estados = () => { body.append(h('p', { class: 'muted' }, 'Textos cortos para tus estados de WhatsApp.'), missingLinksNote()); WA.forEach((w) => { const l = locked(w.status); body.append(h('div', { class: 'glass mt' }, h('div', { class: 'row between gap wrap' }, h('b', {}, w.name), stSel('e:' + w.id)), h('pre', { class: 'copy mt' }, fill(w.status).text), h('button', { class: 'btn sm', disabled: l, onclick: () => copyText(w.status) }, 'Copiar estado'))); }); };
  const privados = () => { const nm = h('input', { type: 'text', placeholder: 'Nombre de la persona (opcional)', value: '' }); const list = h('div', { class: 'col mt' });
    const draw = () => { list.innerHTML = ''; PM.forEach((p) => { const txt = () => fill(p.m, { prospecto: nm.value.trim() || '[NOMBRE]' }).text; const l = locked(p.m); list.append(h('div', { class: 'glass' }, h('div', { class: 'row between gap' }, h('b', {}, `${p.id.slice(1)}. ${p.t}`), l ? h('span', { class: 'pill red' }, 'Finalizada') : null), h('pre', { class: 'copy mt' }, txt()), h('div', { class: 'row gap wrap' }, h('button', { class: 'btn primary sm', disabled: l, onclick: () => copyText(p.m, { prospecto: nm.value.trim() || '[NOMBRE]' }) }, 'Copiar'), h('a', { class: 'btn sm', target: '_blank', rel: 'noopener', href: l ? '#' : 'https://wa.me/?text=' + encodeURIComponent(txt()) }, 'Abrir en WhatsApp')))); }); };
    nm.addEventListener('input', draw); body.append(h('div', { class: 'banner' }, '18 mensajes para conversar uno a uno. Solo escribe a personas que te lo permitieron o te escribieron primero.'), missingLinksNote(), h('div', { class: 'glass mt' }, h('label', { class: 'f' }, 'Nombre'), nm), list); draw(); };
  const draw = () => { tabs.innerHTML = ''; T.forEach(([k, t]) => tabs.append(h('button', { class: 'chip' + (tab === k ? ' on' : ''), onclick: () => { tab = k; history.replaceState(null, '', `#/whatsapp?tab=${k}`); draw(); } }, t))); body.innerHTML = ''; ({ grupos, estados, privados })[tab](); };
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Centro de WhatsApp'), tabs, body); draw();
  if (want) setTimeout(() => document.getElementById('wa-' + want)?.scrollIntoView({ block: 'center' }), 100);
}
