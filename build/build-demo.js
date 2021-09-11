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
const demoTask = {
    data: require('../src/templates/data/grids.json'),
    dest: '../demo/',
    jobs: {
        html: '../src/templates/pages/**/*.hbs',
        less: '../src/templates/style/**/*.less.hbs',
        pcss: '../src/templates/style/**/*.pcss.hbs',
        scss: '../src/templates/style/**/*.scss.hbs',
        styl: '../src/templates/style/**/*.styl.hbs'
    }
};


// Build
// =============================================================================
// Handlebars
registerHelpers('../src/templates/helpers/*.js', __dirname);
registerPartials('../src/templates/partials/*.hbs', __dirname);

// Output
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
