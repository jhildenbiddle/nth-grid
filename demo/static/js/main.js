/*eslint no-var:0*/

(function(){
    // Functions
    // =========================================================================
    function setBodyClass() {
        var stylesheet = location.hash.substring(1);

        if (stylesheet) {
            document.body.setAttribute('class', stylesheet);
        }
    }

    // Events
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
})();
