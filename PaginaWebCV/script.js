let intervaloActivo = null; // Guardamos el intervalo actual
let currentSection = null; // Track the current section
let currentIndex = 0; // Track the current text index

const textos = {
  perfil: "Soy Cristopher Velasco Avila. Estudiante de Ingeniería en Computación con interés en desarrollo de software y sistemas embebidos.",
  proyectos: "Proyectos: ALU, Matriz en ensamblador, Intérprete en PLY, Sensores con MicroPython, Entorno virtual en CG.",
  habilidades: "Lenguajes: C (40%), C++ (50%), Python (50%), Java (20%), Ensamblador (40%). Idiomas: Español nativo, Inglés intermedio.",
  contacto: "📞 +52 5565364703 — 📧 cristopher.velasco.a@gmail.com",
};

const bip = new Audio("assets/bip.wav");
bip.volume = 0.2;

function mostrarSeccion(seccion) {
  const textBox = document.getElementById("text");

  // If clicking the same section and animation is running, pause it
  if (seccion === currentSection && intervaloActivo !== null) {
    clearInterval(intervaloActivo);
    intervaloActivo = null;
    return;
  }

  // If clicking the same section and paused, resume from current index
  if (seccion === currentSection && intervaloActivo === null) {
    intervaloActivo = setInterval(() => {
      if (currentIndex < textos[seccion].length) {
        textBox.innerHTML += textos[seccion][currentIndex];

        if (textos[seccion][currentIndex] !== " ") {
          bip.currentTime = 0;
          bip.play();
        }

        currentIndex++;
      } else {
        clearInterval(intervaloActivo);
        intervaloActivo = null;
      }
    }, 50);
    return;
  }

  // If different section, reset and start new animation
  if (intervaloActivo !== null) {
    clearInterval(intervaloActivo);
    intervaloActivo = null;
  }

  textBox.innerHTML = ""; // Clear text
  currentSection = seccion;
  currentIndex = 0;

  const texto = textos[seccion];

  intervaloActivo = setInterval(() => {
    if (currentIndex < texto.length) {
      textBox.innerHTML += texto[currentIndex];

      if (texto[currentIndex] !== " ") {
        bip.currentTime = 0;
        bip.play();
      }

      currentIndex++;
    } else {
      clearInterval(intervaloActivo);
      intervaloActivo = null;
    }
  }, 50);
}

function descargarPDF() {
  const link = document.createElement('a');
  link.href = 'assets/CV_CVA.pdf';
  link.download = 'Cristopher_Velasco_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}