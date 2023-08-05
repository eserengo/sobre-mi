// CACHEO DE VARIABLES
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operacion = document.getElementById('operacion');
const botonCalcular = document.getElementById('calcular');
const botonBorrar = document.getElementById('borrar');
const resultado = document.getElementById('resultado');

// FUNCION PARA CALCULAR
const calcular = () => {
  // CACHEO LOS VALORES DE LOS TAGS INPUT Y SELECT
  const valorNum1 = parseInt(num1.value);
  const valorNum2 = parseInt(num2.value);
  const valorOperacion = operacion.value;

  let res;

  // USO UN SWITCH CASE PARA REALIZAR LA OPERACION MATEMATICA SELECCIONADA
  switch (valorOperacion) {
    case '+':
      res = valorNum1 + valorNum2;
      break;
    case '-':
      res = valorNum1 - valorNum2;
      break;
    case '*':
      res = valorNum1 * valorNum2;
      break;
    default:
      res = valorNum1 / valorNum2;
  };

  resultado.value = res;
};

// AGREGO EVENTO AL BOTON DE CALCULAR
botonCalcular.addEventListener('click', calcular);

// FUNCION PARA BORRAR LOS CAMPOS
const borrar = () => {
  num1.value = '';
  num2.value = '';
  operacion.value = '+'
  resultado.value = '';
};

// AGREGO EVENTO AL BOTON DE BORRAR
botonBorrar.addEventListener('click', borrar);