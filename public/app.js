(function () {
    'use strict';

    //# sourceMappingURL=game.js.map

    var operatorSearch = /[-+.\/*]/g;
    //# sourceMappingURL=mathutils.js.map

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
            console.log(operationTable);
        }); // end button listener
    }

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
