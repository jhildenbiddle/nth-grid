// Helpers
// =============================================================================
var getNumber      = require('../util/get-number'),
    getOrderOffset = require('../util/get-order-offset'),
    getUnit        = require('../util/get-unit'),
    isUnitMatch    = require('../util/is-unit-match'),
    unitMath       = require('../util/unit-math');

// Exports
// =============================================================================
// Generates new object containing grid properties
function Grid(settings, options) {
    options = options || {};

    // Protect against instantiating without `new` keyword
    if (!(this instanceof Grid)) {
        return new Grid(settings, options);
    }

    // Nth-Grid Defaults
    var defaults = {
        // Layout
        columns               : [1],
        gutter                : 0,
        margin                : 0,
        center                : true,
        eqheight              : false,
        valign                : false,
        direction             : 'ltr',
        legacy                : false,

        // Debug
        debug                 : false,
        debug_background_color: '#000',
        debug_text_color      : '#ccc',

        // Overlay
        overlay               : false,
        overlay_column_color  : '#7c48c3',
        overlay_margin_color  : '#dabfff',
        overlay_text_color    : '#fff',

        // Compilation
        rem_base              : 16,
        remove_warnings       : true,
        warnings              : true
    };

    // Private defaults
    var settings_private = {
        width                 : '100%',
        order                 : false,
        auto_width            : null,
        calc                  : null,
        columns_ratio         : [],
        columns_unit          : [],
        grid_col_ratio        : 0,
        grid_col_width        : 0,
        grid_width            : null,
        gutter_h              : 0,
        columns_normalized    : [],
        margin_h              : 0,
        order_offsets         : [],
        total_columns         : 0,
        total_ratio_columns   : 0,
        total_unit_columns    : 0
    };

    // Update defaults with global options
    for (var opt in options) {
        if (opt in defaults) {
            defaults[opt] = options[opt];
        }
    }

    // Add private properties to settings
    // Adding these after the global options prevents setting private
    // settings via CSS or JS globals
    for (var priv in settings_private) {
        if (!(priv in settings)) {
            settings[priv] = settings_private[priv];
        }
    }

    // Add missing properties from defaults to settings
    for (var key in defaults) {
        if (!(key in settings)) {
            settings[key] = defaults[key];
        }
    }

    // Convert single-value columns layout and order settings to arrays
    settings.columns = settings.columns instanceof Array ? settings.columns : [settings.columns];
    settings.order = settings.order instanceof Array ? settings.order : settings.order !== false ? [settings.order] : settings.order;

    // Extract horizontal gutter and margin from arrays
    settings.gutter_h = settings.gutter instanceof Array ? (settings.gutter[1] || settings.gutter[0]) : settings.gutter;
    settings.gutter_v = settings.gutter instanceof Array ? settings.gutter[0] : settings.gutter;
    settings.margin_h = settings.margin instanceof Array ? (settings.margin[1] || settings.margin[0]) : settings.margin;
    settings.margin_v = settings.margin instanceof Array ? settings.margin[0] : settings.margin;

    // Direction
    settings.dir_left  = settings.direction == 'rtl' ? 'right' : 'left';
    settings.dir_right = settings.direction == 'rtl' ? 'left' : 'right';


    // Populate settings
    // ---------------------------------------------------------------------
    var i;

    // Ratio- and unit-based column lists
    for (i = 0; i < settings.columns.length; i++) {
        var val = settings.columns[i];

        if (Number(val)) {
            settings.columns_ratio.push(Number(val));
        }
        else {
            settings.columns_unit.push(val);
        }
    }

    // Total column count
    settings.total_ratio_columns = settings.columns_ratio.length == 1 ? settings.columns_ratio[0] : settings.columns_ratio.length;
    settings.total_unit_columns  = settings.columns_unit.length;
    settings.total_columns       = settings.total_ratio_columns + settings.total_unit_columns;

    // Calculate combined grid gutter and margin
    var grid_gutters = unitMath([settings.gutter_h, (settings.total_columns - 1)], ' * '),
        grid_margins = unitMath([settings.margin_h, 2], ' * ');

    // Grid ratio
    if (settings.columns_ratio.length === 1) {
        settings.grid_col_ratio = settings.columns_ratio[0];
    }
    else {
        settings.grid_col_ratio = 0;

        // Sum ratio based column values
        for (i = 0; i < settings.columns_ratio.length; i++) {
            settings.grid_col_ratio += settings.columns_ratio[i];
        }
    }

    // Are all units matched?
    var isMatched = isUnitMatch([]
        .concat(settings.width)
        .concat(settings.columns_unit)
        .concat(settings.gutter)
        .concat(settings.margin));

    // All all grid units matched?
    var isMatchedGrid = settings.columns_ratio.length === 0 && isUnitMatch([]
        .concat(settings.columns_unit)
        .concat(settings.gutter)
        .concat(settings.margin));

    // Are all grid values percent?
    var isPercentGrid = isUnitMatch([]
        .concat(settings.columns_unit)
        .concat(settings.gutter)
        .concat(settings.margin), '%');

    // Calc() required?
    settings.calc = isMatched || isMatchedGrid || isPercentGrid  ? false : true;

    // Grid container auto width
    if (settings.columns_ratio.length === 0) {
        // Calc() required
        if (settings.calc) {
            var grid_unit_cols = isUnitMatch(settings.columns_unit) ? unitMath(settings.columns_unit, ' + ') : settings.columns_unit.join(' + ');

            // Matched gutter & margin units
            if (settings.gutter_h !== 0 && settings.margin_h !== 0 && isUnitMatch([grid_gutters, grid_margins])) {
                settings.auto_width = grid_unit_cols + ' + ' + unitMath([grid_gutters, grid_margins], ' + ');
            }
            // Matched column and gutter units
            else if (settings.gutter_h !== 0 && isUnitMatch([grid_unit_cols, grid_gutters])) {
                settings.auto_width = unitMath([grid_unit_cols, grid_gutters], ' + ') + ' + ' + (settings.margin_h !== 0 ? grid_margins : '');
            }
            // Matched column and margin units
            else if (settings.margin_h !== 0 && isUnitMatch([grid_unit_cols, grid_margins])) {
                settings.auto_width = unitMath([grid_unit_cols, grid_margins], ' + ') + ' + ' + (settings.gutter_h !== 0 ? grid_gutters : '');
            }
            // No match
            else {
                settings.auto_width = grid_unit_cols;

                // Add gutters
                if (settings.gutter_h !== 0) {
                    settings.auto_width += ' + ' + grid_gutters;
                }

                // Add margins
                if (settings.margin_h !== 0) {
                    settings.auto_width += ' + ' + grid_margins;
                }
            }
        }
        // Calc() not required
        else {
            // Unit-based columns
            settings.auto_width = unitMath(settings.columns_unit, ' + ');

            // Add gutters and margins
            settings.auto_width = unitMath([settings.auto_width, grid_gutters, grid_margins], ' + ');
        }
    }

    // Ratio grid width - Calc() required
    // Grid width of 99.99% used for sub-pixel rendering bug (e.g. IE9, Chrome < 38)
    if (settings.calc) {
        // Single unit-based column
        if (settings.columns_unit.length === 1) {
            settings.grid_width = '99.99% - ' + settings.columns_unit[0];
        }
        // Multiple unit-based columns
        else if (settings.columns_unit.length > 1) {
            // Matched units
            if (isUnitMatch(settings.columns_unit)) {
                settings.grid_width = '99.99% - ' + unitMath(settings.columns_unit, ' + ');
            }
            // Mixed units
            else {
                settings.grid_width = '99.99% - (' + settings.columns_unit.join(' + ') + ')';
            }
        }
        // No unit-based columns
        else {
            settings.grid_width = '99.99%';
        }
    }
    // Ratio grid width - Calc() not required
    else {
        if (isMatched && getUnit(settings.width) !== '%') {
            settings.grid_width = settings.width;

            // Subtract unit-based column values from width
            if (settings.columns_unit.length) {
                settings.grid_width = unitMath([settings.grid_width, unitMath(settings.columns_unit, ' + ')], ' - ');
            }
        }
        else if (isPercentGrid) {
            settings.grid_width = '100%';

            // Subtract unit-based column values from width
            if (settings.columns_unit.length) {
                settings.grid_width = unitMath([settings.grid_width, unitMath(settings.columns_unit, ' + ')], ' - ');
            }
        }
        else {
            settings.grid_width = '100%';
        }
    }

    // Ratio-based column width
    if (settings.total_ratio_columns > 0) {
        // Calc() required
        if (settings.calc) {
            // Matched gutter and margin units
            if (settings.gutter_h !== 0 && settings.margin_h !== 0 && isUnitMatch([settings.gutter_h, settings.margin_h])) {
                settings.grid_col_width = settings.grid_width + ' - ' + unitMath([grid_gutters, grid_margins], ' + ');
            }
            // Matched column and gutter units
            else if (settings.gutter_h !== 0 && isUnitMatch([settings.grid_width, grid_gutters])) {
                settings.grid_col_width = unitMath([settings.grid_width, grid_gutters], ' - ');

                if (grid_margins !== 0) {
                    settings.grid_col_width += ' - ' + grid_margins;
                }
            }
            // Matched column and margin units
            else if (settings.margin_h !== 0 && isUnitMatch([settings.grid_width, grid_margins])) {
                settings.grid_col_width = unitMath([settings.grid_width, grid_margins], ' - ');

                if (grid_gutters !== 0) {
                    settings.grid_col_width += ' - ' + grid_gutters;
                }
            }
            // No match
            else {
                grid_gutters = settings.gutter_h !== 0 ? ' - ' + grid_gutters : '';
                grid_margins = settings.margin_h !== 0 ? ' - ' + grid_margins : '';

                settings.grid_col_width = settings.grid_width + grid_gutters + grid_margins;
            }

            // Divide by grid ratio
            settings.grid_col_width = '(' + settings.grid_col_width + ') / ' + settings.grid_col_ratio;
        }
        // Calc() not required
        else {
            // Calculate grid width without gutters and margins
            settings.grid_col_width = unitMath([settings.grid_width, grid_gutters, grid_margins], ' - ');

            // Divide by grid ratio
            settings.grid_col_width = unitMath([settings.grid_col_width, settings.grid_col_ratio], ' / ');
        }
    }

    // Calculate ordered column offsets
    if (settings.order && settings.order.length <= settings.total_columns) {
        // Expand single ratio-value column to multi-column
        // Ex: nth-grid(6) /* columns_normalized: 1 1 1 1 1 1 */
        if (settings.columns_ratio.length == 1) {
            for (i = 0; i < settings.columns.length; i++) {
                var col_val = settings.columns[i],
                    num     = Number(col_val) || false;

                // Single ratio-based value
                if (num) {
                    for (var j = 0; j < num; j++) {
                        settings.columns_normalized.push(1);
                    }
                }
                // Other values
                else {
                    settings.columns_normalized.push(col_val);
                }
            }
        }
        else {
            settings.columns_normalized = settings.columns;
        }

        // Loop through order
        for (i = 0; i < settings.order.length; i++) {
            var offset    = 0,
                order_val = settings.order[i];

            // Get offset of the order column value in the original column layout
            // Ex: Column 3 offset in original @columns
            var column_offset = getOrderOffset(settings, order_val);

            // Get offset of the order column number in the ordered column layout
            // Ex: Column 3 offset in $order 3 2 1 (1st position)
            var order_offset = getOrderOffset(settings, i + 1, settings.order);

            // Set final offset values in array
            if (order_offset !== column_offset) {
                // Calc() required
                if (settings.calc) {
                    if (order_offset === 0) {
                        offset = '0px - (' + column_offset + ')';
                    }
                    else if (column_offset === 0) {
                        offset = order_offset;
                    }
                    else {
                        offset = '(' + order_offset + ') - (' + column_offset + ')';
                    }
                }
                // Calc() not required
                else {
                    offset = unitMath([order_offset, column_offset], ' - ');
                }
            }

            // Push value to order offset array
            settings.order_offsets.push(offset);
        }
    }

    // Return settings object
    return settings;
}

module.exports = Grid;
