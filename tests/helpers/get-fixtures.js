// Dependencies
// =============================================================================
const fs   = require('fs');
const glob = require('glob');
const path = require('path');

// Suite
// =============================================================================
module.exports = function getFixtures(globPattern = '**') {
    const fixturesGlobPattern = path.resolve(__dirname, '../fixtures/', globPattern);

    return glob.sync(fixturesGlobPattern).map(filePath => ({
        name: path.parse(filePath).name,
        path: filePath,
        data: fs.readFileSync(filePath, 'utf-8')
    }));
};
