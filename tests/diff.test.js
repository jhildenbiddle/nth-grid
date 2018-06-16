// Dependencies
// =============================================================================
const chai   = require('chai');
const expect = require('chai').expect;
const fs     = require('fs');

chai.use(require('chai-diff'));


// Suite
// =============================================================================
describe('Diff nth-grid output', function() {
    const inputData = {
        less   : fs.readFileSync('./build/demo/grids-less.css', 'utf-8'),
        postcss: fs.readFileSync('./build/demo/grids-postcss.css', 'utf-8'),
        sass   : fs.readFileSync('./build/demo/grids-sass.css', 'utf-8'),
        stylus : fs.readFileSync('./build/demo/grids-stylus.css', 'utf-8')
    };
    const truthKey = 'sass';

    // Remove language prefixes, spaces and line breaks
    function normalizeData(data) {
        // return data.replace(/\.(less|postcss|sass|stylus)|\n|\s/g, '');
        return data.replace(/\.(less|postcss|sass|stylus)/g, '');
    }

    Object.keys(inputData).forEach(key => {
        if (key !== truthKey) {
            const testData  = normalizeData(inputData[key]);
            const truthData = normalizeData(inputData[truthKey]);

            it(`${key} matches ${truthKey}`, function() {
                expect(testData).not.differentFrom(truthData, {
                    context     : 5,
                    relaxedSpace: true
                });
            });
        }
    });
});
