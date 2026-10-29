// @ts-check
import { defineConfig } from 'astro/config';

// Dirección de la web.
//
// Desde el 29-10-2026, en su dominio: pablobarrioarauz.com (en Piensa
// Solutions apunta a GitHub Pages; el archivo public/CNAME se lo dice a
// GitHub). Antes vivía en pablobarrioarauz.github.io/Barrio-Portfolio.
const SITIO = 'https://pablobarrioarauz.com';
const RUTA_BASE = '';

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
