import {
    divisionOperationOne,
    multiplyOperation,
    operatorSearch,
    sortFirstOrderOperations,
    sortMultiplicationDivisionOperations
} from './mathutils'


/**
 * Takes a string like 3+3+3 and splits it into an array that can be more easily digested
 * @param text {string}
 */
function separateNumbersFromOperation(text){

    // extract all operations that need to be performed
    let match;
    let operators = [];
    while((match = operatorSearch.exec(text))){
        if(match){
            operators.push(match[0])
        }
    }

    // extract all numbers that need to be operated on
    let numbers = text.replace(operatorSearch,"#").split("#");

    // now splice all the operators into their proper spots which should be
    // every odd index in the numbers array
    for(let i = 0; i < numbers.length; i ++){
        if(i % 2 !== 0){
            numbers.splice(i,0,operators.shift());
        }
    }

    return numbers;
}


export default function (){

    let math = document.querySelector("#math");
    math['style'].display = "block";


    let output = document.querySelector("#output");

    let button = document.querySelector("#process");
    button.addEventListener("click",() => {
        let input = document.querySelector("input");

        // gather input text and strip whitespace
        let text = input.value.replace(/\s+/g,'');


        // the table of each number and operation that needs to be performed.
        let operationTable = separateNumbersFromOperation(text);

        // get list of first operations that need to be solved.
        let groups = sortFirstOrderOperations(operationTable);

        // =============== FIRST STAGE ===================== //
        // sort multiplication and division operations
        let multDivOps = sortMultiplicationDivisionOperations(operationTable,groups);

        // remove all elements from the operation table that don't have to be calculated first.
        // Add deliniation with "#" to indicate where to insert multiplication + division operation
        let opstring = operationTable.join("");
        multDivOps.forEach(itm => {
            opstring = opstring.replace(itm.string,"#");
        });

        operationTable = opstring.split("");

        // Calculate all multiplication and divsion operations
        multDivOps.forEach(itm => {
            // notes
            // 1. if there are multiple division symbols in the operation, we calculate everything up to the 2nd division symbol first
            let divOps = (itm.string.match(/[/]/g) || []).length;

            // if there are no divisor operations, then it's easy and it's all multiplication
            if(divOps === 0){
                itm["value"] = multiplyOperation(itm.operation);
            }else {

                // somewhat easy - should be able to just run through the operation straigh
                if(divOps === 1){
                    itm["value"] = divisionOperationOne(itm.operation);
                }else {

                }
            }

            console.log(itm);
        });


    }); // end button listener



}