// Setup
// =============================================================================
// Paths
var path    = require('path'),
    libPath = path.resolve('./gulp/lib') + '/';

// Packages
var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')(),
    taskListing = require('gulp-task-listing');

// Helpers
var createTasks = require('./gulp/util/create-tasks');

// Store 'require' with root context for simplified "from project root" loading
plugins.require = require;

// Tasks & Run Sequence
// =============================================================================
var gulpTaskObj = {
    // Distribution
    // -------------------------------------------------------------------------
    'dist-build': {
        config: require('./gulp/task-dist'),
        watch : false,
        order : [
            [
                'less-plugin',
                'mixins'
            ]
        ]
    },

    // Demo
    // -------------------------------------------------------------------------
    'demo-build': {
        config: require('./gulp/task-demo'),
        watch : false,
        order : [
            'dist-build',
            [
                'grids-less-hbs',
                'grids-postcss-hbs',
                'grids-sass-hbs',
                'grids-stylus-hbs'
            ],
            [
                'copy-static',
                'copy-dist-less',
                'grids-less-css',
                'grids-postcss-css',
                'grids-sass-css',
                'grids-stylus-css',
                'html-hbs',
                'images',
                'js-main',
                'js-vendor-legacy',
                'sass',
                'sassdoc'
            ]
        ],
        tasks: [
            'browsersync',
            'clean'
        ]
    },

    // Test
    // -------------------------------------------------------------------------
    'test-build': {
        config: require('./gulp/task-test'),
        watch : false,
        order : [
            'diff'
        ]
    },

    // Development
    // -------------------------------------------------------------------------
    dev: {
        order : [
            'demo-build',
            'test-build',
            [
                'dist-build-watch',
                'demo-build-watch',
                'test-build-watch',
                'demo-build-browsersync'
            ]
        ]
    },

    // Site
    // -------------------------------------------------------------------------
    'site-build': {
        config: require('./gulp/task-site'),
        watch : false,
        order : [
            [
                'copy-static',
                'html',
                'images',
                'js-main',
                'js-vendor',
                'sass'
            ]
        ],
        tasks: [
            'browsersync',
            'clean'
        ]
    },
    site: {
        order : [
            'site-build',
            [
                'site-build-watch',
                'site-build-browsersync'
            ]
        ]
    },

    // Utility
    // -------------------------------------------------------------------------
    bump: {
        config: require('./gulp/task-bump'),
        order: [
            'patch'
        ],
        tasks: [
            'beta',
            'major',
            'minor'
        ]
    },
    clean: {
        order: [
            [
                'demo-build-clean',
                'site-build-clean'
            ],
        ]
    }
};

// Create tasks
createTasks(gulpTaskObj, libPath, plugins);

// Additional Tasks
// =============================================================================
// Help: Display all gulp tasks
gulp.task('tasks', taskListing);

// Default: Display main gulp tasks
gulp.task('default', function() {
    console.log('============================================================');
    console.log('Nth-Grid Tasks');
    console.log('============================================================');
    console.log('gulp bump        = Bump patch version');
    console.log('gulp bump-[type] = Bump [beta|major|minor|patch] version');
    console.log('gulp clean       = Delete build code from dev and site tasks');
    console.log('gulp dev         = Build demo/dist/test code and serve demo');
    console.log('gulp site        = Build and serve Nth-Grid public site');
    console.log('gulp site-deploy = Deploy Nth-Grid site to Github');
    console.log('gulp tasks       = List available gulp tasks');
    console.log('------------------------------------------------------------');
    console.log('npm test         = Run Nth-Grid unit tests');
    console.log('------------------------------------------------------------');
});
