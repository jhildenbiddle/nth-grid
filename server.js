// Dependencies
// =============================================================================
const browserSync = require('browser-sync').create();
const compression = require('compression');

browserSync.init({
    files: [
        './build/demo/**/*',
        './demo/static/**/*',
        './docs/**/*'
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
            './docs'
        ],
        middleware: [
            compression()
        ],
        routes: {
            '/demo'        : './build/demo',
            '/CHANGELOG.md': './CHANGELOG.md'
        }
    },
    serveStatic: [
        './demo/static',
        { route: '/demo', dir: './dist' }
    ],
    snippetOptions: {
        // Prevent injection of browser-sync-client.js in IE < 9.
        // Allows browsersync to serve pages to older versions of IE without
        // errors, but requires manual refreshing pages to view changes.
        rule: {
            match: /<\/body>/i,
            fn: function (snippet, match, x) {
                return `<!--[if gt IE 8]><!-- -->${snippet}${match}<![endif]-->`;
            }
        }
    },
    rewriteRules: [
        // Replace CDN URLs with local paths
        {
            match  : /https:\/\/cdn\.jsdelivr\.net\/npm\/nth-grid@1/g,
            replace: ''
        }
    ]
});
