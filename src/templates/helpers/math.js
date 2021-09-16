// Exports
// =============================================================================
// Ex: {{math @index "*" 2}}
module.exports = function(lvalue, operator, rvalue, options) {
    if (arguments.length < 4) {
        // Operator omitted assumes "+"
        options  = rvalue;
        rvalue   = operator;
        operator = '+';
    }

    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
    }[operator];
};
