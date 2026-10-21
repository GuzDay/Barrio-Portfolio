// Las fotos se enseñan recortadas en un marco vertical 3:4 (galería y página
// de cada obra). En vez de mandar la foto entera y que el navegador recorte
// (en una horizontal, más de la mitad de lo descargado quedaba fuera del
// marco), cada versión se genera ya recortada a 3:4, con el mismo encuadre
// centrado que se veía. Así se puede mandar con más resolución y calidad
// pesando menos.
type Foto = { width: number; height: number };

export function marco34(foto: Foto, anchos: number[]) {
  // El trozo 3:4 más grande que cabe en la foto.
  const maximo = Math.floor(Math.min(foto.width, foto.height * 0.75));
  const widths = [...anchos.filter((w) => w < maximo), maximo];
  return { widths, width: maximo, height: Math.round(maximo / 0.75), fit: 'cover' as const };
}
