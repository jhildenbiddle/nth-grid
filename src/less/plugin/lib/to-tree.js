/* global tree */

// Dependencies
// =============================================================================
import getNumber from '../../../postcss/util/get-number';
import getUnit   from '../../../postcss/util/get-unit';


// Exports
// =============================================================================
// Converts javascript string, array, boolean, etc. to Less tree object
export default function toTree(value) {
    // Boolean => Keyword
    if (typeof(value) === 'boolean') {
        return new tree.Keyword(value.toString());
    }
    // Array => Expression
    else if (value instanceof Array) {
        const arr = [];

        for (let i = 0; i < value.length; i++) {
            arr.push(toTree(value[i]));
        }

        return new tree.Expression(arr);
    }
    // Number => Dimension
    else if (typeof value === 'number') {
        return new tree.Dimension(value);
    }
    // Strings
    else if (value !== null) {
        const num  = getNumber(value);
        const unit = getUnit(value);

        // => Dimension (number & unit)
        if (num !== false && unit !== false) {
            return new tree.Dimension(num, unit);
        }
        // => Number
        else if (num !== false) {
            return new tree.Dimension(num);
        }
        // => String
        else {
            return new tree.Anonymous(value);
        }
    }
    // Null
    else {
        return new tree.Anonymous(value);
    }
}
