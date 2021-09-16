// Dependencies
// =============================================================================
const dedent      = require('dedent');
const getFixtures = require('./helpers/get-fixtures');
const postcss     = require('postcss');
const nthGrid     = require('../dist/postcss');

// Suite
// =============================================================================
describe('postcss snapshots', () => {
    const fixtureCollection = getFixtures('postcss/*.postcss');
    const processer = postcss([nthGrid]);

    fixtureCollection.forEach(fixture => {
        test(`${fixture.name}`, async () => {
            const cssIn = dedent`
                :root {
                    --nth-grid-direction: ltr;
                    --nth-grid-flex: true;
                    --nth-grid-flex-legacy: true;
                    --nth-grid-float: true;
                    --nth-grid-float-legacy: true;
                    --nth-grid-overlay: false;
                    --nth-grid-debug: false;
                    --nth-grid-warnings: false;
                    --nth-grid-remove-globals: true;
                }
            ` + fixture.data;
            const result = await processer.process(cssIn, { from: undefined });
            const cssOut = result.css;

            // console.log({ cssOut });

            expect(cssOut).toMatchSnapshot();
        });
    });
});
