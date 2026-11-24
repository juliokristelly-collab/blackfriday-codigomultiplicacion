import { h, S, copyText, fill } from '../core.js';
import { SITUACIONES, CAROUSEL_IDEAS, SCENES } from '../data/guide.js';

export default async function (root, r) {
  let tab = r.q.tab || 'situacion'; let sit = SITUACIONES[0].id;
  const body = h('div', { class: 'mt' }); const tabs = h('div', { class: 'chips', role: 'tablist' });
  const T = [['situacion', 'Si tienes pocos seguidores'], ['carruseles', 'Ideas de carruseles'], ['escenas', 'Escenas para historias']];
  const draw = () => {
    tabs.innerHTML = ''; T.forEach(([k, n]) => tabs.append(h('button', { class: 'chip' + (tab === k ? ' on' : ''), role: 'tab', onclick: () => { tab = k; draw(); } }, n)));
    body.innerHTML = '';
    if (tab === 'situacion') {
      const ch = h('div', { class: 'chips' }); SITUACIONES.forEach((s) => ch.append(h('button', { class: 'chip' + (sit === s.id ? ' on' : ''), onclick: () => { sit = s.id; draw(); } }, s.name)));
      const s = SITUACIONES.find((x) => x.id === sit);
      body.append(ch, h('section', { class: 'glass mt' }, h('h2', {}, s.name), h('p', {}, s.intro), h('h3', { class: 'mt' }, 'Qué hacer'), h('ol', {}, s.steps.map((x) => h('li', { class: 'small' }, x))), h('h3', { class: 'mt' }, 'Un mensaje para empezar'), h('pre', { class: 'copy' }, fill(s.say).text), h('button', { class: 'btn sm primary mt', onclick: () => copyText(s.say) }, 'Copiar mensaje')),
        h('p', { class: 'tiny muted mt' }, 'Estas son ideas para practicar y empezar; no garantizan ventas. Lo que más cuenta es tu constancia y tu honestidad.'));
    } else if (tab === 'carruseles') {
      body.append(h('p', { class: 'muted small' }, 'Cada idea trae lámina por lámina. Cópiala y diséñala en Canva o en Instagram con tus colores. Sin hashtags: lo que importa es un buen gancho. Las ideas marcadas «solo si es real» requieren que sea tu propia experiencia.'),
        h('div', { class: 'col mt' }, CAROUSEL_IDEAS.map((c, n) => h('details', { class: 'glass faq' }, h('summary', {}, h('span', { class: 'pill o' }, `Idea ${n + 1}`), h('b', {}, c.t)), h('p', { class: 'small muted' }, `Objetivo: ${c.obj}`), h('ol', {}, c.s.map((x) => h('li', { class: 'small' }, x))), h('button', { class: 'btn sm primary mt', onclick: () => copyText(`${c.t}\n\n` + c.s.map((x, i) => `Lámina ${i + 1}: ${x}`).join('\n')) }, 'Copiar guion del carrusel')))),
        h('a', { class: 'btn mt', href: '#/carruseles' }, '▦ Ir a carruseles listos para descargar'));
    } else {
      body.append(h('p', { class: 'muted small' }, 'Escenas que se hacen con tu celular y que hacen que tus historias se vean cuidadas. Elige una, grábala y súbela con el texto sugerido.'),
        h('div', { class: 'grid g2 mt' }, SCENES.map((s) => h('div', { class: 'glass' }, h('b', {}, s.n), h('p', { class: 'small' }, h('b', {}, 'Qué se ve: '), s.scene), h('p', { class: 'small' }, h('b', {}, 'Movimiento: '), s.move), h('p', { class: 'small', style: { fontStyle: 'italic' } }, `«${s.text}»`), h('button', { class: 'btn sm mt', onclick: () => copyText(s.text) }, 'Copiar texto')))));
    }
  };
  root.append(h('a', { href: '#/contenido', class: 'muted small' }, '← Contenido'), h('h1', {}, 'Ideas'), h('p', { class: 'muted' }, 'Para quienes no saben qué publicar o están empezando con una comunidad pequeña.'), tabs, body); draw();
}
