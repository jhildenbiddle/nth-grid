// Dependencies
// =============================================================================
import toValue from './to-value';


// Exports
// =============================================================================
// Converts Less tree object to javascript array of values
export default function toArray(obj) {
    if (obj.type === 'Expression') {
        const arr = [];

        for (let i = 0; i < obj.value.length; i++) {
            arr.push(toValue(obj.value[i]));
        }

        return arr;
    }
    else {
        const value = toValue(obj);

        return [value];
    }
}
