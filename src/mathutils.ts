export const operatorSearch = /[-+.\/*]/g;

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

            // if previous item is not an mult or div op, start new group
            if(!isMultOrDiv(prev) && isMultOrDiv(next)){
                group.push(i)
            }

            if(isMultOrDiv(prev) && !isMultOrDiv(next)){
                group.push(i)
            }


            groupIndices.push(group);

        }
    }

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