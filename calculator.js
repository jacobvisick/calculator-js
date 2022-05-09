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
    if (b === 0) {
        return "Dividing by zero is illegal. Don't."
    }

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
    numberPressed(this.textContent);
}

function operatorListener(event) {
    operatorPressed(this.id);
}

function equalsListener(event) {
    if (isInProgress) {
        const historyElement = document.querySelector('#history');
        const currentElement = document.querySelector('#display');


        let equation = `${history} ${getOperationSymbol(operation)} ${display}`;
        let result = operate(operation, history, display);
        if (!isNaN(result) && result.length > 20) result = (Number(result)).toFixed(20);
        if (isNaN(result)) history.textContent = '';
        
        historyElement.textContent = equation;
        currentElement.textContent = result;
        if (isNaN(result)) historyElement.textContent = '';

        history = '';
        display = '';
        isInProgress = false;
    }
}

function keyPressListener(event) {
    const key = event.key;
    if (RegExp('^[0-9]+$').test(key)) numberPressed(key);
    else if (key === '.') numberPressed(key);
    else if (key === '+') operatorPressed('add');
    else if (key === '-') operatorPressed('subtract');
    else if (key === '/') operatorPressed('divide');
    else if (key === '*') operatorPressed('multiply');
    else if (key === 'Enter') equalsListener(undefined);
    else if (key === 'Backspace') clearListener(undefined);
}

function clearListener(event) {
    const displayElement = document.querySelector('#display');
    const historyElement = document.querySelector('#history');

    if (!isInProgress) {
        historyElement.textContent = '';
        displayElement.textContent = '';
        display = '';
        history = '';
        return;
    }

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
    
    document.addEventListener('keydown', keyPressListener);
}

function numberPressed(number) {
    if (display.length > 20) {
        alert("Woah, that number is too big for me");
        return;
    }

    display += number;
    document.querySelector('#display').textContent = display;
}

function operatorPressed(operator) {
    const historyElement = document.querySelector('#history');
    const currentElement = document.querySelector('#display');

    if (!currentElement.textContent && operator === 'subtract') {
        display = '-';
        currentElement.textContent = display;
    } else if (!isInProgress) {
        isInProgress = true;

        historyElement.textContent = currentElement.textContent + ' ' + getOperationSymbol(operator);
        history = currentElement.textContent;
        currentElement.textContent = '';
        display = '';
        operation = operator;
    } else {
        equalsListener(null);
        isInProgress = false;
        operatorPressed(operator)
    }
}

let display = '';
let history = '';
let isInProgress = false;
let operation = '';
setupListeners();