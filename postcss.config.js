const nthgrid = require('./dist/postcss/postcss-nth-grid.js');

module.exports = {
    map    : false,
    plugins: [
        nthgrid()
    ]
};
