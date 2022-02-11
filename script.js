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
    hasDecimal: false,

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
    let result = Math.round(operator(x, y) * 10000) / 10000;
    if (calculator.canOperate) {
        calcWindow.textContent = result;
        calculator.storedValue = 0;
        calculator.displayValue = result;
        calculator.restartDisplay = true;
        calculator.operateClicked = true;
    }
    calculator.canOperate = false;
    calculator.hasDecimal = false;
}

function addDecimal() {
    let val = '.'
    if (!calculator.hasDecimal) {
        if (calcWindow.textContent == 0 || calculator.restartDisplay) {
            calcWindow.textContent = val === '.' ? `0${val}` : val;
        } else {
            calcWindow.textContent = `${calcWindow.textContent}${val}`;
        }
        calculator.displayValue = +calcWindow.textContent;
        operateClicked = false;
        calculator.restartDisplay = false;
        calculator.hasDecimal = true;
    }
}


function updateDisplay(e) {
    let val;
    if (e.type === 'keydown') {
        val = e.key;
    } else {
        val = e.target.textContent
    }

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
    if (calculator.canOperate) {
        operate();
    }
    let operatorText = e.type === 'keydown' ? e.key : e.target.textContent;
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
    calculator.hasDecimal = false;
}

function clearAll() {
    calcWindow.textContent = 0;
    calculator.displayValue = '';
    calculator.currentOperator = add;
    calculator.storedValue = 0;
    calculator.restartDisplay = 0;
    calculator.canOperate = false;
    calculator.hasDecimal = false;
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

// Add Click Listeners
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
decimalButton.addEventListener('click', addDecimal);

// KeyBoard Support


window.addEventListener('keydown', function (e) {
    const numKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const operatorKeys = ['/', '*', '+', '-']

    if (numKeys.includes(e.key)) {
        updateDisplay(e);
    } else if (operatorKeys.includes(e.key)) {
        updateOperatorAndFirstNum(e);
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === '=' || e.key === 'Enter') {
        operate();
    } else if (e.key === '.') {
        addDecimal();
    } else if (e.key === '%') {
        percent();
    } else if (e.key === '`') {
        flipSign();
    }

})