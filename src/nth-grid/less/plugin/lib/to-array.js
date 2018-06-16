// Helpers
// =============================================================================
var toValue = require('./to-value');

// Exports
// =============================================================================
// Converts Less tree object to javascript array of values
module.exports = function toArray(obj) {
    if (obj.type === 'Expression') {
        var arr = [];

        for (var i = 0; i < obj.value.length; i++) {
            arr.push(toValue(obj.value[i]));
        }

        return arr;
    }
    else {
        var value = toValue(obj);
        return [value];
    }
};
