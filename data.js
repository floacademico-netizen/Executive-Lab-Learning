/* ============================================================
   CONTENIDO DE LA PLATAFORMA  —  EDITA SOLO ESTE ARCHIVO
   ------------------------------------------------------------
   Aquí defines las MATERIAS y sus LECCIONES. No necesitas tocar
   el diseño ni la lógica: al agregar contenido aquí, la
   plataforma lo muestra sola y ajusta puntos, insignias y progreso.

   ESTRUCTURA:
   materias = [
     {
       id: "identificador-unico",     // sin espacios ni tildes
       nombre: "Nombre visible",
       descripcion: "Frase corta",
       color: "#178A8A",              // color de la tarjeta
       icono: "💼",                   // emoji
       lecciones: [ { ...lección... }, ... ]
     }
   ]

   CADA LECCIÓN:
   {
     id: "unico",
     titulo: "Título de la lección",
     duracion: "15 min",
     video: "CODIGO_YOUTUBE",         // solo el código, ej: dQw4w9WgXcQ (o "" si no hay)
     texto: "<p>HTML permitido...</p>",// explicación (opcional)
     documentos: [ { nombre, tipo, url } ],   // recursos descargables (opcional)
     cuestionario: [ { pregunta, opciones:[...], correcta: 0, explicacion } ] // (opcional)
   }
   ============================================================ */

const MATERIAS = [
  /* ---------------- MATERIA 1 ---------------- */
  {
    id: "gestion-comercial",
    nombre: "Gestión Comercial y Comunicación",
    descripcion: "Comunicación, atención al cliente y centros de llamadas.",
    color: "#178A8A",
    icono: "💬",
    lecciones: [
      {
        id: "gc-centro-llamadas",
        titulo: "El Centro de Llamadas: estructura y funciones",
        duracion: "18 min",
        video: "", // pega aquí el código de un video de YouTube
        texto: `
          <p>Un <strong>centro de llamadas</strong> (call center) es una unidad especializada
          que gestiona un gran volumen de comunicaciones con clientes, ya sea de forma
          <em>entrante</em> (inbound) o <em>saliente</em> (outbound).</p>
          <h4>Tipos de gestión</h4>
          <p>La gestión <strong>entrante</strong> atiende solicitudes que inicia el cliente:
          consultas, reclamos y soporte. La gestión <strong>saliente</strong> parte de la
          empresa: ventas, encuestas y seguimiento.</p>
          <h4>Indicadores clave</h4>
          <p>El desempeño se mide con métricas como el <strong>tiempo medio de operación (TMO)</strong>,
          el <strong>nivel de servicio</strong> y la <strong>satisfacción del cliente (CSAT)</strong>.</p>
        `,
        documentos: [
          { nombre: "Guía: Protocolo de atención telefónica", tipo: "PDF", url: "#" },
          { nombre: "Plantilla de registro de llamadas", tipo: "Word", url: "#" }
        ],
        cuestionario: [
          {
            pregunta: "¿Qué caracteriza a una gestión de llamadas entrante (inbound)?",
            opciones: [
              "La empresa contacta al cliente para ofrecer productos",
              "El cliente inicia el contacto para resolver una necesidad",
              "Se realizan únicamente encuestas de mercado",
              "Solo se usan mensajes automáticos sin agente"
            ],
            correcta: 1,
            explicacion: "En la gestión entrante es el cliente quien inicia la comunicación (consultas, reclamos, soporte)."
          },
          {
            pregunta: "El TMO (Tiempo Medio de Operación) es un indicador que mide principalmente:",
            opciones: [
              "La cantidad de agentes contratados",
              "El costo mensual del software",
              "La duración promedio de gestión de cada llamada",
              "El número de clientes de la empresa"
            ],
            correcta: 2,
            explicacion: "El TMO promedia el tiempo que toma gestionar cada contacto; es central para la eficiencia del centro."
          }
        ]
      },
      {
        id: "gc-manejo-quejas",
        titulo: "Manejo de quejas y reclamos",
        duracion: "14 min",
        video: "",
        texto: `
          <p>Una queja bien gestionada es una oportunidad de <strong>fidelización</strong>.
          El método <strong>LAST</strong> resume una ruta efectiva:</p>
          <h4>Método LAST</h4>
          <p><strong>Listen</strong> (escuchar sin interrumpir), <strong>Apologize</strong>
          (reconocer el malestar), <strong>Solve</strong> (proponer una solución concreta) y
          <strong>Thank</strong> (agradecer que el cliente lo haya comunicado).</p>
        `,
        documentos: [],
        cuestionario: [
          {
            pregunta: "En el método LAST, ¿cuál es el primer paso al recibir una queja?",
            opciones: ["Ofrecer un descuento", "Escuchar al cliente", "Transferir la llamada", "Cerrar el caso"],
            correcta: 1,
            explicacion: "LAST inicia con Listen: escuchar activamente y sin interrumpir para entender el problema real."
          }
        ]
      }
    ]
  },

  /* ---------------- MATERIA 2 ---------------- */
  {
    id: "destrezas-digitales",
    nombre: "Destrezas Digitales",
    descripcion: "Ofimática, internet, ciberseguridad y marketing digital.",
    color: "#0B2545",
    icono: "🖥️",
    lecciones: [
      {
        id: "dd-ciberseguridad",
        titulo: "Fundamentos de ciberseguridad",
        duracion: "20 min",
        video: "",
        texto: `
          <p>La <strong>ciberseguridad</strong> protege información, equipos y personas frente a
          amenazas digitales. En el ámbito comercial es clave para cuidar los datos de los clientes.</p>
          <h4>Amenazas frecuentes</h4>
          <p>El <strong>phishing</strong> suplanta identidades para robar credenciales; el
          <strong>malware</strong> es software malicioso; y la <strong>ingeniería social</strong>
          manipula a las personas para obtener información.</p>
        `,
        documentos: [
          { nombre: "Infografía: 10 hábitos de navegación segura", tipo: "PDF", url: "#" }
        ],
        cuestionario: [
          {
            pregunta: "El 'phishing' consiste principalmente en:",
            opciones: [
              "Mejorar la velocidad de internet",
              "Suplantar una identidad confiable para robar datos",
              "Crear copias de seguridad automáticas",
              "Cifrar los archivos del equipo"
            ],
            correcta: 1,
            explicacion: "El phishing engaña al usuario haciéndose pasar por una entidad confiable para obtener credenciales o datos."
          }
        ]
      }
    ]
  },

  /* ---------------- MATERIA 3 ---------------- */
  {
    id: "emprendimiento",
    nombre: "Emprendimiento e Innovación",
    descripcion: "Modelo de negocio, Canvas y creación de empresa.",
    color: "#F2A900",
    icono: "🚀",
    lecciones: [
      {
        id: "emp-canvas",
        titulo: "El modelo Canvas",
        duracion: "16 min",
        video: "",
        texto: `
          <p>El <strong>Business Model Canvas</strong> describe un negocio en <strong>9 bloques</strong>
          que se ven en una sola página: segmentos de clientes, propuesta de valor, canales,
          relación con clientes, fuentes de ingreso, recursos clave, actividades clave,
          socios clave y estructura de costos.</p>
          <h4>Por qué se usa</h4>
          <p>Permite visualizar, probar y ajustar un modelo de negocio de forma rápida antes de invertir.</p>
        `,
        documentos: [
          { nombre: "Plantilla Canvas para imprimir", tipo: "PDF", url: "#" }
        ],
        cuestionario: [
          {
            pregunta: "¿Cuántos bloques integran el Business Model Canvas?",
            opciones: ["5 bloques", "7 bloques", "9 bloques", "12 bloques"],
            correcta: 2,
            explicacion: "El Canvas tiene 9 bloques que resumen la lógica completa de un modelo de negocio."
          }
        ]
      }
    ]
  }
];

/* ============================================================
   INSIGNIAS  —  se otorgan solas al cumplir la condición.
   tipo: "lecciones" (n lecciones completadas)
         "puntos"    (alcanzar n puntos)
         "quizPerfecto" (1 cuestionario con 100%)
         "materiaCompleta" (terminar todas las lecciones de una materia)
   ============================================================ */
const INSIGNIAS = [
  { id: "primer-paso",   emoji: "🌱", nombre: "Primer paso",     desc: "Completaste tu primera lección", tipo: "lecciones", meta: 1 },
  { id: "constante",     emoji: "🔥", nombre: "Constancia",       desc: "5 lecciones completadas",         tipo: "lecciones", meta: 5 },
  { id: "perfeccion",    emoji: "🎯", nombre: "Puntería",         desc: "Un cuestionario con 100%",        tipo: "quizPerfecto", meta: 1 },
  { id: "cazapuntos",    emoji: "💎", nombre: "Cazapuntos",       desc: "Alcanzaste 200 puntos",           tipo: "puntos", meta: 200 },
  { id: "experto",       emoji: "🏆", nombre: "Experto",          desc: "Completaste una materia entera",  tipo: "materiaCompleta", meta: 1 }
];

/* Puntos que se otorgan por acción (puedes ajustarlos) */
const PUNTOS = {
  leccionCompletada: 20,     // por marcar una lección como vista
  respuestaCorrecta: 10,     // por cada respuesta correcta en un cuestionario
  quizPerfectoBonus: 30      // bono extra si un cuestionario queda al 100%
};

/* Niveles: cada nivel requiere estos puntos acumulados */
const NIVELES = [
  { nivel: 1, nombre: "Aprendiz",   min: 0 },
  { nivel: 2, nombre: "Practicante", min: 100 },
  { nivel: 3, nombre: "Competente",  min: 250 },
  { nivel: 4, nombre: "Avanzado",    min: 450 },
  { nivel: 5, nombre: "Ejecutivo",   min: 700 }
];
