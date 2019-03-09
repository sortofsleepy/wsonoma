(function () {
    'use strict';

    //# sourceMappingURL=game.js.map

    var operatorSearch = /[-+.\/*]/g;
    /**
     * Helps figure out if the string refers to a multiplication or division operation.
     * @param itm
     */
    function isMultOrDiv(itm) {
        return itm === "*" || itm === "/";
    }
    /**
     * Helps figure out if the string value refers to an addition or subtraction operation
     * @param itm
     */
    function isPlusOrMinus(itm) {
        return itm === "+" || itm === "-";
    }
    /**
     * Goes through the operational array to figure out the start and end indices
     * of multiplication or division operations that need to be performed.
     * @param ops {Array} array of operations and values to operate on.
     */
    function sortFirstOrderOperations(ops) {
        var groupIndices = [];
        for (var i = 0; i < ops.length; ++i) {
            var group = [];
            var itm = ops[i];
            // filter through numbers
            if (!isMultOrDiv(itm) && !isPlusOrMinus(itm)) {
                // get the next or previous op
                var next = ops[i + 1];
                var prev = ops[i - 1];
                // if previous item is not an mult or div op, start new group
                if (!isMultOrDiv(prev) && isMultOrDiv(next)) {
                    group.push(i);
                }
                if (isMultOrDiv(prev) && !isMultOrDiv(next)) {
                    group.push(i);
                }
                groupIndices.push(group);
            }
        }
        // splice empty arrays
        var indices = [];
        for (var i = 0; i < groupIndices.length; ++i) {
            if (groupIndices[i].length > 0) {
                indices.push(groupIndices[i][0]);
            }
        }
        var multDivIndices = [];
        // pair off each index
        for (var i = 0; i < indices.length; i += 2) {
            multDivIndices.push([indices[i], indices[i + 1]]);
        }
        return multDivIndices;
    }
    function sortMultiplicationDivisionOperations(ops, groups) {
        // extract all of the multiplication and division operations that need to be run first
        var multDivOps = [];
        groups.forEach(function (itm) {
            var op = ops.slice(itm[0], itm[1] + 1);
            var joined = op.join("");
            multDivOps.push({
                operation: op,
                string: joined
            });
        });
        return multDivOps;
    }
    /**
     * Runs a multiplication operation on an array.
     * Assumes there are no other operators other than multiplication operators.
     */
    function multiplyOperation(op) {
        var value = op[0];
        op.forEach(function (val, idx) {
            if (idx > 0 && val !== "*") {
                value *= val;
            }
        });
        return value;
    }
    var lookupTable = {
        "+": function (v1, v2) {
            return v1 + v2;
        },
        "-": function (v1, v2) {
            return v1 - v2;
        },
        "/": function (v1, v2) {
            return v1 / v2;
        },
        "*": function (v1, v2) {
            return v1 * v2;
        }
    };
    /**
     * Runs through an operation that has just one division operator.
     * @param op {Array} an operation array that can have a mix of division and multiplication, but ONLY
     * one division operation.
     */
    function divisionOperationOne(op) {
        var value = op[0];
        for (var i = 1; i < op.length; i++) {
            if (isNaN(parseFloat(op[i].toString()))) {
                value = lookupTable[op[i].toString()](value, op[i + 1]);
            }
        }
        return value;
    }

    /**
     * Takes a string like 3+3+3 and splits it into an array that can be more easily digested
     * @param text {string}
     */
    function separateNumbersFromOperation(text) {
        // extract all operations that need to be performed
        var match;
        var operators = [];
        while ((match = operatorSearch.exec(text))) {
            if (match) {
                operators.push(match[0]);
            }
        }
        // extract all numbers that need to be operated on
        var numbers = text.replace(operatorSearch, "#").split("#");
        // now splice all the operators into their proper spots which should be
        // every odd index in the numbers array
        for (var i = 0; i < numbers.length; i++) {
            if (i % 2 !== 0) {
                numbers.splice(i, 0, operators.shift());
            }
        }
        return numbers;
    }
    function startMath () {
        var math = document.querySelector("#math");
        math['style'].display = "block";
        var output = document.querySelector("#output");
        var button = document.querySelector("#process");
        button.addEventListener("click", function () {
            var input = document.querySelector("input");
            // gather input text and strip whitespace
            var text = input.value.replace(/\s+/g, '');
            // the table of each number and operation that needs to be performed.
            var operationTable = separateNumbersFromOperation(text);
            // get list of first operations that need to be solved.
            var groups = sortFirstOrderOperations(operationTable);
            // =============== FIRST STAGE ===================== //
            // sort multiplication and division operations
            var multDivOps = sortMultiplicationDivisionOperations(operationTable, groups);
            // remove all elements from the operation table that don't have to be calculated first.
            // Add deliniation with "#" to indicate where to insert multiplication + division operation
            var opstring = operationTable.join("");
            multDivOps.forEach(function (itm) {
                opstring = opstring.replace(itm.string, "#");
            });
            operationTable = opstring.split("");
            // Calculate all multiplication and divsion operations
            multDivOps.forEach(function (itm) {
                // notes
                // 1. if there are multiple division symbols in the operation, we calculate everything up to the 2nd division symbol first
                var divOps = (itm.string.match(/[/]/g) || []).length;
                // if there are no divisor operations, then it's easy and it's all multiplication
                if (divOps === 0) {
                    itm["value"] = multiplyOperation(itm.operation);
                }
                else {
                    // somewhat easy - should be able to just run through the operation straigh
                    if (divOps === 1) {
                        itm["value"] = divisionOperationOne(itm.operation);
                    }
                }
                console.log(itm);
            });
        }); // end button listener
    }
    //# sourceMappingURL=math.js.map

    var VISIT_KEY = "NUM_VISITS";
    window.onload = function () {
        var path = window.location.pathname;
        switch (path) {
            case "/":
                // I know you can use Cookies too but decided to do it in a way I"m more used to.
                var numVisits = localStorage.getItem(VISIT_KEY);
                var newVisitCount = 0;
                if (numVisits !== null) {
                    newVisitCount = parseInt(numVisits) + 1;
                }
                else {
                    newVisitCount = 1;
                }
                localStorage.setItem(VISIT_KEY, newVisitCount.toString());
                document.write("Hello! You've visited " + newVisitCount + " times");
                break;
            // resets visitor counter
            case "/reset":
                localStorage.setItem(VISIT_KEY, "0");
                window.location.href = "/";
                break;
            case "/game":
                break;
            case "/math":
                startMath();
                break;
        }
    };
    //# sourceMappingURL=app.js.map

}());
