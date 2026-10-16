// @ts-check
import { defineConfig } from 'astro/config';

// Dirección de la web.
//
// De momento se publica en la dirección gratuita de GitHub. Cuando el dominio
// pablobarrioarauz.com deje de apuntar a su web actual (WordPress en Piensa Solutions) y apunte aquí, hay que:
//   1. poner SITIO = 'https://pablobarrioarauz.com' y RUTA_BASE = '/'
//   2. crear el archivo public/CNAME con una línea: pablobarrioarauz.com
const SITIO = 'https://guzday.github.io';
const RUTA_BASE = '/Barrio-Portfolio';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITIO,
  base: RUTA_BASE,
  build: {
    format: 'directory',
  },
  // En la web anterior de Pablo, "Acerca de mí" era una página aparte. Ahora
  // va dentro de Contacto: la dirección vieja (y la que tuvo esta web en
  // pruebas, en inglés) llevan allí.
  redirects: {
    '/acerca-de-mi': `${RUTA_BASE}/contacto/`,
    '/en/about': `${RUTA_BASE}/en/contact/`,
  },
});
