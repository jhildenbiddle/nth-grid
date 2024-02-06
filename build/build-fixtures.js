// Dependencies
// =============================================================================
const fs                   = require('fs');
const glob                 = require('glob');
const handlebars           = require('handlebars');
const { mkdirp }           = require('mkdirp');
const path                 = require('path');
const { registerHelpers }  = require('./helpers/register-hbs');
const { registerPartials } = require('./helpers/register-hbs');


// Settings
// =============================================================================
const fixtureData = require('../src/templates/data/grids.json');
const fixtureDest = '../tests/fixtures/';
const fixtureJobs = {
    less: {
        path: '../src/templates/partials/grid.less.hbs',
        ext: 'less'
    },
    postcss: {
        path: '../src/templates/partials/grid.pcss.hbs',
        ext: 'pcss'
    },
    sass   : {
        path: '../src/templates/partials/grid.scss.hbs',
        ext: 'scss'
    },
    stylus : {
        path: '../src/templates/partials/grid.styl.hbs',
        ext: 'styl'
    }
};


// Build
// =============================================================================
// Handlebars
registerHelpers('../src/templates/helpers/*.js', __dirname);
registerPartials('../src/templates/partials/*.hbs', __dirname);

// Fixtures
for (const jobName in fixtureJobs) {
    const jobPath = path.resolve(__dirname, fixtureJobs[jobName].path);

    glob.sync(jobPath).forEach(filePath => {
        const fileData   = fs.readFileSync(filePath, 'utf-8');
        const template   = handlebars.compile(fileData, { strict: true });
        const outFileDir = path.resolve(__dirname, fixtureDest, jobName);

        if (!fs.existsSync(outFileDir)){
            mkdirp.sync(outFileDir);
        }

        for (const key in fixtureData.grids) {
            const jobData = JSON.parse(JSON.stringify(fixtureData));

            // Remove other grids
            jobData.grids = { [key]: jobData.grids[key] };

            const outFileData = template(jobData);
            const outFileName = `${key}.${fixtureJobs[jobName].ext}`;
            const outFilePath = path.resolve(outFileDir, outFileName);

            // console.log({
            //     outFilePath,
            //     outFileData,
            // });

            fs.writeFileSync(outFilePath, outFileData, error => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                }
            });
        }
    });
}
