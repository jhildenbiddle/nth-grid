// Dependencies
// =============================================================================
import getNumber     from './util/get-number';
import getUnit       from './util/get-unit';
import Grid          from './lib/grid';
import gridColumns   from './lib/grid-columns';
import gridContainer from './lib/grid-container';
import gridDebug     from './lib/grid-debug';
import gridOverlay   from './lib/grid-overlay';
import normalize     from './util/normalize';
import postcss       from 'postcss';


// Exports
// =============================================================================
// Entry point for PostCSS plugin
export default postcss.plugin('postcss-nth-grid', options => {
    options = options || {};

    const NTH_GLOBAL_PREFIX = '--nth-grid-';
    const NTH_SELECTOR      = 'nth-grid';

    return function(css) {
        // Loop through rules and find all global settings in root element(s)
        css.walkRules(function(rule) {
            // Global options
            if (rule.selector === ':root') {
                rule.walkDecls(function(decl) {
                    if (decl.prop.indexOf(NTH_GLOBAL_PREFIX) === 0) {
                        const key = decl.prop.replace(NTH_GLOBAL_PREFIX, '').replace(/-/g, '_');
                        const arr = decl.value.split(' ').map(function(val){
                            return normalize(val);
                        });

                        // Add to options object
                        options[key] = arr.length > 1 ? arr : arr[0];
                    }
                });

                // Remove options
                if (options.remove_globals) {
                    // Remove declarations
                    rule.walkDecls(function(decl) {
                        if (decl.prop.indexOf(NTH_GLOBAL_PREFIX) === 0) {
                            decl.remove();
                        }
                    });

                    // Remove root element if empty
                    if (rule.nodes.length === 0) {
                        rule.remove();
                    }
                }
            }

            // Nth-Grid blocks
            if (rule.selector === NTH_SELECTOR) {
                const nthRule     = rule;
                const nthSelector = nthRule.parent.selector;
                const settings    = {};

                // Nth-Grid Variables
                // -------------------------------------------------------------
                // Add semicolon to last declarations
                nthRule.parent.raws.semicolon = true;

                // Loop through nth-grid declaration and update settings
                nthRule.walkDecls(function(decl) {
                    const key = decl.prop.replace(/-/g, '_');
                    const arr = decl.value.split(' ').map(function(val){
                        return normalize(val);
                    });

                    // Add to settings object
                    settings[key] = arr.length > 1 ? arr : arr[0];
                });

                // Get grid settings and store as object
                const grid = new Grid(settings, options);

                // Create placeholder containers for all generated css.
                // By adding new nodes to these containers first and then moving
                // the child nodes after css generation is complete we can use
                // 'append' instead of 'insert' and ensure new css content is
                // added in the correct order and respect the position of the
                // declarations that proceed the nth-grid block.
                const selectorContainer = nthRule.clone({ selector: 'nth-grid-output' })
                    .removeAll()
                    .moveAfter(nthRule);

                // Create placeholder rule for all generated css
                const siblingContainer = nthRule.clone({ selector: 'nth-grid-sibling-output' })
                    .removeAll()
                    .moveAfter(nthRule.parent);

                // Nth-Grid CSS
                // -------------------------------------------------------------
                // Generate content within placeholder containers
                gridContainer(grid, nthSelector, selectorContainer, siblingContainer);
                gridColumns(grid, nthSelector, selectorContainer, siblingContainer);
                gridOverlay(grid, nthSelector, selectorContainer, siblingContainer);
                gridDebug(grid, nthSelector, selectorContainer, siblingContainer);

                // Convert rem values to px for legacy browsers
                if (grid.legacy) {
                    // Loop through containers
                    [selectorContainer, siblingContainer].forEach(function(container) {
                        container.walk(function(node) {
                            if (node.value && getUnit(node.value) === 'rem') {
                                const pxVal = getNumber(node.value) * grid.rem_base + 'px';

                                node.parent.insertBefore(node, node.clone({ prop: node.prop, value: pxVal }));
                            }
                        });
                    });
                }

                // Loop through containers
                [selectorContainer, siblingContainer].forEach(function(container) {
                    container.each(function(node) {
                        // Set each node's source to the nthRule source
                        node.source = nthRule.source;
                        // Move the node
                        node.moveBefore(container);
                    });
                    // Remove the container
                    container.remove();
                });

                // Remove nth-grid block
                nthRule.remove();
            }
        });
    };
});
