// Nth-Grid Modules
// =============================================================================
var vars = require('../lib/vars');

// Exports
// =============================================================================
// Get number in string (e.g. '12rem' => 12)
module.exports = function(value, falseValue) {
    if (vars.reNotLength.test(value)) {
        return false;
    }
    else {
        var match  = value.toString().match(vars.reNumber) || false,
            number = match.length ? Number(match) * 1 : falseValue || false;

        return number;
    }
};
