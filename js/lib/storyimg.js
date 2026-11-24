// Genera una historia 1080×1920 con tu foto de fondo y el texto de la historia, lista para descargar.
// Respeta las zonas seguras de Instagram (arriba ~250 px y abajo ~340 px quedan libres).
import { S, fill } from '../core.js';

export const SW = 1080, SH = 1920;

function tokens(text) {
  const out = []; String(text || '').split('*').forEach((seg, i) => { seg.split(/\s+/).filter(Boolean).forEach((w) => out.push({ w, hl: i % 2 === 1 })); }); return out;
}
function layout(ctx, toks, maxW) {
  const lines = []; let cur = [], width = 0; const sp = ctx.measureText(' ').width;
  toks.forEach((t) => { const w = ctx.measureText(t.w).width; if (cur.length && width + sp + w > maxW) { lines.push({ ws: cur, width }); cur = []; width = 0; } width += (cur.length ? sp : 0) + w; cur.push({ ...t, wd: w }); });
  if (cur.length) lines.push({ ws: cur, width });
  return lines;
}
// Dibuja un bloque de texto; devuelve la altura usada. mode: 'label' (cajas blancas) | 'shadow'
function block(ctx, text, o) {
  if (!text) return 0;
  const toks = tokens(text); let size = o.size, lines;
  for (; size >= 34; size -= 4) { ctx.font = `${o.weight} ${size}px ${o.font}`; lines = layout(ctx, toks, o.w); if (lines.length * size * 1.22 <= o.maxH) break; }
  ctx.font = `${o.weight} ${size}px ${o.font}`; const lh = size * 1.22, sp = ctx.measureText(' ').width; ctx.textBaseline = 'top';
  lines.forEach((ln, i) => {
    const y = o.y + i * lh; let x = o.align === 'center' ? o.x + (o.w - ln.width) / 2 : o.x;
    if (o.mode === 'label') { ctx.fillStyle = o.boxColor || '#fff'; const pad = size * 0.28; const r = size * 0.18; ctx.beginPath(); ctx.roundRect(x - pad, y - pad * 0.1, ln.width + pad * 2, lh + pad * 0.1, r); ctx.fill(); }
    ln.ws.forEach((t) => {
      if (o.mode === 'shadow') { ctx.shadowColor = 'rgba(0,0,0,.75)'; ctx.shadowBlur = size * 0.35; ctx.shadowOffsetY = size * 0.05; }
      ctx.fillStyle = t.hl ? o.accent : o.color; ctx.fillText(t.w, x, y); ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
      if (t.hl) { ctx.fillStyle = o.accent; ctx.fillRect(x, y + size * 1.02, t.wd, Math.max(5, size * 0.06)); }
      x += t.wd + sp;
    });
  });
  return lines.length * lh;
}
export async function renderStory(canvas, s, photo) {
  try { await document.fonts.load('800 60px Montserrat'); await document.fonts.load('600 40px Montserrat'); } catch (e) { /* sigue con la fuente disponible */ }
  const P = S.profile, acc = P.accent || '#FF4002', font = `${P.font || 'Montserrat'}, system-ui, sans-serif`;
  canvas.width = SW; canvas.height = SH; const c = canvas.getContext('2d');
  c.fillStyle = '#0a0a0a'; c.fillRect(0, 0, SW, SH);
  if (photo) { const k = Math.max(SW / photo.width, SH / photo.height); const w = photo.width * k, h = photo.height * k; c.drawImage(photo, (SW - w) / 2, (SH - h) / 2, w, h); }
  else { const g = c.createRadialGradient(SW * 0.5, SH * 0.3, 80, SW * 0.5, SH * 0.3, 1100); g.addColorStop(0, acc + '99'); g.addColorStop(1, 'transparent'); c.fillStyle = g; c.fillRect(0, 0, SW, SH); }
  const lay = s.lay || 'lbl'; const sub = fill(s.sub).text;
  // Velo oscuro suave para que el texto se lea sobre cualquier foto.
  const v = c.createLinearGradient(0, 0, 0, SH); v.addColorStop(0, 'rgba(0,0,0,.45)'); v.addColorStop(0.35, 'rgba(0,0,0,.12)'); v.addColorStop(0.6, 'rgba(0,0,0,.2)'); v.addColorStop(1, 'rgba(0,0,0,.65)');
  if (lay !== 'lbl') { c.fillStyle = v; c.fillRect(0, 0, SW, SH); }
  const X = 90, W = SW - 180; const base = { x: X, w: W, font, accent: acc, color: '#fff', align: 'left' };
  const clean = (t) => String(t || '').replace(/\{\{[^}]+\}\}/g, '');
  if (lay === 'lbl') {
    let y = 760; if (s.top) block(c, clean(s.top), { ...base, y: 330, size: 46, weight: 700, maxH: 200, mode: 'shadow' });
    const hb = block(c, clean(s.big), { ...base, y, size: 92, weight: 800, maxH: 420, mode: 'label', color: '#111', boxColor: '#fff' }); y += hb + 36;
    if (sub) y += block(c, clean(sub), { ...base, y, size: 46, weight: 600, maxH: 300, mode: 'label', color: '#111', boxColor: '#fff' }) + 40;
    if (s.cta) { const t = clean(s.cta).replace(/\*/g, ''); c.font = `800 44px ${font}`; const w = c.measureText(t).width + 80; const yy = Math.min(Math.max(y, 1300), SH - 340 - 90); c.fillStyle = acc; c.beginPath(); c.roundRect(X, yy, w, 92, 46); c.fill(); c.fillStyle = '#fff'; c.textBaseline = 'middle'; c.fillText(t, X + 40, yy + 47); }
  } else if (lay === 'cine' || lay === 'price') {
    const hb = lay === 'price' ? 150 : 108; const used = block(c, clean(s.big), { ...base, align: 'center', y: 640, size: hb, weight: 900, maxH: 520, mode: 'shadow' });
    if (sub) block(c, clean(sub), { ...base, align: 'center', y: 640 + used + 40, size: 48, weight: 600, maxH: 300, mode: 'shadow' });
    if (s.cta) block(c, clean(s.cta), { ...base, align: 'center', y: SH - 340 - 130, size: 44, weight: 800, maxH: 120, mode: 'shadow' });
  } else { // top, poll y demás: texto arriba y espacio libre al centro para el sticker
    if (s.top) block(c, clean(s.top), { ...base, y: 270, size: 44, weight: 700, maxH: 160, mode: 'shadow' });
    const used = block(c, clean(s.big), { ...base, y: s.top ? 400 : 290, size: 96, weight: 900, maxH: 560, mode: 'shadow' });
    if (sub) block(c, clean(sub), { ...base, y: (s.top ? 400 : 290) + used + 30, size: 44, weight: 600, maxH: 260, mode: 'shadow' });
    if (s.cta) block(c, clean(s.cta), { ...base, y: SH - 340 - 120, size: 44, weight: 800, maxH: 110, mode: 'shadow' });
  }
  return canvas;
}
