// Exports
// =============================================================================
// Appends content to comma-separated selector strings
module.exports = function(selectorList, appendText) {
    return selectorList.split(',').map(function(selector) {
        return selector.trim() + appendText;
    });
};
