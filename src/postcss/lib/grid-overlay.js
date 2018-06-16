// Dependencies
// =============================================================================
import postcss         from 'postcss';
import appendSelectors from '../util/append-selectors';
import unitMath        from '../util/unit-math';


// Exports
// =============================================================================
// Generates overlay css for grid columns
export default function gridOverlay(grid, nthSelector, selectorContainer, siblingContainer) {
    const overlayFontSize = '14px';

    if (grid.overlay) {
        selectorContainer.append(
            { text: 'Nth-Grid Overlay' },
            { prop: 'position', value: 'relative' },
            { prop: 'visibility', value: 'visible !important' },
            { prop: 'background', value: grid.overlay_margin_color + ' !important' }
        );

        siblingContainer.append(
            postcss.rule(
                { selector: nthSelector + ' > *' }
            ).append(
                { text: 'Nth-Grid Overlay' },
                { prop: 'position', value: 'relative !important' },
                { prop: 'min-height', value: unitMath([overlayFontSize, 3], ' * ') + ' !important' },
                { prop: 'background', value: grid.overlay_column_color +  ' !important' },
                { prop: 'color', value: 'transparent !important' }
            )
        );

        siblingContainer.append(
            postcss.rule(
                { selector: appendSelectors(nthSelector, ' > *:before') }
            ).append(
                { text: 'Nth-Grid Overlay' },
                { prop: 'position', value: 'absolute !important' },
                { prop: 'top', value: '0 !important' },
                { prop: 'bottom', value: '0 !important' },
                { prop: 'left', value: '0 !important' },
                { prop: 'right', value: '0 !important' },
                { prop: 'height', value: overlayFontSize + ' !important' },
                { prop: 'width', value: '100% !important' },
                { prop: 'margin', value: 'auto !important' },
                { prop: 'color', value: grid.overlay_text_color +  ' !important' },
                { prop: 'font-size', value: overlayFontSize +  ' !important' },
                { prop: 'text-align', value: 'center !important' },
                { prop: 'line-height', value: '1 !important' }
            )
        );

        siblingContainer.append(
            postcss.rule(
                { selector: nthSelector + ' > * > *' }
            ).append(
                { text: 'Nth-Grid Overlay' },
                { prop: 'visibility', value: 'hidden !important' }
            )
        );
    }
}
