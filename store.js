/* ============================================================
   ALMACENAMIENTO Y GAMIFICACIÓN
   Guarda el progreso en el navegador del estudiante (localStorage).
   Si el navegador bloquea el almacenamiento, funciona igual en la
   sesión actual (memoria) sin romperse.
   ============================================================ */

const Store = (() => {
  const KEY = "aula-ejecutiva-v1";
  let memoria = null; // respaldo si localStorage no está disponible

  const estadoInicial = () => ({
    puntos: 0,
    leccionesCompletas: [],   // ids de lecciones
    insignias: [],            // ids de insignias obtenidas
    quizPerfectos: 0,         // cantidad de cuestionarios al 100%
    mejoresQuiz: {}           // { leccionId: porcentaje }
  });

  function leer() {
    if (memoria) return memoria;
    try {
      const raw = localStorage.getItem(KEY);
      memoria = raw ? JSON.parse(raw) : estadoInicial();
    } catch (e) {
      memoria = estadoInicial();
    }
    return memoria;
  }

  function guardar(estado) {
    memoria = estado;
    try { localStorage.setItem(KEY, JSON.stringify(estado)); } catch (e) { /* modo memoria */ }
  }

  /* ---------- Consultas ---------- */
  const getEstado = () => ({ ...leer() });

  const leccionCompleta = (id) => leer().leccionesCompletas.includes(id);

  function progresoMateria(materia) {
    const total = materia.lecciones.length || 1;
    const hechas = materia.lecciones.filter(l => leccionCompleta(l.id)).length;
    return Math.round((hechas / total) * 100);
  }

  function progresoGlobal() {
    const totalLecciones = MATERIAS.reduce((s, m) => s + m.lecciones.length, 0) || 1;
    return Math.round((leer().leccionesCompletas.length / totalLecciones) * 100);
  }

  function nivelActual() {
    const p = leer().puntos;
    let actual = NIVELES[0];
    for (const n of NIVELES) if (p >= n.min) actual = n;
    const siguiente = NIVELES.find(n => n.min > p) || null;
    return { ...actual, siguiente };
  }

  /* ---------- Acciones (devuelven insignias nuevas para notificar) ---------- */
  function completarLeccion(id) {
    const e = leer();
    if (!e.leccionesCompletas.includes(id)) {
      e.leccionesCompletas.push(id);
      e.puntos += PUNTOS.leccionCompletada;
    }
    guardar(e);
    return revisarInsignias();
  }

  function registrarQuiz(leccionId, correctas, total) {
    const e = leer();
    let ganados = correctas * PUNTOS.respuestaCorrecta;
    const porcentaje = Math.round((correctas / total) * 100);

    // Solo suma puntos por encima del mejor intento previo, para evitar farmeo
    const previo = e.mejoresQuiz[leccionId] || 0;
    if (porcentaje > previo) e.mejoresQuiz[leccionId] = porcentaje;

    if (porcentaje === 100) {
      ganados += PUNTOS.quizPerfectoBonus;
      e.quizPerfectos += 1;
    }
    e.puntos += ganados;
    guardar(e);
    return { nuevas: revisarInsignias(), puntosGanados: ganados };
  }

  /* ---------- Motor de insignias ---------- */
  function revisarInsignias() {
    const e = leer();
    const nuevas = [];
    for (const ins of INSIGNIAS) {
      if (e.insignias.includes(ins.id)) continue;
      let cumple = false;
      switch (ins.tipo) {
        case "lecciones":
          cumple = e.leccionesCompletas.length >= ins.meta; break;
        case "puntos":
          cumple = e.puntos >= ins.meta; break;
        case "quizPerfecto":
          cumple = e.quizPerfectos >= ins.meta; break;
        case "materiaCompleta":
          cumple = MATERIAS.some(m => m.lecciones.length > 0 &&
                   m.lecciones.every(l => e.leccionesCompletas.includes(l.id))); break;
      }
      if (cumple) { e.insignias.push(ins.id); nuevas.push(ins); }
    }
    if (nuevas.length) guardar(e);
    return nuevas;
  }

  const tieneInsignia = (id) => leer().insignias.includes(id);

  function reiniciar() {
    memoria = estadoInicial();
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  return {
    getEstado, leccionCompleta, progresoMateria, progresoGlobal,
    nivelActual, completarLeccion, registrarQuiz, tieneInsignia, reiniciar
  };
})();
