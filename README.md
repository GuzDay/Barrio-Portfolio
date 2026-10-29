# Web de Pablo Barrio Araúz

## Enlaces

| | |
|---|---|
| **Web publicada** | https://pablobarrioarauz.com/ |
| **Panel de edición (CMS), publicado** | https://pablobarrioarauz.com/admin/ |
| **Web en tu ordenador** | http://localhost:4322/ |
| **Panel en tu ordenador** | http://localhost:4322/admin/index.html |
| Repositorio | https://github.com/pablobarrioarauz/Barrio-Portfolio |
| Publicaciones (si una falla) | https://github.com/pablobarrioarauz/Barrio-Portfolio/actions |

## Usar el panel en tu ordenador

1. Encender la web en local, desde esta carpeta en la terminal:
   `npx astro dev --port 4322`
2. Abrir en **Chrome** (no Safari) http://localhost:4322/admin/index.html
3. Pulsar **"Trabajar con un repositorio local"** y elegir la carpeta `Barrio Portfolio`.
4. Lo que se cambie se guarda solo en el ordenador: para que llegue a la web
   publicada hay que subirlo (GitHub Desktop → Commit → Push).

Si algo borrado en el panel sigue saliendo en localhost: parar el servidor
(`npx astro dev stop`), borrar `node_modules/.astro` y `.astro/data-store.json`
y volver a encenderlo.

## Notas del proyecto

Las decisiones, el porqué de cada cosa y las trampas conocidas están en
`CLAUDE.md`.
