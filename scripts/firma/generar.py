"""
Genera la firma de Pablo para la web a partir de firma-original.png:

  public/firma.svg              la firma quieta (cabecera)
  src/assets/firma-animada.svg  la firma que se escribe sola (entrada)

La animación descubre la firma siguiendo una línea por el centro de cada
trazo, en un orden de escritura elegido a mano (TRAZOS, abajo). Para cambiar
el orden basta con reordenar esa lista y volver a ejecutar esto.

Necesita Python con numpy, scipy, scikit-image y pillow, y Node con el
paquete potrace (para vectorizar el relleno). Uso:

  python3 scripts/firma/generar.py <carpeta con node_modules/potrace>
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.morphology import binary_closing, disk, remove_small_objects, skeletonize

AQUI = Path(__file__).parent
RAIZ = AQUI.parent.parent
ORIGINAL = AQUI / 'firma-original.png'
NODE = Path(sys.argv[1])

# Orden de escritura. Cada trazo es una sucesión de ramas del esqueleto
# (números de esqueleto-numerado.png); una "r" detrás recorre la rama al revés.
TRAZOS = [
    ['13', '11', '8', '7', '5', '4', '2'],          # palo largo de la B
    ['17r', '21', '19', '12', '20', '23r', '24'],   # curvas de la B y "arri"
    ['16', '15', '10', '18r', '22r'],               # trazo interior y barrido
    ['27'],                                         # la "o"
    ['26'],                                         # punto de la i
    ['3r', '11r', '14'],                            # raya de arriba
    ['1r', '7r', '9'],                              # raya del medio
    ['0r', '4r', '6r'],                             # raya de abajo
    ['28'],                                         # punto final
    ['25r'],                                        # subrayado
]
VELOCIDAD = 3200   # píxeles del original por segundo: la velocidad del bolígrafo
PAUSA = 0.08       # segundos con el bolígrafo levantado entre trazos

# --- Tinta y esqueleto -------------------------------------------------------
gris = np.array(Image.open(ORIGINAL).convert('L'))
tinta = remove_small_objects(gris < 128, 50)
radio = ndi.distance_transform_edt(tinta)
sk = skeletonize(binary_closing(tinta, disk(2)))
H, W = sk.shape
VEC = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
def vecinos(y, x):
    return [(y + a, x + b) for a, b in VEC if 0 <= y + a < H and 0 <= x + b < W and sk[y + a, x + b]]
puntos = list(zip(*np.nonzero(sk)))
nodos = {p for p in puntos if len(vecinos(*p)) != 2}
ramas, visto = [], set()
for n in sorted(nodos):
    for v in vecinos(*n):
        if (n, v) in visto:
            continue
        camino, prev, cur = [n, v], n, v
        visto.add((n, v))
        while cur not in nodos:
            sig = [q for q in vecinos(*cur) if q != prev]
            if not sig:
                break
            prev, cur = cur, sig[0]
            camino.append(cur)
        visto.add((camino[-1], camino[-2]))
        ramas.append(camino)
unicas, claves = [], set()
for r in (r for r in ramas if len(r) > 12):
    k = (min(r[0], r[-1]), max(r[0], r[-1]), len(r))
    if k not in claves:
        claves.add(k)
        unicas.append(r)
# Numeración estable: de izquierda a derecha según el punto medio.
unicas.sort(key=lambda r: (r[len(r) // 2][1], r[len(r) // 2][0]))

# Dibujo de ayuda con el número de cada rama, para elegir el orden.
ayuda = Image.fromarray(np.where(tinta, 205, 255).astype('uint8')).convert('RGB')
from PIL import ImageDraw, ImageFont
d = ImageDraw.Draw(ayuda)
try:
    letra = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 34)
except OSError:
    letra = None
for i, r in enumerate(unicas):
    color = tuple(int(c) for c in np.random.default_rng(i).integers(0, 190, 3))
    d.line([(x, y) for y, x in r], fill=color, width=5)
    y, x = r[len(r) // 2]
    d.text((x + 6, y - 36), str(i), fill=color, font=letra)
ayuda.save(AQUI / 'esqueleto-numerado.png')

# --- Recuadro de la firma (con un poco de aire) ------------------------------
ys, xs = np.nonzero(tinta)
M = 12
x0, y0 = max(int(xs.min()) - M, 0), max(int(ys.min()) - M, 0)
x1, y1 = min(int(xs.max()) + M, W), min(int(ys.max()) + M, H)
caja = f'{x0} {y0} {x1 - x0} {y1 - y0}'

# --- Relleno vectorial (potrace) ---------------------------------------------
js = """
const potrace = require('potrace');
potrace.trace(process.argv[1], { threshold: 128, turdSize: 20, optTolerance: 0.4 }, (e, svg) => {
  if (e) throw e;
  process.stdout.write(svg.match(/ d="([^"]+)"/)[1]);
});
"""
relleno = subprocess.run(['node', '-e', js, str(ORIGINAL)], cwd=NODE, capture_output=True, text=True, check=True).stdout
relleno = ' '.join(relleno.split())

# --- Recorrido del bolígrafo -------------------------------------------------
def simplificar(pts, tol=1.5):
    """Quita puntos sobrantes sin cambiar la forma (Ramer-Douglas-Peucker)."""
    if len(pts) < 3:
        return pts
    a, b = np.array(pts[0], float), np.array(pts[-1], float)
    ab = b - a
    n = np.hypot(*ab) or 1.0
    dist = [abs(ab[0] * (p[1] - a[1]) - ab[1] * (p[0] - a[0])) / n for p in pts[1:-1]]
    i = int(np.argmax(dist)) + 1
    if dist[i - 1] <= tol:
        return [pts[0], pts[-1]]
    return simplificar(pts[: i + 1], tol)[:-1] + simplificar(pts[i:], tol)

trazos, t = [], 0.0
for trazo in TRAZOS:
    pts = []
    for nombre in trazo:
        r = unicas[int(nombre.rstrip('r'))]
        r = r[::-1] if nombre.endswith('r') else r
        pts += [(int(x), int(y)) for y, x in r]
    largo = float(sum(np.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]) for i in range(len(pts) - 1)))
    # Ancho de la máscara: lo justo para tapar el trazo más grueso del recorrido.
    ancho = 2 * max(radio[y, x] for x, y in pts) + 6
    dur = largo / VELOCIDAD
    d_ = 'M' + ' L'.join(f'{x} {y}' for x, y in simplificar(pts))
    trazos.append((d_, ancho, t, dur))
    t += dur + PAUSA
total = t - PAUSA

# --- Archivos ----------------------------------------------------------------
(RAIZ / 'public' / 'firma.svg').write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{caja}" role="img" aria-label="Pablo Barrio Araúz">'
    f'<path fill="#1a1a1a" d="{relleno}"/></svg>\n'
)
mascara = ''.join(
    f'<path d="{d_}" stroke-width="{ancho:.0f}" pathLength="1" style="animation-delay:{ini:.2f}s;animation-duration:{dur:.2f}s"/>'
    for d_, ancho, ini, dur in trazos
)
(RAIZ / 'src' / 'assets' / 'firma-animada.svg').write_text(
    f'<!-- Generado por scripts/firma/generar.py: no editar a mano. Dura {total:.2f} s. -->\n'
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{caja}" class="firma-animada" data-duracion="{total:.2f}" aria-hidden="true">'
    f'<mask id="firma-mascara" maskUnits="userSpaceOnUse" x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}">'
    f'<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">{mascara}</g></mask>'
    f'<path fill="currentColor" mask="url(#firma-mascara)" d="{relleno}"/></svg>\n'
)
print(f'{len(unicas)} ramas, {len(trazos)} trazos, {total:.2f} s; recuadro {caja}')
