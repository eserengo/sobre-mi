const introModal = document.getElementById('intro-modal');
const botonJugar = document.getElementById('jugar');

const nombreJugador = document.getElementById('nombreJugador');
const eleccionJugador = document.getElementById('eleccionJugador');
const scoreJugador = document.getElementById('scoreJugador');

const eleccionComputadora = document.getElementById('eleccionComputadora');
const scoreComputadora = document.getElementById('scoreComputadora');

const mensaje = document.getElementById('mensaje');

const DATA = [
  {
    id: 1,
    titulo: 'piedra',
    src: './src/imagenes/piedra.png',
  },
  {
    id: 2,
    titulo: 'papel',
    src: './src/imagenes/papel.png',
  },
  {
    id: 3,
    titulo: 'tijeras',
    src: './src/imagenes/tijeras.png'
  }
];

// ------ EL JUEGO -------

let jugadaDeJugador;
let jugadaDeComputadora;

DATA.map(item => {
  document.getElementById('manos').insertAdjacentHTML(
    'beforeend',
    `<img src=${item.src} alt=${item.titulo} class='opcion'>`
  )
})

function turnoJugador(event) {
  return event.target.alt;
}

function turnoComputadora() {
  const jugadasPosibles = DATA.map(item => item.titulo);
  const generarRandom = Math.floor(Math.random() * 3);
  return jugadasPosibles[generarRandom];
}

function mostrarEleccion(entrada, elemento) {
  elemento.querySelector('img') && elemento.querySelector('img').remove();
  DATA.map(item => {
    item.titulo == entrada &&
      elemento.insertAdjacentHTML(
        'beforeend',
        `<img src=${item.src} alt=${item.titulo}>`
      )
  });
}

document.querySelectorAll('.opcion').forEach(item => {
  item.addEventListener('click', (event) => {
    jugadaDeComputadora = turnoComputadora();
    jugadaDeJugador = turnoJugador(event);
    
    mostrarEleccion(jugadaDeComputadora, eleccionComputadora);
    mostrarEleccion(jugadaDeJugador, eleccionJugador);
    },
  );
})


function nombrarJugador(event) {
  const input = document.getElementById('input');

  try {
    if (!input.value) {
      throw new Error('Oye... para jugar necesitas ingresar un nombre!');
    } else if (input.value.length >= 10) {
      throw new Error('Tranqui! El nombre es demasiado largo, intenta algo mas simple.');
    } else {
      document.querySelector('.error') && document.querySelector('.error').remove();
      nombreJugador.textContent = input.value;
    }

  } catch(err) {
    document.querySelector('.error') && document.querySelector('.error').remove();
    input.insertAdjacentHTML('afterend', `<span class='error'>${err.message}</span>`);

  } finally {
    introModal.querySelector('.error')
      ? event.preventDefault()
      : introModal.close();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  introModal.showModal();
})
botonJugar.addEventListener('click', nombrarJugador);
introModal.addEventListener('cancel', (event) => {
  event.preventDefault();
});

// --> FIN DEL SCRIPT