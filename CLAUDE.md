# Portfolio de Pablo Barrio Araúz

Web de un artista que hace **pintura y escultura**. La monta Guzmán, que no es
programador pero se maneja: explícale las cosas en castellano, sin jerga, y
dile siempre qué comprobaste y cómo. Si algo no se verificó, dilo.

Es la segunda web de este tipo. La primera es la de Blanca G. Tarrío, una
fotógrafa, y está terminada y publicada. **Esa web es la mejor fuente de
consulta que hay**: ver más abajo.

## Qué está hecho

- Repositorio `GuzDay/Barrio-Portfolio`, público, con GitHub Pages activado
  (Source: GitHub Actions).
- Proyecto Astro creado de cero, `.github/workflows/publicar.yml` publicando
  con cada push a `main`. Primer despliegue verificado: 80 s.
- **Esqueleto completo de la web** (16-10-2026), sin diseño todavía: Inicio,
  Cuadros, Esculturas (galería con tarjetas iguales en 4:5 y filtro de
  disponibles), página de cada obra con botón de WhatsApp, Encargos y
  Contacto (con el texto sobre Pablo debajo), en ES (sin prefijo) y EN (`/en/...`). Las vistas están en
  `src/vistas/`, los textos fijos en `src/lib/textos.ts`. Toda la web lleva
  `noindex` mientras viva en github.io (`SIN_INDEXAR` en `src/lib/sitio.ts`).
- Las obras de color liso son de prueba y se borran antes de publicar.
- **Firma de Pablo** en la cabecera (`src/assets/firma.svg`, metida en la
  página para que tome el color del texto). Sale del SVG que
  pasó Guzmán (`scripts/firma/Firma Barrio.svg`) con los trazos intactos: solo
  se le quitan los datos internos de Adobe y se ajusta el recuadro al borde
  de la tinta. **No vectorizar la firma por nuestra cuenta**: Guzmán notó la
  diferencia.
- **Todas las cabeceras deben ser idénticas** en todas las páginas, ordenador
  y móvil (lo ha pedido Guzmán expresamente). Solo cambia el color en la
  portada: firma blanca del todo. Tras tocar la cabecera, medir portada y
  secciones y comparar.
- **Cabecera fija estilo gionatannese.com** (16-10-2026): firma en blanco con
  `mix-blend-mode: exclusion` (cambia de color sobre las fotos; va suelta,
  fuera de cualquier capa, o no funciona), menú centrado en cajitas de cristal
  siempre con su nombre (sin números: Guzmán los quitó), que se ensanchan
  suavemente al pasar el ratón; la actual, algo más oscura. Idioma en otra
  cajita.
- **Tipografías** (16-10-2026): Newsreader para títulos, cabecera y pie, e
  Inter Tight para el resto. Son las gratuitas más parecidas a las que le
  gustan a Guzmán, Teodor y Forma DJR, que son de pago. Están en
  `--serif` / `--sans` de `global.css`.
- Probado y descartado por Guzmán (16-10-2026): relieve (luz arriba a la
  izquierda) en las cajitas del menú del móvil.
- Probado y descartado por Guzmán (16-10-2026): una entrada en la portada en la
  que la firma se escribía sola. No le gustó. Está en el historial (commit
  "La firma de Pablo en la cabecera, y en la portada se escribe sola").

## Dónde está cada cosa

| | |
|---|---|
| Código | `~/Documents/GitHub/Barrio Portfolio` (esta carpeta) |
| Contenido: fotos y fichas | `~/Documents/GÜZDAY/00 Barrio/Portfolio Barrio` |
| Web provisional | https://guzday.github.io/Barrio-Portfolio/ |
| Dominio | `pablobarrioarauz.com`, **apuntando todavía a su web actual: WordPress alojado en Piensa Solutions** (comprobado el 16-10-2026; antes se creía Squarespace) |

**El dominio no se toca hasta que la web esté lista**, para que la web actual
de Pablo siga funcionando sin un minuto de corte. Qué cambiar ese día está
apuntado en `astro.config.mjs`; el cambio se hace en Piensa Solutions, que gestiona el dominio. Avisar de no cancelar ese alojamiento antes de tiempo.

## Decisiones ya tomadas (son de Pablo, no se cambian sin preguntarle)

- **Dos secciones separadas, Cuadros y Esculturas.** Descartó expresamente la
  idea de una sola sección "Artworks" con filtros: le parecía "más cutre".
  En la web se llaman **Pintura y Escultura** (Painting / Sculpture), por
  decisión de Guzmán (16-10-2026); las direcciones siguen siendo /cuadros/ y
  /esculturas/. Las dos usan la misma galería: un cambio vale para las dos.
- Secciones: Pintura · Escultura · Encargos · Contacto. "Acerca de mí" va
  dentro de Contacto, debajo de los datos (lo decidió Guzmán, 16-10-2026);
  /acerca-de-mi/ redirige a /contacto/.
- **Cada obra lleva ficha**: título, técnica, medidas, año, precio y un texto
  breve. Esto es lo contrario que en la web de Blanca, donde no se quería
  ningún texto. No copiar aquel criterio.
- **Estado de venta**: quiere marcar las obras como vendidas / no disponibles,
  y le interesaba poder filtrar por disponibles.
- **El precio no se enseña en la web** (decisión de Guzmán, 16-10-2026): en
  su lugar sale "Disponible" o "Vendida" (sin puntos de color: se probaron y
  Guzmán los quitó). El campo de precio sigue en el panel, por si se quiere.
- **Encargos** es un embudo de ventas: 3 o 4 pasos del proceso y un botón de
  contacto. No es una galería más.
- **Contacto**: prefiere **WhatsApp** antes que correo ("me da más confianza").
  Sus datos: pablobarrioke@gmail.com · @pablobarrioarauz · 609 301 845.
- **Castellano e inglés** (cambio pedido por Guzmán el 16-10-2026; antes era
  solo castellano). La web elige el idioma del dispositivo al entrar y hay un
  botón para cambiarlo. Las fichas de obra necesitan también su versión en
  inglés (técnica y texto). **El título no se traduce**: es el que pone Pablo,
  igual en los dos idiomas.
- **Pablo quiere poder añadir obras y cambiar su orden él solo**, sin depender
  de Guzmán, que queda solo para cambios gordos. Esto pide un panel de
  edición (CMS) y cambia cómo se organiza el contenido: ver "Pendiente".

## Pendiente de decidir

- **CMS: en prueba Sveltia CMS** (16-10-2026), elegido frente a Pages CMS
  porque es el único que permite ordenar obras arrastrando y tiene castellano
  e inglés en la misma ficha. Pablo lo usará desde el ordenador. Piezas:
  `public/admin/` (panel, versión fijada a propósito), `src/content.config.ts`
  (forma de la ficha), `src/content/<sección>/<obra>/index.yml` + fotos.
  Falta decidir el **inicio de sesión** para Pablo: un pequeño servicio gratis
  en Cloudflare (recomendado para alguien no técnico) o un token de GitHub.
  Con esto, la carpeta de GÜZDAY y el sistema de `obra.txt` de abajo dejan de
  ser la fuente del contenido.

## Cómo se organiza el contenido

Una carpeta por obra. El número del nombre manda el orden.

```
Portfolio Barrio/
├─ Cuadros/
│   └─ 01 Rojo/
│       ├─ obra.txt
│       └─ (fotos)
└─ Esculturas/
    └─ 01 Interfaz mar-aire/
```

`obra.txt`, un campo por línea; los vacíos no salen en la web:

```
titulo: Rojo
tecnica: Óleo sobre lienzo
medidas: 130 x 130 cm
anio: 2024
precio: 1200
estado: disponible        (o: vendido)
texto: Una o dos frases. Puede quedarse vacío.
```

Guzmán fotografía y edita las obras en `00 Barrio/Cuadros PRO/…`, con
subcarpetas `Brutos` y `Done`. Eso es su flujo de edición y **no** es la
carpeta de la web.

## La web de Blanca: qué mirar y qué no

Está en `~/Documents/GitHub/Portfolio Blanquit/Blanca Portfolio`.
Guzmán decidió **empezar el diseño de cero** para Barrio, así que no se copian
ni la estética ni la estructura. Pero lo que no se ve sí conviene reutilizarlo,
porque costó semanas de tropiezos:

- `scripts/actualizar.mjs` — un doble clic que copia la carpeta de fotos a la
  web, optimiza, detecta qué cambió y publica. Lo más valioso del proyecto.
- `src/lib/galeria.ts` — maquetación automática de la galería.
- `src/components/Visor.astro` — el visor a pantalla completa.
- `astro.config.mjs` — borra al construir las copias de los originales que
  Astro deja sin que las pida nadie (eran 300 MB).
- Su `README.md` — las convenciones del día a día.
- **Sus 108 commits explican el porqué de cada decisión.** `git log` ahí es
  documentación de verdad, no un registro de cambios.

### Trampas que ya costaron caro (no volver a pisarlas)

- **Renombrar un archivo no cambia su fecha.** Si se decide qué rehacer
  comparando fechas, una reordenación de carpeta pasa desapercibida y la web se
  queda con el orden viejo sin avisar. Hay que apuntar de qué archivo salió
  cada cosa, con tamaño y fecha.
- **La caché de imágenes de Astro miente** si se cambian parámetros de calidad:
  da builds rápidos con archivos viejos. Al medir tamaños o calidad, borrar
  `node_modules/.astro` antes.
- **`naturalWidth` no es el tamaño del archivo** cuando la imagen viene de un
  `srcset` con descriptores `w`: el navegador lo corrige por la densidad de
  pantalla. Para saber qué se descargó hay que mirar `currentSrc`.
- **Una misma calidad para todas las fotos es un mal reparto.** Lo que funciona
  es buscar foto a foto la calidad mínima que aún se ve bien.
- **Las capturas de un elemento con Playwright esperan a que se estabilice**, y
  eso tapa justo los fallos de carga que se quieren medir. Capturar la ventana
  entera y recortar por coordenadas.
- **El servidor local (`astro dev`) no se entera de las obras borradas** desde
  el panel: siguen saliendo aunque los archivos ya no existan. Se arregla
  parándolo (`npx astro dev stop`), borrando `node_modules/.astro` y
  `.astro/data-store.json` y volviéndolo a arrancar. La web publicada no
  tiene este problema.
- **El build quitaba el `-webkit-backdrop-filter`** (el desenfoque tal como
  lo entiende Safari anterior al 18). Se arregla fijando `vite.build.cssTarget`
  en `astro.config.mjs`. Ojo: el motor de Safari de Playwright no pinta los
  desenfoques en las capturas (comprobado con una caja mínima); el cristal en
  iPhone solo se puede ver en un móvil real. La web de Blanca tiene el mismo
  problema (su cabecera de cristal sale sin prefijo).
- **`mix-blend-mode: difference`** depende de lo que haya detrás y se comporta
  distinto en Safari. Se abandonó.
- Probado y descartado por Guzmán: efecto de gota de agua, vídeos reproducidos
  al revés al terminar, galería de dos columnas en móvil, AVIF (comprime mejor
  pero multiplica por siete el tiempo de publicación).

## Cómo se trabaja aquí

- Cada cambio se publica y **se verifica contra la web publicada**, no contra
  la copia local. El despliegue tarda entre 90 s y 2 min.
- Los mensajes de commit se escriben en castellano y explican **por qué**, no
  solo qué. Incluyen los números medidos cuando los hay.
- Antes de cambiar algo visual, medirlo. Después, volver a medirlo.
