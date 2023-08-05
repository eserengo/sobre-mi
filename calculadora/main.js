document.getElementById('calcular').addEventListener('click', () => {
  const num1 = parseInt(document.getElementById('num1').value);
  const num2 = parseInt(document.getElementById('num2').value);
  const operacion = document.getElementById('operacion').value;

  let res;

  switch (operacion) {
    case '+':
      res = num1 + num2;
      break;
    case '-':
      res = num1 - num2;
      break;
    case '*':
      res = num1 * num2;
      break;
    default:
      res = num1 / num2;
  };

  document.getElementById('resultado').value = res;
});