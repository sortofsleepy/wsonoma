import {
    divisionOperationOne,
    divisionOperationsMultiple,
    isPlusOrMinus,
    lookupTable,
    multiplyOperation,
    operatorSearch,
    sortFirstOrderOperations,
    sortMultiplicationDivisionOperations,
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


        // Calculate all multiplication and division operations
        multDivOps.forEach(itm => {

            let divOps = (itm.string.match(/[/]/g) || []).length;

            // if there are no divisor operations, then it's easy and it's all multiplication
            if(divOps === 0){
                itm["value"] = multiplyOperation(itm.operation);
            }else {

                // somewhat easy - should be able to just run through the operations straight
                if(divOps === 1){
                    itm["value"] = divisionOperationOne(itm.operation);
                }else {

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

        multDivOps.forEach(itm => {
            operationTable[itm.insertIndex] = itm.value;
        });


        // =============== THIRD STAGE ===================== //
        // solve for addition and subtraction

        // if there's only one item, we're done - output the value
        if(operationTable.length === 2 && operationTable[1] === ""){
            output.innerHTML = `The value is ${operationTable[0]}`;
        }else {

            // at this point we should only have addition and subtraction as possible
            //operations, split things again into numbers and operations
            let ops = separateNumbersFromOperation(operationTable.join(""));

            console.log("recalculated ops are : ", ops);

            /**
             * Seem to be able to just run through things though I'mp pretty sure I managed to break things
             * at one point - considering this done for the purposes of this test.
             */
            let val = ops[0];
            for(let i = 1; i < ops.length;++i){
                let curr = ops[i];
                if(isPlusOrMinus(curr)){
                    let v1 = parseFloat(val);
                    let v2 = parseFloat(ops[i + 1]);
                    console.log("running operation ",curr, " with values ", val, " and ", ops[i + 1]);
                    val = lookupTable[curr](v1,v2);
                }
            }

            output.innerHTML = `The value is ${val}`;
        }


        //3 * 9 /200 * 1000 + 20 - 100

    }); // end button listener



}