import {operatorSearch} from './mathutils'


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

        console.log(operationTable)

    }); // end button listener



}