const pkg = require('./package.json');

module.exports = {
    from : [
        /@@copyright/g,
        /@@description/g,
        /@@homepage/g,
        /@@license/g,
        /@@version/g
    ],
    to   : [
        `(c) ${(new Date()).getFullYear()} ${pkg.author}`,
        pkg.description,
        pkg.homepage,
        `${pkg.license} license`,
        `v${pkg.version}`
    ]
};
