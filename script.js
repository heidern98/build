const mensajes = [
  {
    titulo: "Hola mi amores",
    texto: "Esta carta es para ustedes, hecha con mucho amor y cariño.",
    icono: "❤️",
    tipo: "corazon"
  },
  {
    titulo: "Extraño nuestras aventuras",
    texto: "Siempre estoy contento al estar con ustedes, nos divertimos mucho.",
    icono: "assets/capibara.png",
    tipo: "imagen"
  },
  {
    titulo: "Los amo",
    texto: "Siempre estaré con ustedes, en cada paso, en cada sueño, los amo.",
    icono: "assets/gerberas.png",
    tipo: "imagen"
  }
];

let index = 0;

const titulo = document.getElementById('titulo');
const mensaje = document.getElementById('mensaje');
const icono = document.getElementById('icono-decorativo');
const btn = document.getElementById('btnSiguiente');

const popSound = document.getElementById('popSound');
const botonSound = document.getElementById('botonSound');
const bubbleSound = document.getElementById('bubbleSound');

function mostrarMensaje(i) {
  titulo.textContent = mensajes[i].titulo;
  mensaje.textContent = mensajes[i].texto;

  if (mensajes[i].tipo === "corazon") {
    icono.innerHTML = `<span class="heart-beat">❤️</span>`;
  } else {
    icono.innerHTML = `<img src="${mensajes[i].icono}" class="img-decorativa">`;
  }

  btn.textContent = (i === mensajes.length - 1) ? 'Volver a leer' : 'Siguiente';
}

mostrarMensaje(index);

btn.addEventListener('click', () => {
  if (botonSound) {
    botonSound.currentTime = 0;
    botonSound.volume = 1;
    botonSound.play().catch(() => {});
  }

  index = (index + 1) % mensajes.length;
  mostrarMensaje(index);
});

// Corazones flotantes
const totalHearts = 30;
for (let i = 0; i < totalHearts; i++) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  const size = Math.floor(Math.random() * 3);
  let dimension = size === 0 ? 15 : size === 1 ? 25 : 40;
  heart.style.setProperty('--heart-size', `${dimension}px`);
  const colors = ['#ff4d6d', '#ff5c8a', '#ff6bcb', '#ff1493', '#ff1a75'];
  heart.style.background = colors[Math.floor(Math.random() * colors.length)];
  heart.style.setProperty('--heart-color', heart.style.background);
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = Math.random() * 100 + 'vh';
  heart.style.animationDuration = (5 + Math.random() * 5) + 's';
  heart.style.opacity = 0.6 + Math.random() * 0.4;
  document.body.appendChild(heart);
}

// Corazones con clic o movimiento
function crearCorazon(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  const dimension = 20 + Math.random() * 30;
  heart.style.setProperty('--heart-size', `${dimension}px`);
  const colors = ['#ff4d6d', '#ff5c8a', '#ff6bcb', '#ff1493', '#ff1a75'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.background = color;
  heart.style.setProperty('--heart-color', color);
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.position = 'fixed';
  heart.style.animationDuration = (5 + Math.random() * 5) + 's';
  heart.style.opacity = 0.8;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

document.addEventListener('click', (e) => crearCorazon(e.clientX, e.clientY));
document.addEventListener('mousemove', (e) => {
  if (Math.random() < 0.03) crearCorazon(e.clientX, e.clientY);
});

// Globos flotantes con sonido y animación
function crearGlobo() {
  const globo = document.createElement('div');
  globo.className = 'globo';

  const colores = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4'];
  globo.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
  globo.style.left = Math.random() * 90 + 'vw';
  globo.style.animationDuration = (8 + Math.random() * 4) + 's';

  globo.addEventListener('mouseenter', () => {
    if (popSound) {
      popSound.currentTime = 0;
      popSound.volume = 1;
      popSound.play().catch(() => {});
    }
    globo.classList.add('explotar');
    setTimeout(() => globo.remove(), 400);
  });

  document.body.appendChild(globo);
  setTimeout(() => globo.remove(), 15000);
}

setInterval(crearGlobo, 2000);

// Estrellas al pasar sobre la imagen con sonido de burbujas
const imagen = document.getElementById('imagenPrincipal');

imagen.addEventListener('mouseenter', () => {
  if (bubbleSound) {
    bubbleSound.currentTime = 0;
    bubbleSound.volume = 1;
    bubbleSound.play().catch(() => {});
  }

  for (let i = 0; i < 10; i++) {
    const estrella = document.createElement('div');
    estrella.className = 'estrellita';
    const colores = ['#ff0', '#f0f', '#0ff', '#fc0', '#0f0'];
    estrella.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

    const rect = imagen.getBoundingClientRect();
    estrella.style.left = (rect.left + rect.width / 2 + (Math.random() * 80 - 40)) + 'px';
    estrella.style.top = (rect.top + rect.height / 2 + (Math.random() * 80 - 40)) + 'px';

    document.body.appendChild(estrella);
    setTimeout(() => estrella.remove(), 1000);
  }
});