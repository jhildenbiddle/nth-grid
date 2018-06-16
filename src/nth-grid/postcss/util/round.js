// Helpers
// =============================================================================
var getNumber = require('./get-number'),
    getUnit   = require('./get-unit');

// Nth-Grid Modules
// =============================================================================
var vars = require('../lib/vars');

// Exports
// =============================================================================
// Round value to specified decimal places
module.exports = function(val, decimals) {
    decimals = decimals || vars.rounding;

    var num  = getNumber(val),
        unit = getUnit(val);

    // Only use toFixed() if length if greater than decimals
    if (num.toString().match(/\d/g).length > decimals) {
        num = Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
    }

    return unit ? num.toString() + unit : num;
};
