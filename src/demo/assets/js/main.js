/* jshint browser: true */

(function(){
    // =========================================================================
    // Nth-Grid Tests
    // =========================================================================
    // Compare generated CSS output for CSS processors
    // -------------------------------------------------------------------------
    // Promises supported (modern browsers)
    if (window.Promise) {
        var bannerElm = document.getElementById('status');

        // Get Nth-Grid generated styles for all CSS processors for diff test
        var getCss = new Promise(function(resolve, reject) {
            var cssPath       = 'assets/css/',
                cssPromiseObj = {},
                cssSourceObj  = {};

            // Nth-Grid generated CSS files to retrieve for diff
            var cssPathObj = {
                    less    : cssPath + 'grids-less.css',
                    postcss : cssPath + 'grids-postcss.css',
                    sass    : cssPath + 'grids-sass.css',
                    stylus  : cssPath + 'grids-stylus.css'
                };

            // Hanldes resolve/reject for each promise in cssPromiseObj
            var handlePromise = function(lang) {
                cssPromiseObj[lang].then(
                    function(data){
                        // Remove language prefixes, spaces and line breaks
                        // Required for diffing source as JS strings due to
                        // differences in output style for each processor.
                        data = data.replace(/\.(less|postcss|sass|stylus)|\n|\s/g,'');
                        // Add result to cssSourceObj
                        cssSourceObj[lang] = data;

                        // Resolve promise if complete
                        if (Object.keys(cssSourceObj).length === 4) {
                            resolve(cssSourceObj);
                        }
                    },
                    function(err){
                        err.message = 'Unable to load ' + cssPathObj[lang];
                        reject(err);
                    }
                );
            };

            // Loop through cssPathObj and add key/promise to cssPromiseObj
            for (var file in cssPathObj) {
                cssPromiseObj[file] = get(cssPathObj[file]);
            }

            // Loop through cssPromiseObj and handle resolve/reject
            for (var lang in cssPromiseObj) {
                handlePromise(lang);
            }
        });

        // Promise fulfilled
        getCss.then(
            // Resolved
            function(cssSourceObj) {
                var diffLang     = 'less',
                    diffSrc      = cssSourceObj[diffLang],
                    matchLess    = diffSrc === cssSourceObj.less,
                    matchPostcss = diffSrc === cssSourceObj.postcss,
                    matchSass    = diffSrc === cssSourceObj.sass,
                    matchStylus  = diffSrc === cssSourceObj.stylus;

                bannerElm.classList.add('banner');

                // Test: Skipped
                if (diffSrc.indexOf('Debug') !== -1) {
                    bannerElm.classList.add('info');
                    bannerElm.innerHTML += '<p><strong>Tests Skipped:</strong> Nth-Grid debug setting detected</p>';
                }
                // Test: Pass
                else if (matchLess && matchPostcss && matchSass && matchStylus) {
                    bannerElm.classList.add('success');
                    bannerElm.innerHTML += '<p><strong>Tests Complete:</strong> Nth-Grid generated output matched for all processors</p>';
                }
                // Test: Fail
                else {
                    var statusTxt = [];

                    if (diffSrc !== 'less' && !matchLess) { statusTxt.push('Less'); }
                    if (diffSrc !== 'postcss' && !matchPostcss) { statusTxt.push('PostCSS'); }
                    if (diffSrc !== 'sass' && !matchSass) { statusTxt.push('Sass'); }
                    if (diffSrc !== 'stylus' && !matchStylus) { statusTxt.push('Stylus'); }

                    bannerElm.classList.add('error');
                    bannerElm.innerHTML += '<p><strong>Test Fail:</strong> ' + statusTxt.join(', ') + ' does not match source (' + diffLang + ')</p>';
                }
            },
            // Rejected
            function(err) {
                // Show error if page loaded via http/https
                if ((/^http/).test(location.protocol)) {
                    bannerElm.classList.add('banner', 'error');
                    bannerElm.innerHTML += '<p><strong>Test Error:</strong> ' + err.message + '</p>';
                }
            }
        );
    }

    // =========================================================================
    // Events (Old school method for legacy browsers)
    // =========================================================================
    window.onhashchange = function(e) {
        var navToggleElm = document.getElementById('nav-toggle');

        e.preventDefault();

        // Swap the body class to show selected grids
        setBodyClass();

        // Hide the nav drawer
        if (navToggleElm) {
            navToggleElm.checked = false;
        }
    };

    window.onload = function(e) {
        setBodyClass();
    };

    // =========================================================================
    // Functions
    // =========================================================================
    // AJAX request via returned Promise
    function get(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('GET', url);
            req.onload = function() {
                if (req.status == 200) {
                    resolve(req.response);
                }
                else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error("Network Error"));
            };
            req.send();
        });
    }

    function setBodyClass() {
        var stylesheet = location.hash.substring(1);

        if (stylesheet) {
            document.body.setAttribute('class', stylesheet);
        }
    }
})();
