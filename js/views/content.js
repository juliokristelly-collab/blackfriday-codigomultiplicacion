import { h, S, getDays, todayIdx } from '../core.js';
import { STORIES } from '../data/days.js';
import { SCRIPTS } from '../data/scripts.js';
import { PM } from '../data/messages.js';
import { storiesPublished, missingLinksNote } from '../shared.js';

export default async function (root) {
  const DAYS = await getDays(); const i = todayIdx(DAYS); const tile = (href, t, d, n) => h('a', { class: 'glass', href, style: { textDecoration: 'none', color: '#fff' } }, h('div', { class: 'row between' }, h('b', {}, t), n != null ? h('span', { class: 'pill o' }, n) : null), h('p', { class: 'muted small', style: { margin: '6px 0 0' } }, d));
  root.append(h('h1', {}, 'Contenido'), h('p', { class: 'muted' }, 'Todo lo que necesitas para publicar, conversar y vender con honestidad.'), missingLinksNote(),
    h('div', { class: 'grid g2 mt' },
      tile('#/preguntas', 'Preguntas frecuentes', 'Qué te van a preguntar y qué responder', 30),
      tile('#/ideas', 'Ideas', 'Pocos seguidores, ideas de carruseles y escenas', 28),
      tile('#/hoy', 'Ponte al día', 'Qué hacer hoy aunque ya muchas personas hayan publicado', null),
      tile('#/empezar', 'Empieza aquí', 'Cómo funciona todo, en palabras simples', null),
      tile('#/historias' + (i >= 1 && i <= 7 ? `?d=${i}` : ''), 'Historias estratégicas', `${STORIES.length} historias completas · ${storiesPublished()} publicadas`, STORIES.length),
      tile('#/historias?d=4', 'Secuencia del viernes', '12 historias del día de apertura, en orden', 12),
      tile('#/guiones', 'Guiones virales', 'Biblioteca, estudio con IA opcional y teleprompter', SCRIPTS.length),
      tile('#/carruseles', 'Carruseles', 'Tres carruseles listos para descargar en PNG/ZIP', 3),
      tile('#/whatsapp', 'WhatsApp', 'Grupos, estados y mensajes privados', PM.length + 7),
      tile('#/live', 'Live Selling', 'Viernes, sábado, domingo y lunes', 4),
      tile('#/guia', 'Guía para prospectos', 'PDF de 5 páginas con tu QR', 5),
      tile('#/reglas', 'Reglas de oro', 'Honestidad, transparencia y límites', null),
      tile('#/buscar', 'Buscar', 'Encuentra cualquier texto de la app', null)));
}
