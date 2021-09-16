// Dependencies
// =============================================================================
const dedent      = require('dedent');
const getFixtures = require('./helpers/get-fixtures');
const less        = require('less');


// Suite
// =============================================================================
describe('less snapshots', () => {
    const fixtureCollection = getFixtures('less/*.less');

    fixtureCollection.forEach(fixture => {
        test(`${fixture.name}`, async () => {
            const cssIn = dedent`
                @import "dist/less/_nth-grid";

                @nth-grid-direction: ltr;
                @nth-grid-flex: true;
                @nth-grid-flex-legacy: true;
                @nth-grid-float: true;
                @nth-grid-float-legacy: true;
                @nth-grid-overlay: false;
                @nth-grid-debug: false;
                @nth-grid-warnings: false;
            ` + fixture.data;
            const result = await less.render(cssIn);
            const cssOut = result.css;

            // console.log({ cssOut });

            expect(cssOut).toMatchSnapshot();
        });
    });
});
