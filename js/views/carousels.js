import { h, S, save, toast, copyText, download, phase, isPromoText, plain, imgToDataURL, fill } from '../core.js';
import { CAROUSELS, DISCLOSURE } from '../data/messages.js';
import { zip } from '../lib/zip.js';

const W = 1080, H = 1350;
function wrap(ctx, text, maxW) { const words = text.split(/\s+/), lines = []; let cur = ''; for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t.replace(/\*/g, '')).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; } if (cur) lines.push(cur); return lines; }
// Dibuja texto con *resalte*; ajusta tamaño para caber en la caja.
function drawText(ctx, txt, x, y, maxW, maxH, o) {
  let size = o.size; let lines;
  for (; size >= 28; size -= 4) { ctx.font = `${o.weight || 800} ${size}px ${o.font}`; lines = wrap(ctx, txt, maxW); if (lines.length * size * 1.15 <= maxH) break; }
  const lh = size * 1.15; let yy = y;
  if (o.vmid) yy = y + (maxH - lines.length * lh) / 2;
  lines.forEach((ln, i) => {
    const segs = ln.split(/(\*[^*]+\*)/g).filter(Boolean); const parts = segs.map((s) => ({ t: s.replace(/\*/g, ''), hl: s[0] === '*' })); ctx.font = `${o.weight || 800} ${size}px ${o.font}`;
    const wTot = parts.reduce((a, p) => a + ctx.measureText(p.t).width, 0); let cx = o.align === 'center' ? x + (maxW - wTot) / 2 : x;
    parts.forEach((p) => { ctx.fillStyle = p.hl ? o.accent : o.color; ctx.textBaseline = 'top'; ctx.fillText(p.t, cx, yy + i * lh); if (p.hl) { const w = ctx.measureText(p.t).width; ctx.fillRect(cx, yy + i * lh + size * 1.02, w, Math.max(4, size * 0.05)); } cx += ctx.measureText(p.t).width; });
  });
  return yy + lines.length * lh;
}
export function renderSlide(canvas, slide, comp, i, total, photo) {
  const P = S.profile, acc = P.accent || '#FF4002', bg = P.bg || '#080808', font = `${P.font || 'Montserrat'}, system-ui, sans-serif`;
  canvas.width = W; canvas.height = H; const c = canvas.getContext('2d');
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(W * 0.85, 0, 50, W * 0.85, 0, 900); g.addColorStop(0, acc + '66'); g.addColorStop(1, 'transparent'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  if (photo && (comp === 'foto' || comp === 'impacto')) { try { const k = Math.max(W / photo.width, H / photo.height); const w = photo.width * k, hh = photo.height * k; c.globalAlpha = comp === 'foto' ? 0.55 : 0.28; c.drawImage(photo, (W - w) / 2, (H - hh) / 2, w, hh); c.globalAlpha = 1; const gg = c.createLinearGradient(0, 0, 0, H); gg.addColorStop(0, 'rgba(0,0,0,.35)'); gg.addColorStop(1, 'rgba(0,0,0,.85)'); c.fillStyle = gg; c.fillRect(0, 0, W, H); } catch (e) { } }
  const [t, sub, kind] = slide; const o = { font, accent: acc, color: '#fff' };
  c.fillStyle = acc; c.fillRect(70, 70, 90, 8);
  if (kind === 'price') {
    c.textBaseline = 'top'; c.fillStyle = '#ffffffaa'; c.font = `700 40px ${font}`; c.fillText('PRECIO REGULAR', 70, 260);
    c.fillStyle = '#fff'; c.font = `800 120px ${font}`; const reg = '$297 USD'; c.fillText(reg, 70, 320); const rw = c.measureText(reg).width; c.fillStyle = acc; c.fillRect(70, 385, rw, 10);
    c.fillStyle = '#ffffffaa'; c.font = `700 40px ${font}`; c.fillText('PRECIO BLACK WEEK', 70, 560);
    c.fillStyle = acc; c.font = `900 250px ${font}`; c.fillText('$179', 70, 610); c.fillStyle = '#fff'; c.font = `800 80px ${font}`; c.fillText('USD', 70 + c.measureText('$179').width + 20 - 20, 750 + 60);
    c.font = `800 52px ${font}`; c.fillStyle = '#fff'; c.fillText('Ahorras $118 USD', 70, 960);
    c.font = `600 34px ${font}`; c.fillStyle = '#ffffffbb'; c.fillText('Precio especial hasta el cierre de Black Week.', 70, 1040);
  } else if (comp === 'minimal') {
    drawText(c, t || sub, 90, 200, W - 180, H - 480, { ...o, size: 78, weight: 600, vmid: true });
    if (t && sub) drawText(c, sub, 90, H - 300, W - 180, 160, { ...o, size: 40, weight: 500, color: '#ffffffbb' });
  } else if (comp === 'editorial') {
    const y = drawText(c, t, 90, 200, W - 180, 640, { ...o, size: 96 });
    if (sub) drawText(c, sub, 90, Math.min(y + 50, 900), W - 180, 280, { ...o, size: 46, weight: 500, color: '#ffffffcc' });
  } else { // impacto / foto
    drawText(c, t || sub, 80, 220, W - 160, 700, { ...o, size: 130, vmid: false, weight: 900 });
    if (t && sub) drawText(c, sub, 80, 940, W - 160, 240, { ...o, size: 48, weight: 600, color: '#ffffffdd' });
  }
  c.font = `700 30px ${font}`; c.fillStyle = '#ffffffaa'; c.textBaseline = 'alphabetic';
  const who = [P.name, P.ig].filter(Boolean).join(' · ') || 'Código Multiplicación PRO'; c.fillText(who, 70, H - 70);
  c.textAlign = 'right'; c.fillText(`${i + 1}/${total}`, W - 70, H - 70); c.textAlign = 'left';
  if (i < total - 1) { c.fillStyle = acc; c.font = `800 44px ${font}`; c.textAlign = 'right'; c.fillText('→', W - 70, H - 120); c.textAlign = 'left'; }
}
const loadImg = (src) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
const toBlob = (cv) => new Promise((r) => cv.toBlob(r, 'image/png'));

export default async function (root, r) {
  const id = r.arg; const cs = CAROUSELS[id];
  if (!cs) { root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Carruseles'), h('p', { class: 'muted' }, 'Formato 1080 × 1350 (4:5). Descarga cada lámina en PNG o todo en un ZIP.'), h('div', { class: 'grid g3 mt' }, Object.values(CAROUSELS).map((c) => h('a', { class: 'glass', href: `#/carruseles/${c.id}`, style: { textDecoration: 'none', color: '#fff' } }, h('span', { class: 'pill o' }, c.id.toUpperCase()), h('h3', { style: { margin: '8px 0 4px' } }, c.name), h('p', { class: 'muted small' }, `${c.slides.length} láminas`))))); return; }
  const raw = JSON.stringify(cs); const locked = phase() === 'closed' && isPromoText(raw) ;
  let photo = null; if (S.profile.photo) photo = await loadImg(S.profile.photo);
  const strip = h('div', { class: 'strip' }); const canv = [];
  cs.slides.forEach((sl, i) => { const cv = h('canvas', { role: 'img', 'aria-label': `Lámina ${i + 1}: ${plain(sl[0] || sl[1])}` }); canv.push(cv); strip.append(h('div', {}, cv, h('div', { class: 'row gap mt' }, h('button', { class: 'btn sm', disabled: locked, onclick: async () => { download(`${cs.id}-${i + 1}.png`, await toBlob(cv)); } }, 'PNG')))); });
  const draw = () => cs.slides.forEach((sl, i) => renderSlide(canv[i], sl, cs.comps[i], i, cs.slides.length, photo));
  const cap = h('textarea', { style: { minHeight: '110px' } }); cap.value = cs.caption + '\n\n' + DISCLOSURE;
  const up = h('input', { type: 'file', accept: 'image/*', style: { display: 'none' }, onchange: async (e) => { const f = e.target.files[0]; if (!f) return; try { const url = await imgToDataURL(f, 1400); photo = await loadImg(url); draw(); toast('Foto aplicada a las láminas con foto'); } catch (x) { toast('No se pudo leer la imagen', 'err'); } } });
  root.append(h('a', { href: '#/carruseles', class: 'muted small' }, '← Carruseles'), h('h1', {}, `Carrusel ${cs.name}`), locked ? h('div', { class: 'banner' }, 'La promoción terminó: las descargas de este carrusel están bloqueadas porque anuncian el precio de $179.') : null,
    h('p', { class: 'muted' }, 'Las láminas usan tu color y tipografía de Ajustes. Para las láminas con foto, sube una imagen tuya.'), strip,
    h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary', disabled: locked, onclick: async () => { const files = []; for (let i = 0; i < canv.length; i++) { const b = await toBlob(canv[i]); files.push({ name: `${cs.id}-${String(i + 1).padStart(2, '0')}.png`, data: new Uint8Array(await b.arrayBuffer()) }); } download(`carrusel-${cs.id}.zip`, zip(files), 'application/zip'); S.counters.carousels = (+S.counters.carousels || 0) + 0; save(); toast('ZIP descargado'); } }, 'Descargar ZIP'), h('button', { class: 'btn', onclick: () => up.click() }, '🖼 Subir mi foto'), up,
      h('label', { class: 'row gap', style: { cursor: 'pointer' } }, h('input', { type: 'checkbox', checked: !!S.checks['car:' + cs.id], onchange: (e) => { if (e.target.checked) { S.checks['car:' + cs.id] = true; S.counters.carousels = (+S.counters.carousels || 0) + 1; } else { delete S.checks['car:' + cs.id]; S.counters.carousels = Math.max(0, (+S.counters.carousels || 0) - 1); } save(); } }), 'Publicado')),
    h('section', { class: 'glass mt' }, h('h2', {}, 'Caption'), cap, h('div', { class: 'row gap mt' }, h('button', { class: 'btn', disabled: locked, onclick: () => copyText(cap.value) }, 'Copiar caption'))));
  draw(); if (document.fonts?.ready) document.fonts.ready.then(draw);
}
