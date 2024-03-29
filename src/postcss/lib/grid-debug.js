// Dependencies
// =============================================================================
import postcss         from 'postcss';
import appendSelectors from '../util/append-selectors';


// Exports
// =============================================================================
// Generates debug css for grid container and columns
export default function gridDebug(grid, nthSelector, selectorContainer, siblingContainer) {
    if (grid.debug) {
        const debugContent = [
            'columns            : ' + grid.columns,
            'gap                : ' + grid.gap,
            'margin             : ' + grid.margin,
            'width              : ' + grid.width,
            'order              : ' + grid.order,
            'direction          : ' + grid.direction,
            'flex               : ' + grid.flex,
            'flex-legacy        : ' + grid.flex_legacy,
            'float              : ' + grid.float,
            'float-legacy       : ' + grid.float_legacy + '\\A ',
            'auto_width         : ' + grid.auto_width,
            'calc               : ' + grid.calc,
            'columns_ratio      : ' + grid.columns_ratio,
            'columns_unit       : ' + grid.columns_unit,
            'grid_col_ratio     : ' + grid.grid_col_ratio,
            'grid_col_width     : ' + grid.grid_col_width,
            'grid_width         : ' + grid.grid_width,
            'order_offsets      : ' + grid.order_offsets,
            'total_columns      : ' + grid.total_columns,
            'total_ratio_columns: ' + grid.total_ratio_columns,
            'total_unit_columns : ' + grid.total_unit_columns
        ].join('\\A ');

        siblingContainer.append(
            postcss.rule(
                { selector: appendSelectors(nthSelector, ':before') }
            ).append(
                { text: 'Nth-Grid Debug' },
                { prop: 'content', value: '"' + debugContent + '"' },
                { prop: 'display', value: 'block !important' },
                { prop: 'flex-basis', value: '100% !important' },
                { prop: 'overflow', value: 'hidden !important' },
                { prop: 'padding', value: '1em !important' },
                { prop: 'background', value: grid.debug_background_color + ' !important' },
                { prop: 'color', value: grid.debug_text_color + ' !important' },
                { prop: 'font-family', value: '"Lucida Console", "Consolas", Monaco, monospace !important' },
                { prop: 'font-size', value: '12px !important' },
                { prop: 'line-height', value: '1.4 !important' },
                { prop: 'text-align', value: 'left !important' },
                { prop: 'white-space', value: 'pre !important' }
            )
        );
    }
}
