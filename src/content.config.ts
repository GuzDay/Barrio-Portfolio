// Qué forma tiene una obra. Pablo las crea y edita desde el panel (/admin),
// que guarda cada obra en src/content/<sección>/<nombre>/index.yml, con sus
// fotos al lado. Si se cambia un campo aquí, hay que cambiarlo también en
// public/admin/config.yml, o el panel y la web dejarán de entenderse.
import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// El panel guarda los campos que se dejan sin rellenar como texto vacío ('')
// o como nada (null), según el campo. Se tratan como si no existieran: así
// una ficha con huecos no rompe la web (pasó con el precio vacío), y en
// inglés se enseña el castellano en su lugar.
const vacioANada = (v: unknown) => (v === '' || v === null ? undefined : v);
const textoOpcional = z.preprocess(vacioANada, z.string().optional());
const numeroOpcional = z.preprocess(vacioANada, z.number().optional());

const fichaDeObra = ({ image }: SchemaContext) =>
  z.object({
    // El título no se traduce: es el mismo en los dos idiomas.
    titulo: z.string(),
    // En castellano, el idioma principal.
    tecnica: textoOpcional,
    texto: textoOpcional,
    // Lo que no cambia con el idioma.
    medidas: textoOpcional,
    anio: numeroOpcional,
    precio: numeroOpcional,
    estado: z.enum(['disponible', 'vendido']).default('disponible'),
    fotos: z.array(image()).min(1),
    // Lo escribe el panel cuando Pablo arrastra las obras para ordenarlas.
    order: z.number().default(999),
    // La versión en inglés. Lo que falte se enseña en castellano.
    en: z
      .object({
        tecnica: textoOpcional,
        texto: textoOpcional,
      })
      .default({}),
  });

// Cada carpeta es una obra, y el nombre de la carpeta es su dirección en la
// web (cuadros/rojo).
const seccionDeObras = (seccion: string) =>
  defineCollection({
    loader: glob({
      pattern: '*/index.yml',
      base: `./src/content/${seccion}`,
      generateId: ({ entry }) => entry.split('/')[0],
    }),
    schema: fichaDeObra,
  });

export const collections = {
  cuadros: seccionDeObras('cuadros'),
  esculturas: seccionDeObras('esculturas'),
};
