//My solution

const previousOperandTextElement = document.querySelector('[data-previous]');
const currentOperandTextElement = document.querySelector('[data-current]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalButton = document.querySelector('[data-equal]');

function compute(a, operator, b){
    switch(operator){
        case '+':
            return (a + b);
            break;
        case '-':
            return (a - b);
            break;
        case '*':
            return (a * b);
            break;
        case '/':
            return (a / b);
            break;
        default:
            return;
    }
}

let currentOperand, previousOperand, operator = undefined;

clearButton.addEventListener('click', () => {
    previousOperandTextElement.innerText = '';
    currentOperandTextElement.innerText = '';
    previousOperand = null;
    currentOperand = null;
    operator = null;
})

deleteButton.addEventListener('click', () => {
    currentOperandTextElement.innerText = currentOperandTextElement.innerText.slice(0, -1);
    currentOperand = parseFloat(currentOperandTextElement.innerText);
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.innerText === '.' && currentOperandTextElement.innerText.includes('.')) return;
        currentOperandTextElement.innerText += button.innerText;
        currentOperand = parseFloat(currentOperandTextElement.innerText);
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(typeof currentOperand !== 'number') return;
        if(typeof previousOperand === 'number' && typeof operator === 'string' && typeof currentOperand === 'number'){
            previousOperand = compute(previousOperand, operator, currentOperand);
            operator = button.innerText;
            previousOperandTextElement.innerText = previousOperand + operator;
            currentOperandTextElement.innerText = null;
            currentOperand = null;
        }
        else {
            operator = button.innerText;
            previousOperandTextElement.innerText = currentOperandTextElement.innerText + button.innerText;
            previousOperand = currentOperand;
            currentOperand = undefined;
            currentOperandTextElement.innerText = '';
        }
    })
})

equalButton.addEventListener('click', () => {
    if(typeof previousOperand !== 'number' || typeof operator !== 'string' || typeof currentOperand !== 'number') return;
    else {
        currentOperandTextElement.innerText = compute(previousOperand, operator, currentOperand);
        currentOperand = compute(previousOperand, operator, currentOperand);
        previousOperandTextElement.innerText = null;
        previousOperand = null;
        operator = null;
    }
})