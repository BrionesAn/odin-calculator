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

function evaluate(operand1, operand2, operator) {
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

let operand1 = null;
let operand2 = null;
let operator1 = null;
let operator2 = null;
let decimalFlag = false;

console.log(evaluate(operand1, operand2, operator1));

const keyBtns = document.querySelectorAll(".key");
const displayText = document.getElementById("display-text");

function isOperatorNull() {
    if (operator1 == null) return true;
    else return false;
}

function updateDisplay(message) {
    if (message.length > 12) {
        message = "..." + message.substring(message.length - 12, message.length);
    }
    displayText.innerText = message;
}

function divideByZeroChecker() {
    if (operator1 === "/" && operand2 == 0) {
        updateDisplay("nah lmao");
        operand1 = null, operand2 = null, operator1 = null, operator2 = null;
        return true;
    } else {
        return false;
    }
}

function digitPress(digit) {
    // User has not input a operator yet (First Operand)
    if (isOperatorNull()) {
        if (operand1 == null) operand1 = digit;
        else operand1 += digit;
        updateDisplay(operand1);
    // User has input an operator (Second Operand)
    } else {
        if (operand2 == null) operand2 = digit;
        else operand2 += digit;
        updateDisplay(operand2);
    }
}

function operatorPress(operator) {
    // User has input an operator, full equation available
    if (!isOperatorNull()) {
        if (!divideByZeroChecker()) {
            operand1 = evaluate(operand1, operand2, operator1);
            operator1 = operator;
            operand2 = null;
            decimalFlag = false;
            updateDisplay(operand1);
        }
        // First operator
    } else if (isOperatorNull() && operand1 != null) {
        operator1 = operator;
        decimalFlag = false;
    }
}

function decimalPress() {
    // Check if user has already used a decimal for the current operand
    if (!decimalFlag) {
        // First operand
        if (isOperatorNull()) {
            // Check if decimal is first operand input
            if (operand1 == null) operand1 = "0.";
            else operand1 += ".";
            decimalFlag = true;
            updateDisplay(operand1);
        // Second operand
        } else {
            // Check if decimal is second operand
            if (operand2 == null) operand2 = "0.";
            else operand2 += ".";
            decimalFlag = true;
            updateDisplay(operand2);
        }
    }
}

function equalPress() {
    // Full equation has been input
    if (operand1 != null && operand2 != null && operator1 != null) {
        if (!divideByZeroChecker()) {
            updateDisplay(evaluate(operand1, operand2, operator1));
            operand1 = null, operand2 = null, operator1 = null, operator2 = null, decimalFlag = false;
        }
    // First operand and first operator have been input
    // Perform calculation with second operand as the first operand
    } else if (operand1 != null && operator1 != null && operand2 == null) {
        operand2 = operand1;
        updateDisplay(evaluate(operand1, operand2, operator1));
        operand1 = null, operand2 = null, operator1 = null, operator2 = null, decimalFlag = false;
    }
}

function backspacePress() {
    // ** first if not needed **
    if (operand1 == "") {
        operand1 = null;
    // User is currently in the second operand
    } else if (operand2 != null) {
        if (operand2 ==  "") {
            operand2 = null;
        } else if (typeof operand2 === 'number') {
            // A calculation has been made, cannot perform a backspace
        } else {
            operand2 = operand2.slice(0, -1);
            updateDisplay(operand2);
        }
    // Users last input is the operator, set to null
    } else if (operator1 != null) {
        operator1 = null;
    // User is currently in the first operand
    } else if (operand1 != null) {
        if (operand1 ==  "") {
            operand1 = null;
        } else if (typeof operand1 === 'number') {
            // A calculation has been made, cannot perform a backspace
        } else {
            operand1 = operand1.slice(0, -1);
            updateDisplay(operand1);
        }
    }
}

function clearPress() {
    operand1 = null;
    operand2 = null;
    operator1 = null;
    operator2 = null;
    decimalFlag = false;
    updateDisplay("");
}

keyBtns.forEach( (button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number")) {
            digitPress(button.textContent);
        } else if (button.classList.contains("operator")) {
            operatorPress(button.textContent);
        } else if (button.classList.contains("decimal")) {
            decimalPress();
        } else if (button.classList.contains("equals")) {
            equalPress();
        } else if (button.classList.contains("backspace")) {
            backspacePress();
        } else if (button.classList.contains("clear")) {
            clearPress();
        }
    });
});

window.addEventListener("keydown", function(event) {
    console.log(event.key);
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "1":
            digitPress("1");
            break;
        case "2":
            digitPress("2");
            break;
        case "3":
            digitPress("3");
            break;
        case "4":
            digitPress("4");
            break;
        case "5":
            digitPress("5");
            break;
        case "6":
            digitPress("6");
            break;
        case "7":
            digitPress("7");
            break;
        case "8":
            digitPress("8");
            break;
        case "9":
            digitPress("9");
            break;
        case "/":
            operatorPress("/");
            break;
        case "x":
        case "*":
            operatorPress("*");
            break;
        case "-":
            operatorPress("-");
            break;
        case "+":
            operatorPress("+");
            break;
        case ".":
            decimalPress();
            break;
        case "=":
        case "Enter":
            equalPress();
            break;
        case "Backspace":
            backspacePress();
            break;
        case "Delete":
            clearPress();
            break;
    }
    event.preventDefault();
}, true);