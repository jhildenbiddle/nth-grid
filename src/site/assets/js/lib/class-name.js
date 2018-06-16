;(function(window){
    'use strict';

    // METHODS
    // =========================================================================
    var methods = {
        add: function(elm, name) {
            if (elm.classList) {
                elm.classList.add(name);
            }
            else if (elm.className.split(' ').indexOf(name) == -1) {
                elm.className += ' ' + name;
            }
        },
        remove: function(elm, name) {
            if (elm.classList) {
                elm.classList.remove(name);
            }
            else {
                var list  = elm.className.split(' '),
                    index = list.indexOf(name);

                if (index !== -1) {
                    list.splice(index, 1);
                    elm.className = list.join(' ');
                }
            }
        },
        toggle: function(elm, name, addTrueRemoveFalse) {
            if (addTrueRemoveFalse === true) {
                methods.add(elm, name);
            }
            else if (addTrueRemoveFalse === false) {
                methods.remove(elm, name);
            }
            else {
                if (elm.classList) {
                    if (!elm.classList.contains(name)) {
                        methods.add(elm, name);
                    }
                    else {
                        methods.remove(elm, name);
                    }
                }
                else {
                    if (elm.className.split(' ').indexOf(name) == -1) {
                        methods.add(elm, name);
                    }
                    else {
                        methods.remove(elm, name);
                    }
                }
            }
        }
    };

    // EXPORT
	// =========================================================================
	var plugin = {
		name   : 'className',
		public : methods
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
