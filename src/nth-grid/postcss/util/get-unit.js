// Nth-Grid Modules
// =============================================================================
var vars = require('../lib/vars');

// Exports
// =============================================================================
// Get unit in string (e.g. '12rem' => 'rem')
module.exports = function(value, falseValue) {
    if (vars.reNotLength.test(value)) {
        return false;
    }
    else {
        var match = value.toString().match(vars.reUnit) || false,
            unit  = match.length ? match.toString() : falseValue || false;

        return unit;
    }
};
