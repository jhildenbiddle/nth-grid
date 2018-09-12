// Dependencies
// =============================================================================
import postcss         from 'postcss';
import appendSelectors from '../util/append-selectors';


// Exports
// =============================================================================
// Generates css for grid container
export default function gridContainer(grid, nthSelector, selectorContainer, siblingContainer) {
    // Float
    if (grid.float) {

        selectorContainer.append({ prop: 'display', value: 'block' });

        // Legacy
        if (grid.float_legacy) {
            // IE7 double padding fix
            selectorContainer.append({ prop: '*display', value: 'inline-block' });
        }

        // Order
        if (grid.order) {
            // IE7 relative position fix
            selectorContainer.append({ prop: '*position', value: 'relative' });
        }
    }

    // Flex
    if (grid.flex) {
        if (grid.flex_legacy) {
            selectorContainer.append(
                { prop: 'display', value: '-webkit-box' },
                { prop: 'display', value: '-ms-flexbox' }
            );
        }
        selectorContainer.append({ prop: 'display', value: 'flex' });

        if (grid.flex_legacy) {
            selectorContainer.append({ prop: '-ms-flex-wrap', value: 'wrap' });
        }
        selectorContainer.append({ prop: 'flex-wrap', value: 'wrap' });

        if (grid.flex_legacy) {
            selectorContainer.append(
                { prop: '-webkit-box-align', value: 'start' },
                { prop: '-ms-flex-align', value: 'start' }
            );
        }
        selectorContainer.append({ prop: 'align-items', value: 'flex-start' });

        if (grid.direction === 'rtl') {
            if (grid.flex_legacy) {
                selectorContainer.append(
                    { prop: '-webkit-box-orient', value: 'horizontal' },
                    { prop: '-webkit-box-direction', value: 'reverse' },
                    { prop: '-ms-flex-direction', value: 'row-reverse' }
                );
            }
            selectorContainer.append({ prop: 'flex-direction', value: 'row-reverse' });
        }
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

    // Width
    if (grid.total_ratio_columns === 0 && grid.calc) {
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

    // Clearfix
    if (grid.float) {
        siblingContainer.append(
            postcss.rule(
                { selector: appendSelectors(nthSelector, ':after') }
            ).append(
                { prop: 'content', value: '\'\'' },
                { prop: 'display', value: 'table' },
                { prop: 'clear', value: 'both' }
            )
        );
    }
}
