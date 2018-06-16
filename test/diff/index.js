// Packages
// =============================================================================
var chai   = require('chai'),
    expect = chai.expect,
    fs     = require('fs');

// Paths
// =============================================================================
var testRoot = './test/diff/';

// Tests
// =============================================================================
// Diff test
// -----------------------------------------------------------------------------
describe('Nth-Grid CSS Diff', function() {
    var diffPaths = {
            less    : testRoot + 'grids-less.css',
            postcss : testRoot + 'grids-postcss.css',
            sass    : testRoot + 'grids-sass.css',
            stylus  : testRoot + 'grids-stylus.css'
        },
        diffSource      = {},
        diffTruthLang   = 'less',
        diffTruthSource = null;

    // Get source for files listed in diffPaths
    for (var path in diffPaths) {
        try {
            diffSource[path] = fs.readFileSync(diffPaths[path], 'utf8');
        }
        catch(e) {
            diffSource[path] = false;
        }
    }

    describe('Files should be available', function() {
        for (var lang in diffSource) {
            test(lang);
        }

        function test(lang) {
            it(diffPaths[lang], function() {
                expect(diffSource[lang]).to.not.equal(false);
            });
        }
    });

    describe('Diff truth should be set', function() {
        diffTruthSource = diffSource[diffTruthLang];

        it(diffTruthLang.toUpperCase()+ ' source set as diff truth', function() {
            expect(diffTruthSource).to.not.equal(null);
        });
    });

    describe('CSS should match', function() {
        for (var lang in diffSource) {
            test(lang);
        }

        function test(lang) {
            if (lang !== diffTruthLang) {
                it(lang.toUpperCase() + ' matches ' + diffTruthLang.toUpperCase(), function() {
                    var errText = lang.toUpperCase() + ' does not match ' + diffTruthLang.toUpperCase();

                    expect(diffSource[lang]).to.equal(diffTruthSource, errText);
                });
            }
        }
    });
});
