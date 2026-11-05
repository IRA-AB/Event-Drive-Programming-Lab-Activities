const previousOperandEl = document.getElementById('previous-operand');
const currentOperandEl = document.getElementById('current-operand');
const buttons = document.querySelectorAll('.btn');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

function updateDisplay() {
  currentOperandEl.textContent = formatDisplay(currentOperand);
  previousOperandEl.textContent = operation
    ? `${formatDisplay(previousOperand)} ${operatorSymbol(operation)}`
    : '';
}

function operatorSymbol(op) {
  switch (op) {
    case '/': return '÷';
    case '*': return '×';
    case '-': return '−';
    case '+': return '+';
    default: return '';
  }
}

function formatDisplay(value) {
  if (value === '' || value === undefined) return '';
  if (value === 'Error') return 'Error';

  const [intPart, decimalPart] = value.toString().split('.');
  const formattedInt = isNaN(parseFloat(intPart))
    ? intPart
    : parseFloat(intPart).toLocaleString('en-US');

  return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
}

function appendNumber(number) {
  if (currentOperand.length >= 15) return;
  if (shouldResetScreen) {
    currentOperand = '0';
    shouldResetScreen = false;
  }
  if (number === '0' && currentOperand === '0') return;
  currentOperand = currentOperand === '0' ? number : currentOperand + number;
}

function appendDecimal() {
  if (shouldResetScreen) {
    currentOperand = '0';
    shouldResetScreen = false;
  }
  if (currentOperand.includes('.')) return;
  currentOperand += '.';
}

function chooseOperator(op) {
  if (currentOperand === 'Error') return;
  if (previousOperand !== '' && !shouldResetScreen) {
    calculate();
  }
  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        currentOperand = 'Error';
        previousOperand = '';
        operation = undefined;
        shouldResetScreen = true;
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  result = Math.round((result + Number.EPSILON) * 1e10) / 1e10;

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
  shouldResetScreen = true;
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  shouldResetScreen = false;
}

function deleteLast() {
  if (currentOperand === 'Error' || shouldResetScreen) {
    currentOperand = '0';
    shouldResetScreen = false;
    return;
  }
  currentOperand = currentOperand.slice(0, -1);
  if (currentOperand === '' || currentOperand === '-') {
    currentOperand = '0';
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case 'number':
        appendNumber(value);
        break;
      case 'decimal':
        appendDecimal();
        break;
      case 'operator':
        chooseOperator(value);
        break;
      case 'equals':
        calculate();
        break;
      case 'clear':
        clearAll();
        break;
      case 'delete':
        deleteLast();
        break;
    }

    updateDisplay();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  else if (e.key === '.') appendDecimal();
  else if (['+', '-', '*', '/'].includes(e.key)) chooseOperator(e.key);
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
  else return;

  updateDisplay();
});

updateDisplay();
