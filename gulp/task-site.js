// Data
// =============================================================================
var pkg  = require('../package.json'),
    common = {
        assets: './src/assets/',
    },
    dist = {
        dest: './dist/'
    },
    site = {
        dest: './_site/',
        src : './src/site/'
    };

// Exports
// =============================================================================
module.exports = {
    browsersync: {
        path: site.dest,
        opts: {
            ghostMode: false
        }
    },
    clean: {
        path: site.dest
    },
    'copy-static': {
        lib : 'copy',
        src : site.src + 'assets/static/**/*.*',
        dest: site.dest + 'assets/',
        get watch() { return this.src; }
    },
    html: {
        src  : site.src + '**/*.html',
        dest : site.dest,
        watch: site.src + '**/*.{html,inc}'
    },
    images: {
        src : site.src + 'assets/images/**/*.{gif,jpg,png,svg,webp}',
        dest: site.dest + 'assets/images',
        get watch() { return this.src; }
    },
    'js-main': {
        lib  : 'browserify',
        src  : site.src + 'assets/js/main.js',
        dest : site.dest + 'assets/js/',
        file : 'main.js',
        watch: [
            site.src + 'assets/js/*',
            site.src + 'assets/js/lib/*'
        ]
    },
    'js-vendor': {
        lib : 'js',
        src : site.src + 'assets/js/vendor/*.js',
        dest: site.dest + 'assets/js/',
        file: 'vendor.js',
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
        src   : site.src + 'assets/sass/*.{sass,scss}',
        dest  : site.dest + 'assets/css/',
        watch : [
            common.assets + 'sass/**/*',
            site.src + 'assets/sass/**/*'
        ]
    }
};
