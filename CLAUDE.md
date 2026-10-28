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
- **Obras reales en la web** (21-10-2026): 14 cuadros y 5 esculturas, sacados
  del archivo de GÜZDAY con `node scripts/subir-obras.mjs`. Ese programa
  SUSTITUYE todas las obras de la web por las del archivo (lo hecho desde el
  panel se pierde) y salta las fichas sin título o sin estado (la técnica
  puede faltar: "Cosa de dos" va solo con título y estado, 27-10-2026). Las fotos que caben en 3000 px se copian tal cual; las
  más grandes se reducen a 3000 (JPEG 92).
- **Fotos de la web** (21-10-2026, `src/lib/servicio-fotos.mjs`): al construir,
  cada foto recibe la calidad mínima que aún se ve igual que la original (de
  70 a 94; método de la web de Blanca), un enfoque suave al reducir, y cada
  versión sale ya recortada a 3:4 (`src/lib/fotos.ts`), en vez de mandar la
  foto entera para que la recorte el navegador.
- **Firma de Pablo** en la cabecera (`src/assets/firma.svg`, metida en la
  página para que tome el color del texto). Sale del SVG que
  pasó Guzmán (`scripts/firma/Firma Barrio.svg`) con los trazos intactos: solo
  se le quitan los datos internos de Adobe y se ajusta el recuadro al borde
  de la tinta. **No vectorizar la firma por nuestra cuenta**: Guzmán notó la
  diferencia.
- **Todas las cabeceras deben ser idénticas** en todas las páginas, ordenador
  y móvil (lo ha pedido Guzmán expresamente). Solo cambia el color en la
  portada. **Excepción: la página de cada obra no lleva cabecera** (pedido de
  Guzmán, 20-10-2026) ni pie; arriba a la derecha de la página va "Cerrar", bajo la foto unos puntitos (como Instagram) que indican la foto del carrusel,; y, en ordenador, flechas finas muy a los lados de la pantalla para pasar a la obra anterior o siguiente (21-10-2026); también con las flechas del teclado y, en el móvil (sin flechas), deslizando el dedo fuera del carrusel. Al abrirse, entrada ligera: todo en bloque (también el título), y la foto con zoom solo si no llega volando desde la galería, que vuelve a la sección, igual que Esc (21-10-2026), y en ordenador la página ocupa justo la pantalla, sin scroll, con la foto centrada en vertical. Tras tocar la cabecera, medir portada y
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
  `--serif` / `--sans` de `global.css`. Inter Tight va en ExtraLight (200)
  y lo que destaca en 300 (21-10-2026, un peso menos que antes). Probada y
  descartada por Guzmán: una monoespaciada (DM Mono).
- Probado y descartado por Guzmán (16-10-2026): relieve (luz arriba a la
  izquierda) en las cajitas del menú del móvil.
- Probado y descartado por Guzmán (16-10-2026): una entrada en la portada en la
  que la firma se escribía sola. No le gustó. Está en el historial (commit
  "La firma de Pablo en la cabecera, y en la portada se escribe sola").

## Dónde está cada cosa

| | |
|---|---|
| Código | `~/Documents/GitHub/Barrio Portfolio` (esta carpeta) |
| Archivo de obras (fotos y fichas) | `~/Documents/GÜZDAY/00 Barrio/Obras` |
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
- Secciones: Pintura · Escultura · Encargos · ¿Proyectamos? · Contacto.
  **¿Proyectamos?** (antes "Colabora conmigo"; 21-10-2026, /colabora/ y /en/work-with-me/) es una
  réplica de Encargos para negocios y espacios abiertos al público, con el
  texto que mandó Pablo; las dos páginas salen de `src/vistas/Encargos.astro`.
  Sus pasos y la traducción son provisionales. "Acerca de mí" va
  dentro de Contacto (lo decidió Guzmán, 16-10-2026). Desde el 21-10-2026
  Contacto (28-10-2026): sin título visible; fotos con su proporción original (sin recortar, a diferencia del 3:4 del resto) que se pasan solas
  (la siguiente aparece encima, de desenfocada a nítida; las de
  `00 Barrio/Web/Contacto/`, copiadas a `src/assets/contacto/` como
  01.jpg…; el nombre marca el orden) a la izquierda en ordenador y arriba en el móvil,
  y el texto de Pablo alineado a la izquierda con, debajo, Contacta conmigo
  (WhatsApp), teléfono, correo e Instagram. En ordenador cabe en una
  pantalla. Probados y descartados
  por Guzmán: carrusel 3D, etiquetas numeradas, "B … RIO" en letra enorme y
  una lámina de fotos con retícula (están en el historial);
  /acerca-de-mi/ redirige a /contacto/.
- **Cada obra lleva ficha**: título, técnica, medidas, año y un texto
  breve. Esto es lo contrario que en la web de Blanca, donde no se quería
  ningún texto. No copiar aquel criterio.
- **Estado de venta**: quiere marcar las obras como vendidas / no disponibles,
  y le interesaba poder filtrar por disponibles.
- **El precio no se enseña en la web** (decisión de Guzmán, 16-10-2026): en
  su lugar sale "Disponible" o "Vendida" (sin puntos de color: se probaron y
  Guzmán los quitó). **El campo de precio se quitó también del panel**
  (20-10-2026): no existe en ningún sitio.
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

**En la web**: cada obra es una carpeta en `src/content/<cuadros|esculturas>/<obra>/`
con `index.yml` y sus fotos (lo que lee y escribe el panel).

**En el ordenador de Guzmán** (archivo maestro, desde 20-10-2026):
`~/Documents/GÜZDAY/00 Barrio/Obras/<Pintura|Escultura>/<NN Título>/`, con las
fotos en calidad original numeradas `1.jpg, 2.jpg…` (la 1 es la portada) y un
`ficha.txt`. El número de la carpeta es el orden. Se pasa a la web cuando
Guzmán lo pide ("sube las obras") con `node scripts/subir-obras.mjs`.

```
titulo: Rojo
tecnica: Técnica mixta sobre lienzo
medidas: 130 x 130 cm
anio:
estado: vendido           (o: disponible)
proyecto: Proyecto 01 Recoletos     (opcional; la web aún no lo usa)
texto: Una o dos frases.

tecnica_en: Mixed media on canvas
texto_en: One or two sentences.
```

Lo que manda Pablo se guarda tal cual en `00 Barrio/Web/Recibido de Pablo
<fecha>/`. Resto de `00 Barrio`: `Fotos obras/` (Cuadros PRO, Esculturas PRO:
el flujo de edición de Guzmán, con `Brutos` y `Done`), `Sesiones/`,
`Materia viva/`, `Cat Lightroom/`.

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
- **No borrar fotos "sin usar" de las carpetas de obras**: el panel recuerda
  las fotos que ha visto y deja volver a elegirlas; si el archivo ya no está,
  la ficha apunta a una foto que no existe y la web no se construye (pasó con
  Palitroques con agujeros, 20-10-2026). Dejarlas: ocupan poco.
- **El panel en local no funciona en el navegador integrado de VS Code**:
  enseña la ventana de elegir carpeta pero no da el permiso, y sale "No se
  pudo seleccionar un directorio raíz". Pasa si VS Code tiene activado
  `workbench.browser.openLocalhostLinks` (abre los enlaces a localhost
  dentro de VS Code). Abrir el panel en Chrome (el acceso del Escritorio,
  carpeta "Web Barrio", lo hace siempre).
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
