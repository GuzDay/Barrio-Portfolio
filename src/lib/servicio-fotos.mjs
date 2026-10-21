// Cómo genera la web las versiones de cada foto (las que se descargan). Es el
// servicio de Astro de siempre (sharp) con dos cambios, pedidos por Guzmán:
//
// 1) Calidad a medida, foto a foto. Una misma calidad para todas deja unas
//    estupendas y otras regulares: un lienzo con mucha textura se estropea
//    antes que una pared lisa. Se busca para cada foto la calidad más baja que
//    todavía se ve igual que la original, y se usa esa. Es el método de la web
//    de Blanca, pero calculado aquí, al construir la web: así vale también para
//    las fotos que suba Pablo desde el panel, sin apuntar nada en ningún sitio.
//
// 2) Un pelín de enfoque al reducir. Al hacer una foto más pequeña se pierde
//    algo de nitidez; se le devuelve un poco, muy suave (las fotos que se
//    agrandan no se enfocan: se notaría la compresión).
import sharp from 'sharp';
import sharpService from 'astro/assets/services/sharp';

// Elegidos midiendo en la web de Blanca: por encima de 2,6 de diferencia media
// por píxel (de 255) se empieza a notar.
const DIFERENCIA_ACEPTABLE = 2.6;
const CALIDADES = [70, 74, 78, 82, 86, 90, 94];
// Se compara al tamaño que más se ve: la foto de la página de la obra en un
// portátil con pantalla retina (unos 580 px de ancho, por dos).
const ANCHO_DE_PRUEBA = 1200;
// Enfoque suave (máscara de enfoque de radio pequeño, y floja en las zonas
// lisas para no levantar ruido).
const ENFOQUE = { sigma: 0.6, m1: 0.6, m2: 1.2 };

sharp.cache(false);

const calidades = new Map(); // foto → promesa con su calidad

async function calidadQueNecesita(entrada) {
  const { width, height } = await sharp(entrada).rotate().metadata();
  // Una foto pequeña la acaba estirando el navegador, y estirar amplifica los
  // defectos de la compresión: a esas no se les baja tanto.
  const suelo = Math.max(width, height) < 1800 ? 82 : 70;
  let base = sharp(entrada).rotate().resize({ width: ANCHO_DE_PRUEBA, withoutEnlargement: true });
  if (width > ANCHO_DE_PRUEBA) base = base.sharpen(ENFOQUE);
  const plana = await base.raw().toBuffer({ resolveWithObject: true });
  const referencia = plana.data;
  const crear = () => sharp(referencia, { raw: plana.info });
  for (const calidad of CALIDADES.filter((q) => q >= suelo)) {
    const prueba = await crear().webp({ quality: calidad }).toBuffer();
    const pixeles = await sharp(prueba).raw().toBuffer();
    const hasta = Math.min(pixeles.length, referencia.length);
    let suma = 0;
    for (let i = 0; i < hasta; i++) suma += Math.abs(pixeles[i] - referencia[i]);
    if (suma / hasta <= DIFERENCIA_ACEPTABLE) return calidad;
  }
  return 96;
}

const fit = { fill: 'fill', contain: 'inside', cover: 'cover', none: 'outside', 'scale-down': 'inside', outside: 'outside', inside: 'inside' };

export default {
  ...sharpService,
  async transform(entrada, opciones, config, logger) {
    const formato = opciones.format;
    const meta = await sharp(entrada).metadata().catch(() => null);
    // Lo que no sea una foto normal (SVG, GIF animado…) o ya traiga su
    // calidad puesta, como siempre.
    if (!meta || !['jpeg', 'png', 'webp', 'tiff', 'heif'].includes(meta.format) || !['webp', 'jpeg', 'jpg'].includes(formato) || opciones.quality) {
      return sharpService.transform(entrada, opciones, config, logger);
    }

    const clave = String(opciones.src);
    if (!calidades.has(clave)) {
      const promesa = calidadQueNecesita(entrada);
      calidades.set(clave, promesa);
      promesa.then((q) => logger.info(`calidad ${q}: ${clave.split('/').slice(-2).join('/')}`));
    }
    const calidad = await calidades.get(clave);

    const foto = sharp(entrada, { failOn: 'none' }).rotate();
    const ancho = opciones.width && Math.round(opciones.width);
    const alto = opciones.height && Math.round(opciones.height);
    if (ancho || alto) {
      foto.resize({
        width: ancho,
        height: alto,
        fit: ancho && alto ? fit[opciones.fit] ?? 'inside' : undefined,
        position: opciones.position,
        withoutEnlargement: true,
      });
    }
    // Cuánto se reduce (en una foto recortada, manda el lado que la llena).
    const [w, h] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
    const escala = Math.max(ancho ? ancho / w : 0, alto ? alto / h : 0);
    if (escala && escala < 0.9) foto.sharpen(ENFOQUE);
    if (formato === 'webp') foto.webp({ quality: calidad });
    else foto.jpeg({ quality: calidad, mozjpeg: true });
    return { data: await foto.toBuffer(), format: formato };
  },
};
