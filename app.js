/* ============================================================
   APP  —  enrutador y vistas
   No necesitas editar este archivo para agregar contenido.
   ============================================================ */

const app = document.getElementById("app");

/* ---------- Utilidades ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function getMateria(id) { return MATERIAS.find(m => m.id === id); }
function getLeccion(materia, id) { return materia?.lecciones.find(l => l.id === id); }

function anilloSVG(porcentaje, size = 46) {
  const r = (size - 5) / 2, c = 2 * Math.PI * r, off = c - (porcentaje / 100) * c;
  return `<div class="ring-wrap" style="width:${size}px;height:${size}px">
    <svg class="ring" width="${size}" height="${size}">
      <circle class="ring-bg" cx="${size/2}" cy="${size/2}" r="${r}"></circle>
      <circle class="ring-fg" cx="${size/2}" cy="${size/2}" r="${r}"
        stroke-dasharray="${c}" stroke-dashoffset="${off}"></circle>
    </svg>
    <span class="ring-label">${porcentaje}%</span></div>`;
}

/* ---------- Toast de logro ---------- */
function toast(emoji, titulo, sub) {
  const t = document.createElement("div");
  t.className = "ae-toast";
  t.innerHTML = `<span class="t-emoji">${emoji}</span>
    <div><div class="t-title">${esc(titulo)}</div><div class="t-sub">${esc(sub)}</div></div>`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 500); }, 3800);
}
function notificarInsignias(nuevas) {
  nuevas.forEach((ins, i) =>
    setTimeout(() => toast(ins.emoji, "¡Insignia desbloqueada!", ins.nombre), i * 800));
}

/* ---------- Actualiza puntos en la barra ---------- */
function actualizarNav() {
  const el = $("#nav-points");
  if (el) el.textContent = Store.getEstado().puntos;
  document.querySelectorAll(".ae-nav .nav-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === location.hash);
  });
}

/* ============================================================
   VISTA: INICIO
   ============================================================ */
function vistaInicio() {
  const est = Store.getEstado();
  const niv = Store.nivelActual();
  const global = Store.progresoGlobal();
  const totalLecciones = MATERIAS.reduce((s, m) => s + m.lecciones.length, 0);
  const pctNivel = niv.siguiente
    ? Math.round(((est.puntos - niv.min) / (niv.siguiente.min - niv.min)) * 100) : 100;

  const cards = MATERIAS.map(m => tarjetaMateria(m)).join("");

  app.innerHTML = `
    <section class="ae-hero">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-7">
            <p class="ae-eyebrow">Ejecutivo Comercial y de Servicio al Cliente</p>
            <h1>Aprendé haciendo,<br>avanzá a tu ritmo.</h1>
            <p class="lead">Videos, guías y prácticas interactivas de tu especialidad,
            reunidos en un solo lugar. Ganá puntos e insignias mientras dominás cada tema.</p>
            <div class="d-flex gap-2 flex-wrap mt-4">
              <a href="#/materias" class="btn btn-ae">Empezar a aprender</a>
              <a href="#/panel" class="btn btn-ghost">Ver mi progreso</a>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="ae-progress-card">
              <span class="level-badge">◆ Nivel ${niv.nivel} · ${esc(niv.nombre)}</span>
              <div class="ae-stat-row">
                <div class="ae-stat"><div class="num">${est.puntos}</div><div class="lbl">Puntos</div></div>
                <div class="ae-stat"><div class="num">${est.leccionesCompletas.length}/${totalLecciones}</div><div class="lbl">Lecciones</div></div>
                <div class="ae-stat"><div class="num">${est.insignias.length}</div><div class="lbl">Insignias</div></div>
              </div>
              <div class="mt-3">
                <div class="d-flex justify-content-between small" style="color:#c9d6e3">
                  <span>${niv.siguiente ? "Próximo nivel: " + esc(niv.siguiente.nombre) : "Nivel máximo alcanzado"}</span>
                  <span>${pctNivel}%</span>
                </div>
                <div class="ae-bar"><span style="width:${pctNivel}%"></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ae-section">
      <div class="container">
        <div class="ae-section-head">
          <p class="ae-eyebrow">Materias</p>
          <h2>Explorá tus áreas de estudio</h2>
          <p>Cada materia reúne lecciones con video, material de apoyo y un cuestionario para comprobar lo aprendido.</p>
        </div>
        <div class="row g-4">${cards}</div>
      </div>
    </section>`;
  actualizarNav();
}

/* ---------- Tarjeta de materia reutilizable ---------- */
function tarjetaMateria(m) {
  const pct = Store.progresoMateria(m);
  return `<div class="col-md-6 col-lg-4">
    <a href="#/materia/${m.id}" class="ae-card d-block">
      <div class="subject-icon" style="background:${m.color}">${m.icono}</div>
      <h3>${esc(m.nombre)}</h3>
      <p class="subj-desc">${esc(m.descripcion)}</p>
      <div class="card-meta">
        <span class="lessons-count">${m.lecciones.length} ${m.lecciones.length === 1 ? "lección" : "lecciones"}</span>
        ${anilloSVG(pct)}
      </div>
    </a></div>`;
}

/* ============================================================
   VISTA: TODAS LAS MATERIAS
   ============================================================ */
function vistaMaterias() {
  const cards = MATERIAS.map(tarjetaMateria).join("");
  app.innerHTML = `
    <section class="ae-section">
      <div class="container">
        <div class="ae-section-head">
          <p class="ae-eyebrow">Catálogo</p>
          <h2>Todas las materias</h2>
          <p>Elegí una materia para ver sus lecciones.</p>
        </div>
        <div class="row g-4">${cards}</div>
      </div>
    </section>`;
  actualizarNav();
}

/* ============================================================
   VISTA: DETALLE DE MATERIA (lista de lecciones)
   ============================================================ */
function vistaMateria(id) {
  const m = getMateria(id);
  if (!m) return vistaNoEncontrado();
  const pct = Store.progresoMateria(m);

  const lista = m.lecciones.map((l, i) => {
    const done = Store.leccionCompleta(l.id);
    const partes = [`${l.duracion || ""}`];
    if (l.cuestionario?.length) partes.push(`${l.cuestionario.length} preguntas`);
    return `<a href="#/leccion/${m.id}/${l.id}" class="lesson-list-item ${done ? "done" : ""}">
      <span class="lesson-num">${done ? "✓" : i + 1}</span>
      <div class="flex-grow-1">
        <div class="l-title">${esc(l.titulo)}</div>
        <div class="l-meta">${partes.filter(Boolean).join(" · ")}</div>
      </div>
      ${done ? '<span class="done-pill">✓ Completada</span>' : '<span class="text-teal fw-semibold">Ver →</span>'}
    </a>`;
  }).join("") || `<p class="text-muted">Aún no hay lecciones en esta materia.</p>`;

  app.innerHTML = `
    <section class="lesson-hero" style="background:${m.color === '#F2A900' ? '#0B2545' : m.color}">
      <div class="container">
        <div class="crumb"><a href="#/materias">Materias</a> / ${esc(m.nombre)}</div>
        <div class="d-flex align-items-center gap-3 flex-wrap mt-2">
          <span style="font-size:2rem">${m.icono}</span>
          <h1 class="mb-0">${esc(m.nombre)}</h1>
        </div>
        <div class="d-flex align-items-center gap-2 mt-3" style="max-width:320px">
          <div class="ae-bar flex-grow-1"><span style="width:${pct}%"></span></div>
          <span class="small" style="color:#c9d6e3">${pct}%</span>
        </div>
      </div>
    </section>
    <section class="ae-section">
      <div class="container mw-720">${lista}</div>
    </section>`;
  actualizarNav();
}

/* ============================================================
   VISTA: LECCIÓN (video, texto, documentos, cuestionario)
   ============================================================ */
function vistaLeccion(materiaId, leccionId) {
  const m = getMateria(materiaId);
  const l = getLeccion(m, leccionId);
  if (!m || !l) return vistaNoEncontrado();

  const video = l.video
    ? `<div class="video-wrap mb-4"><iframe src="https://www.youtube.com/embed/${esc(l.video)}"
        title="${esc(l.titulo)}" allowfullscreen loading="lazy"></iframe></div>`
    : "";

  const texto = l.texto ? `<div class="lesson-text mb-4">${l.texto}</div>` : "";

  const docs = (l.documentos && l.documentos.length)
    ? `<h4 class="text-ink mt-4 mb-3" style="font-family:var(--font-display)">Material de apoyo</h4>
       <div class="row g-2">` + l.documentos.map(d => `
        <div class="col-md-6"><a href="${esc(d.url)}" class="doc-item" ${d.url === "#" ? 'onclick="event.preventDefault()"' : 'target="_blank" rel="noopener"'}>
          <span class="doc-ico">${d.tipo === "Word" ? "📝" : d.tipo === "PDF" ? "📄" : "📎"}</span>
          <div><div class="doc-name">${esc(d.nombre)}</div><div class="doc-type">${esc(d.tipo)}</div></div>
        </a></div>`).join("") + `</div>` : "";

  const yaCompleta = Store.leccionCompleta(l.id);
  const btnCompletar = `
    <div class="mt-4 pt-3 border-top">
      <button id="btn-completar" class="btn ${yaCompleta ? "btn-outline-secondary" : "btn-teal"}" ${yaCompleta ? "disabled" : ""}>
        ${yaCompleta ? "✓ Lección completada" : "Marcar como completada (+" + PUNTOS.leccionCompletada + " pts)"}
      </button>
    </div>`;

  app.innerHTML = `
    <section class="lesson-hero">
      <div class="container">
        <div class="crumb"><a href="#/materias">Materias</a> /
          <a href="#/materia/${m.id}">${esc(m.nombre)}</a> / ${esc(l.titulo)}</div>
        <h1>${esc(l.titulo)}</h1>
        <div class="small mt-2" style="color:#9db2c6">${esc(l.duracion || "")}</div>
      </div>
    </section>
    <section class="lesson-body">
      <div class="container mw-720">
        ${video}${texto}${docs}${btnCompletar}
        <div id="quiz-zone" class="mt-5"></div>
      </div>
    </section>`;

  // Botón completar
  const btn = $("#btn-completar");
  if (btn && !yaCompleta) {
    btn.addEventListener("click", () => {
      const nuevas = Store.completarLeccion(l.id);
      btn.disabled = true;
      btn.className = "btn btn-outline-secondary";
      btn.textContent = "✓ Lección completada";
      actualizarNav();
      notificarInsignias(nuevas);
    });
  }

  // Cuestionario
  if (l.cuestionario && l.cuestionario.length) montarQuiz(l);
  actualizarNav();
}

/* ============================================================
   CUESTIONARIO INTERACTIVO
   ============================================================ */
function montarQuiz(leccion) {
  const zona = $("#quiz-zone");
  const preguntas = leccion.cuestionario;
  let indice = 0, correctas = 0, respondida = false;

  function pintarPregunta() {
    respondida = false;
    const q = preguntas[indice];
    zona.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">Pregunta ${indice + 1} de ${preguntas.length}</div>
        <div class="quiz-question">${esc(q.pregunta)}</div>
        <div id="opts">${q.opciones.map((op, i) =>
          `<button class="quiz-opt" data-i="${i}">${esc(op)}</button>`).join("")}</div>
        <div id="fb"></div>
      </div>`;
    zona.querySelectorAll(".quiz-opt").forEach(b =>
      b.addEventListener("click", () => elegir(parseInt(b.dataset.i), q)));
  }

  function elegir(i, q) {
    if (respondida) return;
    respondida = true;
    const botones = zona.querySelectorAll(".quiz-opt");
    botones.forEach(b => b.disabled = true);
    const acierto = i === q.correcta;
    if (acierto) correctas++;
    botones[q.correcta].classList.add("correct");
    if (!acierto) botones[i].classList.add("incorrect");

    $("#fb").innerHTML = `
      <div class="quiz-feedback ${acierto ? "ok" : "no"}">
        <strong>${acierto ? "¡Correcto!" : "Respuesta incorrecta."}</strong>
        ${q.explicacion ? " " + esc(q.explicacion) : ""}
      </div>
      <div class="text-end mt-3">
        <button id="next" class="btn btn-teal">
          ${indice < preguntas.length - 1 ? "Siguiente pregunta →" : "Ver resultado"}
        </button>
      </div>`;
    $("#next").addEventListener("click", () => {
      indice++;
      if (indice < preguntas.length) pintarPregunta();
      else finalizar();
    });
  }

  function finalizar() {
    const total = preguntas.length;
    const pct = Math.round((correctas / total) * 100);
    const { nuevas, puntosGanados } = Store.registrarQuiz(leccion.id, correctas, total);
    actualizarNav();

    zona.innerHTML = `
      <div class="quiz-card quiz-result">
        <div class="quiz-score-ring">${pct}%</div>
        <h3 class="text-ink mt-2" style="font-family:var(--font-display)">
          ${pct === 100 ? "¡Perfecto!" : pct >= 60 ? "¡Bien hecho!" : "Sigue practicando"}
        </h3>
        <p class="text-muted mb-2">Acertaste ${correctas} de ${total} preguntas.</p>
        <p class="fw-semibold text-teal">+${puntosGanados} puntos</p>
        <button id="reintentar" class="btn btn-outline-secondary mt-2">Reintentar cuestionario</button>
      </div>`;
    $("#reintentar").addEventListener("click", () => { indice = 0; correctas = 0; pintarPregunta(); });
    notificarInsignias(nuevas);
  }

  zona.innerHTML = `
    <div class="quiz-card text-center">
      <h3 class="text-ink" style="font-family:var(--font-display)">Comprueba lo aprendido</h3>
      <p class="text-muted">${preguntas.length} ${preguntas.length === 1 ? "pregunta" : "preguntas"} ·
        ${PUNTOS.respuestaCorrecta} pts por acierto</p>
      <button id="start-quiz" class="btn btn-ae mt-2">Iniciar cuestionario</button>
    </div>`;
  $("#start-quiz").addEventListener("click", pintarPregunta);
}

/* ============================================================
   VISTA: PANEL / MI PROGRESO
   ============================================================ */
function vistaPanel() {
  const est = Store.getEstado();
  const niv = Store.nivelActual();
  const global = Store.progresoGlobal();

  const barrasMaterias = MATERIAS.map(m => {
    const pct = Store.progresoMateria(m);
    return `<div class="subj-progress-row">
      <span class="name" style="min-width:min(50%,240px)">${m.icono} ${esc(m.nombre)}</span>
      <div class="track"><div class="ae-bar"><span style="width:${pct}%; background:linear-gradient(90deg, var(--teal), var(--gold))"></span></div></div>
      <span class="fw-semibold text-ink" style="width:44px;text-align:right">${pct}%</span>
    </div>`;
  }).join("");

  const insignias = INSIGNIAS.map(ins => {
    const g = Store.tieneInsignia(ins.id);
    return `<div class="badge-tile ${g ? "earned" : "locked"}">
      <span class="badge-emoji">${g ? ins.emoji : "🔒"}</span>
      <div class="b-name">${esc(ins.nombre)}</div>
      <div class="b-desc">${esc(ins.desc)}</div>
    </div>`;
  }).join("");

  app.innerHTML = `
    <section class="lesson-hero">
      <div class="container">
        <div class="crumb">Mi progreso</div>
        <h1>Tu panel de aprendizaje</h1>
      </div>
    </section>
    <section class="ae-section">
      <div class="container">
        <div class="row g-3 mb-4">
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="ico">◆</div><div class="big">${est.puntos}</div><div class="cap">Puntos totales</div></div></div>
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="ico">🎓</div><div class="big">Nv. ${niv.nivel}</div><div class="cap">${esc(niv.nombre)}</div></div></div>
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="ico">📚</div><div class="big">${est.leccionesCompletas.length}</div><div class="cap">Lecciones completadas</div></div></div>
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="ico">🏅</div><div class="big">${est.insignias.length}/${INSIGNIAS.length}</div><div class="cap">Insignias</div></div></div>
        </div>

        <div class="row g-4">
          <div class="col-lg-7">
            <div class="stat-card">
              <h3 class="text-ink mb-3" style="font-family:var(--font-display);font-size:1.2rem">Progreso por materia</h3>
              ${barrasMaterias}
              <div class="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                <span class="fw-semibold text-ink">Progreso global</span>
                <span class="fw-bold text-teal" style="font-size:1.3rem">${global}%</span>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="stat-card">
              <h3 class="text-ink mb-3" style="font-family:var(--font-display);font-size:1.2rem">Insignias</h3>
              <div class="badge-grid">${insignias}</div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <button id="reset" class="btn btn-sm btn-outline-secondary">Reiniciar mi progreso</button>
        </div>
      </div>
    </section>`;

  $("#reset").addEventListener("click", () => {
    if (confirm("¿Seguro que deseas borrar todo tu progreso? Esta acción no se puede deshacer.")) {
      Store.reiniciar(); actualizarNav(); vistaPanel();
    }
  });
  actualizarNav();
}

/* ============================================================
   NO ENCONTRADO
   ============================================================ */
function vistaNoEncontrado() {
  app.innerHTML = `<section class="ae-section"><div class="container text-center">
    <h2 class="text-ink">Contenido no encontrado</h2>
    <p class="text-muted">La página que buscas no existe.</p>
    <a href="#/inicio" class="btn btn-ae mt-2">Volver al inicio</a>
  </div></section>`;
  actualizarNav();
}

/* ============================================================
   ENRUTADOR (funciona en GitHub Pages con # en la URL)
   ============================================================ */
function router() {
  const hash = location.hash.replace(/^#/, "") || "/inicio";
  const partes = hash.split("/").filter(Boolean); // ["materia","id"] etc.
  window.scrollTo(0, 0);

  switch (partes[0]) {
    case "inicio":   vistaInicio(); break;
    case "materias": vistaMaterias(); break;
    case "materia":  vistaMateria(partes[1]); break;
    case "leccion":  vistaLeccion(partes[1], partes[2]); break;
    case "panel":    vistaPanel(); break;
    default:         vistaInicio();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => { router(); actualizarNav(); });
