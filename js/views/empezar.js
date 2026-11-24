import { h, S, save, toast, validUrl, getDays, todayIdx, fmtDT, now, tzName } from '../core.js';
import { PRAYER } from '../data/guide.js';
import { levelCard } from '../shared.js';

const step = (n, t, d, btn) => h('div', { class: 'glass stepc' }, h('div', { class: 'stepn' }, n), h('div', {}, h('b', {}, t), h('p', { class: 'small muted' }, d), btn || null));
export default async function (root) {
  const DAYS = await getDays(); const idx = todayIdx(DAYS); const linksOk = validUrl(S.profile.linkSales) && validUrl(S.profile.linkPromo);
  const prayBtn = h('button', { class: 'btn primary', onclick: (e) => { S.ok.oracion = true; save(); e.target.textContent = '✓ Lo puse en manos de Dios'; e.target.disabled = true; toast('Que Dios te guíe esta semana 🙏'); } }, S.ok.oracion ? '✓ Lo puse en manos de Dios' : 'Ya oré y lo puse en manos de Dios'); if (S.ok.oracion) prayBtn.disabled = true;
  root.append(
    h('section', { class: 'hero glass glow' }, h('p', { class: 'tiny muted' }, fmtDT(now(), tzName(), { hour: undefined, minute: undefined })), h('h1', {}, 'Empieza ', h('span', {}, 'aquí')),
      h('p', { class: 'serif', style: { fontSize: '1.25rem', margin: '6px 0 10px' } }, 'Este reto fue creado por Deborah Julio para que puedas aumentar tus ventas esta semana, con un paso a paso claro y sin sentirte perdida o perdido.'),
      h('p', { class: 'muted' }, 'No necesitas hacerlo todo ni hacerlo perfecto. Haz lo que puedas hoy, marca lo que hagas y ve sumando puntos. Cada paso cuenta.')),
    h('section', { class: 'glass mt prayer' }, h('h2', {}, '🙏 ' + PRAYER.title), h('p', { class: 'serif', style: { fontSize: '1.05rem', lineHeight: 1.55 } }, PRAYER.text), h('p', { class: 'small muted mt' }, PRAYER.note), h('div', { class: 'mt' }, prayBtn)),
    idx >= 1 && idx <= 7 ? h('section', { class: 'banner mt' }, `Hoy es ${DAYS[idx - 1].dow} ${DAYS[idx - 1].date.slice(8)} de noviembre. Si ya viste que otras personas publicaron, no pasa nada: aún estás a tiempo. `, h('a', { href: '#/hoy' }, 'Mira «Ponte al día» →')) : null,
    h('h2', { class: 'mt2' }, 'Cómo funciona, en 4 pasos'),
    h('div', { class: 'col mt' },
      step(1, 'Configura tus enlaces', linksOk ? '¡Listo! Ya tienes tus dos enlaces.' : 'Pega tu enlace personal de ventas y tu enlace promocional. Sin ellos la app no puede copiar tus mensajes completos.', h('a', { class: 'btn sm mt', href: '#/ajustes' }, linksOk ? 'Revisar mis enlaces' : 'Configurar mis enlaces')),
      step(2, 'Abre la misión del día', 'Cada día tiene una misión: una lista corta de cosas por hacer. Te explico cada una en palabras simples.', h('a', { class: 'btn sm mt', href: '#/misiones' }, 'Ver las 7 misiones')),
      step(3, 'Marca lo que vas haciendo', 'Cada tarea marcada suma puntos y te hace subir de nivel: Semilla, Brote, Tallo, Rama, Fruto y Multiplicación.', h('a', { class: 'btn sm mt', href: '#/inicio' }, 'Ver mis puntos')),
      step(4, 'Responde y anota tus conversaciones', 'Cuando alguien te escriba, respóndele con calma y anótalo en Prospectos. Para dudas, mira las preguntas frecuentes.', h('a', { class: 'btn sm mt', href: '#/preguntas' }, 'Ver preguntas frecuentes'))),
    levelCard(),
    h('h2', { class: 'mt2' }, '¿Qué encuentras en cada parte?'),
    h('div', { class: 'grid g2 mt' },
      [['#/misiones', 'Misiones', 'Tu plan de 7 días. Cada día dice qué hacer y qué publicar.'], ['#/historias', 'Historias', '51 historias con texto, escena sugerida y opción de subir tu foto.'], ['#/guiones', 'Guiones para reels', 'Qué decir frente a la cámara, con teleprompter.'], ['#/carruseles', 'Carruseles', 'Láminas listas para descargar y publicar.'], ['#/whatsapp', 'WhatsApp', 'Mensajes para grupos, estados y chats privados.'], ['#/preguntas', 'Preguntas frecuentes', 'Qué te preguntarán y qué responder.'], ['#/ideas', 'Ideas', 'Qué hacer si tienes pocos seguidores y ideas de carruseles y escenas.'], ['#/prospectos', 'Prospectos', 'Una libreta para anotar a quién escribes y cómo va.']].map(([href, t, d]) => h('a', { class: 'glass', href, style: { textDecoration: 'none', color: '#fff' } }, h('b', {}, t), h('p', { class: 'small muted' }, d)))),
    h('h2', { class: 'mt2' }, 'Qué influye en tus resultados'),
    h('div', { class: 'glass mt' }, h('p', { class: 'small' }, 'Te lo digo con honestidad: nadie puede garantizarte ventas. Esto es lo que más influye:'),
      h('ul', { class: 'small' }, ['El tamaño y la confianza de tu comunidad (si es pequeña, empieza más lento: trabaja conversaciones una a una).', 'Tu constancia: publicar un poco cada día pesa más que mucho un solo día.', 'La claridad de tu mensaje y la honestidad con la que hablas.', 'El seguimiento: responder y volver a escribir con respeto a quien preguntó.', 'Tu paz y tu intención: servir bien es mejor que presionar.'].map((x) => h('li', {}, x))),
      h('a', { class: 'btn sm mt', href: '#/ideas' }, 'Ideas si tienes pocos seguidores')),
    h('div', { class: 'row gap wrap mt2' }, h('button', { class: 'btn primary', onclick: () => { S.ok.empezar = true; save(); window.__go('inicio'); } }, 'Entendido, ¡vamos!'), h('a', { class: 'btn', href: '#/reglas' }, 'Leer las reglas de oro')));
}
