export const operatorSearch = /[-+\/*]/g;

/**
 * Helps figure out if the string refers to a multiplication or division operation.
 * @param itm
 */
export function isMultOrDiv(itm:string){
    return itm === "*" || itm === "/";
}

/**
 * Helps figure out if the string value refers to an addition or subtraction operation
 * @param itm
 */
export function isPlusOrMinus(itm:string){
    return itm === "+" || itm === "-";
}

/**
 * Validates how many operators are a part of an operation
 * @param op {Array} the operational array
 * @param symbol {string} the symbol to look for
 * @param count {number} the number of times a symbol can appear
 */
export function validateOperatorCount(op:Array<any>,symbol="/",count=1){
    let divCount = 0;
    op.forEach(itm => {
        if(itm.toString() === symbol){
            divCount += 1;
        }
    });

    if(divCount > count){
        return false;
    }

    return true;
}

/**
 * Goes through the operational array to figure out the start and end indices
 * of multiplication or division operations that need to be performed.
 * @param ops {Array} array of operations and values to operate on.
 */
export function sortFirstOrderOperations(ops:Array<any>){
    let groupIndices = [];
    for(let i = 0; i < ops.length; ++i){
        let group = [];
        let itm = ops[i];

        // filter through numbers
        if(!isMultOrDiv(itm) && !isPlusOrMinus(itm)){

            // get the next or previous op
            let next = ops[i + 1];
            let prev = ops[i - 1];

            // if previous item is not an mult or div op, get starting index
            if(!isMultOrDiv(prev) && isMultOrDiv(next)){
                group.push(i)
            }

            // get ending index
            if(isMultOrDiv(prev) && !isMultOrDiv(next)){
                group.push(i)
            }


            groupIndices.push(group);

        }
    }

    // need to clean things up a bit.

    // splice empty arrays
    let indices = [];
    for(let i = 0; i < groupIndices.length; ++i){
        if(groupIndices[i].length > 0){
            indices.push(groupIndices[i][0]);
        }
    }
    let multDivIndices = [];

    // pair off each index
    for(let i = 0; i < indices.length; i += 2){
        multDivIndices.push([indices[i],indices[i +1]]);
    }

    return multDivIndices;
}

/**
 * Extracts all multiplication and division operations that need to be performed
 * @param ops {Array} the operational table
 * @param groups {Array} array of start and end indices that will be used to extract operations from the table.
 */
export function sortMultiplicationDivisionOperations(ops:Array<any>,groups:Array<any>){
    // extract all of the multiplication and division operations that need to be run first
    let multDivOps = [];
    groups.forEach(itm => {
        let op = ops.slice(itm[0],itm[1] +1);
        let joined = op.join("");
        multDivOps.push({
            operation:op,
            string:joined,
            insertIndex:itm[0]
        });
    });
    return multDivOps;
}

/**
 * Runs a multiplication operation on an array.
 * Assumes there are no other operators other than multiplication operators.
 */
export function multiplyOperation(op:Array<any>){
    let value = op[0];
    op.forEach((val,idx) => {
        if(idx > 0 && val !== "*"){
            value *= val;
        }
    });
    return value;
}

/**
 * Runs a division operation on an array.
 * Assumes there are no other operators other than division operators.
 */
export function divisionOperations(op:Array<any>){
    let value = op[0];
    op.forEach((val,idx) => {
        if(idx > 0 && val !== "/"){
            value /= val;
        }
    });
    return value;
}

/**
 * Lookup table of all operations in their string forms
 */
export const lookupTable = {
    "+"(v1,v2){
        return v1 + v2;
    },
    "-"(v1,v2){
        return v1 - v2;
    },
    "/"(v1,v2){
        return v1 / v2;
    },
    "*"(v1,v2){
        return v1 * v2;
    },
};

/**
 * Runs through an operation that has just one division operator.
 * @param op {Array} an operation array that can have a mix of division and multiplication, but ONLY
 * one division operation.
 */
export function divisionOperationOne(op:Array<number>){
    let value = op[0];
    for(let i = 1; i < op.length; i++){
        if(isNaN(parseFloat(op[i].toString()))){
            value = lookupTable[op[i].toString()](value,op[i + 1]);
        }
    }
    return value;

}

/**
 * Basically the same function as above but keeping it separate since there's a chance
 * multiple division operators will cause things to break.
 * @param op
 */
export function divisionOperationsMultiple(op:Array<number>){
    let value = op[0];
    for(let i = 1; i < op.length; i++){
        if(isNaN(parseFloat(op[i].toString()))){
            value = lookupTable[op[i].toString()](value,op[i + 1]);
        }
    }
    return value;
}

