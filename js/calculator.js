function add(operand1, operand2) {
    return parseFloat(operand1) + parseFloat(operand2);
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function operate(operand1, operand2, operator) {
    switch (operator) {
        case '+':
            return add(operand1, operand2);
            break;
        case '-':
            return subtract(operand1, operand2);
            break;
        case '*':
            return multiply(operand1, operand2);
            break;
        case '/':
            return divide(operand1, operand2);
            break;
    }
}

let operand1 = 3;
let operand2 = 4;
let operator = '/';
let displayValue = "";

console.log(operate(operand1, operand2, operator));

const keyBtns = document.querySelectorAll(".key");
const displayText = document.getElementById("display-text");

keyBtns.forEach( (button) => {
    button.addEventListener("click", () => {
        if (button.textContent == "=") {
            let equation = displayValue.split(" ");
            console.log(equation);
            operand1 = equation[0];
            operand2 = equation[2];
            operator = equation[1];
            displayText.innerText = operate(operand1, operand2, operator);
            displayValue = "";
        } else if (button.textContent == "+" || button.textContent == "-" || button.textContent == "*" || button.textContent == "/") {
            displayText.innerText += button.textContent;
            displayValue += " " + button.textContent + " ";
        } else {
            displayText.innerText += button.textContent;
            displayValue += button.textContent;
        }

    });
});

const clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", () => {
    displayValue = "";
    displayText.innerText = "";
});
