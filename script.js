let currentInput = '';
let operator = null;
let previousInput = '';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Add event listeners for button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Handle numbers and decimal point
    if (!isNaN(value) || value === '.') {
      if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
      currentInput += value;
      updateDisplay(currentInput);
    }
    // Handle operators
    else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput === '' && previousInput !== '') {
        operator = value; // Change operator if clicked consecutively
      } else {
        operator = value;
        previousInput = currentInput;
        currentInput = '';
      }
    }
    // Handle equals
    else if (value === '=') {
      if (operator && currentInput !== '' && previousInput !== '') {
        currentInput = calculate(
          parseFloat(previousInput),
          parseFloat(currentInput),
          operator
        ).toString();
        updateDisplay(currentInput);
        operator = null;
        previousInput = '';
      }
    }
    // Handle clear
    else if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay('0');
    }
  });
});

// Perform calculation
function calculate(a, b, op) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error'; // Handle division by zero
  }
}

// Update the display
function updateDisplay(value) {
  display.textContent = value;
}
