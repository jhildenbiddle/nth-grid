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
const entryFile  = path.resolve('.', 'src', 'less', 'plugin', 'index.js');
const outputFile = path.resolve('.', 'dist', 'less', `less-plugin-${pkg.name}.js`);

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
                    browsers: ['ie >= 9']
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
// IIFE
const iife = merge({}, config, {
    output: {
        format: 'iife'
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.beautify)
    ])
});

// IIFE (Minified)
const iifeMinified = merge({}, config, {
    output: {
        file  : iife.output.file.replace(/\.js$/, '.min.js'),
        format: iife.output.format
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.minify)
    ])
});


// Exports
// =============================================================================
export default [
    iife,
    iifeMinified
];
