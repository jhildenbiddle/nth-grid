/* jshint browser: true */

;(function(window){
    'use strict';

    // Variables
    // =========================================================================
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                function(fn) { window.setTimeout(fn, 1000/60); };


    // Helpers
    // =========================================================================
    // Debounce Event
    // Limits multiple function calls to a single call after delay period.
    // Author  : Remy Sharp - http://remysharp.com/2010/07/21/throttling-function-calls/
    // Modified: John Hildenbiddle
    var debounce = function debounce(fn, delay) {
        var timeout, args, context, timestamp;

        delay = delay || 100;

        return function() {
            context   = this;
            args      = [].slice.call(arguments, 0);
            timestamp = new Date();

            var later = function() {
                var last = (new Date()) - timestamp;

                if (last < delay) {
                    timeout = setTimeout(later, delay - last);
                }
                else {
                    timeout = null;
                    fn.apply(context, args);
                }
            };

            if (!timeout) {
                timeout = setTimeout(later, delay);
            }
        };
    };

    // Throttle Event
    // Limits multiple function calls to one call per threshhold.
    // Author  : Remy Sharp - http://remysharp.com/2010/07/21/throttling-function-calls/
    // Modified: John Hildenbiddle
    var throttle = function throttle(fn, threshhold, scope) {
        var last, deferTimer;

        threshhold = threshhold || 250;

        return function(){
            var context = scope || this,
                now     = +new Date(),
                args    = arguments;

            if (last && now < last + threshhold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function(){
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            }
            else {
                last = now;
                fn.apply(context, args);
            }
        };
    };

    // ScrollTrigger
    // =========================================================================
    var ScrollTrigger = function ScrollTrigger(options, callbackIn, callbackOut) {
        // Protect against instantiating without `new` keyword
        if (!(this instanceof ScrollTrigger)) {
            return new ScrollTrigger(options, callbackIn, callbackOut);
        }

        // Default values
        var defaults = {
                container     : window, // Scroll container
                elms          : null,   // Elements to trigger scroll callbacks
                top           : false,  // Element top trigger line
                bottom        : false,  // Element bottom trigger line
                left          : false,  // Element left trigger line
                right         : false,  // Element right trigger line
                delay         : 250,    // Debounce / throttle delay
                debounce      : false,  // Debounce instead of throttle
                debug         : false,  // Show scroll trigger line
                debugColor    : 'red',  // Debug line and text background color
                debugTextColor: 'white' // Debug text color
            },
            scope    = this,
            settings = {},
            i;

        // Copy default values into settings object
        for (var defaultProp in defaults) {
            settings[defaultProp] = defaults[defaultProp];
        }

        // Debug
        // ---------------------------------------------------------------------
        var debug = function ScrollTriggerDebug(debugTrueFalse) {
            // Remove previous stylesheet
            if (scope.data.debug) {
                // Sheet
                scope.data.debug.style.parentNode.removeChild(scope.data.debug.style);

                // Elms
                scope.data.debug.elms.forEach(function(elm) {
                    elm.parentNode.removeChild(elm);
                });

                // Data
                delete scope.data.debug;
            }
            // Render new debug elements
            if (debugTrueFalse === true) {
                // Store debug data
                scope.data.debug = {
                    style: document.createElement('style'),
                    elms : []
                };

                // WebKit Fix
                scope.data.debug.style.appendChild(document.createTextNode(''));

                // Insert stylesheet
                document.head.appendChild(scope.data.debug.style);

                var debugSheet = scope.data.debug.style.sheet,
                    debugClass = '_scroll-trigger-' + Date.now();

                // Debug elms
                debugSheet.insertRule('.' + debugClass + ' {' + [
                    'position    : fixed',
                    'z-index     : 2147483647',
                    'border-color: ' + settings.debugColor,
                    'background  : ' + settings.debugColor,
                    'color       : ' + settings.debugTextColor,
                    'font        : 14px sans-serif'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Debug Elms - Top/Bottom
                debugSheet.insertRule('.' + debugClass + '.top, .' + debugClass + '.bottom {' + [
                    'left : 0',
                    'width: 100vw'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Debug Elms - Left/Right
                debugSheet.insertRule('.' + debugClass + '.left, .' + debugClass + '.right {' + [
                    'top   : 0',
                    'height: 100vh'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Labels
                debugSheet.insertRule('.' + debugClass + ':after {' + [
                    'position   : absolute',
                    'padding    : 0.25em 0.5em',
                    'background : inherit',
                    'white-space: nowrap'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Labels - Top/Bottom
                debugSheet.insertRule('.' + debugClass + '.top:after, .' + debugClass + '.bottom:after {' + [
                    'left             : 50%',
                    '-webkit-transform: translateX(-50%)',
                    '    -ms-transform: translateX(-50%)',
                    '        transform: translateX(-50%)'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Labels - Left/Right
                debugSheet.insertRule('.' + debugClass + '.left:after, .' + debugClass + '.right:after {' + [
                    'top              : 50%',
                    '-webkit-transform: translateY(-50%)',
                    '    -ms-transform: translateY(-50%)',
                    '        transform: translateY(-50%)'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Lines
                debugSheet.insertRule('.' + debugClass + ':before {' + [
                    'content     : ""',
                    'position    : absolute',
                    'border-style: solid',
                    'border-color: inherit'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Lines - Top/Bottom
                debugSheet.insertRule('.' + debugClass + '.top:before, .' + debugClass + '.bottom:before {' + [
                    'width       : 100vw',
                    'border-width: 1px 0 0 0'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Lines - Left/Right
                debugSheet.insertRule('.' + debugClass + '.left:before, .' + debugClass + '.right:before {' + [
                    'height      : 100vh',
                    'border-width: 0 0 0 1px'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Top Edge - Elm
                debugSheet.insertRule('.' + debugClass + '.top {' + [
                    'top: ' + settings.data.triggers.top + 'px'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Top Edge - Label
                debugSheet.insertRule('.' + debugClass + '.top:after {' + [
                    'content: "Top Edge: ' + settings.data.triggers.top + 'px"',
                    'bottom: 0'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Bottom Edge - Elm
                debugSheet.insertRule('.' + debugClass + '.bottom {' + [
                    'top: ' + settings.data.triggers.bottom + 'px'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Bottom Edge - Label
                debugSheet.insertRule('.' + debugClass + '.bottom:after {' + [
                    'content: "Bottom Edge: ' + settings.data.triggers.bottom + 'px"'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Left Edge - Elm
                debugSheet.insertRule('.' + debugClass + '.left {' + [
                    'left: ' + settings.data.triggers.left + 'px'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Left Edge - Label
                debugSheet.insertRule('.' + debugClass + '.left:after {' + [
                    'content: "Left Edge: ' + settings.data.triggers.left + 'px"',
                    'right  : 0'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Right Edge - Elm
                debugSheet.insertRule('.' + debugClass + '.right {' + [
                    'left: ' + settings.data.triggers.right + 'px'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Right Edge - Label
                debugSheet.insertRule('.' + debugClass + '.right:after {' + [
                    'content: "Right Edge: ' + settings.data.triggers.right + 'px"'
                ].join(';') + '}', debugSheet.cssRules.length);

                // Insert DOM elements and add to debug data
                ['top', 'bottom', 'left', 'right'].forEach(function(className) {
                    // Only render elements if trigger is defined
                    if (settings.data.triggers[className]) {
                        // Element
                        var elm = document.createElement('div');

                        elm.setAttribute('class', debugClass + ' ' + className);
                        document.body.appendChild(elm);

                        // Data
                        scope.data.debug.elms.push(elm);
                    }
                });
            }
        };

        // Update
        // ---------------------------------------------------------------------
        var update = function ScrollTriggerUpdate(options, callbackIn, callbackOut) {
            // Merge options with settings
            if (options instanceof Object) {
                for (var optionsProp in options) {
                    settings[optionsProp] = options[optionsProp];
                }

                // Verify elements are provided
                if (!settings.elms) {
                    console.error('ScrollTrigger: "elms" option required');
                    return false;
                }
            }

            // Process callbacks (allow for calling without options)
            callbackIn  = options instanceof Function ? options : callbackIn;
            callbackOut = options instanceof Function ? callbackIn : callbackOut;

            // Process only if elms are specified
            if (settings.elms) {
                // Process settings
                settings.container  = typeof settings.container === 'string' ? document.querySelectorAll(settings.container) : settings.container instanceof Array ? settings.container : [settings.container];
                settings.elms       = typeof settings.elms === 'string' ? document.querySelectorAll(settings.elms) : settings.elms;

                // Retain data if available
                settings.data        = settings.data || {};
                settings.data.events = settings.data.events || {};

                // Reset previous data
                settings.data.elms     = []; // Element properties
                settings.data.in       = []; // Array of elements in view
                settings.data.out      = []; // Array of elements not in view
                settings.data.triggers = {}; // Window properties

                // Store window offsets
                // Allow percenteage ("50%"), pixel vales ("100px") and unitless pixels values (100)
                settings.data.triggers = {
                    top   : (/%/).test(settings.top) ? Math.round(window.innerHeight * Number(parseFloat(settings.top) / 100)) : settings.top ? settings.top.split('px')[0] : settings.top,
                    bottom: (/%/).test(settings.bottom) ? Math.round(window.innerHeight * Number(parseFloat(settings.bottom) / 100)) : settings.bottom ? settings.bottom.split('px')[0] : settings.bottom,
                    left  : (/%/).test(settings.left) ? Math.round(window.innerWidth * Number(parseFloat(settings.left) / 100)) : settings.left ? settings.left.split('px')[0] : settings.left,
                    right : (/%/).test(settings.right) ? Math.round(window.innerWidth * Number(parseFloat(settings.right) / 100)) : settings.right ? settings.right.split('px')[0] : settings.right
                };

                // Loop through elements and populate data
                for (i = 0; i < settings.elms.length; i++) {
                    var elm     = settings.elms[i],
                        bounds  = elm.getBoundingClientRect(),
                        offsetX = window.pageXOffset,
                        offsetY = window.pageYOffset;

                    var data = {
                        node  : elm,
                        bounds: {
                            height: bounds.height,
                            width : bounds.width,
                            // Adjust bounds to accomodate for window offset on load
                            top   : offsetY + bounds.top,
                            bottom: offsetY + bounds.bottom,
                            left  : offsetX + bounds.left,
                            right : offsetX + bounds.right
                        }
                    };

                    data.triggers = {
                        top   : data.bounds.top - settings.data.triggers.top,
                        bottom: data.bounds.bottom - settings.data.triggers.bottom,
                        left  : data.bounds.left - settings.data.triggers.left,
                        right : data.bounds.right - settings.data.triggers.right
                    };

                    settings.data.elms.push(data);
                }

                // Scroll watch function to test if elements are within bounds
                var scrollWatch = function() {
                    settings.data.elms.forEach(function(elm) {
                        var dataInIndex   = settings.data.in.indexOf(elm.node),
                            dataOutIndex  = settings.data.out.indexOf(elm.node),
                            triggerTop    = settings.data.triggers.top ? window.pageYOffset >= elm.triggers.top : true,
                            triggerBottom = settings.data.triggers.bottom ? window.pageYOffset < elm.triggers.bottom : true,
                            triggerLeft   = settings.data.triggers.left ? window.pageXOffset >= elm.triggers.left : true,
                            triggerRight  = settings.data.triggers.right ? window.pageXOffset < elm.triggers.right : true;

                        // In view
                        if (triggerTop && triggerBottom && triggerLeft && triggerRight) {
                            // Process only if changed
                            if (dataInIndex == -1) {
                                // Add to "in view" array
                                settings.data.in.push(elm.node);

                                // Remove from "out of view" array
                                if (dataOutIndex > -1) {
                                    settings.data.out.splice(dataOutIndex, 1);
                                }
                                // Callback
                                if (callbackIn instanceof Function) {
                                    requestAnimationFrame(function() {
                                        callbackIn(elm.node, settings.data);
                                    });
                                }
                            }
                        }
                        // Out of view
                        else {
                            // Process only if changed
                            if (dataOutIndex == -1) {
                                // Add to "out of view" array
                                settings.data.out.push(elm.node);

                                // Remove from "in view" array
                                if (dataInIndex > -1) {
                                    settings.data.in.splice(dataInIndex, 1);
                                }
                                // Callback
                                if (callbackOut instanceof Function) {
                                    requestAnimationFrame(function() {
                                        callbackOut(elm.node, settings.data);
                                    });
                                }
                            }
                        }
                    });
                };

                // Create throttled / debounced wrappers
                settings.data.events.scroll = settings.debounce ? debounce(scrollWatch, settings.delay) : throttle(scrollWatch, settings.delay);

                // Attach scroll event(s) to container(s)
                for (i = 0; i < settings.container.length; i++) {
                    settings.container[i].removeEventListener('scroll', settings.data.events.scroll);
                    settings.container[i].addEventListener('scroll', settings.data.events.scroll);
                }

                // Attach data to instance
                scope.data = settings.data;

                // Debug
                debug(settings.debug);
            }
        };

        // Methods
        // ---------------------------------------------------------------------
        var methods = {
            debug: debug,
            destroy: function() {
                // Call remove method
                scope.remove();

                // Delete scroll data
                delete scope.data;

                // Remove methods from instance
                for (var method in methods) {
                    delete scope[method];
                }
            },
            remove: function() {
                // Remove scroll events
                for (var i = 0; i < settings.container.length; i++) {
                    settings.container[i].removeEventListener('scroll', settings.data.events.scroll);
                }

                // Remove resize event
                window.removeEventListener('resize', settings.data.events.resize);

                // Remove debug stylesheet and elements
                debug(false);
            },
            update: update
        };

        // Init
        // ---------------------------------------------------------------------
        var init = function ScrollTriggerInit() {
            update(options, callbackIn, callbackOut);

            // Create debounced resize handler
            settings.data.events.resize = debounce(update, 100);
            window.addEventListener('resize', settings.data.events.resize);

            // Attach methods to instance
            for (var method in methods) {
                scope[method] = methods[method];
            }
        }();

        // Update data if instance was instantiated before document loading is
        // complete. This ensures trigger data is as accurate as possible.
        document.addEventListener('readystatechange', function(e) {
            if (document.readyState === 'complete') {
                update();
            }
        });
    };

    // EXPORT
    // =========================================================================
    var plugin = {
        name   : 'ScrollTrigger',
        public : ScrollTrigger
    };

    // AMD
    if (typeof define === 'function' && define.amd) {
        define(plugin.public);
    }
    // CommonJS
    else if (typeof exports === 'object') {
        module.exports = plugin.public;
    }
    // Browser Global
    else {
        window[plugin.name] = plugin.public;
    }
})(window);
