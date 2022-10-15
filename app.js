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
  if (b === 0) {
    alert("You cannot divide by 0!");
    return 0;
  }
  return (a / b);
}

function operate(num1, num2, sign) {
  let result = 0;
  let a = Number(num1);
  let b = Number(num2);

  switch (sign) {
    case "+":
      result = add(a, b);
      break;
  
    case "-":
      result = subtract(a, b);
      break;

    case "×":
      result = multiply(a, b);
      break;
    
    case "÷":
      result = divide(a, b);
      break;

    default:
      alert("That's not a valid operation");
  }
    
  if (!Number.isInteger(result)) {
    result = result.toFixed(3);
  }
  
  displayValue.textContent = result;
  input.splice(0);
  operator = '';
}


const displayValue = document.getElementById('display-value');
const input = [];
let operator = '';


function populateDisplay(str) {
  if (displayValue.textContent === '0') displayValue.textContent = str;
  else displayValue.textContent += str;
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
  operator = '';
}


const clear = document.getElementById('clear');
clear.addEventListener('click', () => clearDisplay());

const backspace = document.getElementById('backspace');
backspace.addEventListener('click', () => deleteFromDisplay());

const numberKeys = document.getElementsByClassName('number-key');
for (key of numberKeys) {
  key.addEventListener('click', (e) => populateDisplay(e.target.id));
}

// TODO: point button functionality
const pointKey = document.querySelector('.point-key');
pointKey.addEventListener('click', (e) => populateDisplay(e.target.textContent));

const operatorKeys = document.getElementsByClassName('operator-key');
for (key of operatorKeys) {
  key.addEventListener('click', (e) => {
    if (input.length === 0 && displayValue.textContent === '0') {
      if (e.target.id === 'minus-key') {
        populateDisplay(e.target.textContent);
      } else return;
    } else if (input.length === 0 && displayValue.textContent !== '0') {
      input[0] = displayValue.textContent;
      operator = e.target.textContent;
      populateDisplay(e.target.textContent);
    } else if (input.length === 1) {
        if (operator) {
          deleteFromDisplay();
          operator = e.target.textContent;
          populateDisplay(e.target.textContent);
        } else {
          operator = e.target.textContent;
        }
    } else operate(...input, operator);    
  });
}

const equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
  if (input.length === 0 || operator === '') return;
  let operatorIndex = displayValue.textContent.indexOf(operator);
  input[1] = displayValue.textContent.slice(operatorIndex + 1);
  operate(...input, operator);
});


populateDisplay('0');