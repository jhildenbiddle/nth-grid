// Dependencies
// =============================================================================
const dedent      = require('dedent');
const getFixtures = require('./helpers/get-fixtures');
const dartSass    = require('dart-sass');
const sass        = require('sass');


// Suite
// =============================================================================
describe('sass @import snapshots', () => {
    const fixtureCollection = getFixtures('sass/*.scss');

    fixtureCollection.forEach(fixture => {
        test(`${fixture.name}`, () => {
            const cssIn = dedent`
                @import "dist/sass/_nth-grid";

                $nth-grid-direction: ltr;
                $nth-grid-flex: true;
                $nth-grid-flex-legacy: true;
                $nth-grid-float: true;
                $nth-grid-float-legacy: true;
                $nth-grid-overlay: false;
                $nth-grid-debug: false;
                $nth-grid-warnings: false;
            ` + fixture.data;
            const result = dartSass.renderSync({ data: cssIn });
            const cssOut = result.css.toString();

            // console.log({ cssOut });

            expect(cssOut).toMatchSnapshot();
        });
    });
});

describe('sass @use snapshots', () => {
    const fixtureCollection = getFixtures('sass/*.scss');

    fixtureCollection.forEach(fixture => {
        test(`${fixture.name}`, () => {
            const cssIn = dedent`
                @use "dist/sass/_nth-grid" as * with (
                    $nth-grid-direction: ltr,
                    $nth-grid-flex: true,
                    $nth-grid-flex-legacy: true,
                    $nth-grid-float: true,
                    $nth-grid-float-legacy: true,
                    $nth-grid-overlay: false,
                    $nth-grid-debug: false,
                    $nth-grid-warnings: false
                );
            ` + fixture.data;
            const result = sass.renderSync({ data: cssIn });
            const cssOut = result.css.toString();

            // console.log({ cssOut });

            expect(cssOut).toMatchSnapshot();
        });
    });
});
