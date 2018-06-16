// Helpers
// =============================================================================
var toArray = require('./to-array');

// Exports
// =============================================================================
// Converts Less tree object to javascript string, array, boolean, etc.
module.exports = function toValue(obj) {
    // Keyword
    if (obj.type === 'Keyword') {
        return obj.value;
    }
    // Dimension (number & unit)
    else if (obj.type === 'Dimension') {
        // Ignore units for zero values (e.g. 0px = 0);
        if (obj.value === 0) {
            return obj.value;
        }
        // Append unit to value
        else {
            return obj.value.toString().concat(obj.unit);
        }
    }
    // Expression (array)
    else if (obj.type === 'Expression') {
        toArray(obj);
    }
    // Unknown
    else {
        console.log('Unknown type: ' + obj.type + ' Returning value: ' + obj.value);
        console.log(JSON.stringify(obj));
        return obj;
    }
};
