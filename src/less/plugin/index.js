/* global functions, tree */

// =============================================================================
// Less Plugin Documentation (not easy to find, but these links help)
// =============================================================================
// Source
// -----------------------------------------------------------------------------
// https://github.com/less/less.js/tree/master/lib/less/tree
// https://github.com/less/less.js/tree/master/test/less/plugin

// Links
// -----------------------------------------------------------------------------
// https://github.com/less/less.js/issues/1861
// https://github.com/less/less-docs/issues/328
// https://github.com/less/less.js/pull/2479
// https://github.com/less/less.js/pull/2522
// https://github.com/less/less.js/issues/1862

// Dependencies
// =============================================================================
import Grid    from '../../postcss/lib/grid';
import toArray from './lib/to-array';
import toTree  from './lib/to-tree';
import toValue from './lib/to-value';


// Plugin
// =============================================================================
let settings;

const api = {
    // Log message to console
    'nth-log': function(lessTreeObj) {
        // eslint-disable-next-line
        console.log(`Nth-Grid: ${lessTreeObj.value}`);

        return false;
    },
    // Log warning message to console
    'nth-warn': function(lessTreeObj) {
        // eslint-disable-next-line
        console.warn(`Nth-Grid: ${lessTreeObj.value}`);

        return false;
    },
    // Creates Grid instance
    'nth-grid': function(columns, gutter, margin, width, order) {
        // Convert Less tree objects to standard JavaScript types
        settings = {
            columns: toArray(columns),
            gutter : toArray(gutter),
            margin : toArray(margin),
            width  : toValue(width),
            order  : order.type === 'Expression' ? toArray(order) : false
        };

        settings = new Grid(settings);

        // Send return value (warning message displayed if not true)
        return new tree.Keyword('true');
    },
    // Returns value from Grid instance
    'nth-get': function(lessTreeObj) {
        const key = lessTreeObj.value;

        // Check if key exists
        if (key in settings) {
            // Return Less tree object
            return toTree(settings[key]);
        }
        // Invalid key
        else {
            // eslint-disable-next-line
            console.log(`NTH-GRID: ${key} is not a valid key.`);
        }
    }
};

// Add functions to Less registry
functions.addMultiple(api);
