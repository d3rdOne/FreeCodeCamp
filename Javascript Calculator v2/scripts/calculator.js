var entry = "";
var inputDisplay = $("#entry");
var equationArray = [];
var operator = ["+", "-", "/", "x", ".", "CE", "AC", "="];
var lastPress = "";

var isOperator = function(item) {
    for (var i in operator) {
        if (item === operator[i]) {
            return true;
        }
    }
    return false;
}
var decimalChecker = function(value) {
    var count = 0;
    var arr = []
    arr = value.split("");
    for (var i in arr) {
        if (arr[i] == ".") {
            count++;
        }
    }
    return count;
}
var entryDisplay = function(data) {
    entry = entry.concat(data);
    inputDisplay.html(entry);
}
var inputDisplayValidation = function(inputData) {
    if (decimalChecker(entry) < 1) {
        if (entry.length < 5) {
            entryDisplay(inputData);
        }
    } else {
        if (entry.length < 6) {
            entryDisplay(inputData);
        }
    }
}
var calculate = function() {
    var result = 0;
    var op = [parseFloat(equationArray[0]), parseFloat(equationArray[2])];
    var operator = equationArray[1];

    if (operator === "+") {
        result = op[0] + op[1];
    } else if (operator === "-") {
        result = op[0] - op[1];
    } else if (operator === "x") {
        result = op[0] * op[1];
    } else if (operator === "/") {
        result = op[0] / op[1];
    }
    if ((result % 1) !== 0) {
        return result.toFixed(1);
    }
    entry = "";
    console.log("function calculate() called op is [" + op + "] result : " + result);
    return result;
}
$("button").click(function(event) {

    var $target = $(event.target);
    var val = $target.attr("value");

    if (isOperator(val)) {
        if (val === "CE" || val === "AC") {
            if (val === "AC") {
                equationArray = [];
                console.log("equationArray was purged ");
                console.clear();
            }
            entry = "";
            inputDisplay.html("0");

        } else if (val === ".") {
            if (decimalChecker(entry) < 1) {
                if (inputDisplay.html() === "0") {
                    entry = entry.concat("0");
                }
                entryDisplay(val);
                lastPress = val;
            }
        } else {
            console.log("Operator[" + val + "] pressed -> equationArray size:" + equationArray.length + " = [" + equationArray + "]");
            if (equationArray.length !== 0) {
                if (val === "=") {
                    // [ ALGORITHM for equal sign -> calculate() ]#ff0000
                    if (equationArray.length === 2) {
                        if (isOperator(lastPress) && lastPress !== ".") {
                            console.log("equationArray is =" + equationArray.length + " purging array ");
                            entry = equationArray[0];
                            inputDisplay.html(entry);
                            equationArray = [];
                            console.log("new array is [" + equationArray + "] lastPress is \"" + lastPress + "\"");
                        } else {
                            // [ call calculate() here ] #ff0000
                            if (lastPress === ".") {
                                entry = entry.concat("0");
                            }
                            equationArray.push(entry);
                            console.log("equationArray is [" + equationArray + "]");
                            res = calculate();
                            inputDisplay.html(res);
                            equationArray = [];
                            entry = res;
                        }
                    }
                } else {
                    if (entry === "") { // if another operator is pressed change the last operater
                        equationArray.pop();
                        equationArray.push(val);
                        console.log("equationArray : " + equationArray);

                    } else {
                        // [call calculate() ] #ff0000
                        console.log("nocode");
                        if (lastPress === ".") {
                            entry = entry.concat("0");
                        }
                        equationArray.push(entry);
                        console.log("nocode equationArray is [" + equationArray + "]");
                        res = calculate() + "";
                        equationArray = [];
                        equationArray.push(res);
                        equationArray.push(val);
                        console.log("nocode NEW equationArray is [" + equationArray + "]");
                        entry = "";
                    }
                }

            } else {
                // [add trap for equal sign is pressed] **SOLVED** #00af17
                if (val !== "=") {
                    if (entry === "") {
                        entry = entry.concat("0");
                    }
                    equationArray.push(entry);
                    entry = "";
                    equationArray.push(val);
                    console.log("( Operator[" + val + "] )->[" + equationArray + "]");
                    lastPress = val;
                }

            }

        }
    } else {
        inputDisplayValidation(val);
        lastPress = val;

    }

});
