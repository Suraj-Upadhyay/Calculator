const display = document.querySelector("#display #inputArea p");
const backspace = document.querySelector("#deleteIcon");
const keys = document.querySelectorAll(".key");
var calculationEnded = false;

const clearDisplay = () => {
    display.innerText = '0';
};

const calculate = () => {
    var expression = display.innerText;
    additionRegex = /[+|\-|=]/;
    operandRegex = /[0-9|.]/;

    const evaluate = (num1, num2, operator) => {
        switch(operator) {
            case '+':
                return num1+num2;
            case '-':
                return num1-num2;
            case '*':
                return num1*num2;
            case '/':
                return num1/num2;
        }
    }
    const evaluateArray = (expressionArray) => {
        var result = 1;
        var lastOperator = '*';
        var multiDivRegex = /[*|//]/;

        expressionOperands = expressionArray.split(multiDivRegex)
                            .filter(token => token != '')
                            .map(token => parseFloat(token));
        expressionOperations = expressionArray.split(operandRegex)
                                .filter(token => token!= '');

        for(var i = 0; i < expressionOperands.length; i++) {
            result = evaluate(result, expressionOperands[i], lastOperator);
            lastOperator = expressionOperations[i];
        }
        return result;
    };

    var operandArray = expression.split(additionRegex)
                        .filter(operand => operand != '')
                        .map(operand => evaluateArray(operand));
    var operatorArray = expression.split(operandRegex)
                        .filter(operator => operator != '')
                        .filter(operator => operator != '*')
                        .filter(operator => operator != '/');
    var expressionResult = 0;
    var lastOperator = '+';
    for (var i = 0; i < operandArray.length; i++) {
        expressionResult = evaluate(expressionResult,
                                    operandArray[i],
                                    lastOperator);
        lastOperator = operatorArray[i];
    }
    return expressionResult;
};

const updateDisplay = (string) => {
    var displayString = display.innerText;
    if (displayString == '0') displayString = string;
    else displayString += string;
    display.innerText = displayString;
};

const onKeyClick = (event) => {
    if (calculationEnded) {
        clearDisplay();
        calculationEnded = false;
    }
    const keyString = event.target.innerText;
    updateDisplay(keyString);
    if (keyString == '=') {
        updateDisplay(calculate());
        calculationEnded = true;
    }
    else if (keyString == "CE")
        clearDisplay();
};

const onBackspaceClick = (event) => {
    var displayString = display.innerText;
    displayString = displayString.slice(0, displayString.length - 1);
    if (displayString == '') displayString = '0';
    display.innerText = displayString;
};

keys.forEach((key) => {
    key.addEventListener('click', onKeyClick);
});

backspace.addEventListener('click', onBackspaceClick)
