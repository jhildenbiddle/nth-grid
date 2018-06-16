/*!
 * nth-grid
 * v0.0.0
 * https://github.com/jhildenbiddle/nth-grid
 * (c) 2018 John Hildenbiddle
 * MIT license
 */
(function() {
    "use strict";
    var vars = {
        reNotLength: /[^\w%.-]/,
        reNumber: /^[-+]?[0-9]*\.?[0-9]+/,
        reUnit: /[a-z|%]+$/,
        rounding: 5
    };
    function getNumber(value, falseValue) {
        if (vars.reNotLength.test(value)) {
            return false;
        } else {
            var match = value.toString().match(vars.reNumber) || false;
            var number = match.length ? Number(match) * 1 : falseValue || false;
            return number;
        }
    }
    function getUnit(value, falseValue) {
        if (vars.reNotLength.test(value)) {
            return false;
        } else {
            var match = value.toString().match(vars.reUnit) || false;
            var unit = match.length ? match.toString() : falseValue || false;
            return unit;
        }
    }
    function unitMath(arr, operator) {
        var finalUnit = "";
        var nums = [];
        for (var i = 0; i < arr.length; i++) {
            var num = getNumber(arr[i]);
            var unit = getUnit(arr[i]);
            if (num !== 0) {
                if (unit.length) {
                    if (finalUnit.length && unit !== finalUnit) {
                        console.log("NTH-GRID: Incompatible unitMath() arguments: " + arr);
                        return 0;
                    } else {
                        finalUnit = unit;
                    }
                }
            }
            nums.push(num);
        }
        operator = operator.trim().replace(/[^+\-*/().\d\s]/g, "");
        var result = nums.length ? eval(nums.join(operator)).toString().concat(finalUnit) : 0;
        return Number(result) === 0 ? 0 : result;
    }
    function getOrderOffset(settings, column, order) {
        var offset = 0, i = void 0;
        if (column > 1) {
            var sibling_val = void 0;
            if (settings.calc) {
                var offset_vals = [];
                var sibling_gutters = 0;
                var sibling_ratio_cols = 0;
                var sibling_unit_cols = [];
                for (i = 0; i < column - 1; i++) {
                    if (order) {
                        sibling_val = settings.columns_normalized[order[i] - 1];
                    } else {
                        sibling_val = settings.columns_normalized[i];
                    }
                    if (settings.gutter_h !== 0) {
                        sibling_gutters += 1;
                    }
                    if (Number(sibling_val)) {
                        sibling_ratio_cols += Number(sibling_val);
                    } else {
                        sibling_unit_cols.push(sibling_val);
                    }
                }
                if (sibling_ratio_cols > 0) {
                    if (sibling_ratio_cols === 1) {
                        offset_vals.push(settings.grid_col_width);
                    } else {
                        offset_vals.push("((" + settings.grid_col_width + ") * " + sibling_ratio_cols + ")");
                    }
                }
                if (sibling_unit_cols.length > 0) {
                    offset_vals.push(sibling_unit_cols.join(" + "));
                }
                if (sibling_gutters > 0) {
                    if (sibling_gutters === 1) {
                        offset_vals.push(settings.gutter_h);
                    } else {
                        offset_vals.push("(" + settings.gutter_h + " * " + sibling_gutters + ")");
                    }
                }
                offset = offset_vals.join(" + ");
            } else {
                var column_width = void 0;
                for (i = 0; i < column - 1; i++) {
                    if (order) {
                        sibling_val = settings.columns_normalized[order[i] - 1];
                    } else {
                        sibling_val = settings.columns_normalized[i];
                    }
                    if (Number(sibling_val)) {
                        var grid_col_width = settings.grid_col_width;
                        column_width = unitMath([ grid_col_width, sibling_val ], " * ");
                        offset = unitMath([ offset, column_width, settings.gutter_h ], " + ");
                    } else {
                        column_width = unitMath([ sibling_val, settings.gutter_h ], " + ");
                        offset = unitMath([ offset, column_width ], " + ");
                    }
                }
            }
        }
        return offset;
    }
    function isUnitMatch(arr, matchUnit) {
        if (!getNumber(arr[0]) && !getUnit(arr[0])) {
            return false;
        } else if (!matchUnit) {
            matchUnit = getUnit(arr[0]);
        }
        for (var i = 0; i < arr.length; i++) {
            var num = getNumber(arr[i]);
            var unit = num !== 0 ? getUnit(arr[i]) : false;
            if (num === false && unit === false) {
                return false;
            }
            if (num !== 0 && unit !== matchUnit) {
                return false;
            }
        }
        return true;
    }
    function Grid(settings, options) {
        options = options || {};
        if (!(this instanceof Grid)) {
            return new Grid(settings, options);
        }
        var defaults = {
            columns: [ 1 ],
            gutter: 0,
            margin: 0,
            center: true,
            eqheight: false,
            valign: false,
            direction: "ltr",
            legacy: false,
            debug: false,
            debug_background_color: "#000",
            debug_text_color: "#ccc",
            overlay: false,
            overlay_column_color: "#7c48c3",
            overlay_margin_color: "#dabfff",
            overlay_text_color: "#fff",
            rem_base: 16,
            remove_warnings: true,
            warnings: true
        };
        var settings_private = {
            width: "100%",
            order: false,
            auto_width: null,
            calc: null,
            columns_ratio: [],
            columns_unit: [],
            grid_col_ratio: 0,
            grid_col_width: 0,
            grid_width: null,
            gutter_h: 0,
            columns_normalized: [],
            margin_h: 0,
            order_offsets: [],
            total_columns: 0,
            total_ratio_columns: 0,
            total_unit_columns: 0
        };
        for (var opt in options) {
            if (opt in defaults) {
                defaults[opt] = options[opt];
            }
        }
        for (var priv in settings_private) {
            if (!(priv in settings)) {
                settings[priv] = settings_private[priv];
            }
        }
        for (var key in defaults) {
            if (!(key in settings)) {
                settings[key] = defaults[key];
            }
        }
        settings.columns = settings.columns instanceof Array ? settings.columns : [ settings.columns ];
        settings.order = settings.order instanceof Array ? settings.order : settings.order !== false ? [ settings.order ] : settings.order;
        settings.gutter_h = settings.gutter instanceof Array ? settings.gutter[1] || settings.gutter[0] : settings.gutter;
        settings.gutter_v = settings.gutter instanceof Array ? settings.gutter[0] : settings.gutter;
        settings.margin_h = settings.margin instanceof Array ? settings.margin[1] || settings.margin[0] : settings.margin;
        settings.margin_v = settings.margin instanceof Array ? settings.margin[0] : settings.margin;
        settings.dir_left = settings.direction === "rtl" ? "right" : "left";
        settings.dir_right = settings.direction === "rtl" ? "left" : "right";
        var i = void 0;
        for (i = 0; i < settings.columns.length; i++) {
            var val = settings.columns[i];
            if (Number(val)) {
                settings.columns_ratio.push(Number(val));
            } else {
                settings.columns_unit.push(val);
            }
        }
        settings.total_ratio_columns = settings.columns_ratio.length === 1 ? settings.columns_ratio[0] : settings.columns_ratio.length;
        settings.total_unit_columns = settings.columns_unit.length;
        settings.total_columns = settings.total_ratio_columns + settings.total_unit_columns;
        var grid_gutters = unitMath([ settings.gutter_h, settings.total_columns - 1 ], " * "), grid_margins = unitMath([ settings.margin_h, 2 ], " * ");
        if (settings.columns_ratio.length === 1) {
            settings.grid_col_ratio = settings.columns_ratio[0];
        } else {
            settings.grid_col_ratio = 0;
            for (i = 0; i < settings.columns_ratio.length; i++) {
                settings.grid_col_ratio += settings.columns_ratio[i];
            }
        }
        var isMatched = isUnitMatch([].concat(settings.width).concat(settings.columns_unit).concat(settings.gutter).concat(settings.margin));
        var isMatchedGrid = settings.columns_ratio.length === 0 && isUnitMatch([].concat(settings.columns_unit).concat(settings.gutter).concat(settings.margin));
        var isPercentGrid = isUnitMatch([].concat(settings.columns_unit).concat(settings.gutter).concat(settings.margin), "%");
        settings.calc = !(isMatched || isMatchedGrid || isPercentGrid);
        if (settings.columns_ratio.length === 0) {
            if (settings.calc) {
                var grid_unit_cols = isUnitMatch(settings.columns_unit) ? unitMath(settings.columns_unit, " + ") : settings.columns_unit.join(" + ");
                if (settings.gutter_h !== 0 && settings.margin_h !== 0 && isUnitMatch([ grid_gutters, grid_margins ])) {
                    settings.auto_width = grid_unit_cols + " + " + unitMath([ grid_gutters, grid_margins ], " + ");
                } else if (settings.gutter_h !== 0 && isUnitMatch([ grid_unit_cols, grid_gutters ])) {
                    settings.auto_width = unitMath([ grid_unit_cols, grid_gutters ], " + ") + " + " + (settings.margin_h !== 0 ? grid_margins : "");
                } else if (settings.margin_h !== 0 && isUnitMatch([ grid_unit_cols, grid_margins ])) {
                    settings.auto_width = unitMath([ grid_unit_cols, grid_margins ], " + ") + " + " + (settings.gutter_h !== 0 ? grid_gutters : "");
                } else {
                    settings.auto_width = grid_unit_cols;
                    if (settings.gutter_h !== 0) {
                        settings.auto_width += " + " + grid_gutters;
                    }
                    if (settings.margin_h !== 0) {
                        settings.auto_width += " + " + grid_margins;
                    }
                }
            } else {
                settings.auto_width = unitMath(settings.columns_unit, " + ");
                settings.auto_width = unitMath([ settings.auto_width, grid_gutters, grid_margins ], " + ");
            }
        }
        if (settings.calc) {
            if (settings.columns_unit.length === 1) {
                settings.grid_width = "99.99% - " + settings.columns_unit[0];
            } else if (settings.columns_unit.length > 1) {
                if (isUnitMatch(settings.columns_unit)) {
                    settings.grid_width = "99.99% - " + unitMath(settings.columns_unit, " + ");
                } else {
                    settings.grid_width = "99.99% - (" + settings.columns_unit.join(" + ") + ")";
                }
            } else {
                settings.grid_width = "99.99%";
            }
        } else {
            if (isMatched && getUnit(settings.width) !== "%") {
                settings.grid_width = settings.width;
                if (settings.columns_unit.length) {
                    settings.grid_width = unitMath([ settings.grid_width, unitMath(settings.columns_unit, " + ") ], " - ");
                }
            } else if (isPercentGrid) {
                settings.grid_width = "100%";
                if (settings.columns_unit.length) {
                    settings.grid_width = unitMath([ settings.grid_width, unitMath(settings.columns_unit, " + ") ], " - ");
                }
            } else {
                settings.grid_width = "100%";
            }
        }
        if (settings.total_ratio_columns > 0) {
            if (settings.calc) {
                if (settings.gutter_h !== 0 && settings.margin_h !== 0 && isUnitMatch([ settings.gutter_h, settings.margin_h ])) {
                    settings.grid_col_width = settings.grid_width + " - " + unitMath([ grid_gutters, grid_margins ], " + ");
                } else if (settings.gutter_h !== 0 && isUnitMatch([ settings.grid_width, grid_gutters ])) {
                    settings.grid_col_width = unitMath([ settings.grid_width, grid_gutters ], " - ");
                    if (grid_margins !== 0) {
                        settings.grid_col_width += " - " + grid_margins;
                    }
                } else if (settings.margin_h !== 0 && isUnitMatch([ settings.grid_width, grid_margins ])) {
                    settings.grid_col_width = unitMath([ settings.grid_width, grid_margins ], " - ");
                    if (grid_gutters !== 0) {
                        settings.grid_col_width += " - " + grid_gutters;
                    }
                } else {
                    grid_gutters = settings.gutter_h !== 0 ? " - " + grid_gutters : "";
                    grid_margins = settings.margin_h !== 0 ? " - " + grid_margins : "";
                    settings.grid_col_width = settings.grid_width + grid_gutters + grid_margins;
                }
                settings.grid_col_width = "(" + settings.grid_col_width + ") / " + settings.grid_col_ratio;
            } else {
                settings.grid_col_width = unitMath([ settings.grid_width, grid_gutters, grid_margins ], " - ");
                settings.grid_col_width = unitMath([ settings.grid_col_width, settings.grid_col_ratio ], " / ");
            }
        }
        if (settings.order && settings.order.length <= settings.total_columns) {
            if (settings.columns_ratio.length === 1) {
                for (i = 0; i < settings.columns.length; i++) {
                    var col_val = settings.columns[i];
                    var num = Number(col_val) || false;
                    if (num) {
                        for (var j = 0; j < num; j++) {
                            settings.columns_normalized.push(1);
                        }
                    } else {
                        settings.columns_normalized.push(col_val);
                    }
                }
            } else {
                settings.columns_normalized = settings.columns;
            }
            for (i = 0; i < settings.order.length; i++) {
                var offset = 0;
                var order_val = settings.order[i];
                var column_offset = getOrderOffset(settings, order_val);
                var order_offset = getOrderOffset(settings, i + 1, settings.order);
                if (order_offset !== column_offset) {
                    if (settings.calc) {
                        if (order_offset === 0) {
                            offset = "0px - (" + column_offset + ")";
                        } else if (column_offset === 0) {
                            offset = order_offset;
                        } else {
                            offset = "(" + order_offset + ") - (" + column_offset + ")";
                        }
                    } else {
                        offset = unitMath([ order_offset, column_offset ], " - ");
                    }
                }
                settings.order_offsets.push(offset);
            }
        }
        return settings;
    }
    function toValue(obj) {
        if (obj.type === "Keyword") {
            return obj.value;
        } else if (obj.type === "Dimension") {
            if (obj.value === 0) {
                return obj.value;
            } else {
                return obj.value.toString().concat(obj.unit);
            }
        } else if (obj.type === "Expression") {
            toArray(obj);
        } else {
            console.log("Unknown type: " + obj.type + " Returning value: " + obj.value);
            console.log(JSON.stringify(obj));
            return obj;
        }
    }
    function toArray(obj) {
        if (obj.type === "Expression") {
            var arr = [];
            for (var i = 0; i < obj.value.length; i++) {
                arr.push(toValue(obj.value[i]));
            }
            return arr;
        } else {
            var value = toValue(obj);
            return [ value ];
        }
    }
    function toTree(value) {
        if (typeof value === "boolean") {
            return new tree.Keyword(value.toString());
        } else if (value instanceof Array) {
            var arr = [];
            for (var i = 0; i < value.length; i++) {
                arr.push(toTree(value[i]));
            }
            return new tree.Expression(arr);
        } else if (typeof value === "number") {
            return new tree.Dimension(value);
        } else if (value !== null) {
            var num = getNumber(value);
            var unit = getUnit(value);
            if (num !== false && unit !== false) {
                return new tree.Dimension(num, unit);
            } else if (num !== false) {
                return new tree.Dimension(num);
            } else {
                return new tree.Anonymous(value);
            }
        } else {
            return new tree.Anonymous(value);
        }
    }
    var settings = void 0;
    var api = {
        "nth-log": function nthLog(lessTreeObj) {
            console.log("Nth-Grid: " + lessTreeObj.value);
            return false;
        },
        "nth-warn": function nthWarn(lessTreeObj) {
            console.warn("Nth-Grid: " + lessTreeObj.value);
            return false;
        },
        "nth-grid": function nthGrid(columns, gutter, margin, width, order) {
            settings = {
                columns: toArray(columns),
                gutter: toArray(gutter),
                margin: toArray(margin),
                width: toValue(width),
                order: order.type === "Expression" ? toArray(order) : false
            };
            settings = new Grid(settings);
            return new tree.Keyword("true");
        },
        "nth-get": function nthGet(lessTreeObj) {
            var key = lessTreeObj.value;
            if (key in settings) {
                return toTree(settings[key]);
            } else {
                console.log("NTH-GRID: " + key + " is not a valid key.");
            }
        }
    };
    functions.addMultiple(api);
})();
//# sourceMappingURL=less-plugin-nth-grid.js.map
