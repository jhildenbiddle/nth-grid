// Exports
// =============================================================================
// Appends content to comma-separated selector strings
export default function(selectorList, appendText) {
    return selectorList.split(',').map(function(selector) {
        return selector.trim() + appendText;
    });
}
