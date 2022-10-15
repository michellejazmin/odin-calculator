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
    result = result.toFixed(5);
    while (result[result.length - 1] === '0') {
      result = result.slice(0, -1);
    }
  }
  
  displayValue.textContent = result;
  input.splice(0);
  operator = '';
  finished = true;
}


const displayValue = document.getElementById('display-value');
const input = [];
let operator = '';
let finished = false;


function populateDisplay(str) {
  if (displayValue.textContent === '0' || (displayValue.textContent !== '0' && input.length === 0 && finished)) {
    displayValue.textContent = str;
  }
  else displayValue.textContent += str;

  finished = false;
}

function deleteFromDisplay() {
  if (displayValue.textContent.length === 1) {
    displayValue.textContent = '0';
  } else if (displayValue.textContent.length > 1 && operator && displayValue.textContent.indexOf(operator) === displayValue.textContent.length - 1) {
    operator = '';
    displayValue.textContent = displayValue.textContent.slice(0, -1);
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

const pointKey = document.querySelector('.point-key');
pointKey.addEventListener('click', (e) => {
  if (finished) {
    populateDisplay('0.');
  } else if (input.length === 0 || (input.length === 1 && !operator)) {
    if (!displayValue.textContent.includes('.')) {
      populateDisplay('.');
    } else return;
  } else if (input.length === 1 && operator) {
      let operatorIndex = displayValue.textContent.indexOf(operator);
      let operand = displayValue.textContent.slice(operatorIndex + 1);
      if (!operand.includes('.')) {
        populateDisplay('.');
      } else return;
  }
});

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
      if ((operator === '÷' || operator === '×') && e.target.id === 'minus-key') {
        if (displayValue.textContent[displayValue.textContent.length - 1] !== '-') {
          populateDisplay('-');
        } else return;
      }
      else if (operator) {
        let operatorIndex = displayValue.textContent.indexOf(operator);
        if (operatorIndex === displayValue.textContent.length - 1) {
          deleteFromDisplay();
          operator = e.target.textContent;
          populateDisplay(operator);
        } else if (operatorIndex < displayValue.textContent.length - 1) {
          input[1] = displayValue.textContent.slice(operatorIndex + 1);
          operate(...input, operator);
          input[0] = displayValue.textContent;
          operator = e.target.textContent;
          populateDisplay(operator);
        }
      } else {
        operator = e.target.textContent;
        populateDisplay(operator);
      }
    }
  });
}

const equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
  if (input.length === 0 || operator === '') return;
  let operatorIndex = displayValue.textContent.indexOf(operator, input[0].length);
  input[1] = displayValue.textContent.slice(operatorIndex + 1);
  operate(...input, operator);
});


populateDisplay('0');

// TODO: Add keyboard support
function keyboardInput(e) {
  // code
}

window.addEventListener('keydown', (e) => keyboardInput());
