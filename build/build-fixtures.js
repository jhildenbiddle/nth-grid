// Dependencies
// =============================================================================
const fs                   = require('fs');
const glob                 = require('glob');
const handlebars           = require('handlebars');
const mkdirp               = require('mkdirp');
const path                 = require('path');
const { registerHelpers }  = require('./helpers/register-hbs');
const { registerPartials } = require('./helpers/register-hbs');


// Settings
// =============================================================================
const fixturesTask = {
    data: require('../src/templates/data/grids.json'),
    dest: '../tests/fixtures/',
    jobs: {
        less: '../src/templates/partials/**/*-less.hbs',
        pcss: '../src/templates/partials/**/*-pcss.hbs',
        scss: '../src/templates/partials/**/*-scss.hbs',
        styl: '../src/templates/partials/**/*-styl.hbs'
    }
};


// Build
// =============================================================================
// Handlebars
registerHelpers('../src/templates/helpers/*.js', __dirname);
registerPartials('../src/templates/partials/*.hbs', __dirname);

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
