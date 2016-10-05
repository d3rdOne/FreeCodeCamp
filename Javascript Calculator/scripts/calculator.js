var toDisp;
var entry = "";
var inputDisplay = $("#entry");
var historyDisplay = $("#history");
var historyArray = [];
var operator = ["/", "x", "-", "+", "=", ".", "CE", "AC"];

$("button").click(function(event) {

    //Evaluate Functions
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

    var isOperator = function(item) {
        for (var i in operator) {
            if (item === operator[i]) {
                return true;
            }
        }
        return false;
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

    var entryDisplay = function(data) {
        entry = entry.concat(data);
        inputDisplay.html(entry);
    }
    var historyToDisplay = function(operator) {
        if (operator) {
            historyDisplay.html(historyArray.join(""));
        } else {
            historyDisplay.html(historyArray.join("") + entry);
        }

    }
    var clearDisplay = function() {
        entry = "";
        historyArray = [];
        inputDisplay.html("0");
        historyDisplay.html("0");
    }

    var calculateEvaluate = function(equalSign) {
        var result = 0;
        if (equalSign) {
            if (historyArray.length === 0) {
                historyDisplay.html(entry + "=" + entry);
            } else if (historyArray.length == 2) {

                if (isOperator(inputDisplay.html())) {

                    entry = historyArray[0];
                    historyArray = [];
                    historyDisplay.html(entry + "=" + entry);
                    inputDisplay.html(entry);
                } else {
                    historyArray.push(inputDisplay.html());
                    result = calculate();
                    historyDisplay.html(historyArray.join("") + "=" + result);
                    entry = "" + result;
                    inputDisplay.html(result);
                    historyArray = [];


                }
            }
        }

    }

    var calculate = function() {
            var op1 = parseFloat(historyArray[0]);
            var op2 = parseFloat(historyArray[2]);
            var operator = historyArray[1];

            var result = 0;
            if (operator === "x") {
                result = op1 * op2;
            } else if (operator === "/") {
                result = op1 / op2;
            } else if (operator === "+") {
                result = op1 + op2;
            } else if (operator === "-") {
                result = op1 - op2;
            }
            return result;
        }
        //Get event
    var $target = $(event.target);
    var val = $target.attr("value");

    //Evaluate the data

    if (isOperator(val)) {

        if (val === ".") {
            if (decimalChecker(entry) < 1) {
                entryDisplay(val);
            }
        } else if (val === "CE" || val === "AC") {
            clearDisplay();
        } else if (val === "=") {
            //data for calculation here
            calculateEvaluate(true);


        } else {
            if (historyArray.length == 0) {
                if (inputDisplay.html() === "0") {
                    historyArray.push("0");

                } else {
                    historyArray.push(entry);
                }
                historyArray.push(val);
                historyToDisplay(true);
                entry = "";
                inputDisplay.html(val);
            } else {
                historyArray.pop();
                historyArray.push(val);
                historyToDisplay(true);
                entry = "";
                inputDisplay.html(val);
            }
        }
    } else {
        if (historyArray.length === 0) {
            inputDisplayValidation(val);
        } else {
            inputDisplayValidation(val);
            historyToDisplay(false);
        }


    }



});
