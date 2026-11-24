// Núcleo: utilidades, estado persistente, fechas de campaña, tokens y avisos.
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (k === 'html') e.innerHTML = v;
    else if (['value', 'checked', 'disabled', 'selected'].includes(k)) e[k] = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  const add = (c) => { if (c == null || c === false) return; if (Array.isArray(c)) c.forEach(add); else e.append(c.nodeType ? c : document.createTextNode(String(c))); };
  kids.forEach(add);
  return e;
}
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- Estado ----------
const KEY = 'm7.v1';
export const DEFAULTS = {
  introSeen: false, setupDone: false, disclose: true, lang: 'neutro',
  profile: { name: '', brand: '', ig: '', wa: '', photo: '', logo: '', accent: '#FF4002', bg: '#080808', font: 'Montserrat', linkSales: '', linkPromo: '', country: '', tz: '', goal: 5, commission: 50, liveTime: '' },
  campaign: { open: '2026-11-27T00:00:00-05:00', close: '2026-11-30T23:59:59-05:00', sim: '' },
  checks: {}, counters: { reels: 0, carousels: 0, groups: 0, convs: 0, links: 0, sales: 0, lives: 0 },
  prospects: [], edits: {}, mdone: {}, ok: {}, lvl: 0,
};
const merge = (d, s) => { const o = { ...d }; for (const k in s) o[k] = (d[k] && typeof d[k] === 'object' && !Array.isArray(d[k]) && s[k] && typeof s[k] === 'object') ? merge(d[k], s[k]) : s[k]; return o; };
let memStore = null;
function load() { try { const r = localStorage.getItem(KEY); if (r) return merge(DEFAULTS, JSON.parse(r)); } catch (e) { memStore = true; } return JSON.parse(JSON.stringify(DEFAULTS)); }
export let S = load();
export function replaceState(n) { S = merge(DEFAULTS, n); save(); }
export function resetState() { S = JSON.parse(JSON.stringify(DEFAULTS)); save(); }
export const hooks = {};
export function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('No se pudo guardar en este navegador. Descarga una copia desde Ajustes.', 'err'); } try { hooks.afterSave && hooks.afterSave(); } catch (e) { /* ignorar */ } }
export function tzName() { return S.profile.tz || (Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Bogota'); }

// ---------- Fechas ----------
export function now() { if (S.campaign.sim) { const t = Date.parse(S.campaign.sim); if (!isNaN(t)) return t; } return Date.now(); }
export const openAt = () => Date.parse(S.campaign.open);
export const closeAt = () => Date.parse(S.campaign.close);
export function phase(n = now()) { return n < openAt() ? 'before' : n <= closeAt() ? 'promo' : 'closed'; }
export function dayKey(ts, tz = tzName()) { return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ts)); }
export async function getDays() { return (await import('./data/days.js')).DAYS; }
export function todayIdx(DAYS, ts = now()) { const k = dayKey(ts); if (k < DAYS[0].date) return 0; const i = DAYS.findIndex((d) => d.date === k); return i >= 0 ? i + 1 : 8; }
export function fmtDT(ts, tz = tzName(), o = {}) { return new Intl.DateTimeFormat('es', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', ...o }).format(new Date(ts)); }
export function closeText() { const t = closeAt(); return `${fmtDT(t, 'America/Bogota')} (hora Colombia)`; }
export function localCloseText() { const tz = tzName(); return tz === 'America/Bogota' ? '' : `${fmtDT(closeAt(), tz)} en tu zona (${tz})`; }
export function countdown(ms) { ms = Math.max(0, ms); const s = Math.floor(ms / 1000); return { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 }; }

// ---------- Tokens y enlaces ----------
const isUrl = (u) => /^https?:\/\/[^\s]+\.[^\s]+/i.test((u || '').trim());
export const validUrl = isUrl;
export function fill(text, extra = {}) {
  const p = S.profile, missing = new Set();
  const map = {
    LINK_VENTAS: () => isUrl(p.linkSales) ? p.linkSales.trim() : (missing.add('tu enlace personal de la página de ventas'), '[PEGA AQUÍ TU ENLACE PERSONAL DE VENTAS]'),
    LINK_PROMO: () => isUrl(p.linkPromo) ? p.linkPromo.trim() : (missing.add('tu enlace promocional de $179'), '[PEGA AQUÍ TU ENLACE PROMOCIONAL PERSONAL]'),
    HORA_LIVE: () => p.liveTime ? p.liveTime : (missing.add('la hora de tu live'), '[HORA DE TU LIVE]'),
    YO: () => p.name || (missing.add('tu nombre'), '[TU NOMBRE]'),
    PROSPECTO: () => extra.prospecto || '[NOMBRE]',
    CIERRE: () => closeText(),
  };
  const out = String(text ?? '').replace(/\{\{(\w+)\}\}/g, (m, k) => (map[k] ? map[k]() : m));
  return { text: out, missing: [...missing] };
}
export const isPromoText = (t) => /179|\b118\b/.test(t || '');

// ---------- UI ----------
export function toast(msg, type = 'ok') {
  let box = $('#toasts'); if (!box) { box = h('div', { id: 'toasts', 'aria-live': 'polite' }); document.body.append(box); }
  const t = h('div', { class: 'toast ' + type, role: 'status' }, msg); box.append(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, type === 'err' ? 5200 : 2600);
}
export async function copyRaw(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) {
    try { const ta = h('textarea', { style: { position: 'fixed', opacity: 0 } }); ta.value = text; document.body.append(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok; } catch (e2) { return false; }
  }
}
// Copia con tokens, control de promoción cerrada y avisos de enlaces faltantes.
export async function copyText(raw, opts = {}) {
  if (phase() === 'closed' && isPromoText(raw) && !opts.force) { toast('La promoción de Black Week terminó: este contenido ya no se puede copiar.', 'err'); return false; }
  const { text, missing } = fill(raw, opts);
  const ok = await copyRaw(text);
  if (!ok) { toast('No se pudo copiar. Selecciona el texto manualmente.', 'err'); return false; }
  toast(missing.length ? `Copiado, pero falta configurar ${missing.join(' y ')} en Ajustes.` : '¡Copiado!', missing.length ? 'warn' : 'ok');
  return true;
}
export async function download(name, data, mime = 'text/plain') {
  const b = data instanceof Blob ? data : new Blob([data], { type: mime + ';charset=utf-8' });
  try { const cap = window.claude && window.claude.use ? await window.claude.use('downloads') : null; if (cap) { await cap.save({ filename: name, data: b }); toast('Archivo listo'); return; } } catch (e) { if (e && e.code === 'declined') return; if (e && e.code === 'host_unavailable') { toast('Abre la app en un navegador o computador para descargar archivos.', 'warn'); return; } }
  const a = h('a', { href: URL.createObjectURL(b), download: name }); document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
export function modal(title, body, actions = []) {
  const back = h('div', { class: 'modal-back', onclick: (e) => { if (e.target === back) close(); } });
  const close = () => { back.remove(); document.removeEventListener('keydown', esc_); };
  const esc_ = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc_);
  const box = h('div', { class: 'modal glass', role: 'dialog', 'aria-modal': 'true', 'aria-label': title }, h('div', { class: 'row between' }, h('h3', {}, title), h('button', { class: 'icon-btn', 'aria-label': 'Cerrar', onclick: close }, '✕')), body, h('div', { class: 'row gap end mt' }, actions));
  back.append(box); document.body.append(back); return { close, box };
}
export function confirmBox(msg, onYes, yes = 'Confirmar') {
  const m = modal('¿Seguro?', h('p', {}, msg), [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancelar'), h('button', { class: 'btn primary', onclick: () => { m.close(); onYes(); } }, yes)]);
}
export function imgToDataURL(file, max = 800) {
  return new Promise((res, rej) => { const fr = new FileReader(); fr.onerror = rej; fr.onload = () => { const im = new Image(); im.onerror = rej; im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85)); }; im.src = fr.result; }; fr.readAsDataURL(file); });
}
// Renderiza texto con *resalte* y ~~tachado~~ como nodos.
export function rich(txt, tokensFill = true) {
  const t = tokensFill ? fill(txt).text : txt; const frag = document.createDocumentFragment();
  t.split(/(\*[^*]+\*|~~[^~]+~~)/g).forEach((p) => { if (!p) return; if (p[0] === '*') frag.append(h('mark', {}, p.slice(1, -1))); else if (p.startsWith('~~')) frag.append(h('s', {}, p.slice(2, -2))); else frag.append(p); });
  return frag;
}
export const plain = (t) => String(t || '').replace(/\*([^*]+)\*/g, '$1').replace(/~~([^~]+)~~/g, '$1');
export const money = (n) => '$' + (Math.round(n * 100) / 100).toLocaleString('es-CO', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' USD';
export const timers = []; export function clearTimers() { while (timers.length) clearInterval(timers.pop()); }
export function badge(text, cls = '') { return h('span', { class: 'pill ' + cls }, text); }
export function promoLocked(txt) { return phase() === 'closed' && isPromoText(txt); }
export function disclosureLine() { return S.disclose ? '\n\n' + '' : ''; }
