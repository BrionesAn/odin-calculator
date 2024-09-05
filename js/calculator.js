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
        
/*

Create a function to evaluate??

Create a function to check if user is on first operand or second.
Return true if operator1 != null and false if operator1 == null
    operator1 == null, then we are on the first operand
    operator1 != null and operand1 != null, then we are on the second operand

Create a function to update the display
Takes a variable
    Update display

Check which type of button is pressed
If digit is pressed
    Check if user has already input an operator
    Call operatorCheck function, if false then user has not input an operator and we are on first operand
        Continue to append digit to operand1
        Display operand1
    Call operatorCheck function, if true then user has input an operator and we are on second operand
        Append digits to operand2
        Display operand2
    
*/
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
/*

If operator is pressed
    Check if user has already input an operator
    operator1 == null and operand1 != null, then we are on the first operator
        operator1 = the operator that is pressed
    operator1 != null, then we are on the second operator, full equation available must reduce
        operator2 becomes the operator that is pressed
        Evaluate the current equation
        operand1 = result of equation
        Set operator1 = operator2
        Set operand2 and operator2 to null
        Display operand1
    operator1 == null and operand1 == null, (First key pressed is operator)
        Do nothing

*/

function operatorPress(operator) {
    // User has input an operator, full equation available
    if (!isOperatorNull()) {
        if (!divideByZeroChecker()) {
            //operator2 = operator;
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

/*

If decimal is pressed
    Check if user has already input a decimal
    decimalFlag = false, Check if user already input an operator to see which operand to append to
        Call operatorCheck function, if false then user has not input an operator and we are on first operand
            Append decimal to operand1
            Set decimalFlag = true;
            Disable decimal button
            Display operand1
        If operatorCheck function is true then we are on the second operand
            Append decimal to operand2
            Set decimalFlag = true;
            Disable decimal button
            Display operand2
    decimalFlag = true
        Do nothing

*/

function decimalPress() {
    if (!decimalFlag) {
        if (isOperatorNull()) {
            if (operand1 == null) operand1 = ".";
            else operand1 += ".";
            decimalFlag = true;
            updateDisplay(operand1);
        } else {
            if (operand2 == null) operand2 = ".";
            else operand2 += ".";
            decimalFlag = true;
            updateDisplay(operand2);
        }
    }
}

/*

If equals is pressed
    Check if a valid equation has been input
    operator1, operator2, operand1 != null then we have a full equation
        If operator1 = "/" and operand2 = "0"
            Display funny message
            Clear all variables
        Else
            Evaluate the equation
            operand1 = result of equation
            Display operand1
            Clear all variables except operand1
    operator1 and operand1 != null but operator2 == null, then evaluate with operator1
        operand2 = operand1
        Evaluate the equation
        operand1 = result of equation
        Display operand1
        Clear all variables except operand1
    operator1 != null but operand1 and operator2 == null OR all is null (Cannot evaluate anything)
        Do nothing

*/

function equalPress() {
    if (operand1 != null && operand2 != null && operator1 != null) {
        if (!divideByZeroChecker()) {
            updateDisplay(evaluate(operand1, operand2, operator1));
            operand1 = null, operand2 = null, operator1 = null, operator2 = null, decimalFlag = false;
        }
    } else if (operand1 != null && operator1 != null && operand2 == null) {
        operand2 = operand1;
        updateDisplay(evaluate(operand1, operand2, operator1));
        operand1 = null, operand2 = null, operator1 = null, operator2 = null, decimalFlag = false;
    }
}

/*

If backspace is pressed
    If operand2 != null, then we are on second operand (There exists digits in operand2)
        Remove last digit from operand2
        Display operand2
    If operator1 != null, then last key pressed was the operator
        operator1 = null;
    If operand1 != null, then we are on first operand (There exists digits in operand1)
        Remove last digit from operand1
        Display operand1
    Else (Display is empty)
        Do nothing
*/

function backspacePress() {
    if (operator2 != null) {
        operator2 = null;
    } else if (operand2 != null) {
        if (operand2 ==  "") {
            operand2 = null;
        } else if (typeof operand2 === 'number') {
            // Do nothing
        } else {
            operand2 = operand2.slice(0, -1);
            updateDisplay(operand2);
        }
    } else if (operator1 != null) {
        operator1 = null;
    } else if (operand1 != null) {
        if (operand1 ==  "") {
            operand1 = null;
        } else if (typeof operand1 === 'number') {
            // Do nothing
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