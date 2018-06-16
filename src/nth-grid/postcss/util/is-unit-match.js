// Helpers
// =============================================================================
var getNumber = require('./get-number'),
    getUnit   = require('./get-unit');

// Exports
// =============================================================================
// Compare units of array items, ignoring zero values w/o units
module.exports = function(arr, matchUnit) {
    // Return false if value os not a valid length (e.g. calc)
    if (!getNumber(arr[0]) && !getUnit(arr[0])) {
        return false;
    }
    // Get matching unit from first item if unspecified
    else if (!matchUnit) {
        matchUnit = getUnit(arr[0]);
    }

    // Loop through array values
    for (var i = 0; i < arr.length; i++) {
        var num  = getNumber(arr[i]),
            unit = num !== 0 ? getUnit(arr[i]) : false;

        // Return false if value is not a valid length (e.g. calc)
        if (num === false && unit === false) {
            return false;
        }
        // Return false if units do not match
        if (num !== 0 && unit != matchUnit) {
            return false;
        }
    }

    return true;
};
