// Todos los textos fijos de la web, en castellano y en inglés.
//
// La biografía y la introducción de Encargos están copiadas tal cual de la web
// actual de Pablo (16-10-2026), y la de Colabora conmigo, del texto que mandó
// él (21-10-2026). Las traducciones al inglés y los pasos de los dos procesos
// son provisionales: hay que revisarlos con él.
import type { Idioma } from './rutas';

export const textos = {
  es: {
    profesion: 'Pintura y escultura',
    saltar: 'Saltar al contenido',
    menu: 'Menú',
    cerrar: 'Cerrar',
    idioma: 'Idioma',
    encargos: 'Encargos',
    // Antes "Colabora conmigo"; Guzmán lo cambió (27-10-2026). La dirección
    // sigue siendo /colabora/.
    colabora: '¿Proyectamos?',
    acercaDe: 'Acerca de mí',
    contacto: 'Contacto',
    todas: 'Todas',
    disponibles: 'Disponibles',
    anio: 'Año',
    filtrar: 'Mostrar',
    disponible: 'Disponible',
    vendida: 'Vendida',
    ningunaDisponible: 'Ahora mismo no hay obras disponibles en esta sección.',
    volver: (seccion: string) => `Volver a ${seccion.toLowerCase()}`,
    anterior: 'Anterior',
    siguiente: 'Siguiente',
    fotoAnterior: 'Foto anterior',
    fotoSiguiente: 'Foto siguiente',
    fotos: 'Fotos de la obra',
    preguntarObra: 'Preguntar por esta obra',
    mensajeObra: (titulo: string, url: string) => `Hola, Pablo. Me interesa la obra «${titulo}»: ${url}`,
    escribirWhatsApp: 'Escríbeme por WhatsApp',
    contactaConmigo: 'Contacta conmigo',
    mensajeEncargo: 'Hola, Pablo. Me gustaría hablar contigo sobre un encargo.',
    mensajeColabora: 'Hola, Pablo. Me gustaría hablar contigo sobre un proyecto de arte para mi espacio.',
    mensajeContacto: 'Hola, Pablo.',
    correo: 'Correo',
    telefono: 'Teléfono',
    instagram: 'Instagram',
    // La frase de la vista previa al compartir la web (WhatsApp, redes) y
    // para los buscadores. Antes repetía el título.
    inicioIntro: 'Pintura y escultura abstracta. Obra original, encargos y proyectos de arte para espacios.',
    encargosIntro: [
      'Realizo encargos personalizados en los que busco, por encima de todo, plasmar los anhelos particulares del cliente a través de la expresión artística de una abstracción cargada de intenciones.',
      'A ti, lector, dedico mi alegría y mi esfuerzo… espero que lo disfrutes…',
    ],
    encargosComo: 'Cómo funciona',
    encargosPasos: [
      { titulo: 'Primera conversación', texto: 'Analizamos el espacio, su uso y la intención de la obra para definir el punto de partida.' },
      { titulo: 'Propuesta', texto: 'Recibes una propuesta detallada: concepto, formato, materiales, plazos y presupuesto.' },
      { titulo: 'Producción', texto: 'Desarrollo la obra en el taller y te mantengo al tanto de cada fase del proceso.' },
      { titulo: 'Entrega', texto: 'La obra llega a su destino protegida y lista para colgar o colocar.' },
    ],
    colaboraIntro: [
      'El arte tiene el poder de transformar un espacio y cambiar por completo la forma en que se percibe. Más allá de adquirir una pieza suelta, te propongo un servicio de arte por encargo para vestir y revalorizar tus espacios de cara al público.',
      'Creo cuadros y esculturas a medida que aportan una identidad única a cada proyecto. Si buscas un enfoque profesional y quieres elevar el valor de lo que haces, cuéntame tu idea o ponme a prueba con el reto que tienes en mente y lo ponemos en marcha.',
    ],
    colaboraPasos: [
      { titulo: 'Tu proyecto', texto: 'Me cuentas cómo es tu espacio, quién lo visita y qué identidad quieres transmitir.' },
      { titulo: 'Propuesta', texto: 'Te propongo las piezas, con medidas, materiales, plazos y presupuesto.' },
      { titulo: 'Creación', texto: 'Pinto y esculpo las obras, y te enseño cómo avanzan.' },
      { titulo: 'Instalación', texto: 'Las obras llegan a tu espacio, listas para colgar o colocar.' },
    ],
    // Texto nuevo de Pablo (28-10-2026), tal cual; solo "mas" con tilde.
    biografia: [
      'Quizás por ese vaivén de ideas que me ha acompañado desde los primeros años de mi vida; por esa inquietud constante de mirar las cosas de otra manera, de imaginar lo que podrían llegar a ser y de encontrar nuevas formas de darles vida.',
      'Quizás porque estuviera tatuado en mi destino…',
      'Sea como fuere, a los 22 años, en pleno apogeo de mi carrera de Arquitectura, descubro una potente vocación pictórica y escultórica y, de pronto, descubro que, sin conocer el origen ni pensar en el futuro, cuando pinto, cuando esculpo, cuando creo y produzco una obra de arte, mi presente se intensifica… y me siento en plenitud… feliz, completo… con mis manos repletas de color, cada vez con más ganas de crear…',
      'Algunos lo llaman madurez, otros regreso a la infancia…',
    ],
    contactoIntro: 'La forma más rápida de hablar conmigo es por WhatsApp.',
  },
  en: {
    profesion: 'Painting and sculpture',
    saltar: 'Skip to content',
    menu: 'Menu',
    cerrar: 'Close',
    idioma: 'Language',
    encargos: 'Commissions',
    // Traducción de "¿Proyectamos?": la invitación a colaborar con él. La
    // dirección sigue siendo /en/work-with-me/.
    colabora: 'Shall we collaborate?',
    acercaDe: 'About',
    contacto: 'Contact',
    todas: 'All',
    disponibles: 'Available',
    anio: 'Year',
    filtrar: 'Show',
    disponible: 'Available',
    vendida: 'Sold',
    ningunaDisponible: 'There are no works available in this section right now.',
    volver: (seccion: string) => `Back to ${seccion.toLowerCase()}`,
    anterior: 'Previous',
    siguiente: 'Next',
    fotoAnterior: 'Previous photo',
    fotoSiguiente: 'Next photo',
    fotos: 'Photos of the work',
    preguntarObra: 'Ask about this work',
    mensajeObra: (titulo: string, url: string) => `Hi Pablo, I'm interested in "${titulo}": ${url}`,
    escribirWhatsApp: 'Message me on WhatsApp',
    contactaConmigo: 'Contact me',
    mensajeEncargo: "Hi Pablo, I'd like to talk to you about a commission.",
    mensajeColabora: "Hi Pablo, I'd like to talk to you about an art project for my space.",
    mensajeContacto: 'Hi Pablo,',
    correo: 'Email',
    telefono: 'Phone',
    instagram: 'Instagram',
    inicioIntro: 'Abstract painting and sculpture. Original works, commissions and art projects for spaces.',
    encargosIntro: [
      "I take on personal commissions in which, above all, I seek to capture each client's own longings through the artistic expression of an abstraction charged with intention.",
      'To you, reader, I dedicate my joy and my effort… I hope you enjoy it…',
    ],
    encargosComo: 'How it works',
    encargosPasos: [
      { titulo: 'First conversation', texto: 'We look at the space, how it is used and the intent behind the work to set the starting point.' },
      { titulo: 'Proposal', texto: 'You receive a detailed proposal: concept, format, materials, timeline and budget.' },
      { titulo: 'Production', texto: 'I develop the work in the studio and keep you informed at every stage.' },
      { titulo: 'Delivery', texto: 'The work reaches its destination protected and ready to hang or place.' },
    ],
    colaboraIntro: [
      'Art has the power to transform a space and completely change the way it is perceived. Beyond buying a single piece, I offer a commissioned art service to dress and add value to the spaces you open to the public.',
      "I create bespoke paintings and sculptures that give each project a unique identity. If you're after a professional approach and want to raise the value of what you do, tell me your idea or put me to the test with the challenge you have in mind, and we'll get it started.",
    ],
    colaboraPasos: [
      { titulo: 'Your project', texto: 'Tell me about your space, who visits it and the identity you want it to convey.' },
      { titulo: 'Proposal', texto: 'I propose the pieces, with sizes, materials, timing and price.' },
      { titulo: 'Creation', texto: 'I paint and sculpt the works and show you how they progress.' },
      { titulo: 'Installation', texto: 'The works arrive at your space, ready to hang or place.' },
    ],
    biografia: [
      'Perhaps because of that ebb and flow of ideas that has been with me since the earliest years of my life; that constant restlessness to look at things differently, to imagine what they could become and to find new ways of bringing them to life.',
      'Perhaps because it was tattooed on my destiny…',
      'Be that as it may, at 22, in the midst of my architecture degree, I discovered a powerful calling for painting and sculpture, and suddenly I found that, without knowing where it came from or thinking about the future, when I paint, when I sculpt, when I create and make a work of art, my present intensifies… and I feel whole… happy, complete… with my hands full of colour, ever more eager to create…',
      'Some call it maturity, others a return to childhood…',
    ],
    contactoIntro: 'The quickest way to reach me is on WhatsApp.',
  },
} satisfies Record<Idioma, unknown>;
