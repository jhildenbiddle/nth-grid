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
// Paths
const paths = {
    helpers : path.resolve(__dirname, 'helpers/*.js'),
    partials: path.resolve(__dirname, 'partials/*.hbs')
};

// Tasks
const demoTask = {
    data: require('./data/grids.json'),
    dest: '../demo/',
    jobs: {
        html: 'pages/**/*.hbs',
        less: 'style/**/*.less.hbs',
        pcss: 'style/**/*.pcss.hbs',
        scss: 'style/**/*.scss.hbs',
        styl: 'style/**/*.styl.hbs'
    }
};
const fixturesTask = {
    data: require('./data/grids.json'),
    dest: '../fixtures/',
    jobs: {
        less: 'partials/**/*-less.hbs',
        pcss: 'partials/**/*-pcss.hbs',
        scss: 'partials/**/*-scss.hbs',
        styl: 'partials/**/*-styl.hbs'
    }
};


// Register
// =============================================================================
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
// Demo
for (const jobType in demoTask.jobs) {
    const jobPath    = path.resolve(__dirname, demoTask.jobs[jobType]);
    const outFileDir = path.resolve(__dirname, demoTask.dest);

    if (!fs.existsSync(outFileDir)){
        mkdirp.sync(outFileDir);
    }

    glob.sync(jobPath).forEach(filePath => {
        const fileData    = fs.readFileSync(filePath, 'utf-8');
        const template    = handlebars.compile(fileData, { strict: true });
        const outFileData = template(demoTask.data);
        const outFileName = path.parse(filePath).name;
        const outFilePath = path.resolve(outFileDir, outFileName);

        // console.log({
        //     outFilePath,
        //     outFileData,
        // });

        fs.writeFile(outFilePath, outFileData, error => {
            if (error) {
                console.log(error);
            }
        });
    });
}

// Fixtures
for (const jobType in fixturesTask.jobs) {
    const fixtureData = Object.assign({}, fixturesTask.data);
    const jobPath     = path.resolve(__dirname, fixturesTask.jobs[jobType]);

    glob.sync(jobPath).forEach(filePath => {
        const fileData   = fs.readFileSync(filePath, 'utf-8');
        const template   = handlebars.compile(fileData, { strict: true });
        const outFileDir = path.resolve(__dirname, fixturesTask.dest, jobType);

        if (!fs.existsSync(outFileDir)){
            mkdirp.sync(outFileDir);
        }

        for (const key in fixturesTask.data.grids) {
            fixtureData.grids = { [key]: fixturesTask.data.grids[key] };

            const outFileData = template(fixtureData);
            const outFileName = `${key}.${jobType}`;
            const outFilePath = path.resolve(outFileDir, outFileName);

            // console.log({
            //     outFilePath,
            //     outFileData,
            // });

            fs.writeFileSync(outFilePath, outFileData, error => {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
}
