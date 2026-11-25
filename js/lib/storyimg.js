// Genera una historia 1080×1920 con tu foto de fondo y el texto de la historia, lista para descargar.
// Respeta las zonas seguras de Instagram (arriba ~250 px y abajo ~340 px quedan libres).
import { S, fill } from '../core.js';

export const SW = 1080, SH = 1920;

function tokens(text) {
  // *palabra* = resaltada en color; ~~texto~~ = tachado
  const out = []; let hl = false, st = false;
  String(text || '').split(/(\*|~~)/).forEach((seg) => {
    if (seg === '*') { hl = !hl; return; } if (seg === '~~') { st = !st; return; }
    seg.split(/\s+/).filter(Boolean).forEach((w) => out.push({ w, hl, st }));
  });
  return out;
}
function layout(ctx, toks, maxW) {
  const lines = []; let cur = [], width = 0; const sp = ctx.measureText(' ').width;
  toks.forEach((t) => { const w = ctx.measureText(t.w).width; if (cur.length && width + sp + w > maxW) { lines.push({ ws: cur, width }); cur = []; width = 0; } width += (cur.length ? sp : 0) + w; cur.push({ ...t, wd: w }); });
  if (cur.length) lines.push({ ws: cur, width });
  return lines;
}
// Mide un bloque: baja el tamaño hasta que quepa (alto y ancho de palabra). No dibuja.
function prep(ctx, text, o) {
  if (!text) return null;
  const toks = tokens(text); let size = o.size, lines;
  for (; size >= 40; size -= 4) {
    ctx.font = `${o.weight} ${size}px ${o.font}`; lines = layout(ctx, toks, o.w);
    const wide = lines.some((l) => l.width > o.w + 1);
    if (!wide && lines.length * size * 1.18 <= o.maxH) break;
  }
  ctx.font = `${o.weight} ${size}px ${o.font}`;
  return { ...o, size, lines, lh: size * 1.18, h: lines.length * size * 1.18, sp: ctx.measureText(' ').width };
}
// Dibuja un bloque centrado, letra gruesa con sombra fuerte y contorno suave para que se lea sobre cualquier foto.
function paint(ctx, b, y0) {
  if (!b) return;
  ctx.textBaseline = 'top'; ctx.font = `${b.weight} ${b.size}px ${b.font}`; ctx.lineJoin = 'round';
  b.lines.forEach((ln, i) => {
    const y = y0 + i * b.lh; let x = b.x + (b.w - ln.width) / 2;
    ln.ws.forEach((t) => {
      // contorno oscuro
      ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = Math.max(4, b.size * 0.09); ctx.strokeText(t.w, x, y);
      // sombra suave amplia + sombra marcada
      ctx.shadowColor = 'rgba(0,0,0,.85)'; ctx.shadowBlur = b.size * 0.4; ctx.shadowOffsetY = b.size * 0.06;
      ctx.fillStyle = t.hl ? b.accent : '#fff'; ctx.globalAlpha = t.st ? 0.8 : 1; ctx.fillText(t.w, x, y);
      ctx.shadowBlur = b.size * 0.12; ctx.fillText(t.w, x, y); ctx.globalAlpha = 1;
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
      if (t.st) { ctx.fillStyle = '#fff'; ctx.fillRect(x - 4, y + b.size * 0.5, t.wd + 8, Math.max(7, b.size * 0.07)); }
      else if (t.hl) { ctx.fillStyle = b.accent; ctx.fillRect(x, y + b.size * 1.04, t.wd, Math.max(6, b.size * 0.06)); }
      x += t.wd + b.sp;
    });
  });
}
// "Humito": mancha oscura difusa detrás del texto (sin filtros, funciona en todos los navegadores).
function smoke(c, cx, cy, hw, hh, a = 0.5) {
  c.save(); c.translate(cx, cy); c.scale(1, hh / hw);
  const g = c.createRadialGradient(0, 0, hw * 0.15, 0, 0, hw);
  g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.45, `rgba(0,0,0,${a * 0.75})`); g.addColorStop(0.75, `rgba(0,0,0,${a * 0.3})`); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, hw, 0, Math.PI * 2); c.fill(); c.restore();
}
function pill(c, text, cx, y, font, acc) {
  c.font = `800 52px ${font}`; const w = c.measureText(text).width + 110, h = 112, x = cx - w / 2;
  c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 28; c.shadowOffsetY = 8; c.fillStyle = acc; c.beginPath(); c.roundRect(x, y, w, h, h / 2); c.fill(); c.shadowColor = 'transparent'; c.shadowBlur = 0; c.shadowOffsetY = 0;
  c.fillStyle = '#fff'; c.textBaseline = 'middle'; c.fillText(text, x + 55, y + h / 2 + 2); return { w, h };
}
export async function renderStory(canvas, s, photo) {
  try { await document.fonts.load('900 60px Montserrat'); await document.fonts.load('800 60px Montserrat'); await document.fonts.load('700 40px Montserrat'); } catch (e) { /* sigue con la fuente disponible */ }
  const P = S.profile, acc = P.accent || '#FF4002', font = `${P.font || 'Montserrat'}, system-ui, sans-serif`;
  canvas.width = SW; canvas.height = SH; const c = canvas.getContext('2d');
  c.fillStyle = '#0a0a0a'; c.fillRect(0, 0, SW, SH);
  if (photo) { const k = Math.max(SW / photo.width, SH / photo.height); const w = photo.width * k, h = photo.height * k; c.drawImage(photo, (SW - w) / 2, (SH - h) / 2, w, h); }
  else { const g = c.createRadialGradient(SW * 0.5, SH * 0.3, 80, SW * 0.5, SH * 0.3, 1100); g.addColorStop(0, acc + '99'); g.addColorStop(1, 'transparent'); c.fillStyle = g; c.fillRect(0, 0, SW, SH); }
  const lay = s.lay || 'lbl'; const sub = fill(s.sub).text;
  // Velo suave general (arriba y abajo un poco más oscuro).
  const v = c.createLinearGradient(0, 0, 0, SH); v.addColorStop(0, 'rgba(0,0,0,.4)'); v.addColorStop(0.4, 'rgba(0,0,0,.16)'); v.addColorStop(0.65, 'rgba(0,0,0,.22)'); v.addColorStop(1, 'rgba(0,0,0,.6)');
  c.fillStyle = v; c.fillRect(0, 0, SW, SH);
  const X = 90, W = SW - 180, cx = SW / 2; const base = { x: X, w: W, font, accent: acc };
  const clean = (t) => String(t || '').replace(/\{\{[^}]+\}\}/g, '');
  const price = lay === 'price';
  const top = prep(c, clean(s.top), { ...base, size: 54, weight: 800, maxH: 150 });
  const big = prep(c, clean(s.big), { ...base, size: price ? 170 : 132, weight: 900, maxH: price ? 520 : 560 });
  const sb = prep(c, clean(sub), { ...base, size: 58, weight: 700, maxH: 320 });
  const ctaT = s.cta ? clean(s.cta).replace(/\*/g, '') : '';
  const G = 44, hasCta = !!ctaT;
  const parts = [top, big, sb].filter(Boolean);
  const textH = parts.reduce((a, b) => a + b.h, 0) + G * Math.max(0, parts.length - 1);
  // Todas las historias van centradas en vertical (texto + botón). Nada pasa de ~1480 px: más abajo Instagram tapa con la barra de respuesta.
  const ctaH = hasCta ? 112 + G : 0; const total = textH + ctaH;
  let y = Math.max(280, Math.min(930 - total / 2, 1480 - total)); const y0 = y;
  smoke(c, cx, y0 + total / 2, W * 0.8, total * 0.85 + 100);
  parts.forEach((b) => { paint(c, b, y); y += b.h + G; });
  if (hasCta) pill(c, ctaT, cx, y, font, acc);
  return canvas;
}
