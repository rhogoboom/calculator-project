// Find Buttons
const calcWindow = document.querySelector('.window');
const numButtons = document.querySelectorAll('.num-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('.clear-button');
const percentButton = document.querySelector('.percent-button');
const decimalButton = document.querySelector('.decimal-button');
const operateButton = document.querySelector('.operate-button');
const signButton = document.querySelector('.sign-button');

// Calculator Object
const calculator = {
    displayValue: '',
    currentOperator: add,
    storedValue: 0,
    restartDisplay: true,
    canOperate: false,

}

// Arthimatic functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return Math.round((x / y) * 10000) / 10000;
}

// Button Functions
function operate() {
    let operator = calculator.currentOperator;

    let x = calculator.storedValue;
    let y = calculator.displayValue;
    let result = operator(x, y);
    if (calculator.canOperate) {
        calcWindow.textContent = result;
        calculator.storedValue = 0;
        calculator.displayValue = result;
        calculator.restartDisplay = true;
        calculator.operateClicked = true;
    }
    calculator.canOperate = false;
}

function updateDisplay(e) {
    let val = e.target.textContent
    if (calcWindow.textContent == 0 || calculator.restartDisplay) {
        calcWindow.textContent = val === '.' ? `0${val}` : val;
    } else {
        calcWindow.textContent = `${calcWindow.textContent}${val}`;
    }
    calculator.displayValue = +calcWindow.textContent;
    operateClicked = false;
    calculator.restartDisplay = false;
}

function updateOperatorAndFirstNum(e) {
    if(calculator.canOperate) {
        operate();
    }
    let operatorText = e.target.textContent;
    let operatorFunction;
    if (operatorText === '/') {
        operatorFunction = divide;
    } else if (operatorText === '*') {
        operatorFunction = multiply;
    } else if (operatorText === '-') {
        operatorFunction = subtract;
    } else {
        operatorFunction = add;
    }
    calculator.canOperate = true;
    calculator.currentOperator = operatorFunction;
    calculator.storedValue = calculator.displayValue;
    calculator.restartDisplay = true;
    calculator.operateClicked = false;
}

function clearAll() {
    calcWindow.textContent = 0;
    calculator.displayValue = '';
    calculator.currentOperator = add;
    calculator.storedValue = 0;
    calculator.restartDisplay = 0;
    calculator.canOperate = false;
}

function percent() {
    let num = calculator.displayValue / 100;
    calculator.displayValue = num;
    calcWindow.textContent = num;
}

function flipSign() {
    calculator.displayValue *= -1;
    calcWindow.textContent = calculator.displayValue;
}

// Add Listeners
for (let btn of numButtons) {
    btn.addEventListener('click', updateDisplay);
}

for (let btn of operatorButtons) {
    btn.addEventListener('click', updateOperatorAndFirstNum);
}
operateButton.addEventListener('click', operate);
clearButton.addEventListener('click', clearAll);
percentButton.addEventListener('click', percent);
signButton.addEventListener('click', flipSign);