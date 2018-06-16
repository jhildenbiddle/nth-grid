// Dependencies
// =============================================================================
import getNumber from './get-number';
import getUnit   from './get-unit';
import vars      from '../lib/vars';


// Exports
// =============================================================================
// Round value to specified decimal places
export default function(val, decimals) {
    decimals = decimals || vars.rounding;

    let   num  = getNumber(val);
    const unit = getUnit(val);

    // Only use toFixed() if length if greater than decimals
    if (num.toString().match(/\d/g).length > decimals) {
        num = Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
    }

    return unit ? num.toString() + unit : num;
}
