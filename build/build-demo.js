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
const demoData = require('../src/templates/data/grids.json');
const demoDest = '../demo/';
const demoJobs = {
    html   : '../src/templates/pages/**/*.hbs',
    less   : '../src/templates/partials/grids.less.hbs',
    postcss: '../src/templates/partials/grids.pcss.hbs',
    sass   : '../src/templates/partials/grids*.scss.hbs',
    stylus : '../src/templates/partials/grids.styl.hbs'
};


// Build
// =============================================================================
// Handlebars
registerHelpers('../src/templates/helpers/*.js', __dirname);
registerPartials('../src/templates/partials/*.hbs', __dirname);

// Output
for (const jobName in demoJobs) {
    const jobPath    = path.resolve(__dirname, demoJobs[jobName]);
    const outFileDir = path.resolve(__dirname, demoDest);

    if (!fs.existsSync(outFileDir)){
        mkdirp.sync(outFileDir);
    }

    glob.sync(jobPath).forEach(filePath => {
        const fileData    = fs.readFileSync(filePath, 'utf-8');
        const template    = handlebars.compile(fileData, { strict: true });
        const outFileData = template(demoData);
        const outFileName = path.parse(filePath).name.replace(/(^grids)/, `$1-${jobName}`);
        const outFilePath = path.resolve(outFileDir, outFileName);

        // console.log({
        //     outFilePath,
        //     outFileData
        // });

        fs.writeFile(outFilePath, outFileData, error => {
            if (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        });
    });
}
