# Aula Ejecutiva — Plataforma educativa

Plataforma web para la especialidad **Ejecutivo Comercial y de Servicio al Cliente**.
Funciona sin servidor (solo HTML, CSS y JavaScript), por lo que se publica **gratis en GitHub Pages**.

---

## 📁 Estructura de archivos

```
plataforma/
├── index.html          ← estructura de la página (no necesitas tocarla)
├── css/
│   └── styles.css       ← diseño (colores, tipografía)
└── js/
    ├── data.js          ← ⭐ AQUÍ AGREGAS CONTENIDO (materias, lecciones, preguntas)
    ├── store.js         ← guarda el progreso del estudiante
    └── app.js           ← dibuja las pantallas (no necesitas tocarlo)
```

**Regla de oro:** para agregar o cambiar contenido, edita **solo `js/data.js`**.

---

## 🚀 Cómo publicarla en GitHub Pages (gratis)

1. Crea una cuenta en https://github.com (si no tienes).
2. Crea un repositorio nuevo, por ejemplo `aula-ejecutiva`.
3. Sube **todos los archivos y carpetas** manteniendo la estructura (index.html en la raíz, y las carpetas `css/` y `js/`).
4. Ve a **Settings → Pages**.
5. En *Source* elige la rama `main` y la carpeta `/ (root)`. Guarda.
6. En 1–2 minutos tu sitio estará en:
   `https://TU-USUARIO.github.io/aula-ejecutiva/`

> Consejo: para probarla en tu computadora antes de subirla, abre `index.html` con doble clic. Todo funciona local excepto que el navegador puede pedir permiso para el almacenamiento; en GitHub Pages funciona sin problema.

---

## ✏️ Cómo agregar una lección

Abre `js/data.js`, busca la materia y agrega un objeto dentro de `lecciones: [ ... ]`:

```javascript
{
  id: "gc-nueva-leccion",              // identificador único, sin espacios ni tildes
  titulo: "Título de la lección",
  duracion: "15 min",
  video: "dQw4w9WgXcQ",                // solo el código de YouTube (lo de después de v=)
  texto: "<p>Tu explicación en HTML.</p>",
  documentos: [
    { nombre: "Guía en PDF", tipo: "PDF", url: "https://enlace-al-archivo.pdf" }
  ],
  cuestionario: [
    {
      pregunta: "¿Pregunta?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      correcta: 1,                     // 0=A, 1=B, 2=C, 3=D
      explicacion: "Por qué es la correcta."
    }
  ]
}
```

Cualquier campo (video, texto, documentos, cuestionario) es **opcional**: si no lo pones, simplemente no aparece.

## 📚 Cómo agregar una materia nueva

En `js/data.js`, agrega un bloque al arreglo `MATERIAS`:

```javascript
{
  id: "ingles-negocios",
  nombre: "English for Business",
  descripcion: "Inglés aplicado al servicio al cliente.",
  color: "#106B6B",
  icono: "🌐",
  lecciones: [ /* ... */ ]
}
```

## 🏅 Insignias, puntos y niveles

También en `js/data.js` puedes ajustar:
- `INSIGNIAS` → las medallas y sus condiciones.
- `PUNTOS` → cuántos puntos vale cada acción.
- `NIVELES` → los rangos por puntaje.

---

## 🔮 Preparada para crecer (Fases 2 y 3)

La arquitectura ya separa **contenido** (`data.js`) de **lógica** (`app.js`) y de **almacenamiento** (`store.js`).
Cuando quieras dar el salto:

- **Fase 2 (panel docente, seguimiento por estudiante, feedback):** se reemplaza `store.js` por una conexión a **Firebase** o **Supabase**. Como todo el guardado pasa por `Store`, solo cambia ese archivo; las vistas siguen igual.
- **Fase 3 (tutor con IA, reconocimiento de voz, certificados, ranking):** se añaden módulos nuevos que consumen los mismos datos. El reconocimiento de voz usa la Web Speech API del navegador; los certificados se generan en el cliente; el ranking necesita la base de datos de la Fase 2.

---

© Recurso educativo — CTP de Belén.
