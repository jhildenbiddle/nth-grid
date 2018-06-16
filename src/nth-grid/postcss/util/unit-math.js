// Helpers
// =============================================================================
var getNumber = require('./get-number'),
    getUnit   = require('./get-unit');

// Exports
// =============================================================================
// Allows for basic math on string lengths (numbers with with units)
// Ex: unitMath(['1rem', '1rem'], ' + ') /* '2rem' */
module.exports = function(arr, operator) {
    var finalUnit = '',
        nums      = [];

    // Loop through array values
    for (var i = 0; i < arr.length; i++) {
        var num  = getNumber(arr[i]),
            unit = getUnit(arr[i]);

        // Ignore zero value units
        if (num !== 0) {
            // Verify math compatibility and store unit
            if (unit.length) {
                if (finalUnit.length && unit !== finalUnit) {
                    console.log('NTH-GRID: Incompatible unitMath() arguments: ' + arr);
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
    operator = operator.trim().replace(/[^\+\-\*\/().\d\s]/g, '');

    // Return result
    var result = nums.length ? eval(nums.join(operator)).toString().concat(finalUnit) : 0; // jshint ignore:line

    // Convert zero to number
    return Number(result) === 0 ? 0 : result;
};
