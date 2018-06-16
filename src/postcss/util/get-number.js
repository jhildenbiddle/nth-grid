// Dependencies
// =============================================================================
import vars from '../lib/vars';


// Exports
// =============================================================================
// Get number in string (e.g. '12rem' => 12)
export default function(value, falseValue) {
    if (vars.reNotLength.test(value)) {
        return false;
    }
    else {
        const match  = value.toString().match(vars.reNumber) || false;
        const number = match.length ? Number(match) * 1 : falseValue || false;

        return number;
    }
}
