// Datos de Pablo y ajustes generales de la web.

export const sitio = {
  nombre: 'Pablo Barrio Araúz',
  correo: 'pablobarrioke@gmail.com',
  instagram: 'pablobarrioarauz',
  // Con prefijo de país y sin espacios: es lo que necesita WhatsApp.
  whatsapp: '34609301845',
  telefonoVisible: '609 301 845',
};

// Mientras la web vive en guzday.github.io se pide a los buscadores que no la
// indexen, para que no compita con la web actual de Pablo. El día que
// pablobarrioarauz.com apunte aquí, poner false (ver astro.config.mjs).
export const SIN_INDEXAR = true;

export const urlWhatsApp = (mensaje?: string) =>
  `https://wa.me/${sitio.whatsapp}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
export const urlInstagram = `https://www.instagram.com/${sitio.instagram}/`;
