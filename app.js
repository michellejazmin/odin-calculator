function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "You can't divide by 0!";
  return a / b;
}

/* function operate(a, operator, b) {
  let result;

  switch (operator) {
    case "+":
      result = add(a, b);
      break;
  
    case "-":
      result = subtract(a, b);
      break;

    case "*":
      result = multiply(a, b);
      break;
    
    case "/":
      result = divide(a, b);
      break;
  }

  return result;
} */

const displayValue = document.getElementById('display-value');
const input = [];

function populateDisplay(str) {
  if (displayValue.textContent === '0') displayValue.textContent = str;
  else displayValue.textContent += str;

  input.push(str);
}

function deleteFromDisplay() {
  if (displayValue.textContent.length === 1) {
    displayValue.textContent = '0';
  } else {
  displayValue.textContent = displayValue.textContent.slice(0, -1);
  }
}

function clearDisplay() {
  displayValue.textContent = '0'
  input.splice(0, input.length);
}

const clear = document.getElementById('clear');
clear.addEventListener('click', () => clearDisplay());

const backspace = document.getElementById('backspace');
backspace.addEventListener('click', () => deleteFromDisplay());

const numberKeys = document.getElementsByClassName('number-key');
const operatorKeys = document.getElementsByClassName('operator-key');


for (key of numberKeys) {
  key.addEventListener('click', (e) => populateDisplay(e.srcElement.id));
}

for (key of operatorKeys) {
  key.addEventListener('click', (e) => populateDisplay(e.srcElement.textContent));
}

const equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => operate(...input))

const pointKey = document.querySelector('.point-key');

populateDisplay('0');