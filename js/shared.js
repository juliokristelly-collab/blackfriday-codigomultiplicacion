import { h, S, save, fill, plain, rich, copyText, toast, phase, isPromoText, openAt, closeAt, now, countdown, timers, modal, validUrl, esc, download, imgToDataURL, hooks } from './core.js';
import { renderStory } from './lib/storyimg.js';
import { LAYOUT_DIST } from './data/days.js';

export const tkey = (d, i) => `t:${d}:${i}`;
export function progress(DAYS) {
  let total = 0, done = 0; DAYS.forEach((d) => d.tasks.forEach((_, i) => { total++; if (S.checks[tkey(d.n, i)]) done++; }));
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}
export const dayDone = (d) => d.tasks.filter((_, i) => S.checks[tkey(d.n, i)]).length;
export function storiesPublished() { return Object.keys(S.checks).filter((k) => k.startsWith('s:') && S.checks[k]).length; }
export function calc() { const price = 179, pct = (+S.profile.commission || 0) / 100, sales = +S.counters.sales || 0; return { price, pct, sales, gross: sales * price, comm: sales * price * pct }; }

export function copyBtn(label, getText, cls = 'btn sm') { return h('button', { class: cls, onclick: () => copyText(typeof getText === 'function' ? getText() : getText) }, label); }

export function storyText(s) {
  const L = [`HISTORIA ${s.n} · ${s.hora}`, s.top && `Texto superior: ${plain(s.top)}`, `Titular: ${plain(s.big)}`, s.sub && `Texto secundario: ${plain(s.sub)}`, s.say && `Guion hablado: ${s.say}`, `Sticker: ${s.sticker}`, `CTA: ${plain(s.cta)}`, s.link && `Enlace: ${s.link === 'promo' ? '{{LINK_PROMO}}' : '{{LINK_VENTAS}}'}`];
  return L.filter(Boolean).join('\n');
}
export function storyPreview(s) {
  const lay = s.lay || 'lbl'; const wrapSpan = (cls, t) => t ? h('div', { class: cls }, h('span', {}, rich(t))) : null;
  const plainDiv = (cls, t) => t ? h('div', { class: cls }, rich(t)) : null;
  const L = lay === 'lbl';
  const sub = fill(s.sub).text;
  return h('div', { class: `story lay-${lay} sc-${s.bg}`, role: 'img', 'aria-label': `Vista previa de la historia ${s.n}: ${plain(s.big)}` },
    h('span', { class: 's-tag' }, 'Ejemplo visual: usa tu foto/video'),
    h('div', { class: 's-in' },
      plainDiv('s-top', s.top), L ? wrapSpan('s-big', s.big) : plainDiv('s-big', s.big), L ? wrapSpan('s-sub', sub) : plainDiv('s-sub', sub),
      s.sticker && s.sticker !== '—' ? h('div', { class: 's-stk' }, plain(s.sticker.length > 60 ? s.sticker.slice(0, 58) + '…' : s.sticker)) : null,
      L ? wrapSpan('s-cta', s.cta) : plainDiv('s-cta', s.cta)));
}
export function photoTool(s, locked) {
  const cv = h('canvas', { class: 'pcanvas', style: { display: 'none' }, role: 'img', 'aria-label': 'Tu historia con foto' });
  const dl = h('button', { class: 'btn sm primary', disabled: true, onclick: () => cv.toBlob((b) => b && download(`historia-${s.n}.png`, b), 'image/png') }, '⬇ Descargar historia (PNG)');
  const inp = h('input', { type: 'file', accept: 'image/*', style: { display: 'none' }, onchange: async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { const url = await imgToDataURL(f, 1800); const im = new Image(); im.onload = async () => { await renderStory(cv, s, im); cv.style.display = ''; dl.disabled = false; toast('Listo. Descárgala o, mejor, edítala en Instagram con estos textos.'); }; im.onerror = () => toast('No pude abrir esa imagen. Prueba con otra.', 'err'); im.src = url; } catch (err) { toast('No pude abrir esa imagen. Prueba con otra.', 'err'); }
    e.target.value = '';
  } });
  return h('div', { class: 'ptool' },
    h('div', { class: 'row gap wrap' }, h('button', { class: 'btn sm', disabled: locked, onclick: () => inp.click() }, '🖼 Subir mi foto'), dl), inp, cv,
    h('p', { class: 'tiny muted' }, 'Sube tu foto y se arma la historia con el texto encima. Lo ideal es editarla directamente en Instagram (más natural y con tus stickers); esta imagen es un atajo para ir más rápido.'));
}
export function storyCard(s) {
  const key = 's:' + s.id; const raw = storyText(s); const locked = phase() === 'closed' && (s.d >= 3 || isPromoText(raw + s.big + s.sub + s.cta));
  const row = (k, v) => v ? [h('dt', {}, k), h('dd', {}, v)] : null;
  const chk = h('input', { type: 'checkbox', checked: !!S.checks[key], id: 'c' + s.id, onchange: (e) => { S.checks[key] = e.target.checked; if (!e.target.checked) delete S.checks[key]; save(); if (e.target.checked) toast('¡Historia publicada! 🔥'); } });
  const link = s.link ? fill(s.link === 'promo' ? '{{LINK_PROMO}}' : '{{LINK_VENTAS}}') : null;
  return h('article', { class: 'glass scard', id: s.id },
    h('div', {}, storyPreview(s), h('p', { class: 'tiny muted', style: { textAlign: 'center', marginTop: '8px' } }, 'Vista 9:16 de referencia'), photoTool(s, locked)),
    h('div', { class: 'col' },
      h('div', { class: 'row gap wrap' }, h('span', { class: 'pill o' }, `Historia ${s.n}`), h('span', { class: 'pill' }, s.hora), h('span', { class: 'pill' }, s.fmt), locked ? h('span', { class: 'pill red' }, 'Promoción finalizada · no publicar') : null),
      h('dl', { class: 'kv' }, row('Objetivo', s.obj), row('Escena', s.escena), row('Expresión', s.cara), row('Fondo', s.bg ? `Foto/video de «${s.bg}» (el recuadro es solo una referencia)` : ''), row('Titular', rich(s.big)), row('Texto sec.', s.sub ? rich(fill(s.sub).text) : ''), row('Guion', s.say ? fill(s.say).text : 'Sin guion hablado.'), row('Distribución', LAYOUT_DIST[s.lay]), row('Sticker', s.sticker), row('CTA', rich(s.cta)), link ? row('Enlace', link.text) : null),
      h('div', { class: 'row gap wrap' }, h('button', { class: 'btn primary sm', disabled: locked, onclick: () => copyText(raw) }, 'Copiar historia'), s.say ? h('button', { class: 'btn sm', disabled: locked, onclick: () => copyText(s.say) }, 'Copiar guion') : null, s.say ? h('button', { class: 'btn sm', onclick: async () => (await import('./views/tele.js')).openTele(s.say, `Historia ${s.n}`) }, 'Teleprompter') : null, link && validUrl(link.text) ? copyBtn('Copiar enlace', () => link.text) : null),
      h('label', { class: 'row gap', for: 'c' + s.id, style: { cursor: 'pointer', fontWeight: 700 } }, chk, 'Publicación realizada')));
}
export function countdownBox(onPhase) {
  const el = h('div', { class: 'cd' }); const label = h('p', { class: 'small muted', style: { margin: '0 0 8px' } });
  const tick = () => {
    const ph = phase(), n = now(); label.textContent = ph === 'before' ? 'Falta para la apertura de Black Friday' : ph === 'promo' ? 'Falta para el cierre de Black Week' : 'Black Week terminó';
    if (ph === 'closed') { el.innerHTML = ''; return; }
    const c = countdown((ph === 'before' ? openAt() : closeAt()) - n); el.innerHTML = '';
    [['d', 'DÍAS'], ['h', 'HORAS'], ['m', 'MIN'], ['s', 'SEG']].forEach(([k, t]) => el.append(h('div', {}, h('b', {}, String(c[k]).padStart(2, '0')), h('span', {}, t))));
  };
  tick(); timers.push(setInterval(tick, 1000)); return h('div', {}, label, el);
}
export function missingLinksNote() {
  const m = []; if (!validUrl(S.profile.linkSales)) m.push('tu enlace de ventas'); if (!validUrl(S.profile.linkPromo)) m.push('tu enlace promocional de $179');
  return m.length ? h('div', { class: 'banner warnb' }, `Falta configurar ${m.join(' y ')}. No usaremos el enlace general de la academia en su lugar. `, h('a', { href: '#/ajustes' }, 'Configurar ahora')) : null;
}

// ---------- Puntos y niveles (premian constancia y acción, no dinero) ----------
import { LEVELS } from './data/guide.js';
export function points() {
  const keys = Object.keys(S.checks).filter((k) => S.checks[k]); const C = S.counters, ok = S.ok || {};
  let p = keys.filter((k) => k.startsWith('t:')).length * 10 + keys.filter((k) => k.startsWith('s:')).length * 5;
  p += Object.keys(S.mdone).filter((k) => S.mdone[k]).length * 40;
  p += (ok.oracion ? 20 : 0) + (ok.faq ? 10 : 0) + (ok.empezar ? 10 : 0) + (validUrl(S.profile.linkSales) && validUrl(S.profile.linkPromo) ? 30 : 0);
  p += S.prospects.length * 5 + (+C.convs || 0) * 3 + (+C.links || 0) * 2 + (+C.reels || 0) * 15 + (+C.carousels || 0) * 15 + (+C.groups || 0) * 10 + (+C.lives || 0) * 20;
  return p;
}
export function levelInfo(p = points()) {
  let i = 0; LEVELS.forEach(([min], k) => { if (p >= min) i = k; });
  const cur = LEVELS[i], next = LEVELS[i + 1]; const pct = next ? Math.round((p - cur[0]) / (next[0] - cur[0]) * 100) : 100;
  return { i, name: cur[1], msg: cur[2], p, next: next ? next[1] : null, left: next ? next[0] - p : 0, pct };
}
export function levelCard() {
  const L = levelInfo();
  return h('section', { class: 'glass mt lvl' },
    h('div', { class: 'row between gap' }, h('div', {}, h('span', { class: 'pill o' }, `Nivel ${L.i + 1} de ${LEVELS.length}`), h('h2', { style: { margin: '8px 0 2px' } }, L.name), h('p', { class: 'small muted' }, L.next ? `${L.p} puntos · te faltan ${L.left} para ser «${L.next}»` : `${L.p} puntos · ¡nivel máximo!`)), h('div', { class: 'ring', style: { '--p': L.pct } }, h('i', {}, L.pct + '%'))),
    h('div', { class: 'lvls mt' }, LEVELS.map(([min, n], k) => h('span', { class: 'lv' + (k <= L.i ? ' on' : '') }, n))),
    h('p', { class: 'tiny muted mt' }, 'Ganas puntos por marcar tareas, completar misiones, publicar historias, orar, configurar tus enlaces, registrar prospectos y hacer conversaciones. Los puntos premian tu constancia, no el dinero.'));
}
let _tries = 0;
export function levelCheck() {
  const L = levelInfo(); if (L.i <= (S.lvl || 0)) return;
  if (document.querySelector('.modal-back') && _tries < 6) { _tries++; setTimeout(levelCheck, 1500); return; }
  _tries = 0; S.lvl = L.i; save();
  modal('¡Subiste de nivel!', h('div', { class: 'celebrate' }, h('div', { class: 'crystal' }), h('h2', {}, `Nivel ${L.i + 1} · ${L.name}`), h('p', { class: 'muted' }, L.msg), h('p', { class: 'small mt' }, `${L.p} puntos`)));
}
hooks.afterSave = () => setTimeout(levelCheck, 900);

// ---------- Guía: «tu siguiente paso» y recorrido ----------
export function nextStep(DAYS, idx) {
  const n = idx >= 1 && idx <= 7 ? idx : 1; const d = DAYS[n - 1]; const links = validUrl(S.profile.linkSales) && validUrl(S.profile.linkPromo);
  const todayDone = d ? dayDone(d) : 0;
  if (!S.ok.empezar) return ['Lee «Empieza aquí»', 'Son 2 minutos y te explica todo en palabras simples.', '#/empezar', 'Abrir «Empieza aquí»'];
  if (!S.ok.oracion) return ['Pon este proyecto en manos de Dios', 'Un momento de oración antes de empezar. Ahí está el texto.', '#/empezar', 'Ir a orar'];
  if (!links) return ['Pega tus dos enlaces personales', 'Sin ellos la app no puede completar tus mensajes. Te lo explica en Ajustes.', '#/ajustes', 'Configurar mis enlaces'];
  if (!todayDone) return [`Abre tu misión de hoy: ${d.name}`, 'Hoy hay una lista corta de cosas por hacer. Empieza por la primera.', `#/mision/${n}`, 'Abrir mi misión'];
  if (!S.ok.faq) return ['Lee las preguntas frecuentes', 'Así sabrás qué responder cuando alguien te pregunte por el precio, la garantía o el tiempo.', '#/preguntas', 'Ver preguntas frecuentes'];
  if (!storiesPublished()) return ['Publica tu primera historia', 'Copia el texto, usa tu foto y publícala. Puedes subir tu foto y descargarla ya armada.', `#/historias?d=${n}`, 'Ver historias de hoy'];
  if (!S.prospects.length) return ['Anota tu primera conversación', 'Cuando alguien te escriba, regístralo en Prospectos para no perder el seguimiento.', '#/prospectos', 'Ir a Prospectos'];
  return ['Sigue con tu misión de hoy', 'Termina las tareas que te faltan y marca la misión como completada.', `#/mision/${n}`, 'Abrir mi misión'];
}
export function nextCard(DAYS, idx) {
  const [t, d, href, btn] = nextStep(DAYS, idx);
  return h('section', { class: 'glass mt glow next' }, h('span', { class: 'pill o' }, '👉 Tu siguiente paso'), h('h2', { style: { margin: '8px 0 4px' } }, t), h('p', { class: 'small muted' }, d), h('div', { class: 'row gap wrap mt' }, h('a', { class: 'btn primary', href }, btn), h('button', { class: 'btn', onclick: () => tour() }, 'Ver recorrido de 1 minuto')));
}
export function tour() {
  const steps = [
    ['👋', 'Bienvenida o bienvenido', 'Este reto lo creó Deborah para que puedas aumentar tus ventas esta semana. Te acompaño paso a paso. No necesitas hacerlo perfecto, solo avanzar un poco cada día.', null],
    ['🔗', '1. Pega tus dos enlaces', 'En «Ajustes» pega tu enlace personal de ventas y tu enlace promocional. Con eso, todos los mensajes que copies saldrán con tu enlace.', 'ajustes'],
    ['◆', '2. Abre la misión del día', 'Cada día tiene una misión: una lista corta de tareas. Debajo verás en palabras simples qué hacer y qué publicar.', 'misiones'],
    ['▤', '3. Copia, publica y marca', 'En «Contenido» están las historias, guiones, carruseles y mensajes de WhatsApp. Copia el texto, publícalo y marca la tarea: así sumas puntos.', 'contenido'],
    ['？', '4. Cuando te pregunten, usa las respuestas', 'En «Preguntas» encuentras qué responder sobre precio, garantía, tiempo y más. Copia, adapta con tu voz y responde con honestidad.', 'preguntas'],
    ['☰', '5. Anota tus conversaciones', 'En «Prospectos» registras a quién le escribes y cómo va. Allí puedes ver tu progreso y tus niveles.', 'prospectos'],
  ];
  let i = 0; const body = h('div'); const m = modal('Recorrido rápido', body, []);
  const draw = () => { body.innerHTML = ''; const [ic, t, d, href] = steps[i];
    body.append(h('div', {}, h('h2', {}, `${ic} ${t}`), h('p', { class: 'muted' }, d), h('p', { class: 'tiny muted' }, `Paso ${i + 1} de ${steps.length}`),
      h('div', { class: 'row gap wrap mt' }, i > 0 ? h('button', { class: 'btn sm', onclick: () => { i--; draw(); } }, '← Atrás') : null, i < steps.length - 1 ? h('button', { class: 'btn primary sm', onclick: () => { i++; draw(); } }, 'Siguiente →') : h('button', { class: 'btn primary sm', onclick: () => m.close() }, '¡Listo, vamos!'), href ? h('button', { class: 'btn sm', onclick: () => { m.close(); window.__go(href); } }, 'Ir ahora') : null))); };
  draw();
}
