// @ts-check
import { defineConfig } from 'astro/config';

// Dirección de la web.
//
// De momento se publica en la dirección gratuita de GitHub. Cuando el dominio
// pablobarrioarauz.com deje de apuntar a su web actual (WordPress en Piensa Solutions) y apunte aquí, hay que:
//   1. poner SITIO = 'https://pablobarrioarauz.com' y RUTA_BASE = '/'
//   2. crear el archivo public/CNAME con una línea: pablobarrioarauz.com
const SITIO = 'https://pablobarrioarauz.github.io';
const RUTA_BASE = '/Barrio-Portfolio';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITIO,
  base: RUTA_BASE,
  build: {
    format: 'directory',
  },
  // Las versiones de cada foto: calidad a medida y un pelín de enfoque
  // (ver src/lib/servicio-fotos.mjs).
  image: {
    service: { entrypoint: './src/lib/servicio-fotos.mjs' },
  },
  // Para qué navegadores se preparan los estilos. Sin esto, al construir se
  // quitaba el "-webkit-backdrop-filter" (el desenfoque de las cajitas de
  // cristal tal como lo entiende Safari) y los iPhone con Safari anterior al
  // 18 se quedaban sin efecto. Safari 15 cubre los iPhone de hace años.
  vite: {
    build: {
      cssTarget: ['safari15', 'ios15', 'chrome100', 'firefox100', 'edge100'],
    },
  },
  // En la web anterior de Pablo, "Acerca de mí" era una página aparte. Ahora
  // va dentro de Contacto: la dirección vieja (y la que tuvo esta web en
  // pruebas, en inglés) llevan allí.
  redirects: {
    '/acerca-de-mi': `${RUTA_BASE}/contacto/`,
    '/en/about': `${RUTA_BASE}/en/contact/`,
  },
});
