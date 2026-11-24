// WhatsApp, mensajes privados, live selling, carruseles, datos oficiales y prompt maestro.
// Tokens: {{LINK_VENTAS}} {{LINK_PROMO}} {{PROSPECTO}} {{YO}} {{HORA_LIVE}} {{CIERRE}}
export const WA_PHASES = [
 { n:1, name:'Reconexión', days:['mar'], tip:'No publiques la oferta en un grupo inactivo. Primero recupera la conversación con una pregunta.' },
 { n:2, name:'Redescubrimiento', days:['mie'], tip:'Educa: recuerda qué es el modelo y por qué necesita formación.' },
 { n:3, name:'Reactivación', days:['jue'], tip:'Anticipa la oportunidad e invita a responder BLACK para recibir el enlace.' },
 { n:4, name:'Conversión', days:['vie','sab','dom','lun'], tip:'Presenta la oferta, resuelve objeciones y comunica la fecha límite real.' },
];
export const WA = [
 { id:'mar', phase:1, day:1, name:'MARTES — RECONEXIÓN', poll:{ q:'¿Qué te ha impedido comenzar?', o:['No sé por dónde empezar.','No tenía el presupuesto.','No tenía suficiente tiempo.','Me daba miedo equivocarme.','Todavía estoy buscando información.'] },
   status:'¿Emprender digitalmente sigue siendo una de tus metas? Respóndeme BLACK 🤍',
   msg:`¡Hola, comunidad! 🤍

Hace un tiempo coincidimos en este espacio porque teníamos algo en común: el deseo de aprender a generar ingresos por internet.

Y hoy, a pocas semanas de terminar el 2026, quiero hacerles una pregunta.

*¿Emprender digitalmente sigue siendo una de sus metas?*

Esta semana tendremos una oportunidad especial para quienes desean formarse en marketing de afiliación y aprender a comercializar productos digitales.

Si todavía tienes ese deseo de comenzar, puedes responderme con la palabra *BLACK*.

Durante estos días estaré compartiendo información que puede ayudarte.` },
 { id:'mie', phase:2, day:2, name:'MIÉRCOLES — EDUCACIÓN',
   status:'No necesitas crear tu propio producto para emprender digitalmente. Pregúntame cómo 👇',
   msg:`Quiero compartirles algo que muchas personas desconocen.

No siempre necesitas crear tu propio producto para emprender digitalmente.

Existe un modelo llamado *marketing de afiliación*, en el que puedes aprender a comercializar productos digitales de otros creadores y recibir comisiones cuando se realizan ventas mediante tu enlace.

Pero, como cualquier modelo de negocio, necesitas aprender las habilidades necesarias para desarrollarlo.

Este viernes tendremos una oportunidad especial de formación.

¿Te gustaría que te enviara la información cuando esté disponible?

Responde *BLACK*.` },
 { id:'jue', phase:3, day:3, name:'JUEVES — ANTICIPACIÓN',
   status:'🔥 Mañana comienza Black Friday. Escríbeme BLACK y te aviso.',
   msg:`🔥 *MAÑANA COMIENZA BLACK FRIDAY*

Actualmente Código Multiplicación PRO tiene un valor de $297 USD.

Sin embargo, desde mañana tendremos una promoción especial que te permitirá ahorrar $118 USD.

Si hace algún tiempo estabas considerando ingresar a nuestra academia, esta puede ser una oportunidad para volver a evaluar tu decisión.

Si quieres recibir el enlace promocional cuando esté disponible, escríbeme *BLACK*.` },
 { id:'vie', phase:4, day:4, name:'VIERNES — APERTURA',
   status:'🔥 ¡Ya comenzó Black Friday! $179 USD en vez de $297. Escríbeme BLACK.',
   msg:`🔥 *¡YA COMENZÓ BLACK FRIDAY!*

Desde hoy puedes ingresar a Código Multiplicación PRO por *$179 USD*, en lugar de su precio regular de $297 USD.

Aprende marketing de afiliación enfocado en productos digitales, desarrolla habilidades comerciales y conoce las estrategias de nuestra academia.

Puedes conocer el programa aquí:
{{LINK_VENTAS}}

Y si deseas aprovechar directamente el precio especial:
{{LINK_PROMO}}

Si tienes preguntas, puedes escribirme por privado. Estaré disponible para ayudarte.` },
 { id:'sab', phase:4, day:5, name:'SÁBADO — OBJECIONES',
   status:'¿Puedo comenzar sin experiencia? Te respondo por aquí 👇 Black Week sigue disponible.',
   msg:`Durante estos días hemos recibido algunas preguntas sobre Código Multiplicación.

Una de ellas es:

*¿Puedo comenzar si todavía no tengo experiencia en marketing digital?*

La razón de formarte es precisamente desarrollar esas habilidades que todavía no tienes.

No necesitas comenzar sabiéndolo todo, pero sí dedicar tiempo a aprender y aplicar.

Si tienes alguna duda sobre el programa, puedes escribirme.

La promoción de Black Week continúa disponible por $179 USD.` },
 { id:'dom', phase:4, day:6, name:'DOMINGO — REFLEXIÓN',
   status:'¿Qué habilidad te gustaría haber desarrollado al terminar el próximo año? Mañana cierra Black Week.',
   msg:`Antes de terminar este fin de semana, quiero dejarte una pregunta.

¿Qué habilidad te gustaría haber desarrollado cuando termine el próximo año?

Aprender marketing de afiliación puede ser una de las opciones que consideres si quieres explorar los negocios digitales.

Mañana termina nuestra promoción especial de Black Week.

Si estabas evaluando ingresar a Código Multiplicación, todavía puedes revisar la información y aclarar tus dudas.

{{LINK_VENTAS}}` },
 { id:'lun', phase:4, day:7, name:'LUNES — CIERRE',
   status:'⏳ Hoy finaliza Black Week. Último día por $179 USD. Escríbeme si tienes dudas.',
   msg:`⏳ *HOY FINALIZA BLACK WEEK*

Este es el último día para ingresar a Código Multiplicación PRO por $179 USD.

Después del cierre, el programa regresará a su precio regular de $297 USD.

Si deseas aprovechar el precio promocional, puedes hacerlo aquí:
{{LINK_PROMO}}

Si necesitas aclarar alguna duda, escríbeme antes de que finalice la promoción.` },
];

export const PM = [
 { id:'p01', t:'Primer contacto', m:`Hola, {{PROSPECTO}}. 😊\n\nVi que te interesó el contenido sobre marketing de afiliación y quería saludarte.\n\n¿Emprender digitalmente es una de tus metas ahora mismo?` },
 { id:'p02', t:'Persona que respondió BLACK', m:`¡Hola, {{PROSPECTO}}! Gracias por responder BLACK. 🤍\n\nTe cuento en pocas palabras: Código Multiplicación PRO es una academia donde aprendes a comercializar productos digitales que otros creadores ya hicieron, con sesiones en vivo y comunidad.\n\n¿Quieres que te explique cómo funciona o prefieres ver primero la información?\n{{LINK_VENTAS}}` },
 { id:'p03', t:'Prospecto antiguo', m:`Hola, {{PROSPECTO}}. 😊\n\nHace un tiempo estuvimos conversando sobre Código Multiplicación y quería saber cómo has estado.\n\nEsta semana tendremos una promoción especial de Black Friday y recordé que en su momento habías mostrado interés en la formación.\n\n¿Aprender marketing de afiliación sigue estando entre tus metas?` },
 { id:'p04', t:'Persona que preguntó el precio anteriormente', m:`Hola, {{PROSPECTO}}. Hace un tiempo me preguntaste por el precio de Código Multiplicación.\n\nTe aviso que esta semana hay una promoción de Black Week: $179 USD en lugar de $297 USD.\n\nSi te interesa, te comparto la información con calma.` },
 { id:'p05', t:'Recibió información y no respondió', m:`Hola, {{PROSPECTO}}. 😊\n\n¿Pudiste revisar la información que te compartí sobre Código Multiplicación?\n\nMe gustaría saber si hay alguna duda que todavía tengas sobre la formación o sobre cómo funciona el marketing de afiliación.` },
 { id:'p06', t:'No entiende el marketing de afiliación', m:`Te lo explico fácil, {{PROSPECTO}}:\n\n1. Alguien crea un producto digital (por ejemplo, un curso).\n2. Tú lo recomiendas.\n3. Si alguien compra con tu enlace, puedes recibir una comisión.\n\nLo importante es aprender a comunicar, crear contenido y conversar con las personas. De eso trata la formación.\n\n¿Quieres que te dé un ejemplo concreto?` },
 { id:'p07', t:'Teme equivocarse', m:`Te entiendo, {{PROSPECTO}}. Es normal sentir miedo a equivocarse.\n\nPor eso existe el acompañamiento: sesiones en vivo con corrección en pantalla y una comunidad donde puedes preguntar.\n\nEquivocarse al aprender es parte del proceso. ¿Qué es lo que más te preocupa?` },
 { id:'p08', t:'Considera que no tiene tiempo', m:`Te entiendo, {{PROSPECTO}}. El tiempo es un tema real.\n\nLa ruta de estrategias se elige según el tiempo diario que tengas disponible, así que no tienes que hacerlo todo a la vez.\n\n¿Cuánto tiempo al día podrías dedicar de forma realista?` },
 { id:'p09', t:'Considera que no tiene presupuesto', m:`Entiendo perfectamente que quieras evaluar bien tu presupuesto.\n\nEl precio promocional durante Black Week es de $179 USD.\n\nLo importante es que tomes una decisión responsable, entendiendo qué incluye la formación y si realmente puedes dedicarle tiempo.\n\nSi quieres, puedo ayudarte a revisar toda la información antes de que decidas.` },
 { id:'p10', t:'No tiene seguidores', m:`Tener pocos seguidores es un punto de partida común, {{PROSPECTO}}.\n\nNo es lo único que importa: lo que más pesa es aprender a comunicar con claridad y conversar con quienes se interesan.\n\nEso sí: requiere práctica y constancia. ¿Quieres que te explique cómo se trabaja desde cero?` },
 { id:'p11', t:'No tiene experiencia', m:`No necesitas saberlo todo para comenzar, {{PROSPECTO}}. Precisamente la razón de formarte es desarrollar las habilidades que todavía no tienes.\n\nEso sí, tendrás que dedicar tiempo, aprender y poner en práctica lo que estudies.\n\n¿Te cuento cómo es el proceso?` },
 { id:'p12', t:'Pregunta cuánto puede ganar', m:`Buena pregunta, {{PROSPECTO}}, y prefiero ser transparente: no puedo prometerte ingresos.\n\nLo que se puede ganar depende de tu compromiso, del tiempo que dediques y de cómo apliques lo que aprendes.\n\nLo que sí te puedo mostrar es cómo funciona el sistema de comisiones, para que lo evalúes con claridad.` },
 { id:'p13', t:'Quiere conocer el acompañamiento', m:`El acompañamiento incluye sesiones en vivo martes y jueves con corrección en pantalla, y una comunidad en Telegram donde resuelves dudas entre clases, durante 12 meses.\n\nTambién hay mentores especializados en contenido, anuncios y páginas.\n\n¿Quieres que te muestre cómo se ve por dentro?` },
 { id:'p14', t:'Solicita el enlace', m:`¡Claro, {{PROSPECTO}}! Aquí está:\n\nInformación del programa:\n{{LINK_VENTAS}}\n\nPrecio promocional de Black Week ($179 USD):\n{{LINK_PROMO}}\n\nSi tienes alguna duda antes de decidir, escríbeme.` },
 { id:'p15', t:'Seguimiento del sábado', m:`Hola, {{PROSPECTO}}. 😊\n\nHoy respondí varias preguntas sobre Código Multiplicación y pensé en ti.\n\n¿Te quedó alguna duda que pueda aclararte?\n\nLa promoción de Black Week continúa disponible por $179 USD.` },
 { id:'p16', t:'Seguimiento del domingo', m:`Hola, {{PROSPECTO}}. Mañana termina la promoción de Black Week.\n\nSi estabas evaluando entrar, todavía puedes revisar la información y resolver tus dudas conmigo.\n\n{{LINK_VENTAS}}` },
 { id:'p17', t:'Último recordatorio del lunes', m:`Hola, {{PROSPECTO}}.\n\nComo me habías comentado que estabas evaluando ingresar a Código Multiplicación, quería avisarte que hoy termina el precio especial de Black Week.\n\nDespués del cierre, la formación vuelve a su precio regular de $297 USD.\n\nSi todavía tienes alguna duda, estoy disponible para ayudarte.\n\n{{LINK_PROMO}}` },
 { id:'p18', t:'Bienvenida después de la compra', m:`¡Bienvenido/a, {{PROSPECTO}}! 🎉\n\nMe alegra mucho que hayas decidido formarte.\n\nRevisa el correo con el que compraste: ahí te llega tu acceso. Cuando entres, empieza con calma y sin presión.\n\nSi necesitas ayuda para dar tus primeros pasos, escríbeme.` },
];

export const LIVE_TITLE = '¿Cómo comenzar a vender productos digitales sin crear tu propio producto?';
export const LIVE_FAQ = [
 ['¿Necesito experiencia previa?','No necesitas saberlo todo para comenzar; la formación sirve para desarrollar esas habilidades. Sí necesitas tiempo para aprender y aplicar.'],
 ['¿Me garantizan ingresos?','No. Los resultados dependen del compromiso de cada persona y de aplicar lo que aprende.'],
 ['¿Cuánto tiempo necesito?','La ruta se elige según el tiempo diario disponible y si puedes invertir en anuncios.'],
 ['¿Cómo es el acompañamiento?','Sesiones en vivo martes y jueves con corrección en pantalla y comunidad en Telegram, durante 12 meses.'],
 ['¿Necesito crear un producto?','No para comenzar; también hay un módulo para crear tu propio ebook cuando quieras.'],
 ['¿Desde qué países se puede comprar?','Desde casi todos, excepto Cuba y Nicaragua, donde por ahora no es posible procesar pagos.'],
 ['¿Qué pasa después de comprar?','El acceso es inmediato tras el pago.'],
 ['¿Necesito seguidores?','No es el único factor; importa aprender a comunicar y conversar con quienes se interesan.'],
];
const blk = (min, title, pts, say) => ({ min, title, pts, say });
export const LIVES = {
 vie:{ name:'VIERNES — LIVE BLACK FRIDAY', dur:'30 min', title:LIVE_TITLE, blocks:[
  blk('0–3','Gancho',['Saluda y di de qué trata el live.'],'Si estás aquí porque quieres comenzar a emprender por internet, pero todavía no sabes qué producto vender o cómo empezar, hoy quiero explicarte un modelo de negocio que quizás todavía no conoces. Voy a contarte qué es el marketing de afiliación, cómo funciona y qué habilidades necesitas desarrollar.'),
  blk('3–10','Educación',['Qué es un producto digital','Qué es un afiliado','Qué es una comisión','Cómo se atribuye una venta','Por qué no basta con compartir un enlace'],'Imagínate un curso digital creado por otra persona. Quien lo creó necesita llegar a más personas. El afiliado aprende a conectar ese producto con quienes lo necesitan y, si alguien compra con su enlace, puede recibir una comisión. Pero compartir un enlace no es suficiente: hay que aprender a comunicar y conversar.'),
  blk('10–17','Demostración',['Muestra UNA habilidad real: planificar contenido, usar IA, estructurar una historia o entender un embudo','No presentes demostraciones ficticias como resultados'],'Te voy a mostrar una habilidad real que se aprende dentro de la academia para que veas cómo se aplica.'),
  blk('17–22','Oferta',['Muestra los beneficios confirmados en la página oficial','Precio regular y promocional'],'Si quieres aprender estas habilidades de una manera estructurada, quiero presentarte Código Multiplicación PRO. Nuestra academia está especializada en marketing de afiliación de productos digitales. Actualmente tiene un precio regular de 297 dólares, pero durante Black Week puedes ingresar por 179.'),
  blk('22–28','Preguntas',['Usa las respuestas preparadas de abajo'],'Voy a responder sus preguntas una por una.'),
  blk('28–30','CTA',['Dirige a tu canal de contacto habilitado'],'Si quieres conocer todos los detalles, puedes solicitarme la información mediante el canal que tengo habilitado en mi perfil. Te explicaré cómo funciona la formación para que puedas decidir si se adapta a tus objetivos.') ]},
 sab:{ name:'SÁBADO — LIVE PREGUNTAS FRECUENTES', dur:'30 min', title:'Tus preguntas sobre marketing de afiliación y Código Multiplicación', blocks:[
  blk('0–3','Apertura',['Explica que responderás dudas reales'],'Hoy no vengo a presentar nada nuevo: vengo a responder tus dudas con total transparencia.'),
  blk('3–12','Las 4 dudas más comunes',['Experiencia','Tiempo','Seguidores','Promesa de ingresos'],'Voy a empezar por las cuatro preguntas que más me han llegado esta semana.'),
  blk('12–20','Demostración',['Muestra el acompañamiento o una clase real'],'Te enseño cómo se ve el acompañamiento por dentro.'),
  blk('20–27','Preguntas en vivo',['Lee los comentarios y responde'],'Escribe tu pregunta en los comentarios y la respondo.'),
  blk('27–30','Cierre',['Recuerda que la promoción sigue vigente hasta el lunes 11:59 p. m. (hora Colombia)'],'Recuerda que la promoción de Black Week sigue disponible hasta el lunes. Si tienes dudas, escríbeme.') ]},
 dom:{ name:'DOMINGO — LIVE STORYTELLING', dur:'30 min', title:'Lo que aprendí al formarme (mi experiencia real)', blocks:[
  blk('0–5','Apertura personal',['Cuenta algo que TÚ viviste'],'[TU EXPERIENCIA REAL: dónde estabas antes de formarte.]'),
  blk('5–15','Lo que aprendí',['Habilidades concretas y errores comunes'],'[LO QUE REALMENTE APRENDISTE Y APLICASTE]'),
  blk('15–22','El acompañamiento',['Cómo te ayudó o cómo ayuda a otras personas (autorizado)'],'Esto fue lo que más me ayudó del acompañamiento.'),
  blk('22–28','Preguntas',['Responde en vivo'],'Ahora sí, tus preguntas.'),
  blk('28–30','Cierre',['Recuerda que mañana termina Black Week'],'Mañana termina la promoción. Si estás evaluando entrar, decide con calma.') ]},
 lun:{ name:'LUNES — LIVE CIERRE CYBER MONDAY', dur:'20–30 min', title:'Últimas horas: tus preguntas antes del cierre', blocks:[
  blk('0–3','Apertura',['Recuerda la hora real de cierre'],'Hoy termina Black Week. Quiero responder tus últimas preguntas antes del cierre.'),
  blk('3–12','Recap de lo que incluye',['Beneficios reales confirmados'],'Repasemos lo que incluye la formación: acompañamiento, sesiones en vivo, comunidad y las cuatro estrategias.'),
  blk('12–22','Preguntas finales',['Responde con calma'],'Dime tu duda más importante.'),
  blk('22–30','Cierre',['Hora real: 11:59 p. m., hora Colombia'],'Después del cierre, el programa vuelve a 297 dólares. Decide con calma y sin presión.') ]},
};

export const CAROUSELS = {
 c1:{ id:'c1', name:'EXPECTATIVA', caption:'No tienes que esperar hasta enero. Si quieres conocer la oportunidad de Black Friday, comenta BLACK.',
  slides:[
   ['NO TIENES QUE ESPERAR HASTA *ENERO*.','Tu próximo capítulo puede comenzar ahora.'],
   ['¿QUIERES EMPRENDER, PERO NO SABES *QUÉ VENDER*?','No siempre necesitas comenzar creando un producto propio.'],
   ['EXISTE EL MARKETING DE *AFILIACIÓN*.','Puedes aprender a comercializar productos digitales de otros creadores.'],
   ['EL SECRETO NO ESTÁ EN COMPARTIR *ENLACES*.','Está en aprender a atraer personas, comunicar valor y vender.'],
   ['ESTE VIERNES TENDREMOS ALGO *ESPECIAL*.','Una oportunidad para comenzar a desarrollar estas habilidades.'],
   ['¿QUIERES *CONOCERLA*?','Comenta BLACK y te envío la información.']], comps:['impacto','editorial','foto','minimal','editorial','impacto'] },
 c2:{ id:'c2', name:'BLACK FRIDAY', caption:'Este Black Friday también puedes invertir en aprender. Conoce Código Multiplicación PRO y comenta BLACK.',
  slides:[
   ['ESTE BLACK FRIDAY TAMBIÉN PUEDES *INVERTIR EN APRENDER*.',''],
   ['No necesitas crear tu propio producto para comenzar a aprender marketing de afiliación.',''],
   ['Aprende a crear contenido, comunicar, atraer prospectos y comercializar productos digitales.',''],
   ['Conoce Código Multiplicación PRO y su formación especializada.',''],
   ['','', 'price'],
   ['¿Quieres conocer la academia?','Comenta *BLACK*.']], comps:['impacto','minimal','editorial','foto','price','impacto'] },
 c3:{ id:'c3', name:'OBJECIONES', caption:'Lo que sí necesitas: formación, tiempo para aprender y disposición para aplicar. Comenta BLACK.',
  slides:[
   ['*3 COSAS* QUE NO NECESITAS TENER RESUELTAS PARA COMENZAR.',''],
   ['No necesitas tener un producto propio.',''],
   ['No necesitas tener miles de seguidores.',''],
   ['No necesitas ser experto en tecnología.',''],
   ['Lo que sí necesitas es formación, tiempo para aprender y disposición para aplicar.',''],
   ['Conoce nuestra formación de marketing de afiliación.','Comenta *BLACK*.']], comps:['editorial','minimal','impacto','foto','editorial','impacto'] },
};

// Datos confirmados en https://pro.codigomultiplicacion.com (revisado 24-nov-2026)
export const FACTS = {
 promise:'Vende lo que no creaste.',
 includes:['Programa Código Multiplicación con 12 meses de acceso (contenido, anuncios, automatización y ventas)','Módulo para crear tu propio ebook','Acompañamiento grupal: sesiones en vivo martes y jueves con corrección en pantalla, 12 meses','Comunidad en Telegram con soporte entre clases','Mentores: César Ortega (anuncios, páginas y embudos), María Angélica Hernández (contenido) y Deborah Julio'],
 keys:['Contenido orgánico: sin inversión en anuncios','Anuncios con robot de IA','Venta directa','Lanzamientos con tu enlace'],
 notFor:['Quien busca dinero rápido','Quien quiere ganar reclutando personas'],
 disclaimers:['No garantiza ingresos: los resultados dependen del compromiso y de aplicar lo que aprendes.','Pago a través de Hotmart; por ahora no es posible procesar pagos desde Cuba y Nicaragua.','Acceso inmediato tras el pago.'],
};
export const RULES = [
 'Nunca prometas ingresos garantizados ni uses estadísticas sin fuente.',
 'No crees urgencia falsa: la fecha de cierre es real (lunes 30, 11:59 p. m., hora Colombia).',
 'No inventes testimonios, capturas, ventas ni experiencias personales. Muestra solo material real y autorizado.',
 'No presiones ni culpabilices a nadie para gastar dinero que no puede permitirse.',
 'Comunica tu relación comercial con transparencia.',
 'No envíes mensajes masivos no solicitados; respeta a quien no quiera recibir información.',
 'Habla a hombres y mujeres. Evita decir «revender»: usa recomendar, promocionar o comercializar.',
 'Con lenguaje de fe: sin prometer prosperidad en nombre de Dios y sin usar la compra como prueba de fe.',
];
export const DISCLOSURE = 'Soy afiliado/a de Código Multiplicación PRO: si compras con mi enlace puedo recibir una comisión, sin costo adicional para ti.';

// Prompt maestro oficial (spec) + estructura de 5 bloques del Notion «Marca personal».
export const MASTER_PROMPT = `Actúa como un creador profesional de contenido viral especializado en hooks que detienen el scroll, lenguaje emocional, comunicación sencilla, storytelling cotidiano y guiones para reels y TikTok de aproximadamente un minuto.

Tu tarea es crear un guion viral que suene como una conversación espontánea entre amigos, no como un discurso publicitario ni como un texto generado por inteligencia artificial. Debe confrontar con amor, edificar y llevar a la acción.

ESTRUCTURA OBLIGATORIA (5 bloques):
1. HOOK VIRAL (0–3 s): frase corta que toque un dolor real, genere curiosidad o rompa una creencia. Sin saludos ni presentaciones.
2. PROBLEMA + AUTORIDAD (3–12 s): situación cotidiana reconocible, con autoridad natural desde experiencia real. No inventes experiencias personales del creador.
3. VERDAD REVELADORA (12–20 s): explica por qué pasa y cambia la perspectiva, con un ejemplo cotidiano.
4. SOLUCIÓN PRÁCTICA (20–50 s): 2 a 3 pasos claros y aplicables, realistas.
5. CIERRE + CTA (50–60 s): frase con peso emocional y un llamado natural a comentar, responder, guardar o compartir.

La palabra clave principal de la campaña es BLACK.

REGLAS: lenguaje humano, coloquial y sencillo; frases que se puedan decir frente a la cámara; sin promesas de ingresos garantizados; sin urgencia falsa; sin manipulación por culpa; sin afirmar experiencias que el afiliado no haya vivido; sin estadísticas sin fuente; no comenzar todos los guiones con la misma fórmula; no convertir cada reel en un anuncio; permitir adaptar el lenguaje al país y a la personalidad del creador. Dirige el contenido a hombres y mujeres. No uses la palabra «revender».

ESTILO YAPPING (cuando corresponda): espontáneo y relajado, como una reflexión mientras haces algo cotidiano.

LENGUAJE DE FE SUAVE (solo si se pide): propósito, responsabilidad, diligencia, sabiduría y esperanza; sin prometer prosperidad en nombre de Dios; sin insinuar que comprar es prueba de fe; sin versículos fuera de contexto ni frases bíblicas inventadas.

FORMATO DE RESPUESTA: 1) Título del reel. 2) Objetivo estratégico. 3) Hook principal. 4) Tres hooks alternativos. 5) Guion completo por bloques, listo para grabar. 6) Texto inicial en pantalla. 7) Escena de grabación. 8) Expresión y tono. 9) Movimiento y cambios de escena. 10) Tomas complementarias. 11) CTA. 12) Copy para la publicación. 13) Comentario fijado. 14) Duración aproximada. Genera variaciones que cambien el ángulo estratégico, no solo palabras.`;
export const VARS = ['Tema','Cliente ideal','Dolor principal','Deseo principal','Objetivo del contenido','Etapa de campaña','Nivel de conocimiento de la audiencia','Palabra clave del CTA','Duración','Estilo de comunicación','Experiencia personal real que quieras aportar','Formato de grabación'];
