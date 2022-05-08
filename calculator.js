function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate(operator, input1, input2) {
    const num1 = Number(input1);
    const num2 = Number(input2);

    if (operator === "add") {
        return add(num1, num2);
    } else if (operator === "subtract") {
        return subtract(num1, num2);
    } else if (operator === "multiply") {
        return multiply(num1, num2);
    } else if (operator === "divide") {
        return divide(num1, num2);
    } else {
        alert("error");
        console.log({operator});
    }
}

function getOperationSymbol(operation) {
    if (operation === 'add') return '+';
    if (operation === 'subtract') return '-';
    if (operation === 'divide') return '÷';
    if (operation === 'multiply') return 'x';
    return '?';
}

function numberListener(event) {
    display += this.textContent;
    document.querySelector('#display').textContent = display;
}

function operatorListener(operation) {
    if (!isInProgress) {
        isInProgress = true;
        const historyElement = document.querySelector('#history');
        const currentElement = document.querySelector('#display');

        historyElement.textContent = currentElement.textContent + ' ' + this.textContent;
        history = currentElement.textContent;
        currentElement.textContent = '';
        display = '';
        operation = this.id;
        console.log(operation);
    } else  {
        alert("Just two numbers at a time, please");
    }
}

function equalsListener(event) {
    if (isInProgress) {
        const historyElement = document.querySelector('#history');
        const currentElement = document.querySelector('#display');


        let equation = `${history} ${getOperationSymbol(operation)} ${display}`;
        historyElement.textContent = equation;
        currentElement.textContent = operate(operation, history, display);

        history = '';
        display = '';
        isInProgress = false;
    }
}

function keyPressListener(event) {
    const key = event.key;
    if (RegExp('^[0-9]+$').test(key)) {
        numberListener(null);
    } else console.log(key);
}

function clearListener(event) {
    const displayElement = document.querySelector('#display');
    const historyElement = document.querySelector('#history');

    if (!displayElement.textContent) {
        historyElement.textContent = '';
        history = '';
        isInProgress = false;
    } else {
        displayElement.textContent = '';
        display = '';
    }
}

function setupListeners() {
    const numberButtons = document.querySelectorAll('.num');
    numberButtons.forEach(button => button.addEventListener('click', numberListener));
    
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => button.addEventListener('click', operatorListener));
    
    document.querySelector('.clear').addEventListener('click', clearListener);
    document.querySelector('#equals').addEventListener('click', equalsListener);
    
    document.addEventListener('keypress', keyPressListener);
}

let display = '';
let history = '';
let isInProgress = false;
let operation = '';
setupListeners();