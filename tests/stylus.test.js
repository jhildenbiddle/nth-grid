// Dependencies
// =============================================================================
const dedent      = require('dedent');
const getFixtures = require('./helpers/get-fixtures');
const stylus      = require('stylus');
const util        = require('util');


// Suite
// =============================================================================
describe('stylus snapshots', () => {
    const fixtureCollection = getFixtures('stylus/*.styl');
    const stylusRender      = util.promisify(stylus.render);

    fixtureCollection.forEach(fixture => {
        test(`${fixture.name}`, async () => {
            const cssIn = dedent`
                @import "dist/stylus/_nth-grid";

                $nth-grid-direction = ltr;
                $nth-grid-flex = true;
                $nth-grid-flex-legacy = true;
                $nth-grid-float = true;
                $nth-grid-float-legacy = true;
                $nth-grid-overlay = false;
                $nth-grid-debug = false;
                $nth-grid-warnings = false;
            ` + fixture.data;
            const cssOut = await stylusRender(cssIn);

            // console.log({ cssOut });

            expect(cssOut).toMatchSnapshot();
        });
    });
});
