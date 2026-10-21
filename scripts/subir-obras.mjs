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
// pierden). Las obras con la ficha a medias (sin técnica o sin estado) se
// saltan y se avisa.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ARCHIVO = process.argv[2] ?? join(homedir(), 'Documents/GÜZDAY/00 Barrio/Obras');
const WEB = fileURLToPath(new URL('../src/content/', import.meta.url));
const SECCIONES = { Pintura: 'cuadros', Escultura: 'esculturas' };
// La web nunca enseña una foto a más de 1800 px de ancho (página de la
// obra), así que con 2400 de lado mayor sobra; la web genera luego sus
// propias versiones reducidas. A 3000 px y calidad 90, las 64 fotos de
// 21-10-2026 ocupaban 113 MB.
const LADO_MAX = 2400;
const CALIDAD = 85;

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
    if (!f.titulo || !f.tecnica || !['disponible', 'vendido'].includes(f.estado)) {
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
    const nombresFotos = fotos.map((foto, i) => {
      const salida = `${nombre}-${i + 1}.jpg`;
      execFileSync('sips', [
        '-Z', String(LADO_MAX),
        '-s', 'format', 'jpeg',
        '-s', 'formatOptions', String(CALIDAD),
        join(origen, foto),
        '--out', join(dir, salida),
      ], { stdio: 'ignore' });
      return salida;
    });
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
console.log(`\n${total} obras en la web.`);
if (saltadas.length) console.log('Saltadas:\n  ' + saltadas.join('\n  '));
