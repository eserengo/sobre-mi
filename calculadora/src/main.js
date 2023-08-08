// se crean variables para tomar los elementos input, select, botones y resultado de la pagina 
const primerOperando = document.getElementById('primerOperando');
const segundoOperando = document.getElementById('segundoOperando');
const operador = document.getElementById('operador');
const botonCalcular = document.getElementById('calcular');
const botonBorrar = document.getElementById('borrar');
const resultado = document.getElementById('resultado');

// primero vamos a declarar una funcion que devuelve la solucion dependiendo del operador seleccionado
function solucion(primerValor, operador, segundoValor) {
  // creamos una variable para guardar el resultado
  let res;

  // realizamos la operacion mediante switch
  switch (operador) {
    case '+':
      res = primerValor + segundoValor;
      break;
    case '-':
      res = primerValor - segundoValor;
      break;
    case '*':
      res = primerValor * segundoValor;
      break;
    default:
      res = primerValor / segundoValor;
  };

  // devolvemos la variable
  return res;
}

// ahora vamos a declarar una funcion para validar los datos de los dos inputs ingresados por el usuario
function validacion(input, valor) {

  // revisamos si el valor ingresado por el usuario no esta vacio, de lo contrario emitimos un mensaje de error
  if (!valor) {
    input.parentElement.insertAdjacentHTML(
      "beforeend", `<p class="error">Error! No ha ingresado un valor. </p>`
    );
    return false;

    // revisamos si el valor ingresado por el usuario es un numero, de lo contrario emitimos otro mensaje de error
  } else if (isNaN(valor)) {
    input.parentElement.insertAdjacentHTML(
      "beforeend", `<p class="error">Error! Debe ingresar un numero.</p>`
    );
    return false;

    // si pasa las dos verificaciones retornamos el input del usuario parseado
    // usamos parseFloat para que el valor ingresado pueda ser un numero decimal
  } else {
    return parseFloat(valor);
  };
};

// creamos la logica que se ejecuta al hacer click en el boton calcular
function calcular() {

  // borramos cualquier mensaje de error que  pudiera existir de iteraciones anteriores
  document.querySelectorAll('.error').forEach(msg => msg.remove());

  // realizamos la validacion de los inputs llamando a la funcion validacion e ingresando los parametros correspondientes
  const primerOperandoValidado = validacion(primerOperando, primerOperando.value);
  const segundoOperandoValidado = validacion(segundoOperando, segundoOperando.value);

  // si los datos ingresados no superan la validacion mostramos el error en el resultado
  if (primerOperandoValidado === false || segundoOperandoValidado === false) {
    resultado.value = 'E';

  // si estan validados
  } else {

    // revisamos que la operacion solicitada no sea division por 0
    // en este caso emitimos un mensaje de error
    if (operador.value == '/' && segundoOperandoValidado === 0) {
      resultado.parentElement.insertAdjacentHTML(
        "beforeend", `<p class="error">Error! Intenta realizar una division por 0.</p>`
      );
      resultado.value = 'E';

      // si han sido superados estos pasos de validacion podemos finalmente proceder a realizar el calculo
      // llamamos a la funcion solucion con los parametros seleccionados
    } else {
      const mostrarSolucion = solucion(primerOperandoValidado, operador.value, segundoOperandoValidado);

      // si el resultado obtenido es demasiado grande o demasiado chico para ser mostrado
      // emitimos un mensaje de error, en el caso concreto la interfaz de usuario no puede mostrar
      // numeros positivos de mas de 12 cifras o negativos de mas de 11 cifras
      // trabajamos con hasta dos decimales para no saturar el resultado
      if (mostrarSolucion.toFixed(2).toString().length > 12) {
        resultado.parentElement.insertAdjacentHTML(
          "beforeend", `<p class="error">Error! El resultado esta fuera de rango.</p>`
        );
        resultado.value = 'E';

      // si esta en rango, imprimimos el resultado
      // si es un entero: como esta,
      // si esta entre 1 y -1: con todos los decimales
      // si tiene decimales: solo con hasta dos decimales

      } else {
        (mostrarSolucion % 1 === 0) || (mostrarSolucion < 1 && mostrarSolucion > -1)
          ? resultado.value = mostrarSolucion
          : resultado.value = mostrarSolucion.toFixed(2);
      }
    }
  }
}

// creamos una funcion para borrar todos los datos - reseteado
function borrar() {
  primerOperando.value = '';
  segundoOperando.value = '';
  operador.value = '+'
  resultado.value = '';
  document.querySelectorAll('.error').forEach(msg => msg.remove());
};

// agregamos un evento al boton de calcular con la funcion correspondiente
botonCalcular.addEventListener('click', calcular);

// agregamos un evento al boton de borrar con la funcion correspondiente
botonBorrar.addEventListener('click', borrar);

// fin del script