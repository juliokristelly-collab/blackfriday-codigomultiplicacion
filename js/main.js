import { $, h, S, save, clearTimers, toast } from './core.js';

const ROUTES = {
  inicio: 'home', misiones: 'missions', mision: 'mission', contenido: 'content', historias: 'stories', guiones: 'scripts', guion: 'script',
  carruseles: 'carousels', whatsapp: 'whatsapp', empezar: 'empezar', preguntas: 'faq', hoy: 'hoy', ideas: 'ideas', live: 'live', guia: 'guide', prospectos: 'crm', resultados: 'results', ajustes: 'settings', buscar: 'search', reglas: 'rules',
};
const NAV = [['inicio', 'Inicio', '◉'], ['misiones', 'Misiones', '◆'], ['contenido', 'Contenido', '▤'], ['preguntas', 'Preguntas', '？'], ['prospectos', 'Prospectos', '☰'], ['resultados', 'Resultados', '▲']];
const CONTENT_GROUP = ['contenido', 'historias', 'guiones', 'guion', 'carruseles', 'whatsapp', 'live', 'guia', 'buscar', 'reglas', 'ideas'];
const HOME_GROUP = ['empezar', 'hoy'];
let cleanup = null;

let cur = '#/inicio';
export function parseHash() {
  const raw = (cur || '#/inicio').replace(/^#\/?/, '');
  const [path, qs] = raw.split('?'); const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'inicio', arg: parts[1], q: Object.fromEntries(new URLSearchParams(qs || '')) };
}
export const go = (p) => { cur = '#/' + p; route(); };
window.__go = go;

function shell() {
  const app = $('#app'); app.innerHTML = '';
  const side = h('aside', { class: 'side' }, h('div', { class: 'brand' }, 'CÓDIGO MULTIPLICACIÓN PRO', h('b', {}, 'MULTIPLICA 7')), h('nav', { class: 'nav', 'aria-label': 'Principal' }, [['empezar', 'Empieza aquí', '★'], ...NAV, ['hoy', 'Ponte al día', '⚡'], ['ideas', 'Ideas', '✦'], ['buscar', 'Buscar', '⌕'], ['ajustes', 'Ajustes', '⚙']].map(([k, t, i]) => h('a', { href: '#/' + k, 'data-k': k }, h('span', { class: 'ico' }, i), t))));
  const tab = h('nav', { class: 'tabbar', 'aria-label': 'Navegación móvil' }, NAV.map(([k, t, i]) => h('a', { href: '#/' + k, 'data-k': k }, h('span', { class: 'ico' }, i), t)));
  app.append(side, h('main', { id: 'main', tabindex: '-1' }), tab);
}
function markNav(name) {
  const key = CONTENT_GROUP.includes(name) ? 'contenido' : HOME_GROUP.includes(name) ? 'inicio' : name === 'mision' ? 'misiones' : name;
  document.querySelectorAll('[data-k]').forEach((a) => { const on = a.dataset.k === key || (name === 'buscar' && a.dataset.k === 'buscar'); a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
}
async function route() {
  if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
  clearTimers();
  const r = parseHash(); const file = ROUTES[r.name] || 'home'; const main = $('#main');
  markNav(ROUTES[r.name] ? r.name : 'inicio');
  main.innerHTML = '';
  try {
    const mod = await import(`./views/${file}.js`);
    const root = h('div', { class: 'view' }); const _ap = root.append.bind(root); root.append = (...a) => _ap(...a.flat(Infinity).filter((x) => x != null && x !== false)); main.append(root);
    cleanup = (await mod.default(root, r)) || null;
    window.scrollTo(0, 0);
  } catch (e) {
    console.error(e);
    main.append(h('div', { class: 'glass' }, h('h2', {}, 'Algo salió mal al abrir esta sección'), h('p', { class: 'muted' }, String(e.message || e)), h('a', { class: 'btn primary mt', href: '#/inicio' }, 'Volver al inicio')));
  }
}

function intro() {
  const close = (to) => { ov.remove(); S.introSeen = true; save(); if (to) go(to); };
  const ov = h('div', { class: 'intro', role: 'dialog', 'aria-label': 'Bienvenida' }, h('div', {},
    h('p', { class: 'k' }, 'CÓDIGO MULTIPLICACIÓN PRO'), h('h1', {}, 'MULTIPLICA ', h('span', {}, '7')), h('p', { class: 'k' }, 'BLACK WEEK EXPERIENCE 2026'),
    h('p', { class: 'serif', style: { fontSize: 'clamp(1.5rem,5vw,2.2rem)', margin: '22px 0 8px' } }, 'Este reto lo creó Deborah para que puedas aumentar tus ventas esta semana.'),
    h('p', { class: 'muted' }, 'Siete días con un paso a paso claro: qué publicar, qué escribir y qué responder.'),
    h('div', { class: 'col mt2' }, h('button', { class: 'btn primary', onclick: () => close(S.ok.empezar ? 'inicio' : 'empezar') }, 'COMENZAR MI RETO'), h('button', { class: 'btn ghost sm', onclick: () => close('inicio') }, 'Saltar'))));
  document.body.append(ov); ov.querySelector('button').focus();
}

function particles() {
  const c = $('#fx'); if (!c || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const x = c.getContext('2d'); let W, H; const P = Array.from({ length: 26 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .4, v: Math.random() * .00006 + .00003, a: Math.random() * .5 + .2 }));
  const fit = () => { W = c.width = innerWidth; H = c.height = innerHeight; }; fit(); addEventListener('resize', fit);
  let last = 0; (function loop(t) { if (!document.hidden && t - last > 60) { last = t; x.clearRect(0, 0, W, H); P.forEach((p) => { p.y -= p.v * 60; if (p.y < 0) { p.y = 1; p.x = Math.random(); } x.beginPath(); x.fillStyle = `rgba(255,120,70,${p.a})`; x.arc(p.x * W, p.y * H, p.r, 0, 7); x.fill(); }); } requestAnimationFrame(loop); })(0);
}

import('./shared.js').then((m) => { document.body.append(h('button', { class: 'helpfab', 'aria-label': 'Ayuda: recorrido rápido', onclick: () => m.tour() }, '?')); });
shell(); particles();
document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href^="#/"]'); if (!a) return; e.preventDefault(); cur = a.getAttribute('href'); route(); });
route();
if (!S.introSeen) intro();
window.addEventListener('error', (e) => { if (/ResizeObserver/.test(e.message)) return; console.error(e.error || e.message); });
