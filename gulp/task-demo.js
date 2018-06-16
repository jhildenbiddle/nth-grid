// Packages
// =============================================================================
var nthGrid = require('../src/nth-grid/postcss');

// Data
// =============================================================================
var pkg  = require('../package.json'),
    common = {
        assets: './src/assets/',
    },
    demo = {
        dest: './_demo/',
        src : './src/demo/',
        tpl : './src/demo/templates/'
    },
    dist = {
        dest: './dist/',
        src : './src/nth-grid/'
    },
    test = {
        dest: './test/'
    };

// Exports
// =============================================================================
module.exports = {
    browsersync: {
        path: demo.dest
    },
    clean: {
        path: demo.dest
    },
    'copy-static': {
        lib : 'copy',
        src : demo.src + 'assets/static/**/*.*',
        dest: demo.dest + 'assets/',
        get watch() { return this.src; }
    },
    'copy-dist-less': {
        lib : 'copy',
        base: dist.dest,
        src : dist.dest + 'less/*.*',
        dest: demo.dest + 'assets/',
        get watch() { return this.src; }
    },
    'html-hbs': {
        lib     : 'handlebars',
        src     : demo.tpl + 'pages/**/*.hbs',
        dest    : demo.dest,
        ext     : 'html',
        data    : demo.tpl + 'data/grids.json',
        helpers : demo.tpl + 'helpers/*.js',
        partials: demo.tpl + 'partials/**/*.hbs',
        get watch() {
            return [
                this.src,
                this.data,
                this.helpers,
                this.partials
            ];
        }
    },
    images: {
        src : demo.src + 'assets/images/**/*.{gif,jpg,png,svg,webp}',
        dest: demo.dest + 'assets/images/',
        get watch() { return this.src; }
    },
    'js-main': {
        lib : 'js',
        src : demo.src + 'assets/js/*.js',
        dest: demo.dest + 'assets/js/',
        file: 'main.js',
        get watch() { return this.src; }
    },
    'js-vendor-legacy': {
        lib : 'js',
        src : [
            // Order matters for legacy support, so no globbing
             demo.src + 'assets/js/vendor-legacy/html5shiv.js',
             demo.src + 'assets/js/vendor-legacy/jquery.js',
             demo.src + 'assets/js/vendor-legacy/selectivizr-patched.js',
             demo.src + 'assets/js/vendor-legacy/respond.js',
        ],
        dest: demo.dest + 'assets/js/',
        file: 'vendor-legacy.js',
        hint: false,
        maps: false,
        get watch() { return this.src; }
    },
    sass: {
        lib   : 'style',
        lang  : 'sass',
        opts  : {
            includePaths: [
                './bower_components/',
                './node_modules/',
                dist.dest + 'sass/'
            ]
        },
        src   : demo.src + 'assets/sass/*.{sass,scss}',
        dest  : demo.dest + 'assets/css/',
        watch : [
            common.assets + 'sass/**/*',
            demo.src + 'assets/sass/**/*'
        ]
    },
    sassdoc: {
        src : dist.dest + 'sass/_nth-grid.scss',
        dest: demo.dest + 'sassdoc',
        get watch() { return this.src; }
    },

    // Demo: Generate CSS source for each CSS processor
    // -------------------------------------------------------------------------
    'grids-less-hbs': {
        lib  : 'handlebars',
        src  : demo.tpl + 'partials/grids-less.hbs',
        dest : demo.dest + 'assets/less/',
        ext  : 'less',
        data : demo.tpl + 'data/grids.json',
        get watch() {
            return [
                this.src,
                this.data,
                dist.dest + 'less/*.*'
            ];
        }
    },
    'grids-postcss-hbs': {
        lib  : 'handlebars',
        src  : demo.tpl + 'partials/grids-postcss.hbs',
        dest : demo.dest + 'assets/postcss/',
        ext  : 'pcss',
        data : demo.tpl + 'data/grids.json',
        get watch() {
            return [
                this.src,
                this.data
            ];
        }
    },
    'grids-sass-hbs': {
        lib  : 'handlebars',
        src  : demo.tpl + 'partials/grids-sass.hbs',
        dest : demo.dest + 'assets/sass/',
        ext  : 'scss',
        data : demo.tpl + 'data/grids.json',
        get watch() {
            return [
                this.src,
                this.data,
                dist.dest + 'sass/*.*'
            ];
        }
    },
    'grids-stylus-hbs': {
        lib  : 'handlebars',
        src  : demo.tpl + 'partials/grids-stylus.hbs',
        dest : demo.dest + 'assets/stylus/',
        ext  : 'styl',
        data : demo.tpl + 'data/grids.json',
        get watch() {
            return [
                this.src,
                this.data,
                dist.dest + 'stylus/*.*'
            ];
        }
    },

    // Demo: Generate final CSS from processor source for demo grids
    // -------------------------------------------------------------------------
    'grids-less-css': {
        lib   : 'style',
        lang  : 'less',
        src   : demo.dest + 'assets/less/grids*.less',
        dest  : demo.dest + 'assets/css/',
        minify: false,
        get watch() { return this.src; }
    },
    'grids-postcss-css': {
        lib    : 'style',
        src    : demo.dest + 'assets/postcss/grids*.{css,pcss,postcss}',
        dest   : demo.dest + 'assets/css/',
        plugins: [
            nthGrid
        ],
        minify : false,
        get watch() { return this.src; }
    },
    'grids-sass-css': {
        lib   : 'style',
        lang  : 'sass',
        src   : demo.dest + 'assets/sass/grids*.{sass,scss}',
        dest  : demo.dest + 'assets/css/',
        minify: false,
        get watch() { return this.src; }
    },
    'grids-stylus-css': {
        lib   : 'style',
        lang  : 'stylus',
        src   : demo.dest + 'assets/stylus/grids*.styl',
        dest  : demo.dest + 'assets/css/',
        minify: false,
        get watch() { return this.src; }
    }
};
