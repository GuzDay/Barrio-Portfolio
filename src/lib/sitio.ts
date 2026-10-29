// Datos de Pablo y ajustes generales de la web.

export const sitio = {
  nombre: 'Pablo Barrio Araúz',
  correo: 'pablobarrioke@gmail.com',
  instagram: 'pablobarrioarauz',
  // Con prefijo de país y sin espacios: es lo que necesita WhatsApp.
  whatsapp: '34609301845',
  telefonoVisible: '609 301 845',
};

// Mientras la web vivió en github.io se pedía a los buscadores que no la
// indexaran (true), para no competir con la web antigua de Pablo. Desde que
// está en pablobarrioarauz.com, false: que la encuentren.
export const SIN_INDEXAR = false;

export const urlWhatsApp = (mensaje?: string) =>
  `https://wa.me/${sitio.whatsapp}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
export const urlInstagram = `https://www.instagram.com/${sitio.instagram}/`;
