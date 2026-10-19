// Las obras, tal como las guarda el panel, listas para enseñar en un idioma.
import { getCollection } from 'astro:content';
import type { Idioma, Seccion } from './rutas';

export async function obrasDe(seccion: Seccion) {
  const obras = await getCollection(seccion);
  // El orden lo pone Pablo arrastrando en el panel.
  return obras.sort((a, b) => a.data.order - b.data.order);
}

export type Obra = Awaited<ReturnType<typeof obrasDe>>[number];

// Lo que se enseña de una obra en un idioma. Si falta el inglés, va el
// castellano. El título nunca se traduce.
export function ficha(obra: Obra, idioma: Idioma) {
  const d = obra.data;
  const en = idioma === 'en' ? d.en : {};
  return {
    titulo: d.titulo,
    tecnica: en.tecnica ?? d.tecnica,
    texto: en.texto ?? d.texto,
    medidas: d.medidas,
    anio: d.anio,
    // Sin precio (se quitó del todo): solo si está disponible o vendida.
    vendida: d.estado === 'vendido',
    fotos: d.fotos,
  };
}
