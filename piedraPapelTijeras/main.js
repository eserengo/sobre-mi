// --COMIENZO DEL SCRIPT

// 

const introModalEl = document.getElementById('introModalEl');
const jugarBtn = document.getElementById('jugarBtn');
const gameOverModalEl = document.getElementById('gameOverModalEl');
const ganadorEl = document.getElementById('ganadorEl');
const revanchaBtn = document.getElementById('revanchaBtn');
const nuevoJugadorBtn = document.getElementById('nuevoJugadorBtn');

const nombreJugadorEl = document.getElementById('nombreJugadorEl');
const manoJugadorEl = document.getElementById('manoJugadorEl');
const scoreJugadorEl = document.getElementById('scoreJugadorEl');

const manoComputadoraEl = document.getElementById('manoComputadoraEl');
const scoreComputadoraEl = document.getElementById('scoreComputadoraEl');

const mensajeEl = document.getElementById('mensajeEl');

let nombreJugador;

let jugadaDeJugador;
let jugadaDeComputadora;

let scoreJugador = 0;
let scoreComputadora = 0;

let numeroDeRonda = 1;

let timer;

const DATA = [
  {
    titulo: 'piedra',
    src: './src/imagenes/piedra.png',
  },
  {
    titulo: 'papel',
    src: './src/imagenes/papel.png',
  },
  {
    titulo: 'tijeras',
    src: './src/imagenes/tijeras.png'
  }
];

// -------- FUNCIONES --------

function nombrarAlJugador(event) {
  const inputEl = document.getElementById('inputEl');

  try {
    if (!inputEl.value) {
      throw new Error('Oye... para jugar necesitas ingresar un nombre!');
    } else if (inputEl.value.length >= 10) {
      throw new Error('Tranqui! El nombre es demasiado largo, intenta algo mas simple.');
    } else {
      document.querySelector('.error') && document.querySelector('.error').remove();
      nombreJugador = inputEl.value;
      nombreJugadorEl.textContent = nombreJugador;
    }

  } catch (err) {
    document.querySelector('.error') && document.querySelector('.error').remove();
    inputEl.insertAdjacentHTML(
      'afterend',
      `<span class='error'>${err.message}</span>`
    );

  } finally {
    introModalEl.querySelector('.error')
      ? event.preventDefault()
      : introModalEl.close();
  }
}

function turnoJugador(event) {
  return event.target.alt;
}

function turnoComputadora() {
  const jugadasPosibles = DATA.map(item => item.titulo);
  const generarRandom = Math.floor(Math.random() * jugadasPosibles.length);
  return jugadasPosibles[generarRandom];
}

function mostrarMano(entrada, elemento) {
  elemento.querySelector('img') && elemento.querySelector('img').remove();
  return DATA.map(item => {
    item.titulo == entrada &&
      elemento.insertAdjacentHTML(
        'beforeend',
        `<img src=${item.src} alt=${item.titulo}>`
      )
  });
}

function determinarGanador(computadora, jugador) {
  const reRandom = () => {
    const mensajesPosibles = ['Esto se pone interesante...', 'Que suerte!', 'Ya se define...', 'Vamos todavia!'];
    return mensajesPosibles[Math.floor(Math.random() * mensajesPosibles.length)];
  }

  if (computadora === jugador) {
    mensajeEl.textContent = `Ronda ${numeroDeRonda}: empate. ` + reRandom();
    return;

  } else if (
    computadora === 'piedra' && jugador === 'tijeras' ||
    computadora === 'papel' && jugador === 'piedra' ||
    computadora === 'tijeras' && jugador === 'papel'
  ) {
    mensajeEl.textContent = `Ronda ${numeroDeRonda}: gana la computadora. ` + reRandom();
    scoreComputadora++;
    numeroDeRonda++;
    scoreComputadoraEl.textContent = scoreComputadora;
    return;

  } else {
    mensajeEl.textContent = `Ronda ${numeroDeRonda}: gana ${nombreJugador}. ` + reRandom();
    scoreJugador++;
    numeroDeRonda++;
    scoreJugadorEl.textContent = scoreJugador;
    return;
  }
}

function gameOver(msgGanador, msgBoton) {
  gameOverModalEl.showModal();
  ganadorEl.textContent = msgGanador;
  revanchaBtn.textContent = msgBoton;
  return;
}

function revancha() {
  scoreJugador = 0;
  scoreComputadora = 0;
  numeroDeRonda = 1;

  scoreJugadorEl.textContent = scoreJugador;
  scoreComputadoraEl.textContent = scoreComputadora;

  manoJugadorEl.querySelector('img').remove();
  manoComputadoraEl.querySelector('img').remove();

  gameOverModalEl.close();
  elJuego();
  return;
}

function elJuego() {
  document.querySelectorAll('.mano').forEach(item => item.remove());
  DATA.map(item => {
    document.getElementById('manosEl').insertAdjacentHTML(
      'beforeend',
      `<img src=${item.src} alt=${item.titulo} class='mano'>`
    )
  })

  mensajeEl.textContent = 'Comienza el juego! Es al mejor de 5 rondas.';
  scoreJugadorEl.textContent = scoreJugador;
  scoreComputadoraEl.textContent = scoreComputadora;
  timer = window.setTimeout(() => {
    mensajeEl.textContent = 'Elige tu mano haciendo click en uno de los iconos de manos.';
    }, 20000);

  document.querySelectorAll('.mano').forEach(item => {
    item.addEventListener('click', (event) => {
      
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        mensajeEl.textContent = 'Elige tu mano haciendo click en uno de los iconos de manos.';
      }, 10000);

      jugadaDeJugador = turnoJugador(event);
      jugadaDeComputadora = turnoComputadora();
    
      mostrarMano(jugadaDeJugador, manoJugadorEl);
      mostrarMano(jugadaDeComputadora, manoComputadoraEl);

      determinarGanador(jugadaDeComputadora, jugadaDeJugador);

      scoreJugador == 3 && gameOver(`Felicitaciones, ${nombreJugador} ganó!`, 'Dar revancha');
      scoreComputadora == 3 && gameOver('Que pena, La Compu es la ganadora.', 'Quiero revancha!');
    });
  })

  window.addEventListener('DOMContentLoaded', () => {
    introModalEl.showModal();
  })
  jugarBtn.addEventListener('click', nombrarAlJugador);
  introModalEl.addEventListener('cancel', (event) => {
    event.preventDefault();
  });

  revanchaBtn.addEventListener('click', revancha);
  nuevoJugadorBtn.addEventListener('click', () => window.location.reload());
  gameOverModalEl.addEventListener('cancel', (event) => {
    event.preventDefault();
  });
};

elJuego();

// --> FIN DEL SCRIPT