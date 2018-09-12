const nthgrid = require('./dist/postcss/index.js');

module.exports = {
    map    : false,
    plugins: [
        nthgrid()
    ]
};
