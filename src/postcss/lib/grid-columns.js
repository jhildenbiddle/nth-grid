// Dependencies
// =============================================================================
import postcss         from 'postcss';
import appendSelectors from '../util/append-selectors';
import round           from '../util/round';
import unitMath        from '../util/unit-math';


// Functions
// =============================================================================
// Generates overly content rule
function overlayContent(grid, selector, container, content) {
    if (grid.overlay) {
        const selectorBefore = selector.map(function(sel) {
            return sel.trim() + ':before';
        });

        container.append(
            postcss.rule(
                { selector: selectorBefore }
            ).append(
                { prop: 'content', value: '"' + content + '" !important'}
            )
        );
    }
}


// Exports
// =============================================================================
// Generates css for grid columns
export default function gridColumns(grid, nthSelector, selectorContainer, siblingContainer) {
    let newRule;

    // Legacy warning
    if (grid.legacy === true && grid.calc === true && grid.warnings ===  true) {
        // eslint-disable-next-line
        console.warn(`NTH-GRID: "${nthSelector}" requires calc() support. This grid will not render properly in legacy browsers.`);
    }

    // All columns (low specificity)
    // -------------------------------------------------------------------------
    siblingContainer.append(
        postcss.rule(
            { selector: appendSelectors(nthSelector, ' > *') }
        ).append(
            { prop: 'display', value: 'block' },
            { prop: 'box-sizing', value: 'border-box' }
        )
    );

    // All columns (nth specificity)
    // -------------------------------------------------------------------------
    newRule = postcss.rule(
        { selector: appendSelectors(nthSelector, ' > *:nth-child(1n)') }
    ).append(
        { prop: 'float', value: grid.dir_left },
        { prop: 'clear', value: 'none' },
        { prop: 'position', value: 'static' },
        { prop: grid.dir_left, value: 'auto' },
        { prop: 'margin-' + grid.dir_right, value: '0' },
        // Gap - Vertical
        { prop: 'margin-top', value: grid.gap_v },
        // Gap - Horizontal
        { prop: 'margin-' + grid.dir_left, value: grid.gap_h }
    );

    if (grid.legacy === true) {
        // IE7 float fix
        newRule.append(
            { prop: '*display', value: 'inline' },
            { prop: '*float', value: 'none' },
            { prop: '*vertical-align', value: 'top' },
            { prop: '*zoom', value: '1' }
        );
    }

    siblingContainer.append(newRule);

    // All columns in first row
    // -------------------------------------------------------------------------
    siblingContainer.append(
        postcss.rule(
            { selector: appendSelectors(nthSelector, ' > *:nth-child(-n + ' + grid.total_columns + ')') }
        ).append(
            { prop: 'margin-top', value: grid.margin_v }
        )
    );

    if (grid.legacy === true && grid.margin_h === 0) {
        siblingContainer.append(
            // Last column in each row
            postcss.rule(
                { selector: appendSelectors(nthSelector, ' > *:nth-child(' + grid.total_columns + 'n)') }
            ).append(
                // IE7 sub-pixel rounding fix
                { prop: '*margin-' + grid.dir_right, value: '-2px' }
            )
        );
    }

    // First column each row
    // -------------------------------------------------------------------------
    siblingContainer.append(
        postcss.rule(
            { selector: appendSelectors(nthSelector, ' > *:nth-child(' + grid.total_columns + 'n + 1)') }
        ).append(
            { prop: 'clear', value: grid.dir_left },
            { prop: 'margin-' + grid.dir_left, value: grid.margin_h }
        )
    );

    // All columns in last row
    // -------------------------------------------------------------------------
    newRule = postcss.rule(
        { selector: appendSelectors(nthSelector, ' > *:nth-last-child(-n + ' + grid.total_columns + ')') }
    );

    // Margin - Vertical
    if (grid.margin_v === 0) {
        newRule.append(
            { prop: 'margin-bottom', value: '0' }
        );
    }
    // Calc used to target modern browsers because Selectivizr does
    // not properly match this selector using NWMatcher (it does match
    // properly with jQuery). Entire row must be targeted to ensure
    // proper alignment when vertical alignment option is used.
    else {
        newRule.append(
            { prop: 'margin-bottom', value: 'calc(' + grid.margin_v + ')' }
        );
    }

    siblingContainer.append(newRule);

    if (grid.legacy === true) {
        // Last child serving as "last row" for selectivir compatibility.
        // Only one element in the last row is needed for vertical margin
        // since vertical alignment (via flexbox) is not an issue.
        siblingContainer.append(
            postcss.rule(
                { selector: appendSelectors(nthSelector, ' > *:last-child') }
            ).append(
                { prop: 'margin-bottom', value: grid.margin_v }
            )
        );
    }

    // Width: Unit-based column(s) only
    // -------------------------------------------------------------------------
    if (grid.columns_ratio.length === 0) {
        grid.columns.forEach(function(columnVal, i) {
            i++;

            newRule = postcss.rule(
                { selector: appendSelectors(nthSelector, ' > *:nth-child(' + grid.total_columns + 'n + ' + i + ')') }
            ).append(
                { prop: 'width', value: columnVal }
            );

            siblingContainer.append(newRule);

            // Grid overlay
            overlayContent(grid, newRule.selector, siblingContainer, columnVal);
        });
    }

    // Width: Single ratio-based value
    // -------------------------------------------------------------------------
    else if (grid.columns_ratio.length === 1) {
        // Ratio-based column
        newRule = postcss.rule(
            { selector: appendSelectors(nthSelector, ' > *:nth-child(1n)') }
        );

        // Calc() required
        if (grid.calc) {
            siblingContainer.append(
                newRule.append(
                    { prop: 'width', value: 'calc(' + grid.grid_col_width + ')'}
                )
            );

            // Grid overlay
            overlayContent(grid, newRule.selector, siblingContainer, '1/' + grid.grid_col_ratio + ' (calc)');
        }
        // Calc() not required
        else {
            siblingContainer.append(
                newRule.append(
                    { prop: 'width', value: round(grid.grid_col_width)}
                )
            );

            // Grid overlay
            overlayContent(grid, newRule.selector, siblingContainer, '1/' + grid.grid_col_ratio + ' (' + round(grid.grid_col_width, 2) + ')');
        }

        // Unit-based column(s)
        if (grid.columns_unit.length > 0) {
            grid.columns.forEach(function(columnVal, i) {
                columnVal = Number(columnVal) || columnVal;

                if (columnVal !== grid.total_ratio_columns) {
                    const nthCol = i > grid.columns.indexOf(grid.total_ratio_columns) ? i + grid.total_ratio_columns : i + 1;

                    newRule = postcss.rule(
                        { selector: appendSelectors(nthSelector, ' > *:nth-child(' + grid.total_columns + 'n + ' + nthCol + ')') }
                    ).append(
                        { prop: 'width', value: columnVal }
                    );

                    siblingContainer.append(newRule);

                    // Grid overlay
                    overlayContent(grid, newRule.selector, siblingContainer, columnVal);
                }
            });
        }
    }

    // Width: Mutiple ratio-based values
    // -------------------------------------------------------------------------
    else {
        grid.columns.forEach(function(columnVal, i) {
            i++;

            const newRule = postcss.rule(
                { selector: appendSelectors(nthSelector, ' > *:nth-child(' + grid.total_columns + 'n + ' + i + ')') }
            );

            // Ratio-based column
            if (Number(columnVal)) {
                // Calc() required
                if (grid.calc) {
                    siblingContainer.append(
                        newRule.append(
                            { prop: 'width', value: 'calc((' + grid.grid_col_width + ') * ' + columnVal + ')' }
                        )
                    );

                    // Grid overlay
                    overlayContent(grid, newRule.selector, siblingContainer, columnVal + '/' + grid.grid_col_ratio + ' (calc)');
                }
                // Calc() not required
                else {
                    const columnWidth = round(unitMath([grid.grid_col_width, columnVal], ' * '));

                    siblingContainer.append(
                        newRule.append(
                            { prop: 'width', value: columnWidth }
                        )
                    );

                    // Grid overlay
                    overlayContent(grid, newRule.selector, siblingContainer, columnVal + '/' + grid.grid_col_ratio + ' (' + round(columnWidth, 2) + ')');
                }
            }
            // Unit-based columns
            else {
                siblingContainer.append(
                    newRule.append(
                        { prop: 'width', value: columnVal }
                    )
                );

                // Grid overlay
                overlayContent(grid, newRule.selector, siblingContainer, columnVal);
            }
        });
    }

    // Order
    // -------------------------------------------------------------------------
    // Invalid order
    if (grid.order && grid.order.length > grid.total_columns) {
        if (grid.warnings ===  true) {
            // eslint-disable-next-line
            console.warn(`NTH-GRID: "${nthSelector}" order [${grid.order}] exceeds total column count of ${grid.total_columns} for columns [${grid.columns}]. Order not applied.`);
        }
    }
    // Valid order
    else if (grid.order_offsets.length) {
        grid.order_offsets.forEach(function(offset, i) {
            const orderVal = grid.order[i];

            if (offset !== 0) {
                siblingContainer.append(
                    postcss.rule(
                        { selector: appendSelectors(nthSelector, ' > *:nth-child(' + grid.total_columns + 'n + ' + orderVal + ')') }
                    ).append(
                        { prop: 'position', value: 'relative' },
                        { prop: grid.dir_left, value: grid.calc ? 'calc(' + offset + ')' : round(offset) }
                    )
                );
            }
        });
    }
}
