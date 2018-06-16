// Dependencies
// =============================================================================
import getNumber from './get-number';


// Exports
// =============================================================================
// Converts numbers, arrays and booleans stored as strings to appropriate type
export default function(val) {
    // Number
    if (Number(val)) {
        return Number(val);
    }
    // Zero with units
    else if (getNumber(val) === 0) {
        return 0;
    }
    // Boolean
    else if (val.toLowerCase() === 'true' || val.toLowerCase() === 'false') {
        return val.toLowerCase() === 'true';
    }
    // No change
    else {
        return val;
    }
}
