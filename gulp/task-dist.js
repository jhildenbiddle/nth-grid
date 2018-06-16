// Data
// =============================================================================
var pkg  = require('../package.json'),
    dist = {
        dest: './dist/',
        src : './src/nth-grid/'
    };

// Exports
// =============================================================================
module.exports = {
    'less-plugin': {
        lib  : 'browserify',
        src  : dist.src + 'less/plugin/index.js',
        dest : dist.dest + 'less/',
        file : '_nth-grid-plugin.js',
        maps : false,
        watch: dist.src + 'less/plugin/**/*.js'
    },
    'mixins': {
        lib: 'copy',
        base: dist.src,
        src : [
            dist.src + '**/*.{less,scss,styl}'
        ],
        dest: dist.dest,
        repl: {
            patterns: [
                { match: 'author', replacement: pkg.author },
                { match: 'description', replacement: pkg.description },
                { match: 'license', replacement: pkg.license },
                { match: 'homepage', replacement: pkg.homepage },
                { match: 'version', replacement: pkg.version }
            ]
        },
        get watch() { return this.src; }
    }
};
