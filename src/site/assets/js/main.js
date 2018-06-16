// Helpers
// =============================================================================
var className     = require('./lib/class-name'),
    ScrollTrigger = require('./lib/scroll-trigger');

// Exports
// =============================================================================
module.exports = function() {
    // Events
    // =========================================================================
    var navElm         = document.querySelector('nav'),
        navHeight      = getComputedStyle(navElm).height.split('px')[0],
        navLinks       = navElm.querySelectorAll('nav a[href^="#"]'),
        navActiveClass = 'active',
        navRevealClass = 'reveal',
        splashElm      = document.querySelector('#splash');

    var handleAnchors = function handleAnchors(e) {
        var isAnchorLink = e.target.hasAttribute('href') && /^#/.test(e.target.getAttribute('href'));

        if (isAnchorLink) {
            var isSmoothScroll = 'scrollBehavior' in document.documentElement.style,
                sectionId      = e.target.getAttribute('href'),
                sectionElm     = document.querySelector(sectionId);

            if (sectionElm) {
                var sectionBounds = sectionElm.getBoundingClientRect(),
                    scrollPosition = sectionBounds.top - navHeight;

                e.preventDefault();

                // Native
                if (isSmoothScroll) {
                    window.scrollBy(0, scrollPosition);
                }
                // JS
                else {
                    window.scrollBy(0, scrollPosition);
                }
            }
        }
    };

    var handleLoad = function handleLoad(e) {
        // Toggle nav visibility and active links on scroll
        var navScrollTrigger = new ScrollTrigger({
                elms  : document.querySelectorAll('main section'),
                top   : '50%',
                bottom: '50%'
            },
            // Trigger In
            function(node, data) {
                var activeLink = document.querySelector('nav a[href ="#' + node.id + '"]'),
                    showNav    = data.out.indexOf(splashElm) > -1;

                // Remove active class from all nav links
                for (var i = 0; i < navLinks.length; i++) {
                    className.remove(navLinks[i], navActiveClass);
                }

                // Add active class to matching nav link
                if (activeLink) {
                    className.add(activeLink, navActiveClass);
                }

                // Display nav if splash is not in view
                className.toggle(navElm, navRevealClass, showNav);
            }
        );
    };

    // Attach event listeners
    window.addEventListener('load', handleLoad);
    window.addEventListener('click', handleAnchors);
}();
