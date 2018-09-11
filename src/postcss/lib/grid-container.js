// Dependencies
// =============================================================================
import postcss         from 'postcss';
import appendSelectors from '../util/append-selectors';


// Exports
// =============================================================================
// Generates css for grid container
export default function gridContainer(grid, nthSelector, selectorContainer, siblingContainer) {
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
}
