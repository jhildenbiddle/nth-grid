// Dependencies
// =============================================================================
const path = require('path');

import babel    from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import eslint   from 'rollup-plugin-eslint';
import json     from 'rollup-plugin-json';
import merge    from 'lodash.merge';
import pkg      from './package.json';
import resolve  from 'rollup-plugin-node-resolve';
import uglify   from 'rollup-plugin-uglify';


// Functions
// =============================================================================
// Disable circular dependency warnings
function onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        // eslint-disable-next-line
        console.error(`(!) ${warning.message}`);
    }
}


// Settings
// =============================================================================
// Output
const entryFile  = path.resolve(__dirname, 'src', 'postcss', 'index.js');
const outputFile = path.resolve(__dirname, 'dist', 'postcss', `postcss-${pkg.name}.js`);

// Banner
const bannerData = [
    `${pkg.name}`,
    `v${pkg.version}`,
    `${pkg.homepage}`,
    `(c) ${(new Date()).getFullYear()} ${pkg.author}`,
    `${pkg.license} license`
];

// Plugins
const pluginSettings = {
    eslint: {
        exclude       : ['node_modules/**', './package.json'],
        throwOnWarning: false,
        throwOnError  : true
    },
    babel: {
        babelrc: false,
        exclude: ['node_modules/**'],
        presets: [
            ['env', {
                modules: false,
                targets: {
                    node: 8
                }
            }]
        ],
        plugins: [
            'external-helpers'
        ]
    },
    uglify: {
        beautify: {
            compress: false,
            mangle  : false,
            output: {
                beautify: true,
                comments: /(?:^!|@(?:license|preserve))/
            }
        },
        minify: {
            compress: true,
            mangle  : true,
            output  : {
                comments: new RegExp(pkg.name)
            }
        }
    }
};


// Config
// =============================================================================
// Base
const config = {
    input : entryFile,
    output: {
        file     : outputFile,
        banner   : `/*!\n * ${ bannerData.join('\n * ') }\n */`,
        sourcemap: true
    },
    external: [
        'postcss'
    ],
    plugins: [
        resolve(),
        commonjs(),
        json(),
        eslint(pluginSettings.eslint),
        babel(pluginSettings.babel)
    ],
    watch: {
        clearScreen: false
    },
    onwarn: onwarn
};

// Formats
// -----------------------------------------------------------------------------
// CommonJS
const cjs = merge({}, config, {
    output: {
        format: 'cjs'
    },
    plugins: [
        uglify(pluginSettings.uglify.beautify)
    ]
});


// Exports
// =============================================================================
export default [
    cjs
];
