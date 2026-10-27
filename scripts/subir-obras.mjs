// Pasa las obras del archivo de Guzmán a la web.
//
//   node scripts/subir-obras.mjs            (o con otra carpeta como argumento)
//
// Lee ~/Documents/GÜZDAY/00 Barrio/Obras/<Pintura|Escultura>/<NN Título>/
// (fotos 1.jpg, 2.jpg… y ficha.txt; ver CLAUDE.md) y deja cada obra en
// src/content/<cuadros|esculturas>/<nombre>/ con su index.yml y sus fotos,
// tal como las guarda el panel, para que Pablo pueda seguir editándolas.
//
// Ojo: SUSTITUYE todas las obras de la web por las del archivo (las que no
// están en el archivo desaparecen, y los cambios hechos desde el panel se
// pierden). Las obras sin título o sin estado se
// saltan y se avisa.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ARCHIVO = process.argv[2] ?? join(homedir(), 'Documents/GÜZDAY/00 Barrio/Obras');
const WEB = fileURLToPath(new URL('../src/content/', import.meta.url));
const SECCIONES = { Pintura: 'cuadros', Escultura: 'esculturas' };
// Estas fotos no las ve nadie: son los originales de los que la web saca
// luego sus propias versiones, con la calidad que necesita cada una (ver
// src/lib/servicio-fotos.mjs). Por eso no se recomprimen si no hace falta:
// la que ya cabe en 3000 px se copia tal cual (recomprimir es perder calidad
// para siempre, sin ganar nada en la web). Solo las más grandes se reducen,
// con calidad muy alta. Lo mismo que en la web de Blanca.
const LADO_MAX = 3000;
const CALIDAD = 92;

// La dirección de la obra, como la haría el panel: sin tildes, en minúsculas.
const nombreWeb = (titulo) =>
  titulo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const leerFicha = (archivo) => {
  const ficha = {};
  for (const linea of readFileSync(archivo, 'utf8').split('\n')) {
    const m = linea.match(/^([a-z_]+):\s*(.*)$/);
    if (m) ficha[m[1]] = m[2].trim();
  }
  return ficha;
};

// Texto entre comillas dobles: así vale en YAML con cualquier carácter.
const y = (texto) => JSON.stringify(texto);

const saltadas = [];
let total = 0;
let copiadas = 0;
let reducidas = 0;
for (const [carpeta, seccion] of Object.entries(SECCIONES)) {
  const destino = join(WEB, seccion);
  rmSync(destino, { recursive: true, force: true });
  mkdirSync(destino, { recursive: true });
  const obras = readdirSync(join(ARCHIVO, carpeta))
    .filter((n) => /^\d+ /.test(n))
    .sort();
  for (const obra of obras) {
    const origen = join(ARCHIVO, carpeta, obra);
    if (!existsSync(join(origen, 'ficha.txt'))) {
      saltadas.push(`${carpeta}/${obra}: sin ficha.txt`);
      continue;
    }
    const f = leerFicha(join(origen, 'ficha.txt'));
    // La técnica puede faltar (Guzmán subió así "Cosa de dos", 27-10-2026):
    // la web enseña solo lo que haya.
    if (!f.titulo || !['disponible', 'vendido'].includes(f.estado)) {
      saltadas.push(`${carpeta}/${obra}: ficha a medias`);
      continue;
    }
    const fotos = readdirSync(origen)
      .filter((n) => /^\d+\.jpe?g$/i.test(n))
      .sort((a, b) => parseInt(a) - parseInt(b));
    if (!fotos.length) {
      saltadas.push(`${carpeta}/${obra}: sin fotos`);
      continue;
    }
    const nombre = nombreWeb(f.titulo);
    const dir = join(destino, nombre);
    mkdirSync(dir);
    const nombresFotos = [];
    for (const [i, foto] of fotos.entries()) {
      const salida = `${nombre}-${i + 1}.jpg`;
      const entrada = join(origen, foto);
      const meta = await sharp(entrada).metadata();
      const cabe = Math.max(meta.width, meta.height) <= LADO_MAX;
      const derecha = !meta.orientation || meta.orientation === 1;
      if (cabe && derecha && meta.format === 'jpeg') {
        copyFileSync(entrada, join(dir, salida));
        copiadas++;
      } else {
        await sharp(entrada)
          .rotate()
          .resize({ width: LADO_MAX, height: LADO_MAX, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: CALIDAD, mozjpeg: true })
          .toFile(join(dir, salida));
        reducidas++;
      }
      nombresFotos.push(salida);
    }
    const lineas = [
      `titulo: ${y(f.titulo)}`,
      f.tecnica && `tecnica: ${y(f.tecnica)}`,
      f.texto && `texto: ${y(f.texto)}`,
      f.medidas && `medidas: ${y(f.medidas)}`,
      /^\d{4}$/.test(f.anio ?? '') && `anio: ${f.anio}`,
      `estado: ${f.estado}`,
      'fotos:',
      ...nombresFotos.map((n) => `  - ${n}`),
      `order: ${parseInt(obra)}`,
      (f.tecnica_en || f.texto_en) && 'en:',
      f.tecnica_en && `  tecnica: ${y(f.tecnica_en)}`,
      f.texto_en && `  texto: ${y(f.texto_en)}`,
    ].filter(Boolean);
    writeFileSync(join(dir, 'index.yml'), lineas.join('\n') + '\n');
    total++;
    console.log(`${seccion}/${nombre}  (${fotos.length} fotos)`);
  }
}
console.log(`\n${total} obras en la web. Fotos: ${copiadas} copiadas tal cual, ${reducidas} reducidas a ${LADO_MAX} px.`);
if (saltadas.length) console.log('Saltadas:\n  ' + saltadas.join('\n  '));
