// --COMIENZO DEL SCRIPT

// Para empezar establecemos las variables, los elementos para manipular el DOM y variables para guardar otros 
// datos como el nombre del usuario, los scores, el numero de ronda, etc.

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

// La funcion para establecer el nombre del jugador, con un bloque try catch que lanza excepciones si el
// usuario no ingresa un nombre o si el nombre ingresado es muy largo.
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

// La funcion que toma la jugada del jugador, genera un string usando el evento.
function turnoJugador(event) {
  return event.target.alt;
}

// La funcion que genera la jugada de la computadora, de forma aleatoria, tambien retorna un string.
function turnoComputadora() {
  const jugadasPosibles = DATA.map(item => item.titulo);
  const generarRandom = Math.floor(Math.random() * jugadasPosibles.length);
  return jugadasPosibles[generarRandom];
}

// Esta funcion inserta en el DOM un elemento <img> con la imagen relacionada al string entrada, que es la jugada 
// establecida en las dos funciones anteriores, sirve tanto para la mano del usuario como para la mano de la computadora.
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

// Esta funcion calcula el ganador de cada ronda, generando un mensaje de resultado mas un mensaje random 
// y actualiza las variables de ronda y score o no en caso de empate, segun lo requerido en la parte 4.
function determinarGanador(computadora, jugador) {
  const reRandom = () => {
    const mensajesPosibles = ['Esto se pone interesante...', 'Que suerte!', 'Ya se define...', 'Vamos todavia!'];
    return mensajesPosibles[Math.floor(Math.random() * mensajesPosibles.length)];
  }

  if (computadora === jugador) {
    mensajeEl.textContent = `Ronda ${numeroDeRonda}: empate. Todo sigue igual.`;
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

// Esta funcion se ejecuta cuando uno de los jugadores llega al numero de victorias necesarias. Activa el modal 
// de fin de juego.
function gameOver(msgGanador, msgBoton) {
  gameOverModalEl.showModal();
  ganadorEl.textContent = msgGanador;
  revanchaBtn.textContent = msgBoton;
  return;
}

// Esta funcion reinicia el juego con el mismo nombre de usuario, segun lo requerido por la parte 6.
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

// Esta es la funcion principal del script, se encarga de llamar a las otras funciones establecidas anteriormente
// y gestionar los eventos correspondientes.
function elJuego() {

  // Se generan dinamicamente tres imagenes usando el array DATA para que le usuario seleccione su opcion
  // segun lo requerido por la parte 3.1
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
    }, 15000);

  // Aca la aplicacion aguarda a que el usuario seleccione su mano, se puede decir que queda inactiva esperando
  // la seleccion y una vez que esto sucede, llama las funciones para mostrar las manos y determinar el ganador de 
  // la ronda o el ganador del juego.
  document.querySelectorAll('.mano').forEach(item => {
    item.addEventListener('click', (event) => {
      
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        mensajeEl.textContent = 'Elige tu mano haciendo click en uno de los iconos de manos.';
      }, 15000);

      jugadaDeJugador = turnoJugador(event);
      jugadaDeComputadora = turnoComputadora();
    
      mostrarMano(jugadaDeJugador, manoJugadorEl);
      mostrarMano(jugadaDeComputadora, manoComputadoraEl);

      determinarGanador(jugadaDeComputadora, jugadaDeJugador);

      // El juego termina cuando el usuario o la computadora alcanzan 3 victorias, segun la parte 5.
      scoreJugador == 3 && gameOver(`Felicitaciones, ${nombreJugador} ganó!`, 'Ofrecer revancha');
      scoreComputadora == 3 && gameOver('Que pena, La Compu es la ganadora.', 'Quiero revancha!');
    });
  })

  // El modal de bienvenida se activa una vez que el DOM se ha cargado.
  window.addEventListener('DOMContentLoaded', () => {
    introModalEl.showModal();
  })
  
  jugarBtn.addEventListener('click', nombrarAlJugador);

  // Los modales no se pueden cerrar presionando la tecla ESC
  introModalEl.addEventListener('cancel', (event) => {
    event.preventDefault();
  });
  gameOverModalEl.addEventListener('cancel', (event) => {
    event.preventDefault();
  });

  revanchaBtn.addEventListener('click', revancha);

  // El boton nuevo jugador del final del juego simplemente relanza la aplicacion.
  nuevoJugadorBtn.addEventListener('click', () => window.location.reload());
};

elJuego();

// --> FIN DEL SCRIPT