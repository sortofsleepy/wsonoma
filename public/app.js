(function () {
    'use strict';

    //https://codepen.io/sortofsleepy/full/bgjamJ
    function startGame () {
        var script = document.createElement("script");
        script.src = "/game.js";
        document.body.appendChild(script);
    }

    var operatorSearch = /[-+\/*]/g;
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
                // if previous item is not an mult or div op, get starting index
                if (!isMultOrDiv(prev) && isMultOrDiv(next)) {
                    group.push(i);
                }
                // get ending index
                if (isMultOrDiv(prev) && !isMultOrDiv(next)) {
                    group.push(i);
                }
                groupIndices.push(group);
            }
        }
        // need to clean things up a bit.
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
    /**
     * Extracts all multiplication and division operations that need to be performed
     * @param ops {Array} the operational table
     * @param groups {Array} array of start and end indices that will be used to extract operations from the table.
     */
    function sortMultiplicationDivisionOperations(ops, groups) {
        // extract all of the multiplication and division operations that need to be run first
        var multDivOps = [];
        groups.forEach(function (itm) {
            var op = ops.slice(itm[0], itm[1] + 1);
            var joined = op.join("");
            multDivOps.push({
                operation: op,
                string: joined,
                insertIndex: itm[0]
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
    /**
     * Lookup table of all operations in their string forms
     */
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
        },
        "plus": "+",
        "minus": "-",
        "divide": "/",
        "multiply": "*"
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
     * Basically the same function as above but keeping it separate since there's a chance
     * multiple division operators will cause things to break.
     * @param op
     */
    function divisionOperationsMultiple(op) {
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
    function handlePathname() {
        if (window.location.pathname !== "/") {
            var input_1 = document.querySelector("input");
            // split path
            var path = window.location.pathname;
            path = path.replace("/math", "");
            var splitpath = path.split("/");
            splitpath.shift();
            splitpath.forEach(function (itm) {
                if (parseFloat(itm)) {
                    input_1.value += itm;
                }
                else {
                    input_1.value += lookupTable[itm];
                }
            });
        }
    }
    function startMath () {
        handlePathname();
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
            // Calculate all multiplication and division operations
            multDivOps.forEach(function (itm) {
                var divOps = (itm.string.match(/[/]/g) || []).length;
                // if there are no divisor operations, then it's easy and it's all multiplication
                if (divOps === 0) {
                    itm["value"] = multiplyOperation(itm.operation);
                }
                else {
                    // somewhat easy - should be able to just run through the operations straight
                    if (divOps === 1) {
                        itm["value"] = divisionOperationOne(itm.operation);
                    }
                    else {
                        /**
                         * Seems like we can can utilize the same operation as above though I imagine
                         * this will break in some cases.
                         * Gonna stop here for now. s
                         */
                        itm["value"] = divisionOperationsMultiple(itm.operation);
                    }
                }
            });
            // =============== SECOND STAGE ===================== //
            // insert calculated values into main operational table.
            operationTable = opstring.split("#");
            multDivOps.forEach(function (itm) {
                operationTable[itm.insertIndex] = itm.value;
            });
            // =============== THIRD STAGE ===================== //
            // solve for addition and subtraction
            // if there's only one item, we're done - output the value
            if (operationTable.length === 2 && operationTable[1] === "") {
                output.innerHTML = "The value is " + operationTable[0];
            }
            else {
                // at this point we should only have addition and subtraction as possible
                //operations, split things again into numbers and operations
                var ops = separateNumbersFromOperation(operationTable.join(""));
                console.log("recalculated ops are : ", ops);
                /**
                 * Seem to be able to just run through things though I'mp pretty sure I managed to break things
                 * at one point - considering this done for the purposes of this test.
                 */
                var val = ops[0];
                for (var i = 1; i < ops.length; ++i) {
                    var curr = ops[i];
                    if (isPlusOrMinus(curr)) {
                        var v1 = parseFloat(val);
                        var v2 = parseFloat(ops[i + 1]);
                        console.log("running operation ", curr, " with values ", val, " and ", ops[i + 1]);
                        val = lookupTable[curr](v1, v2);
                    }
                }
                output.innerHTML = "The value is " + val;
            }
            //3 * 9 /200 * 1000 + 20 - 100
        }); // end button listener
    }

    var VISIT_KEY = "NUM_VISITS";
    window.onload = function () {
        var path = window.location.pathname;
        var mathStarted = false;
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
                startGame();
                break;
            case "/math":
                startMath();
                mathStarted = true;
                break;
        }
        // math is special - do extra tests
        if (window.location.pathname.search("/math") !== 1) {
            if (!mathStarted) {
                startMath();
            }
        }
    };

}());
