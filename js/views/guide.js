import { h, S, phase, validUrl, toast, closeText, fill, download } from '../core.js';
import { FACTS, DISCLOSURE, LIVE_FAQ } from '../data/messages.js';
import { missingLinksNote } from '../shared.js';

const loadQR = () => new Promise((res) => { if (window.qrcode) return res(window.qrcode); const s = document.createElement('script'); s.src = 'js/lib/qrcode.js'; s.onload = () => res(window.qrcode); s.onerror = () => res(null); document.head.append(s); });

async function downloadGuide() {
  let css = ''; try { css = await (await fetch('css/app.css')).text(); } catch (e) { }
  const el = document.getElementById('gpages'); if (!el) return;
  const html = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Guía para prospectos</title><style>' + css + '</style></head><body style="background:#000"><div class="view"><p style="color:#aaa;font:14px sans-serif;text-align:center" class="noprint">Imprime esta página (Ctrl/Cmd + P) y elige «Guardar como PDF».</p>' + el.outerHTML + '</div></body></html>';
  download('guia-prospectos.html', html, 'text/html');
}
export default async function (root) {
  const ph = phase(); const P = S.profile;
  if (ph === 'closed') { root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Guía para prospectos'), h('div', { class: 'banner' }, 'Black Week terminó, por eso la guía con precio promocional está bloqueada. El precio regular vuelve a $297 USD.'), h('a', { class: 'btn primary mt', href: '#/resultados' }, 'Ver mis resultados')); return; }
  const link = validUrl(P.linkPromo) ? P.linkPromo.trim() : '';
  const qr = h('div', { class: 'qr' });
  const q = await loadQR();
  if (q && link) { try { const o = q(0, 'M'); o.addData(link); o.make(); qr.innerHTML = o.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); } catch (e) { qr.textContent = 'No se pudo generar el QR.'; } }
  else qr.append(h('p', { class: 'small' }, link ? 'No se pudo cargar el generador de QR.' : 'Pega tu enlace promocional en Ajustes para generar tu QR.'));
  const who = P.name || '[Tu nombre]';
  const page = (...k) => h('section', { class: 'gpage' }, ...k);
  const pages = h('div', { id: 'gpages' },
    page(h('p', { class: 'tiny', style: { letterSpacing: '.2em', color: 'var(--o)' } }, 'CÓDIGO MULTIPLICACIÓN PRO'), h('h1', { style: { fontSize: '44px', margin: '90px 0 14px' } }, 'Aprende a comercializar productos digitales'), h('p', { class: 'serif', style: { fontSize: '26px' } }, FACTS.promise), h('p', { class: 'muted', style: { marginTop: '40px' } }, `Guía compartida por ${who}`)),
    page(h('h2', {}, '¿Qué es el marketing de afiliación?'), h('p', {}, 'Es un modelo en el que recomiendas y comercializas productos digitales creados por otras personas y puedes recibir una comisión cuando una venta se atribuye a tu enlace.'), h('p', {}, 'No es dinero rápido ni reclutar personas. Requiere aprender a crear contenido, conversar y comunicar valor.'), h('h2', { style: { marginTop: '28px' } }, 'Para quién NO es'), h('ul', {}, FACTS.notFor.map((x) => h('li', {}, x)))),
    page(h('h2', {}, 'Qué incluye (según la página oficial)'), h('ul', {}, FACTS.includes.map((x) => h('li', {}, x))), h('h2', { style: { marginTop: '22px' } }, 'Las 4 estrategias'), h('ul', {}, FACTS.keys.map((x) => h('li', {}, x)))),
    page(h('h2', {}, 'Inversión'), h('p', { class: 'muted' }, 'Precio regular'), h('p', { style: { fontSize: '40px', fontWeight: 800, textDecoration: 'line-through' } }, '$297 USD'), h('p', { class: 'muted' }, ph === 'before' ? 'Precio Black Week (desde el viernes 27)' : 'Precio Black Week'), h('p', { style: { fontSize: '76px', fontWeight: 900, color: 'var(--o)', lineHeight: 1 } }, '$179 USD'), h('p', {}, 'Ahorro: $118 USD.'), h('p', { class: 'small' }, `Vigente hasta ${closeText()}.`), h('h2', { style: { marginTop: '22px', fontSize: '18px' } }, 'Importante'), h('ul', { class: 'small' }, FACTS.disclaimers.map((x) => h('li', {}, x)))),
    page(h('h2', {}, 'Preguntas frecuentes'), ...LIVE_FAQ.slice(0, 4).map(([a, b]) => h('p', { class: 'small' }, h('b', {}, a), h('br'), b)), h('h2', { style: { marginTop: '18px' } }, 'Tu siguiente paso'), h('div', { class: 'row gap' }, qr, h('div', {}, h('p', { class: 'small' }, link ? 'Escanea el código para ver la oferta con precio de Black Week.' : 'Falta tu enlace promocional.'), link ? h('p', { class: 'tiny', style: { wordBreak: 'break-all' } }, link) : null)), h('p', { class: 'tiny muted', style: { marginTop: '16px' } }, `Soy ${who}, afiliado/a de Código Multiplicación PRO: si compras con mi enlace puedo recibir una comisión, sin costo adicional para ti. Esta guía no garantiza ingresos.`)));
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Guía para prospectos'), h('p', { class: 'muted' }, '5 páginas con tu QR. Se descarga como archivo; ábrelo en tu navegador e imprímelo con «Guardar como PDF».'), missingLinksNote(),
    h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary', onclick: () => { if (!link) { toast('Primero pega tu enlace promocional en Ajustes. La guía no usará el enlace general.', 'warn'); return; } downloadGuide(); } }, 'Descargar guía (HTML para imprimir como PDF)'), h('a', { class: 'btn', href: '#/ajustes' }, 'Configurar enlaces')), pages);
}
