/* eslint no-console: 0 */

// Dependencies
// =============================================================================
const camelcase  = require('lodash.camelcase');
const fs         = require('fs');
const glob       = require('glob');
const handlebars = require('handlebars');
const mkdirp     = require('mkdirp');
const path       = require('path');


// Configuration
// =============================================================================
// Data
const data = {
    // Populated with paths.data content
    // Ex: file-name.json => data.fileName
};

// Paths
const paths = {
    data    : './demo/src/templates/data/*.{js,json}',
    dest    : './build/demo',
    helpers : './demo/src/templates/helpers/*.js',
    partials: './demo/src/templates/partials/*.hbs'
};

// Tasks
const tasks = {
    html: {
        src : './demo/src/templates/pages/**/*.hbs',
        ext : 'html'
    },
    less: {
        src : './demo/src/templates/style/**/*-less.hbs',
        ext : 'less'
    },
    postcss: {
        src : './demo/src/templates/style/**/*-postcss.hbs',
        ext : 'pcss'
    },
    sass: {
        src : './demo/src/templates/style/**/*-sass.hbs',
        ext : 'scss'
    },
    stylus: {
        src : './demo/src/templates/style/**/*-stylus.hbs',
        ext : 'styl'
    }
};


// Register
// =============================================================================
// Data
glob.sync(paths.data).forEach(filePath => {
    const fileName = path.parse(filePath).name;
    const dataKey  = camelcase(fileName);
    const dataVal  = require(filePath);

    data[dataKey] = dataVal;
});

// Helpers
glob.sync(paths.helpers).forEach(filePath => {
    const fileName   = path.parse(filePath).name;
    const helperName = camelcase(fileName);
    const helperFn   = require(filePath);

    handlebars.registerHelper(helperName, helperFn);
});

// Partials
glob.sync(paths.partials).forEach(filePath => {
    const partialName = path.parse(filePath).name;
    const partialData = fs.readFileSync(filePath, 'utf-8');

    handlebars.registerPartial(partialName, partialData);
});


// Output
// =============================================================================
// Tasks
for (const task in tasks) {
    glob.sync(tasks[task].src).forEach(filePath => {
        const fileName    = path.parse(filePath).name;
        const fileData    = fs.readFileSync(filePath, 'utf-8');
        const template    = handlebars.compile(fileData, { strict: true });
        const outFileData = template(data);
        const outFileName = `${fileName}.${tasks[task].ext}`;
        const outFileDir  = tasks[task].dest || paths.dest;
        const outFilePath = path.resolve(outFileDir, outFileName);

        if (!fs.existsSync(outFileDir)){
            mkdirp.sync(outFileDir);
        }

        fs.writeFile(outFilePath, outFileData, error => {
            if (error) {
                console.log(error);
            }
        });
    });
}
