// Guía, preguntas frecuentes, ideas y niveles. Todo se basa en datos confirmados de la página oficial y del equipo.
// Los textos con {{TOKEN}} se completan con los enlaces y datos de cada persona al copiarlos.

export const SIMPLE = {
  1: 'Hoy no vendes todavía. Solo le recuerdas a tu gente que existes, preguntas algo y dejas curiosidad por lo que llega el viernes.',
  2: 'Hoy explicas, con palabras sencillas, qué es el marketing de afiliación y qué NO es. Enseñar genera confianza y la confianza abre conversaciones.',
  3: 'Hoy avisas que mañana abre Black Friday y reúnes en una lista a las personas interesadas, para escribirles cuando abra.',
  4: 'Hoy abre la oferta. Cuéntala con claridad, responde cada pregunta con calma y anota cada conversación.',
  5: 'Hoy resuelves dudas con honestidad y muestras cómo es la academia por dentro.',
  6: 'Hoy cuentas tu experiencia real y recuerdas, sin presionar, cuándo cierra la promoción.',
  7: 'Hoy es el último día: avisa las últimas horas con verdad, responde pendientes y registra tus resultados.',
};

export const LEVELS = [
  [0, 'Semilla', 'Empezaste. Lo más difícil de una semilla es decidir plantarla.'],
  [60, 'Brote', 'Ya hay movimiento. Sigue con constancia, un paso por día.'],
  [180, 'Tallo', 'Estás creciendo. Tu constancia se nota.'],
  [360, 'Rama', 'Ya compartes lo que aprendes y conversas con más personas.'],
  [600, 'Fruto', 'Mucha acción real. Sigue sirviendo con honestidad.'],
  [900, 'Multiplicación', 'Completaste la experiencia con una constancia admirable. ¡Gracias por ejecutar!'],
];

export const PRAYER = {
  title: 'Antes de empezar: pon este proyecto en manos de Dios',
  text: 'Señor, pongo en tus manos esta semana, mi trabajo y a las personas con quienes voy a hablar. Dame sabiduría para comunicar con verdad, humildad para escuchar y paz si alguien decide no comprar. Ayúdame a servir bien y a no manipular a nadie. Confío mis resultados en ti y me comprometo a hacer mi parte con constancia y honestidad. Amén.',
  note: 'Orar y actuar van juntos: la fe te da paz, y tu acción diaria hace tu parte. Si no eres de oración, puedes tomar un minuto de silencio e intención antes de empezar.',
};

export const FAQ_CATS = ['Sobre el programa', 'Precio y pagos', 'Resultados y confianza', 'Acompañamiento', 'Si tú también lo recomiendas'];

// c: categoría · q: pregunta · a: qué responder (listo para copiar) · no: qué evitar · tip: nota para ti
export const FAQ = [
  { c: 0, q: '¿Qué es Código Multiplicación PRO?',
    a: 'Es un programa donde aprendes marketing de afiliación y habilidades digitales: cómo recomendar y vender productos digitales de otras personas usando contenido, inteligencia artificial, anuncios y conversaciones. Incluye acompañamiento en vivo, comunidad y principios bíblicos. No necesitas experiencia previa para empezar.',
    tip: 'Explícalo en dos frases. Si la persona quiere más, ofrécele el detalle.' },
  { c: 0, q: '¿Qué voy a aprender exactamente?',
    a: 'Aprendes 4 estrategias de venta, que llamamos Llaves:\n1) Contenido orgánico: vender sin invertir en anuncios.\n2) Anuncios con un robot de IA que conversa por ti.\n3) Venta directa.\n4) Lanzamientos con tu enlace.\nAdemás hay un módulo para crear tu propio ebook cuando quieras tener un producto propio.',
    tip: 'Las Llaves 2, 3 y 4 funcionan con publicidad pagada en Meta; la Llave 1 no necesita inversión.' },
  { c: 0, q: '¿Qué incluye la compra?',
    a: 'Según la página oficial incluye:\n• Programa con 12 meses de acceso (contenido, anuncios, automatización y ventas)\n• Módulo para crear tu propio ebook\n• Acompañamiento grupal en vivo, martes y jueves, con corrección en pantalla\n• Comunidad en Telegram con soporte entre clases\n• Mentores: César Ortega (anuncios, páginas y embudos), María Angélica Hernández (contenido) y Deborah Julio\nRevisa siempre la página oficial para ver el detalle actualizado.',
    no: 'No prometas bonos que no aparezcan en la página oficial.' },
  { c: 0, q: '¿Es solo para mujeres? ¿Tengo que ser cristiana?',
    a: 'Está pensado con mujeres de fe en mente, pero hombres también pueden entrar. Las enseñanzas incluyen principios bíblicos como parte de la forma de hacer negocios (honestidad, constancia, servicio). No necesitas pertenecer a una iglesia concreta. Si ese enfoque no es para ti, prefiero decírtelo con claridad para que decidas con tranquilidad.',
    no: 'No uses la fe como presión para comprar ni como prueba de compromiso.' },
  { c: 0, q: '¿Necesito experiencia o saber de tecnología?',
    a: 'No necesitas saberlo todo para comenzar: el programa sirve justamente para desarrollar esas habilidades paso a paso. Lo que sí necesitas es tiempo para aprender y aplicar lo que vas viendo.' },
  { c: 0, q: '¿Qué es el marketing de afiliación?',
    a: 'Es un modelo en el que recomiendas un producto digital creado por otra persona. Si alguien compra con tu enlace, puedes recibir una comisión. No necesitas crear el producto ni tener inventario. Eso sí: compartir un enlace no basta; hay que aprender a comunicar, conversar y acompañar a quien se interesa.',
    tip: 'Usa las palabras «recomendar», «promocionar» o «comercializar». Evita «revender».' },
  { c: 0, q: '¿Tengo que crear mi propio producto?',
    a: 'No para empezar. Puedes aprender y practicar recomendando productos que ya existen. Dentro del programa también hay un módulo para crear tu propio ebook cuando quieras tener algo completamente tuyo.' },
  { c: 0, q: '¿Esto es una pirámide o un multinivel?',
    a: 'Es una pregunta válida y me alegra que la hagas. No: la comisión se gana cuando alguien compra un producto real que se recomienda; no se gana por reclutar personas. Te invito a revisar la página oficial y a hacerme todas las preguntas que necesites antes de decidir.',
    no: 'No te molestes ni minimices la duda. No compares con empresas famosas ni prometas ganancias.' },

  { c: 1, q: '¿Cuánto cuesta?',
    a: 'El precio regular es $297 USD. Durante Black Friday hay un precio promocional de $179 USD (ahorras $118 USD), disponible desde el viernes 27 hasta {{CIERRE}}. Aquí está el enlace: {{LINK_PROMO}}',
    tip: 'Antes del viernes 27, di que la promoción «abre el viernes 27». No la ofrezcas antes. Si tu enlace promocional no está configurado, la app no usará otro enlace.' },
  { c: 1, q: '¿Hasta cuándo es el precio promocional?',
    a: 'La promoción termina {{CIERRE}}. Después, el programa vuelve a su precio regular de $297 USD.',
    no: 'No digas «últimos cupos» ni «se acaba hoy» si no es verdad: el cierre real es el que ves en el contador.' },
  { c: 1, q: '¿Puedo pagar en cuotas?',
    a: 'Las opciones de pago dependen de tu país y aparecen en la página de pago al momento de comprar. Te recomiendo revisarlas allí para ver cuál se ajusta a ti.',
    tip: 'No prometas cuotas ni montos si no los ves en la página de pago.' },
  { c: 1, q: '¿Desde qué países se puede comprar?',
    a: 'Desde casi todos los países. Por ahora no es posible procesar pagos desde Cuba ni Nicaragua. Si estás en otro país y tienes dudas con el método de pago, cuéntame dónde estás y lo revisamos.',
    tip: 'Si la persona está en Venezuela, confirma con el equipo el enlace de pago que corresponde a su país antes de enviarlo.' },
  { c: 1, q: 'Está caro / no tengo dinero ahora',
    a: 'Te entiendo, y no quiero que gastes dinero que hoy necesitas para lo básico. Si decides entrar, revisa en la página de pago las opciones disponibles para tu país. Y si no es el momento, está bien: puedo seguir compartiéndote contenido gratuito para que sigas aprendiendo.',
    no: 'No presiones ni culpabilices. No sugieras endeudarse.' },
  { c: 1, q: '¿Y si espero otra promoción?',
    a: 'Te soy sincera: no puedo asegurarte que haya otra promoción. Lo que sí te puedo decir es que esta termina {{CIERRE}} y que después el precio regular es $297 USD. Decide con calma, sin prisa.',
    no: 'No digas «nunca más habrá este precio» si no lo sabes.' },
  { c: 1, q: '¿Hay garantía o reembolso?',
    a: 'La compra se procesa a través de Hotmart y las condiciones de reembolso aparecen en la página de pago. Te sugiero leerlas antes de comprar para que decidas con toda la información.',
    no: 'No prometas una garantía propia que no esté escrita en la página oficial.' },

  { c: 2, q: '¿Me garantizan ingresos?',
    a: 'No. Los resultados dependen del compromiso de cada persona y de aplicar lo que aprende. Lo que sí recibes es formación, acompañamiento y una ruta clara para aplicar. Prefiero decírtelo con honestidad que prometerte algo que no puedo cumplir.',
    no: 'Nunca prometas una cifra, ni un plazo, ni «ingresos seguros».' },
  { c: 2, q: '¿Cuánto puedo ganar?',
    a: 'No puedo darte una cifra, porque depende de tu constancia, de tu comunidad y de cuánto apliques. Lo que sí puedo decirte es qué vas a aprender y cómo es el acompañamiento, para que decidas si es lo que buscas.',
    no: 'No uses ejemplos de ganancias de otras personas sin su permiso y sin contexto.' },
  { c: 2, q: '¿Funciona si tengo pocos seguidores?',
    a: 'Los seguidores ayudan, pero no son el único factor. Importa mucho aprender a comunicar y a conversar con las personas que sí se interesan, una por una. Con una comunidad pequeña se empieza más lento, pero se puede empezar.',
    tip: 'Mira «Ideas» en el menú de Contenido: hay un plan para quien tiene pocos seguidores.' },
  { c: 2, q: '¿Cuánto tiempo necesito al día?',
    a: 'La ruta se elige según el tiempo que tengas disponible y si puedes invertir en anuncios. Con poco tiempo avanzas más despacio, pero avanzas. Sí necesitas tiempo para aprender y aplicar lo que vas viendo.' },
  { c: 2, q: '¿Necesito invertir en anuncios?',
    a: 'No para empezar. La primera Llave es contenido orgánico, sin invertir en anuncios. Las demás estrategias usan publicidad en Meta y ahí tú decides si inviertes y cuánto, cuando te sientas lista o listo.' },
  { c: 2, q: 'Ya compré cursos antes y no me funcionaron',
    a: 'Gracias por contármelo; es más común de lo que parece. Lo que hace distinta esta experiencia es el acompañamiento en vivo, donde se corrige lo que haces en pantalla, y la comunidad para resolver dudas. Aun así no te prometo resultados: dependen de aplicar. Tómate tu tiempo para decidir.',
    no: 'No hables mal de otros programas ni de otras personas.' },
  { c: 2, q: '¿Tienes testimonios o resultados?',
    a: 'Puedo mostrarte experiencias reales que tengo autorización para compartir. Si no tengo una a mano, prefiero decírtelo antes que mostrarte algo que no sea verdad.',
    no: 'Nunca inventes ni edites testimonios, capturas o ventas. Comparte solo material real y autorizado.' },

  { c: 3, q: '¿Cómo es el acompañamiento?',
    a: 'Es grupal y personalizado: hay sesiones en vivo los martes y jueves donde se responde cada pregunta en el momento y se corrige en pantalla, y una comunidad en Telegram con soporte entre clases. El acompañamiento dura 12 meses, según la página oficial.',
    tip: 'Las sesiones son a las 10:30 a. m. hora de Colombia. Confirma el horario actual antes de dar la hora a otra persona.' },
  { c: 3, q: '¿Y si no puedo conectarme en vivo?',
    a: 'Las sesiones en vivo quedan grabadas dentro del programa, en el último módulo, llamado «Grabación sesiones en vivo». Así puedes verlas cuando te quede bien.' },
  { c: 3, q: 'Si compro, ¿por dónde empiezo?',
    a: 'No tienes que estudiar todo antes de actuar. Lo recomendado es empezar por la Llave 1 (contenido orgánico) y la Llave 4 (lanzamientos), y aplicar mientras estudias. En Telegram puedes preguntar cualquier duda; y hay un mapa de ruta para no perderte.' },
  { c: 3, q: '¿Quiénes son los mentores?',
    a: 'El equipo es: César Ortega (anuncios, páginas de venta y embudos), María Angélica Hernández (creación de contenido) y Deborah Julio, creadora del programa.' },
  { c: 3, q: '¿Cuánto dura el acceso?',
    a: 'Según la página oficial, el programa incluye 12 meses de acceso y 12 meses de acompañamiento.',
    tip: 'Esta duración puede cambiar en futuros lanzamientos. Confirma con el equipo si dudas.' },

  { c: 4, q: '¿Cómo gano una comisión si lo recomiendo?',
    a: 'Si alguien compra con tu enlace personal, puedes recibir una comisión. El porcentaje y el pago los ves en tu panel de afiliado; confírmalo ahí. Recomendar es opcional y es una forma de practicar lo que aprendes.',
    no: 'No pongas porcentajes de comisión en mensajes a personas que no te conocen: puede parecer un esquema piramidal.',
    tip: 'Tu relación comercial siempre se dice con transparencia.' },
  { c: 4, q: '¿Debo avisar que soy afiliado o afiliada?',
    a: 'Sí, siempre. Puedes escribir algo así: «Soy afiliado/a de Código Multiplicación PRO: si compras con mi enlace puedo recibir una comisión, sin costo adicional para ti».' },
  { c: 4, q: 'No sé la respuesta a una pregunta, ¿qué hago?',
    a: 'Déjame confirmarlo con el equipo para darte la información correcta y te respondo hoy mismo.',
    no: 'No inventes. Una respuesta honesta genera más confianza que una respuesta rápida pero dudosa.',
    tip: 'Pregunta en el grupo de Telegram o revisa la página oficial y vuelve con la respuesta.' },
  { c: 4, q: 'Alguien no quiere comprar, ¿qué hago?',
    a: 'Gracias por tu tiempo y por tu sinceridad. Si más adelante quieres retomarlo, aquí estoy. Mientras tanto te sigo compartiendo contenido útil.',
    tip: 'Respetar un «no» también construye tu reputación. Anótalo en Prospectos y no insistas.' },
];

export const HOY_SLOTS = [
  ['Al empezar el día', 'Ora, respira y configura tus enlaces (3 minutos).'],
  ['Mañana', 'Envía el mensaje del día a tus grupos de WhatsApp.'],
  ['Mediodía', 'Sube 2 o 3 historias relajadas (ideas abajo).'],
  ['Tarde', 'Graba un reel sencillo hablando a cámara, sin guion perfecto.'],
  ['Noche', 'Responde mensajes, anota prospectos y marca tus tareas.'],
];

// Historias orgánicas relajadas. t: texto sugerido para escribir en la historia.
export const HOY_IDEAS = [
  { icon: '☕', t: 'Foto tuya con tu café y tu celular o laptop', how: 'Una foto simple, natural, desde casa. Nada de poses.', cap: 'Esta semana estoy aprendiendo algo nuevo para mi negocio. Les cuento más el viernes.' },
  { icon: '🏠', t: 'Selfie en casa, con ropa cómoda', how: 'Cuenta en 15 segundos por qué quieres emprender por internet. Habla con tus palabras.', cap: 'Mi razón para aprender a vender por internet es…' },
  { icon: '📓', t: 'Tu libreta o espacio de trabajo', how: 'Muestra tu lista de tareas de la semana. Es un detrás de escena auténtico.', cap: 'Mi plan de esta semana: pasos pequeños, todos los días.' },
  { icon: '🎥', t: 'Un fragmento de la clase en vivo (si estuviste)', how: 'Pausa un momento de la clase y comparte una idea que te sirvió. Solo si tienes permiso y sin mostrar datos de otras personas.', cap: 'Una idea que me llevé de la clase de hoy:' },
  { icon: '❓', t: 'Caja de preguntas', how: 'Usa el sticker de preguntas y responde en las siguientes historias.', cap: '¿Qué es lo que más te frena para empezar a vender por internet?' },
  { icon: '📊', t: 'Encuesta con 2 opciones', how: 'Sticker de encuesta. Después escribe a quienes respondan que sí.', cap: '¿Has pensado en vender productos digitales?  Sí  /  Me da curiosidad' },
  { icon: '🎨', t: 'Un flyer sencillo hecho en Canva', how: 'Una plantilla de historia con tus colores. Pon solo la fecha y la palabra clave; el precio lo cuentas en conversación el viernes.', cap: 'Viernes 27: Black Friday en Código Multiplicación PRO. Escríbeme BLACK y te cuento.' },
  { icon: '🙏', t: 'Un versículo o frase que te acompañe esta semana', how: 'Cuéntalo con tus palabras y cómo te anima. Sin prometer resultados.', cap: 'Esta semana me acompaña esta frase… y por eso empiezo con calma y constancia.' },
];

export const SITUACIONES = [
  { id: 'pocos', name: 'Tengo pocos seguidores',
    intro: 'Con pocos seguidores todavía puedes avanzar: lo que más pesa al inicio no es tu número de seguidores sino las conversaciones uno a uno. Sé honesta/o contigo: tu alcance será más pequeño, y eso está bien. Mide conversaciones, no «me gusta».',
    steps: ['Haz una lista de 20 personas que conoces (familia, amistades, excompañeros) y escríbeles de forma personal, no en masa.', 'Usa historias de Instagram y estados de WhatsApp: las ven personas que ya te conocen.', 'Comenta con cariño y aportando valor en cuentas de tu mismo tema para que te conozcan.', 'Invita a un amigo o amiga a ver tu live aunque sea pequeño: ahí se crea confianza.', 'Publica una sola idea clara por día, en vez de querer publicar mucho.', 'Responde cada mensaje con atención y anótalo en Prospectos.'],
    say: 'Hola {{PROSPECTO}}, estoy aprendiendo algo nuevo para emprender por internet y pensé en ti. ¿Te cuento en 2 minutos de qué se trata?' },
  { id: 'comunidad', name: 'Mi comunidad es pequeña o no tengo grupos',
    intro: 'Una comunidad se construye. Esta semana el objetivo es empezar una lista de personas interesadas, aunque sean pocas.',
    steps: ['Crea una encuesta o caja de preguntas y anota a quienes respondan.', 'Pregúntale a tu entorno cercano quién conoce a alguien interesado en emprender (sin presionar).', 'Si tienes algún grupo antiguo (de iglesia, colegio, trabajo o vecinos), comparte un mensaje respetuoso solo si el grupo lo permite.', 'Ofrece algo útil y gratuito: tu live, una idea del día o una respuesta a sus preguntas.', 'Cuando alguien se interese, pasa la conversación a un mensaje privado.', 'No añadas personas a grupos sin su permiso.'],
    say: 'Esta semana voy a compartir lo que estoy aprendiendo sobre vender productos digitales. Si quieres que te avise cuando abra una oportunidad, dime «AVÍSAME».' },
  { id: 'nopublico', name: 'No he publicado casi nada',
    intro: 'Empezar es lo difícil. No necesitas un perfil perfecto; necesitas una primera publicación imperfecta que existe.',
    steps: ['Empieza solo con historias: se borran en 24 horas y presionan menos.', 'Publica hoy una historia simple de las ideas relajadas de «Ponte al día».', 'Presenta quién eres en una frase: a qué te dedicas y qué estás aprendiendo.', 'Graba un reel corto hablando a cámara. La primera vez se siente raro; eso es normal.', 'Pon una alarma diaria de 10 minutos para publicar algo.', 'Pide a una persona de confianza que revise tu mensaje antes de publicarlo.'],
    say: 'Hola, soy {{YO}}. Estoy empezando a compartir lo que aprendo sobre emprender por internet. Si te sirve, quédate por aquí.' },
  { id: 'tiempo', name: 'Tengo muy poco tiempo',
    intro: 'Con poco tiempo, elige una sola cosa por día. Tu constancia vale más que tu cantidad.',
    steps: ['Cada día elige 1 historia + 1 mensaje privado a una persona. Eso ya es avanzar.', 'Aprovecha momentos de 10 minutos: en la fila, en el transporte o mientras cocinas.', 'Programa o prepara tus historias de la noche anterior.', 'Usa los textos listos de la app: copiar, adaptar con tu voz y publicar.', 'Marca tus tareas: ver tu avance motiva.', 'Está bien no hacerlo todo; prioriza WhatsApp y conversaciones.'],
    say: 'Hoy solo tengo tiempo para lo esencial: una historia y un mensaje. Eso es suficiente.' },
];

// Ideas de carruseles. s: láminas (frases cortas). Sin hashtags.
export const CAROUSEL_IDEAS = [
  { id: 'i1', t: '3 cosas que NO es el marketing de afiliación', obj: 'Educar y quitar mitos', s: ['Portada: 3 cosas que NO es el marketing de afiliación', 'No es dinero rápido: requiere aprender y aplicar.', 'No es reclutar personas: se gana por recomendar un producto real.', 'No es compartir un enlace sin más: hay que conversar y acompañar.', 'Entonces, ¿qué es? Recomendar con honestidad productos digitales y recibir una comisión si alguien compra con tu enlace.', 'Cierre: ¿Quieres saber cómo se aprende? Comenta BLACK y te cuento.'] },
  { id: 'i2', t: 'Qué hace una persona afiliada (en 60 segundos)', obj: 'Explicar el modelo', s: ['Portada: ¿Qué hace una persona afiliada?', '1. Elige un producto digital que le parece valioso.', '2. Lo explica con sus propias palabras, sin prometer lo que no sabe.', '3. Conversa con quien tiene dudas.', '4. Si alguien compra con su enlace, recibe una comisión.', 'Cierre: Transparencia siempre: dice que es afiliada. Comenta BLACK para más información.'] },
  { id: 'i3', t: 'Errores al compartir un enlace', obj: 'Autoridad y educación', s: ['Portada: 4 errores al compartir un enlace de afiliado', 'Error 1: enviar el enlace a todo el mundo sin explicar.', 'Error 2: prometer ingresos o resultados.', 'Error 3: no responder las dudas con calma.', 'Error 4: no decir que eres afiliado/a.', 'Cierre: Vender bien es vender con verdad. Guarda esto para tu próximo mensaje.'] },
  { id: 'i4', t: 'Preguntas que hacerte antes de comprar un curso', obj: 'Generar confianza (honestidad)', s: ['Portada: 5 preguntas antes de comprar un curso online', '¿Qué voy a aprender exactamente?', '¿Hay acompañamiento o estoy sola/o?', '¿Qué incluye y qué NO incluye?', '¿Tengo tiempo real para aplicarlo?', 'Cierre: Si quieres ver cómo respondemos estas preguntas, comenta BLACK.'] },
  { id: 'i5', t: 'De «no sé por dónde empezar» a un plan en 3 pasos', obj: 'Atraer a quien está perdido/a', s: ['Portada: No sé por dónde empezar. Haz esto.', 'Paso 1: define a quién quieres ayudar.', 'Paso 2: aprende una habilidad por vez (contenido, conversación, seguimiento).', 'Paso 3: aplica cada día en pequeño.', 'Recuerda: avanzar despacio sigue siendo avanzar.', 'Cierre: Te cuento cómo aprendemos esto paso a paso. Comenta BLACK.'] },
  { id: 'i6', t: 'Mitos sobre ganar dinero por internet', obj: 'Romper creencias', s: ['Portada: 3 mitos sobre ganar dinero por internet', 'Mito 1: «Necesito miles de seguidores». Importa más conversar con las personas correctas.', 'Mito 2: «Es dinero fácil». Requiere trabajo y constancia.', 'Mito 3: «Si no sé tecnología, no puedo». Se aprende paso a paso.', 'Lo que sí ayuda: formación, acompañamiento y aplicar.', 'Cierre: ¿Cuál de estos mitos creías? Cuéntame.'] },
  { id: 'i7', t: 'Tu plan de 7 días para empezar', obj: 'Atraer y mostrar el método', s: ['Portada: Mi plan de 7 días para empezar a vender por internet', 'Día 1: reactiva tu comunidad.', 'Día 2: enseña algo sencillo.', 'Día 3: prepara a quienes están interesados.', 'Día 4: presenta la oferta con claridad.', 'Día 5: resuelve dudas con honestidad.', 'Día 6 y 7: conecta, da seguimiento y cierra con verdad.', 'Cierre: Guárdalo para seguirlo esta semana.'] },
  { id: 'i8', t: 'Lo que sí incluye Código Multiplicación PRO', obj: 'Claridad de oferta (solo datos oficiales)', s: ['Portada: ¿Qué incluye Código Multiplicación PRO?', '12 meses de acceso al programa.', 'Módulo para crear tu propio ebook.', 'Acompañamiento en vivo los martes y jueves.', 'Comunidad en Telegram con soporte entre clases.', 'Mentores: César Ortega, María Angélica Hernández y Deborah Julio.', 'Cierre: No garantiza ingresos; los resultados dependen de aplicar. Comenta BLACK.'] },
  { id: 'i9', t: 'Lo que aprendí esta semana (solo si es real)', obj: 'Conexión', s: ['Portada: Lo que aprendí esta semana', 'Una idea que me sirvió.', 'Algo que me costó y cómo lo estoy resolviendo.', 'Un paso pequeño que sí di.', 'Lo que sigo aprendiendo.', 'Cierre: ¿Y tú qué estás aprendiendo?'] },
  { id: 'i10', t: 'Emprender con calma: fe y acción', obj: 'Conexión desde los valores', s: ['Portada: Emprender con calma, sin dejar de actuar', 'Orar no sustituye trabajar: ambas van juntas.', 'Hacer mi parte: constancia, honestidad y servicio.', 'Dejar lo que no controlo: cómo responden los demás.', 'Un negocio en paz se cuida con integridad.', 'Cierre: ¿Cómo pones tu proyecto en manos de Dios? Cuéntame (solo si es tu experiencia).'] },
  { id: 'i11', t: '¿Para quién NO es?', obj: 'Honestidad y filtro', s: ['Portada: Esto NO es para ti si…', 'Buscas dinero rápido sin trabajar.', 'Quieres ganar reclutando personas.', 'No tienes ningún tiempo para aprender y aplicar.', 'Sí es para ti si quieres aprender con orden y acompañamiento.', 'Cierre: Prefiero que decidas con información. Escríbeme BLACK.'] },
  { id: 'i12', t: 'Qué hacer si ya te dijeron que no', obj: 'Seguimiento sano', s: ['Portada: Si alguien te dice «no», haz esto', 'Agradece su honestidad.', 'No insistas ni presiones.', 'Anótalo y deja la puerta abierta.', 'Sigue compartiendo contenido útil.', 'Cierre: Respetar un no también construye confianza.'] },
];

export const STORY_TIPS = [
  ['Una sola idea por historia', 'Un titular de 12 palabras o menos. Si necesitas más, haz otra historia.'],
  ['El primer segundo decide', 'Empieza con tu cara, un gesto o algo en movimiento. Evita saludos largos.'],
  ['Usa tu entorno real', 'Luz de ventana, tu taza, tu mesa. Lo natural conecta más que lo perfecto.'],
  ['Cuenta mini historias de 3 a 5 piezas', 'Gancho → verdad → invitación. Así quien te ve se queda hasta el final.'],
  ['Un sticker interactivo por secuencia', 'Encuesta, caja de preguntas o deslizador: invitan a responder y te dan conversaciones.'],
  ['Respeta las zonas seguras', 'Deja libre la parte de arriba y la de abajo: Instagram pone ahí tu nombre y la barra de respuesta.'],
  ['Texto grande y claro', 'Máximo dos colores y una sola palabra resaltada. Que se lea en 2 segundos.'],
  ['Cierra con una acción simple', 'Por ejemplo: «Responde BLACK». Una sola acción por historia.'],
  ['Nada falso', 'Sin resultados, capturas ni testimonios inventados. Lo real, aunque sea pequeño, vale más.'],
];

// Escenas «wow» alcanzables con tu celular. scene: qué se ve · move: movimiento · text: texto sugerido
export const SCENES = [
  { n: 'Amanecer en la ventana', scene: 'Tu silueta frente a una ventana con luz suave, mirando hacia afuera, café en la mano.', move: 'Acércate despacio a la ventana y gira hacia la cámara.', text: '¿Estás donde imaginabas cuando empezó este año?' },
  { n: 'La mano que escribe la meta', scene: 'Plano desde arriba: libreta, taza y tu mano escribiendo UNA meta de esta semana.', move: 'Graba solo 6 segundos escribiendo; sube un poco la velocidad al editar.', text: 'Mi meta de esta semana, en una línea.' },
  { n: 'Caminar y hablar', scene: 'Tú caminando por tu casa o tu calle, hablando a cámara con naturalidad.', move: 'Sostén el celular con el brazo estirado; camina despacio.', text: 'Te cuento algo que cambió mi forma de ver esto…' },
  { n: 'Pantalla en movimiento', scene: 'Grabación de tu propia pantalla abriendo la app y marcando una tarea como hecha.', move: 'Usa la grabación de pantalla del celular y recórtala a 8 segundos.', text: 'Mi plan de hoy, paso a paso.' },
  { n: 'El conteo regresivo', scene: 'Captura o grabación del contador de la app con tu cara reaccionando al lado.', move: 'Muestra el contador y luego tu expresión de «ya casi».', text: 'Falta poco para el viernes 27.' },
  { n: 'Nota sobre el espejo', scene: 'Una nota adhesiva con tu intención de la semana pegada en el espejo, tú detrás.', move: 'Enfoca la nota y luego cambia el foco a ti.', text: 'Una intención para esta semana.' },
  { n: 'Antes y después del escritorio', scene: 'Tu escritorio desordenado y luego ordenado, con tu laptop abierta.', move: 'Dos clips cortos con un corte rápido entre ellos.', text: 'Primero orden, luego avance.' },
  { n: 'Taza y oración', scene: 'Tu taza, tu Biblia o libreta cerrada y una luz cálida; una frase breve de entrega.', move: 'Plano fijo, sin prisa. Escribe una sola frase encima.', text: 'Hoy pongo esto en manos de Dios y hago mi parte.' },
  { n: 'Conversaciones reales', scene: 'Una conversación real de WhatsApp (con nombres y fotos tapados y con permiso) en tu pantalla.', move: 'Desplázate despacio por el chat.', text: 'Hoy conversé con tres personas. Así se construye.' },
  { n: 'Hoja del calendario', scene: 'Tu mano arrancando o marcando el día 27 en un calendario.', move: 'Plano cerrado a la mano, luego sube a tu cara.', text: 'Viernes 27. Se abre Black Friday.' },
  { n: 'Cierre nocturno', scene: 'Luz cálida de lámpara, tú tranquila o tranquilo, cuaderno al lado.', move: 'Habla bajito, como a una amiga.', text: 'Lo que aprendí hoy y lo que haré mañana.' },
  { n: 'Respuesta a una pregunta', scene: 'Responde la caja de preguntas mirando a cámara con la pregunta en pantalla.', move: 'Toca la pregunta y responde en 15 segundos.', text: 'Me preguntaron: «¿esto es para mí?»' },
];
