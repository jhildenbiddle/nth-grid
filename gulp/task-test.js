// Data
// =============================================================================
var pkg  = require('../package.json'),
    demo = {
        dest  : './_demo/'
    },
    test = {
        dest: './test/'
    };

// Exports
// =============================================================================
module.exports = {
    'diff': {
        lib: 'copy',
        src : demo.dest + 'assets/css/grids-*.css',
        dest: './test/diff/',
        repl: {
            patterns: [
                // Remove language prefix from grid declarations
                { match: /\.(less|postcss|sass|stylus)\s/g, replacement: '' },
                // Normalize indentation
                { match: /( {4}|\t)/g, replacement: '  ' },
                // Normalize line breaks
                { match: /\n{2}/g, replacement: '\n' }
            ]
        },
        get watch() { return this.src; }
    }
};
