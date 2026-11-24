import { h, S, save, copyText, toast, fill } from '../core.js';

// Teleprompter a pantalla completa. No incluye grabación: usa la cámara de tu teléfono para grabar.
export function openTele(text, title = 'Teleprompter', editKey = null) {
  let body = fill(editKey && S.edits[editKey] != null ? S.edits[editKey] : text).text;
  let playing = false, speed = 40, size = 36, raf = 0, last = 0, mirror = false, wake = null, pos = 0, editing = false;
  const txt = h('div', { class: 'tele-txt', style: { fontSize: size + 'px' } }); const ta = h('textarea', { style: { display: 'none', flex: 1, minHeight: '50vh', fontSize: '18px' } });
  const render = () => { txt.textContent = body; }; render();
  const el = h('div', { class: 'tele', role: 'dialog', 'aria-label': title });
  const play = h('button', { class: 'btn primary', onclick: () => toggle() }, '▶ Iniciar');
  const toggle = async (force) => {
    playing = force ?? !playing; play.textContent = playing ? '⏸ Pausar' : '▶ Iniciar'; cancelAnimationFrame(raf);
    if (playing) { try { if (navigator.wakeLock && !wake) wake = await navigator.wakeLock.request('screen'); } catch (e) { } last = 0; raf = requestAnimationFrame(step); } else { try { wake && (await wake.release()); } catch (e) { } wake = null; }
  };
  const step = (t) => { if (!playing) return; if (last) { pos += speed * (t - last) / 1000; txt.scrollTop = pos; if (txt.scrollTop + txt.clientHeight >= txt.scrollHeight - 2) { toggle(false); return; } } last = t; raf = requestAnimationFrame(step); };
  const countdown = () => { const cd = h('div', { class: 'tele-cd' }, '3'); el.append(cd); let n = 3; const iv = setInterval(() => { n--; if (n <= 0) { clearInterval(iv); cd.remove(); toggle(true); } else cd.textContent = n; }, 1000); };
  const close = () => { toggle(false); el.remove(); document.removeEventListener('keydown', key); if (document.fullscreenElement) document.exitFullscreen?.(); };
  const key = (e) => { if (e.key === 'Escape') close(); if (e.key === ' ' && !editing) { e.preventDefault(); toggle(); } };
  document.addEventListener('keydown', key);
  const edit = h('button', { class: 'btn', onclick: () => { editing = !editing; toggle(false); if (editing) { ta.value = body; ta.style.display = ''; txt.style.display = 'none'; edit.textContent = 'Guardar'; } else { body = ta.value; if (editKey) { S.edits[editKey] = body; save(); } render(); ta.style.display = 'none'; txt.style.display = ''; edit.textContent = '✎ Editar'; toast('Guion actualizado'); } } }, '✎ Editar');
  const bar = h('div', { class: 'tele-bar' },
    play, h('button', { class: 'btn', onclick: () => { toggle(false); pos = 0; txt.scrollTop = 0; } }, '↺ Reiniciar'), h('button', { class: 'btn', onclick: countdown }, '3·2·1'),
    h('label', { class: 'small' }, 'Velocidad ', h('input', { type: 'range', min: 10, max: 160, value: speed, oninput: (e) => { speed = +e.target.value; } })),
    h('label', { class: 'small' }, 'Letra ', h('input', { type: 'range', min: 20, max: 80, value: size, oninput: (e) => { size = +e.target.value; txt.style.fontSize = size + 'px'; } })),
    h('button', { class: 'btn', onclick: () => { mirror = !mirror; txt.classList.toggle('mir', mirror); } }, '⇋ Espejo'), edit,
    h('button', { class: 'btn', onclick: () => copyText(body, { force: true }) }, 'Copiar'),
    h('button', { class: 'btn', onclick: () => { if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => toast('Tu navegador no permite pantalla completa aquí', 'warn')); else document.exitFullscreen(); } }, '⛶ Pantalla completa'),
    h('button', { class: 'btn', onclick: close }, 'Cerrar'));
  el.append(h('div', { class: 'tele-line' }), txt, ta, bar); document.body.append(el);
  txt.addEventListener('click', () => toggle());
}
export default async function (root) { root.append(h('p', {}, 'Abre el teleprompter desde cualquier guion.')); }
