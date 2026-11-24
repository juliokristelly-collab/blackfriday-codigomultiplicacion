import { h, S, save, copyText, toast, fill, modal, plain, phase, isPromoText, download } from '../core.js';
import { SCRIPTS, SCRIPT_NOTE } from '../data/scripts.js';
import { MASTER_PROMPT, VARS } from '../data/messages.js';
import { openTele } from './tele.js';

const full = (s) => s.blocks.map((b) => `${b[0]} (${b[1]})\n${b[2]}`).join('\n\n');
const pack = (s, fe) => [`TÍTULO: ${s.title}`, `OBJETIVO: ${s.obj}`, `HOOK PRINCIPAL: ${s.blocks[0][2]}`, `HOOKS ALTERNATIVOS:\n- ${s.alts.join('\n- ')}`, `GUION POR BLOQUES:\n${full(s)}`, fe ? `LENGUAJE DE FE (opcional):\n${s.fe}` : '', `TEXTO EN PANTALLA: ${s.onscreen}`, `ESCENA: ${s.scene}`, `TONO: ${s.tone}`, `MOVIMIENTO: ${s.moves}`, `TOMAS EXTRA: ${s.extra}`, `CTA: ${s.cta}`, `COMENTARIO FIJADO: ${s.pinned}`, `CAPTION:\n${s.copy}`].filter(Boolean).join('\n\n');

export default async function (root, r) {
  if (r.arg === 'nuevo') return studio(root);
  const s = SCRIPTS.find((x) => x.id === r.arg); if (!s) { root.append(h('p', {}, 'Guion no encontrado.'), h('a', { class: 'btn', href: '#/guiones' }, 'Volver')); return; }
  let fe = false; const key = 'sc:' + s.id; const body = h('div'); const locked = () => phase() === 'closed' && isPromoText(full(s) + s.copy);
  const text = () => S.edits[key] != null ? S.edits[key] : full(s);
  const draw = () => {
    body.innerHTML = '';
    if (S.edits[key] != null) body.append(h('div', { class: 'banner warnb' }, 'Estás viendo tu versión editada. ', h('button', { class: 'btn sm', onclick: () => { delete S.edits[key]; save(); draw(); } }, 'Restaurar original')));
    if (S.edits[key] != null) body.append(h('pre', { class: 'copy' }, fill(S.edits[key]).text));
    else s.blocks.forEach((b) => body.append(h('div', { class: 'blk' }, h('b', {}, `${b[0]} · ${b[1]}`), h('p', {}, fill(b[2]).text))));
    if (fe) body.append(h('div', { class: 'blk' }, h('b', {}, 'LENGUAJE DE FE SUAVE (OPCIONAL)'), h('p', {}, s.fe), h('p', { class: 'tiny muted' }, 'Sin prometer prosperidad ni usar la compra como prueba de fe.')));
  };
  const edit = () => { const ta = h('textarea', { style: { minHeight: '320px' } }); ta.value = text(); const m = modal('Editar guion', ta, [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancelar'), h('button', { class: 'btn primary', onclick: () => { S.edits[key] = ta.value; save(); m.close(); draw(); toast('Guion guardado'); } }, 'Guardar')]); };
  root.append(h('a', { href: '#/guiones', class: 'muted small' }, '← Guiones'),
    h('section', { class: 'glass glow mt' }, h('div', { class: 'row gap wrap' }, h('span', { class: 'pill o' }, s.kind), h('span', { class: 'pill' }, s.dur), locked() ? h('span', { class: 'pill red' }, 'Promoción finalizada') : null), h('h1', { style: { margin: '10px 0' } }, s.title), h('p', { class: 'muted' }, s.obj)),
    h('div', { class: 'banner mt' }, SCRIPT_NOTE),
    h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn primary', onclick: () => openTele(text() + (fe ? '\n\n' + s.fe : ''), s.title) }, '▶ Teleprompter'), h('button', { class: 'btn', onclick: () => copyText(text() + (fe ? '\n\n' + s.fe : '')) }, 'Copiar guion'), h('button', { class: 'btn', onclick: () => copyText(pack(s, fe)) }, 'Copiar paquete completo'), h('button', { class: 'btn', onclick: edit }, '✎ Editar'),
      h('label', { class: 'row gap', style: { cursor: 'pointer' } }, h('input', { type: 'checkbox', onchange: (e) => { fe = e.target.checked; draw(); } }), 'Añadir lenguaje de fe suave')),
    h('section', { class: 'glass mt' }, h('h2', {}, 'Guion por bloques'), body),
    h('section', { class: 'glass mt' }, h('h2', {}, 'Hooks alternativos'), h('ul', {}, s.alts.map((a) => h('li', {}, a)))),
    h('section', { class: 'glass mt' }, h('h2', {}, 'Dirección de grabación'), h('dl', { class: 'kv' }, ...[['Texto en pantalla', s.onscreen], ['Escena', s.scene], ['Tono', s.tone], ['Movimiento', s.moves], ['Tomas extra', s.extra], ['CTA', s.cta], ['Comentario fijado', s.pinned]].flatMap(([k, v]) => [h('dt', {}, k), h('dd', {}, v)]))),
    h('section', { class: 'glass mt' }, h('h2', {}, 'Caption'), h('pre', { class: 'copy' }, fill(s.copy).text), h('button', { class: 'btn sm', onclick: () => copyText(s.copy) }, 'Copiar caption')),
    h('label', { class: 'row gap mt', style: { cursor: 'pointer', fontWeight: 700 } }, h('input', { type: 'checkbox', checked: !!S.checks['g:' + s.id], onchange: (e) => { if (e.target.checked) S.checks['g:' + s.id] = true; else delete S.checks['g:' + s.id]; save(); if (e.target.checked) { S.counters.reels = (+S.counters.reels || 0) + 1; save(); toast('Reel marcado como grabado'); } } }), 'Ya grabé y publiqué este reel'));
  draw();
}

function studio(root) {
  const vals = {}; const fields = VARS.map((v) => { const t = h('input', { type: 'text', placeholder: v, oninput: (e) => { vals[v] = e.target.value; } }); return h('div', {}, h('label', { class: 'f' }, v), t); });
  const out = h('pre', { class: 'copy', style: { display: 'none' } }); const code = h('input', { type: 'password', placeholder: 'Código de acceso (si tu administrador lo configuró)' });
  const prompt = () => `${MASTER_PROMPT}\n\nDATOS DEL GUION:\n${VARS.map((v) => `- ${v}: ${vals[v] || '[sin completar]'}`).join('\n')}`;
  const gen = h('button', { class: 'btn primary', onclick: async () => {
    gen.disabled = true; gen.textContent = 'Generando…';
    try {
      const res = await fetch('/api/guion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ campos: vals, codigo: code.value }) });
      const j = await res.json().catch(() => ({})); if (!res.ok) throw new Error(j.error || 'El generador no está disponible.');
      out.style.display = ''; out.textContent = j.texto; toast('Guion generado. Revísalo y ajústalo con tu voz.');
    } catch (e) { toast(`${e.message} Puedes copiar el prompt completo y usarlo en tu IA favorita.`, 'warn'); }
    gen.disabled = false; gen.textContent = '✨ Generar con IA';
  } }, '✨ Generar con IA');
  root.append(h('a', { href: '#/guiones', class: 'muted small' }, '← Guiones'), h('h1', {}, 'Estudio de guiones'), h('p', { class: 'muted' }, 'La biblioteca funciona sin IA. Este estudio es opcional: genera un guion desde el servidor o copia el prompt y pégalo en tu IA preferida.'),
    h('div', { class: 'glass mt' }, h('div', { class: 'grid g2' }, fields), h('div', { class: 'mt' }, code), h('div', { class: 'row gap wrap mt' }, gen, h('button', { class: 'btn', onclick: () => copyText(prompt(), { force: true }) }, 'Copiar prompt completo'))),
    out, h('div', { class: 'row gap wrap mt' }, h('button', { class: 'btn', onclick: () => out.textContent && openTele(out.textContent, 'Guion generado') }, '▶ Teleprompter'), h('button', { class: 'btn', onclick: () => out.textContent && copyText(out.textContent, { force: true }) }, 'Copiar resultado'), h('button', { class: 'btn', onclick: () => out.textContent && download('guion.txt', out.textContent) }, 'Descargar .txt')),
    h('p', { class: 'tiny muted mt' }, 'La IA puede equivocarse: revisa que no prometa ingresos, no invente experiencias tuyas y no afirme nada que no sea real.'));
}
