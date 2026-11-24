import { h, S, save, toast, confirmBox, modal, fill, copyText, phase, download } from '../core.js';
import { PM } from '../data/messages.js';

const ST = ['Nuevo', 'Conversación iniciada', 'Interesado', 'Información enviada', 'En evaluación', 'Objeción pendiente', 'Enlace enviado', 'Compra realizada', 'No interesado'];
const TEMP = { frio: '🧊 Frío', tibio: '🌤 Tibio', caliente: '🔥 Caliente' };
const digits = (p) => String(p || '').replace(/\D/g, '');
function sync(p) { const buy = p.status === 'Compra realizada'; if (buy && !p.counted) { p.counted = true; S.counters.sales = (+S.counters.sales || 0) + 1; toast('¡Venta registrada! Se sumó a tus resultados.'); } else if (!buy && p.counted) { p.counted = false; S.counters.sales = Math.max(0, (+S.counters.sales || 0) - 1); } }

export default async function (root) {
  let q = '', fs = '', ft = ''; const list = h('div', { class: 'col mt' }); const sum = h('p', { class: 'muted small' });
  const form = (p) => {
    const f = { name: p?.name || '', phone: p?.phone || '', source: p?.source || '', status: p?.status || 'Nuevo', temp: p?.temp || 'tibio', next: p?.next || '', notes: p?.notes || '' };
    const inp = (k, l, t = 'text') => h('div', {}, h('label', { class: 'f' }, l), h('input', { type: t, value: f[k], oninput: (e) => { f[k] = e.target.value; } }));
    const sel = (k, l, opts) => h('div', {}, h('label', { class: 'f' }, l), h('select', { onchange: (e) => { f[k] = e.target.value; } }, opts.map(([v, t]) => h('option', { value: v, selected: f[k] === v }, t))));
    const notes = h('textarea', { oninput: (e) => { f.notes = e.target.value; } }); notes.value = f.notes;
    const m = modal(p ? 'Editar prospecto' : 'Nuevo prospecto', h('div', { class: 'col' }, inp('name', 'Nombre'), inp('phone', 'WhatsApp (con código de país, ej. 573001234567)', 'tel'), inp('source', 'Origen (historia, reel, grupo…)'), sel('status', 'Estado', ST.map((s) => [s, s])), sel('temp', 'Temperatura', Object.entries(TEMP)), inp('next', 'Próximo seguimiento', 'date'), h('div', {}, h('label', { class: 'f' }, 'Notas'), notes)),
      [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancelar'), h('button', { class: 'btn primary', onclick: () => { if (!f.name.trim()) { toast('Escribe un nombre', 'err'); return; } const o = p || { id: 'p' + Date.now(), counted: false }; Object.assign(o, f, { name: f.name.trim() }); if (!p) S.prospects.unshift(o); sync(o); save(); m.close(); draw(); } }, 'Guardar')]);
  };
  const draw = () => {
    list.innerHTML = ''; const items = S.prospects.filter((p) => (!q || (p.name + p.notes + p.source).toLowerCase().includes(q.toLowerCase())) && (!fs || p.status === fs) && (!ft || p.temp === ft));
    sum.textContent = `${S.prospects.length} prospectos · ${S.prospects.filter((p) => p.status === 'Compra realizada').length} compras · ${S.prospects.filter((p) => p.temp === 'caliente').length} calientes`;
    if (!items.length) list.append(h('div', { class: 'glass' }, h('p', { class: 'muted' }, S.prospects.length ? 'Sin resultados con esos filtros.' : 'Aún no hay prospectos. Registra a cada persona que muestre interés real; este registro es solo tuyo y vive en tu navegador.')));
    items.forEach((p) => { const ph = digits(p.phone); const msg = fill(PM[0].m, { prospecto: p.name.split(' ')[0] }).text;
      list.append(h('article', { class: 'glass' }, h('div', { class: 'row between gap wrap' }, h('div', {}, h('b', {}, p.name), h('p', { class: 'tiny muted' }, [p.source, p.next && 'Seguimiento: ' + p.next].filter(Boolean).join(' · '))), h('span', { class: 'pill o' }, TEMP[p.temp])),
        h('div', { class: 'row gap wrap mt' }, h('select', { 'aria-label': 'Estado', onchange: (e) => { p.status = e.target.value; sync(p); save(); draw(); } }, ST.map((s) => h('option', { value: s, selected: p.status === s }, s))), ph ? h('a', { class: 'btn sm', target: '_blank', rel: 'noopener', href: `https://wa.me/${ph}?text=${encodeURIComponent(phase() === 'closed' ? '' : msg)}` }, 'WhatsApp') : h('span', { class: 'tiny muted' }, 'Sin número'), h('button', { class: 'btn sm', onclick: () => form(p) }, 'Editar'), h('button', { class: 'btn sm ghost', onclick: () => confirmBox(`¿Eliminar a ${p.name}?`, () => { if (p.counted) S.counters.sales = Math.max(0, S.counters.sales - 1); S.prospects = S.prospects.filter((x) => x !== p); save(); draw(); }, 'Eliminar') }, 'Eliminar')),
        p.notes ? h('p', { class: 'small muted mt' }, p.notes) : null)); });
  };
  const csv = () => { const e = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"'; return ['Nombre,WhatsApp,Origen,Estado,Temperatura,Seguimiento,Notas', ...S.prospects.map((p) => [p.name, p.phone, p.source, p.status, p.temp, p.next, p.notes].map(e).join(','))].join('\n'); };
  root.append(h('h1', {}, 'Prospectos'), sum, h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary', onclick: () => form() }, '+ Nuevo prospecto'), h('button', { class: 'btn', onclick: () => S.prospects.length ? download('prospectos.csv', csv(), 'text/csv') : toast('No hay prospectos para exportar', 'warn') }, 'Exportar CSV')),
    h('div', { class: 'grid g3 mt' }, h('input', { type: 'search', placeholder: 'Buscar…', oninput: (e) => { q = e.target.value; draw(); } }), h('select', { onchange: (e) => { fs = e.target.value; draw(); } }, h('option', { value: '' }, 'Todos los estados'), ST.map((s) => h('option', { value: s }, s))), h('select', { onchange: (e) => { ft = e.target.value; draw(); } }, h('option', { value: '' }, 'Toda temperatura'), Object.entries(TEMP).map(([k, v]) => h('option', { value: k }, v)))), list); draw();
}
