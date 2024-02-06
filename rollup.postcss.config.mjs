// Dependencies
// =============================================================================
import { babel } from '@rollup/plugin-babel';
import commonjs  from '@rollup/plugin-commonjs';
import eslint    from '@rollup/plugin-eslint';
import fs        from 'node:fs';
import json      from '@rollup/plugin-json';
import merge     from 'lodash.merge';
import path      from 'node:path';
import resolve   from '@rollup/plugin-node-resolve';
import terser    from '@rollup/plugin-terser';

const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8') // prettier-ignore
);


// Settings
// =============================================================================
// Copyright
const currentYear = (new Date()).getFullYear();
const releaseYear = 2015;

// Output
const entryFile  = path.resolve('.', 'src', 'postcss', 'index.js');
const outputFile = path.resolve('.', 'dist', 'postcss', 'index.js');

// Banner
const bannerData = [
    `${pkg.name} v${pkg.version}`,
    `${pkg.homepage}`,
    `(c) ${releaseYear}${currentYear === releaseYear ? '' : '-' + currentYear} ${pkg.author}`,
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
        babelHelpers: 'bundled',
        presets: [
            ['@babel/env', {
                modules: false,
                targets: {
                    node: 8
                }
            }]
        ]
    },
    terser: {
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
    onwarn(warning) {
        // Disable circular dependency warnings
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            // eslint-disable-next-line
            console.error(`(!) ${warning.message}`);
        }
    }
};

// Formats
// -----------------------------------------------------------------------------
// CommonJS
const cjs = merge({}, config, {
    output: {
        exports: 'default',
        format: 'cjs'
    },
    plugins: [
        terser(pluginSettings.terser.beautify)
    ]
});


// Exports
// =============================================================================
export default [
    cjs
];
