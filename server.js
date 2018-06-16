// Dependencies
// =============================================================================
const browserSync = require('browser-sync').create();
const compression = require('compression');

browserSync.init({
    files: [
        './build/demo/**/*.*',
        './demo/static/**/*.*',
        './docs/**/*.*'
    ],
    ghostMode: {
        clicks: false,
        forms : false,
        scroll: false
    },
    open: false,
    notify: false,
    reloadOnRestart: true,
    reloadDebounce: 500,
    server: {
        baseDir: [
            './build/demo'
        ],
        middleware: [
            compression()
        ],
        routes: {
            '/docs': './docs',
            '/sassdoc': './docs/sassdoc',
        }
    },
    serveStatic: [
        './demo/static',
        './dist'
    ]
});
