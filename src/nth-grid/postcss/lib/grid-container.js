// Packages
// =============================================================================
var postcss = require('postcss');

// Helpers
// =============================================================================
var appendSelectors = require('../util/append-selectors');

// Exports
// =============================================================================
// Generates css for grid container
module.exports = function(grid, nthSelector, selectorContainer, siblingContainer) {
    selectorContainer.append(
        { prop: 'display', value: 'block' }
    );

    // Legacy
    if (grid.legacy === true) {
        // IE7 double padding fix
        selectorContainer.append({ prop: '*display', value: 'inline-block' });
    }

    // Legacy
    if (grid.legacy === true && grid.order) {
        // IE7 relative position fix
        selectorContainer.append({ prop: '*position', value: 'relative' });
    }

    // Box sizing
    if (grid.total_ratio_columns === 0) {
        // Allow for borders when auto-width has been applied
        selectorContainer.append({ prop: 'box-sizing', value: 'content-box' });
    }
    else {
        // Allow for borders when auto-width has been applied
        selectorContainer.append({ prop: 'box-sizing', value: 'border-box' });
    }

    // Flexbox
    if (grid.eqheight === true || grid.valign === 'top' || grid.valign === 'center' || grid.valign === 'middle' || grid.valign === 'bottom') {
        selectorContainer.append(
            { prop: 'display', value: '-webkit-box' },
            { prop: 'display', value: '-webkit-flex' },
            { prop: 'display', value: '-ms-flexbox' },
            { prop: 'display', value: 'flex' },
            { prop: '-webkit-flex-wrap', value: 'wrap' },
            { prop: '-ms-flex-wrap', value: 'wrap' },
            { prop: 'flex-wrap', value: 'wrap' }
        );

        // Equal-height columns
        if (grid.eqheight === true) {
            // Legacy warning
            if (grid.legacy === true && grid.warnings === true) {
                console.warn('NTH-GRID: "' + nthSelector + '" requires flexbox support for equal-height columns. This feature is not supported by legacy browsers.');
            }
        }
        // Vertical alignment
        else {
            // Legacy warning
            if (grid.legacy === true && grid.warnings === true) {
                console.warn('NTH-GRID: "' + nthSelector + '" requires flexbox support for vertical alignment. This feature is not supported by legacy browsers.');
            }
            if (grid.valign === 'top') {
                selectorContainer.append(
                    { prop: '-webkit-box-align', value: 'start' },
                    { prop: '-webkit-align-items', value: 'flex-start' },
                    { prop: '-ms-flex-align', value: 'start' },
                    { prop: 'align-items', value: 'flex-start' }
                );
            }
            if (grid.valign === 'center' || grid.valign === 'middle') {
                selectorContainer.append(
                    { prop: '-webkit-box-align', value: 'center' },
                    { prop: '-webkit-align-items', value: 'center' },
                    { prop: '-ms-flex-align', value: 'center' },
                    { prop: 'align-items', value: 'center' }
                );
            }
            if (grid.valign === 'bottom') {
                selectorContainer.append(
                    { prop: '-webkit-box-align', value: 'end' },
                    { prop: '-webkit-align-items', value: 'flex-end' },
                    { prop: '-ms-flex-align', value: 'end' },
                    { prop: 'align-items', value: 'flex-end' }
                );
            }
        }

        // Direction
        if (grid.direction === 'rtl') {
            selectorContainer.append(
                { prop: '-webkit-box-orient', value: 'horizontal' },
                { prop: '-webkit-box-direction', value: 'reverse' },
                { prop: '-webkit-flex-direction', value: 'row-reverse' },
                { prop: '-ms-flex-direction', value: 'row-reverse' },
                { prop: 'flex-direction', value: 'row-reverse' }
            );
        }
    }

    // Width
    if (grid.total_ratio_columns === 0 && grid.calc === true) {
        selectorContainer.append({ prop: 'width', value: 'calc(' + grid.auto_width + ')' });
    }
    else if (grid.total_ratio_columns === 0) {
        selectorContainer.append({ prop: 'width', value: grid.auto_width });
    }
    else if (grid.width !== '100%') {
        selectorContainer.append({ prop: 'width', value: grid.width });
    }
    else {
        selectorContainer.append({ prop: 'width', value: 'auto' });
    }

    // Centering
    selectorContainer.append (
        { prop: 'margin-right', value: grid.center === true ? 'auto' : 0 },
        { prop: 'margin-left', value: grid.center === true ? 'auto' : 0 }
    );

    // Clearfix
    siblingContainer.append(
        postcss.rule(
            { selector: appendSelectors(nthSelector, ':after') }
        ).append(
            { prop: 'content', value: '\'\'' },
            { prop: 'display', value: 'table' },
            { prop: 'clear', value: 'both' }
        )
    );
};
