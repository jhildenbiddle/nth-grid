/* global tree */

// Helpers
// =============================================================================
var getNumber = require('../../../postcss/util/get-number'),
    getUnit   = require('../../../postcss/util/get-unit');

// Exports
// =============================================================================
// Converts javascript string, array, boolean, etc. to Less tree object
module.exports = function toLessObj(value) {
    if (value) {
        var num  = getNumber(value),
            unit = getUnit(value);

        // Boolean => Keyword
        if (typeof(value) === 'boolean') {
            return new tree.Keyword(value.toString());
        }
        // Array => Expression
        else if (value instanceof Array) {
            var arr = [];

            for (var i = 0; i < value.length; i++) {
                arr.push(toLessObj(value[i]));
            }

            return new tree.Expression(arr);
        }
        // Dimension (number & unit)
        else if (num !== false && unit !== false) {
            return new tree.Dimension(num, unit);
        }
        // Number
        else if (num !== false) {
            return new tree.Dimension(num);
        }
        // String
        else {
            return new tree.Anonymous(value);
        }
    }
    else {
        return new tree.Anonymous(value);
    }
};
