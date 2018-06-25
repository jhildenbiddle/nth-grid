// Dependencies
// =============================================================================
import getNumber from './get-number';
import getUnit   from './get-unit';


// Functions
// =============================================================================
// Calculates string as mathematical expression. Used instead of eval to avoid
// console warning on compilation.
function stringMath(expression) {
    return new Function('return ' + expression)();
}


// Exports
// =============================================================================
// Allows for basic math on string lengths (numbers with with units)
// Ex: unitMath(['1rem', '1rem'], ' + ') /* '2rem' */
export default function(arr, operator) {
    let   finalUnit = '';
    const nums      = [];

    // Loop through array values
    for (let i = 0; i < arr.length; i++) {
        const num  = getNumber(arr[i]);
        const unit = getUnit(arr[i]);

        // Ignore zero value units
        if (num !== 0) {
            // Verify math compatibility and store unit
            if (unit.length) {
                if (finalUnit.length && unit !== finalUnit) {
                    // eslint-disable-next-line
                    console.log(`NTH-GRID: Incompatible unitMath() arguments: ${arr}`);

                    return 0;
                }
                else {
                    finalUnit = unit;
                }
            }
        }

        // Add item to numbers array
        nums.push(num);
    }

    // Cleanse operator
    operator = operator.trim().replace(/[^+\-*/().\d\s]/g, '');

    // Calculate result
    const result = nums.length ? stringMath(nums.join(operator)).toString().concat(finalUnit) : 0; // jshint ignore:line

    // Convert zero to number
    return Number(result) === 0 ? 0 : result;
}
