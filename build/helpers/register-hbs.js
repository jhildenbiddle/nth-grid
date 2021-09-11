// Dependencies
// =============================================================================
const camelcase  = require('lodash.camelcase');
const fs         = require('fs');
const glob       = require('glob');
const handlebars = require('handlebars');
const path       = require('path');


// Register
// =============================================================================
// Register handlebars helpers
function registerHelpers(globPattern, basePath) {
    globPattern = basePath ? path.resolve(basePath, globPattern) : globPattern;

    const files = glob.sync(globPattern);

    if (files.length) {
        files.forEach(filePath => {
            const fileName   = path.parse(filePath).name;
            const helperName = camelcase(fileName);
            const helperFn   = require(filePath);

            // console.log('helper', {
            //     fileName,
            //     helperName,
            //     helperFn
            // });

            handlebars.registerHelper(helperName, helperFn);
        });
    }
    else {
        throw Error(`No helper files found at ${globPattern}`);
    }
}

// Register handlebars partials
function registerPartials(globPattern, basePath) {
    globPattern = basePath ? path.resolve(basePath, globPattern) : globPattern;

    const files = glob.sync(globPattern);

    if (files.length) {
        files.forEach(filePath => {
            const partialName = path.parse(filePath).name;
            const partialData = fs.readFileSync(filePath, 'utf-8');

            // console.log('partial', {
            //     partialName,
            //     partialData
            // });

            handlebars.registerPartial(partialName, partialData);
        });
    }
    else {
        throw Error(`No partial files found at ${globPattern}`);
    }
}

module.exports = {
    registerHelpers,
    registerPartials
};