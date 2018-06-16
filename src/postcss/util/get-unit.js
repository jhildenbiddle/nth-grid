// Dependencies
// =============================================================================
import vars from '../lib/vars';


// Exports
// =============================================================================
// Get unit in string (e.g. '12rem' => 'rem')
export default function(value, falseValue) {
    if (vars.reNotLength.test(value)) {
        return false;
    }
    else {
        const match = value.toString().match(vars.reUnit) || false;
        const unit  = match.length ? match.toString() : falseValue || false;

        return unit;
    }
}
