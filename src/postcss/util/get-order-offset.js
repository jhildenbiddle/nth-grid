// Dependencies
// =============================================================================
import unitMath from '../util/unit-math';

// Exports
// =============================================================================
// Calculates columns offset for source ordering.
// Note that IE9 truncates css values after 128 characters. Grid columms
// that require an offset using a calc() string longer than this will
// not render properly.
export default function(settings, column, order) {
    let offset = 0, i;

    // Only columns following the first need offset calculated
    if (column > 1) {
        let sibling_val;

        // Calc() required
        if (settings.calc) {
            // Store sibling ratio column and gutter counts.
            // Used to generate the shortest possible calc() strings
            const offset_vals       = [];
            let sibling_gutters     = 0;
            let sibling_ratio_cols  = 0;
            const sibling_unit_cols = [];

            // Loop through all preceding columns
            for (i = 0; i < (column - 1); i++) {
                // Get sibling values from columns_normalized or order
                if (order) {
                    sibling_val = settings.columns_normalized[order[i] - 1];
                }
                else {
                    sibling_val = settings.columns_normalized[i];
                }

                // Gutter
                if (settings.gutter_h !== 0) {
                    sibling_gutters += 1;
                }

                // Ratio-based value
                if (Number(sibling_val)) {
                    sibling_ratio_cols += Number(sibling_val);
                }
                // Unit-based value
                else {
                    sibling_unit_cols.push(sibling_val);
                }
            }

            // Ratio offset
            if (sibling_ratio_cols > 0) {
                if (sibling_ratio_cols === 1) {
                    offset_vals.push(settings.grid_col_width);
                }
                else {
                    offset_vals.push('((' + settings.grid_col_width + ') * ' + sibling_ratio_cols + ')');
                }
            }

            // Unit offset
            if (sibling_unit_cols.length > 0) {
                offset_vals.push(sibling_unit_cols.join(' + '));
            }

            // Gutter offset
            if (sibling_gutters > 0) {
                if (sibling_gutters === 1) {
                    offset_vals.push(settings.gutter_h);
                }
                else {
                    offset_vals.push('(' + settings.gutter_h + ' * ' + sibling_gutters + ')');
                }
            }

            // Final offset
            offset = offset_vals.join(' + ');
        }
        // Calc() not required
        else {
            let column_width;

            // Loop through all preceding columns
            for (i = 0; i < (column - 1); i++) {
                // Get sibling values from columns_normalized or order
                if (order) {
                    sibling_val = settings.columns_normalized[order[i] - 1];
                }
                else {
                    sibling_val = settings.columns_normalized[i];
                }

                // Add ratio-based value
                if (Number(sibling_val)) {
                    const grid_col_width = settings.grid_col_width;

                    column_width = unitMath([grid_col_width, sibling_val], ' * ');
                    offset       = unitMath([offset, column_width, settings.gutter_h], ' + ');
                }
                // Add unit-based value
                else {
                    column_width = unitMath([sibling_val, settings.gutter_h], ' + ');
                    offset       = unitMath([offset, column_width], ' + ');
                }
            }
        }
    }

    return offset;
}
