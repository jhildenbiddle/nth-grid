/*!
 * nth-grid
 * v0.0.0
 * https://github.com/jhildenbiddle/nth-grid
 * (c) 2018 John Hildenbiddle
 * MIT license
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var postcss = _interopDefault(require("postcss"));

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
        const match = value.toString().match(vars.reNumber) || false;
        const number = match.length ? Number(match) * 1 : falseValue || false;
        return number;
    }
}

function getUnit(value, falseValue) {
    if (vars.reNotLength.test(value)) {
        return false;
    } else {
        const match = value.toString().match(vars.reUnit) || false;
        const unit = match.length ? match.toString() : falseValue || false;
        return unit;
    }
}

function stringMath(expression) {
    return new Function("return " + expression)();
}

function unitMath(arr, operator) {
    let finalUnit = "";
    const nums = [];
    for (let i = 0; i < arr.length; i++) {
        const num = getNumber(arr[i]);
        const unit = getUnit(arr[i]);
        if (num !== 0) {
            if (unit.length) {
                if (finalUnit.length && unit !== finalUnit) {
                    console.log(`NTH-GRID: Incompatible unitMath() arguments: ${arr}`);
                    return 0;
                } else {
                    finalUnit = unit;
                }
            }
        }
        nums.push(num);
    }
    operator = operator.trim().replace(/[^+\-*\/().\d\s]/g, "");
    const result = nums.length ? stringMath(nums.join(operator)).toString().concat(finalUnit) : 0;
    return Number(result) === 0 ? 0 : result;
}

function getOrderOffset(settings, column, order) {
    let offset = 0, i;
    if (column > 1) {
        let sibling_val;
        if (settings.calc) {
            const offset_vals = [];
            let sibling_gaps = 0;
            let sibling_ratio_cols = 0;
            const sibling_unit_cols = [];
            for (i = 0; i < column - 1; i++) {
                if (order) {
                    sibling_val = settings.columns_normalized[order[i] - 1];
                } else {
                    sibling_val = settings.columns_normalized[i];
                }
                if (settings.gap_h !== 0) {
                    sibling_gaps += 1;
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
            if (sibling_gaps > 0) {
                if (sibling_gaps === 1) {
                    offset_vals.push(settings.gap_h);
                } else {
                    offset_vals.push("(" + settings.gap_h + " * " + sibling_gaps + ")");
                }
            }
            offset = offset_vals.join(" + ");
        } else {
            let column_width;
            for (i = 0; i < column - 1; i++) {
                if (order) {
                    sibling_val = settings.columns_normalized[order[i] - 1];
                } else {
                    sibling_val = settings.columns_normalized[i];
                }
                if (Number(sibling_val)) {
                    const grid_col_width = settings.grid_col_width;
                    column_width = unitMath([ grid_col_width, sibling_val ], " * ");
                    offset = unitMath([ offset, column_width, settings.gap_h ], " + ");
                } else {
                    column_width = unitMath([ sibling_val, settings.gap_h ], " + ");
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
    for (let i = 0; i < arr.length; i++) {
        const num = getNumber(arr[i]);
        const unit = num !== 0 ? getUnit(arr[i]) : false;
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
    const defaults = {
        columns: [ 1 ],
        gap: 0,
        margin: 0,
        direction: "ltr",
        flex: true,
        flex_legacy: true,
        float: false,
        float_legacy: false,
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
    const settings_private = {
        width: "100%",
        order: false,
        auto_width: null,
        calc: null,
        columns_ratio: [],
        columns_unit: [],
        grid_col_ratio: 0,
        grid_col_width: 0,
        grid_width: null,
        gap_h: 0,
        columns_normalized: [],
        margin_h: 0,
        order_offsets: [],
        total_columns: 0,
        total_ratio_columns: 0,
        total_unit_columns: 0
    };
    for (const opt in options) {
        if (opt in defaults) {
            defaults[opt] = options[opt];
        }
    }
    for (const priv in settings_private) {
        if (!(priv in settings)) {
            settings[priv] = settings_private[priv];
        }
    }
    for (const key in defaults) {
        if (!(key in settings)) {
            settings[key] = defaults[key];
        }
    }
    settings.columns = settings.columns instanceof Array ? settings.columns : [ settings.columns ];
    settings.order = settings.order instanceof Array ? settings.order : settings.order !== false ? [ settings.order ] : settings.order;
    settings.gap_h = settings.gap instanceof Array ? settings.gap[1] || settings.gap[0] : settings.gap;
    settings.gap_v = settings.gap instanceof Array ? settings.gap[0] : settings.gap;
    settings.margin_h = settings.margin instanceof Array ? settings.margin[1] || settings.margin[0] : settings.margin;
    settings.margin_v = settings.margin instanceof Array ? settings.margin[0] : settings.margin;
    settings.dir_left = settings.direction === "rtl" ? "right" : "left";
    settings.dir_right = settings.direction === "rtl" ? "left" : "right";
    let i;
    for (i = 0; i < settings.columns.length; i++) {
        const val = settings.columns[i];
        if (Number(val)) {
            settings.columns_ratio.push(Number(val));
        } else {
            settings.columns_unit.push(val);
        }
    }
    settings.total_ratio_columns = settings.columns_ratio.length === 1 ? settings.columns_ratio[0] : settings.columns_ratio.length;
    settings.total_unit_columns = settings.columns_unit.length;
    settings.total_columns = settings.total_ratio_columns + settings.total_unit_columns;
    let grid_gaps = unitMath([ settings.gap_h, settings.total_columns - 1 ], " * "), grid_margins = unitMath([ settings.margin_h, 2 ], " * ");
    if (settings.columns_ratio.length === 1) {
        settings.grid_col_ratio = settings.columns_ratio[0];
    } else {
        settings.grid_col_ratio = 0;
        for (i = 0; i < settings.columns_ratio.length; i++) {
            settings.grid_col_ratio += settings.columns_ratio[i];
        }
    }
    const isMatched = isUnitMatch([].concat(settings.width).concat(settings.columns_unit).concat(settings.gap).concat(settings.margin));
    const isMatchedGrid = settings.columns_ratio.length === 0 && isUnitMatch([].concat(settings.columns_unit).concat(settings.gap).concat(settings.margin));
    const isPercentGrid = isUnitMatch([].concat(settings.columns_unit).concat(settings.gap).concat(settings.margin), "%");
    settings.calc = !(isMatched || isMatchedGrid || isPercentGrid);
    if (settings.columns_ratio.length === 0) {
        if (settings.calc) {
            const grid_unit_cols = isUnitMatch(settings.columns_unit) ? unitMath(settings.columns_unit, " + ") : settings.columns_unit.join(" + ");
            if (settings.gap_h !== 0 && settings.margin_h !== 0 && isUnitMatch([ grid_gaps, grid_margins ])) {
                settings.auto_width = grid_unit_cols + " + " + unitMath([ grid_gaps, grid_margins ], " + ");
            } else if (settings.gap_h !== 0 && isUnitMatch([ grid_unit_cols, grid_gaps ])) {
                settings.auto_width = unitMath([ grid_unit_cols, grid_gaps ], " + ") + " + " + (settings.margin_h !== 0 ? grid_margins : "");
            } else if (settings.margin_h !== 0 && isUnitMatch([ grid_unit_cols, grid_margins ])) {
                settings.auto_width = unitMath([ grid_unit_cols, grid_margins ], " + ") + " + " + (settings.gap_h !== 0 ? grid_gaps : "");
            } else {
                settings.auto_width = grid_unit_cols;
                if (settings.gap_h !== 0) {
                    settings.auto_width += " + " + grid_gaps;
                }
                if (settings.margin_h !== 0) {
                    settings.auto_width += " + " + grid_margins;
                }
            }
        } else {
            settings.auto_width = unitMath(settings.columns_unit, " + ");
            settings.auto_width = unitMath([ settings.auto_width, grid_gaps, grid_margins ], " + ");
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
            if (settings.gap_h !== 0 && settings.margin_h !== 0 && isUnitMatch([ settings.gap_h, settings.margin_h ])) {
                settings.grid_col_width = settings.grid_width + " - " + unitMath([ grid_gaps, grid_margins ], " + ");
            } else if (settings.gap_h !== 0 && isUnitMatch([ settings.grid_width, grid_gaps ])) {
                settings.grid_col_width = unitMath([ settings.grid_width, grid_gaps ], " - ");
                if (grid_margins !== 0) {
                    settings.grid_col_width += " - " + grid_margins;
                }
            } else if (settings.margin_h !== 0 && isUnitMatch([ settings.grid_width, grid_margins ])) {
                settings.grid_col_width = unitMath([ settings.grid_width, grid_margins ], " - ");
                if (grid_gaps !== 0) {
                    settings.grid_col_width += " - " + grid_gaps;
                }
            } else {
                grid_gaps = settings.gap_h !== 0 ? " - " + grid_gaps : "";
                grid_margins = settings.margin_h !== 0 ? " - " + grid_margins : "";
                settings.grid_col_width = settings.grid_width + grid_gaps + grid_margins;
            }
            settings.grid_col_width = "(" + settings.grid_col_width + ") / " + settings.grid_col_ratio;
        } else {
            settings.grid_col_width = unitMath([ settings.grid_width, grid_gaps, grid_margins ], " - ");
            settings.grid_col_width = unitMath([ settings.grid_col_width, settings.grid_col_ratio ], " / ");
        }
    }
    if (settings.order && settings.order.length <= settings.total_columns) {
        if (settings.columns_ratio.length === 1) {
            for (i = 0; i < settings.columns.length; i++) {
                const col_val = settings.columns[i];
                const num = Number(col_val) || false;
                if (num) {
                    for (let j = 0; j < num; j++) {
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
            let offset = 0;
            const order_val = settings.order[i];
            const column_offset = getOrderOffset(settings, order_val);
            const order_offset = getOrderOffset(settings, i + 1, settings.order);
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

function appendSelectors(selectorList, appendText) {
    return selectorList.split(",").map(function(selector) {
        return selector.trim() + appendText;
    });
}

function round(val, decimals) {
    decimals = decimals || vars.rounding;
    let num = getNumber(val);
    const unit = getUnit(val);
    if (num.toString().match(/\d/g).length > decimals) {
        num = Number(Math.round(num + "e" + decimals) + "e-" + decimals);
    }
    return unit ? num.toString() + unit : num;
}

function overlayContent(grid, selector, container, content) {
    if (grid.overlay) {
        const selectorBefore = selector.map(function(sel) {
            return sel.trim() + ":before";
        });
        container.append(postcss.rule({
            selector: selectorBefore
        }).append({
            prop: "content",
            value: '"' + content + '" !important'
        }));
    }
}

function gridColumns(grid, nthSelector, selectorContainer, siblingContainer) {
    let newRule;
    if (grid.float_legacy && grid.calc && grid.warnings) {
        console.warn(`NTH-GRID: "${nthSelector}" requires calc() support. This grid will not render properly in legacy browsers.`);
    }
    newRule = postcss.rule({
        selector: appendSelectors(nthSelector, " > *:nth-child(1n)")
    }).append({
        prop: "box-sizing",
        value: "border-box"
    }, {
        prop: "position",
        value: "static"
    }, {
        prop: grid.dir_left,
        value: "auto"
    });
    if (grid.float) {
        newRule.append({
            prop: "float",
            value: grid.dir_left
        }, {
            prop: "clear",
            value: "none"
        }, {
            prop: "margin-" + grid.dir_right,
            value: "0"
        });
        if (grid.float_legacy) {
            newRule.append({
                prop: "*display",
                value: "inline"
            }, {
                prop: "*float",
                value: "none"
            }, {
                prop: "*vertical-align",
                value: "top"
            }, {
                prop: "*zoom",
                value: "1"
            });
        }
    }
    newRule.append({
        prop: "margin-top",
        value: grid.gap_v
    }, {
        prop: "margin-" + grid.dir_left,
        value: grid.gap_h
    });
    siblingContainer.append(newRule);
    siblingContainer.append(postcss.rule({
        selector: appendSelectors(nthSelector, " > *:nth-child(-n + " + grid.total_columns + ")")
    }).append({
        prop: "margin-top",
        value: grid.margin_v
    }));
    if (grid.float && grid.float_legacy && grid.margin_h === 0) {
        siblingContainer.append(postcss.rule({
            selector: appendSelectors(nthSelector, " > *:nth-child(" + grid.total_columns + "n)")
        }).append({
            prop: "*margin-" + grid.dir_right,
            value: "-2px"
        }));
    }
    newRule = postcss.rule({
        selector: appendSelectors(nthSelector, " > *:nth-child(" + grid.total_columns + "n + 1)")
    });
    if (grid.float) {
        newRule.append({
            prop: "clear",
            value: grid.dir_left
        });
    }
    newRule.append({
        prop: "margin-" + grid.dir_left,
        value: grid.margin_h
    });
    siblingContainer.append(newRule);
    newRule = postcss.rule({
        selector: appendSelectors(nthSelector, " > *:nth-last-child(-n + " + grid.total_columns + ")")
    });
    if (grid.margin_v === 0) {
        newRule.append({
            prop: "margin-bottom",
            value: "0"
        });
    } else {
        newRule.append({
            prop: "margin-bottom",
            value: "calc(" + grid.margin_v + ")"
        });
    }
    siblingContainer.append(newRule);
    if (grid.float && grid.float_legacy) {
        siblingContainer.append(postcss.rule({
            selector: appendSelectors(nthSelector, " > *:last-child")
        }).append({
            prop: "margin-bottom",
            value: grid.margin_v
        }));
    }
    if (grid.columns_ratio.length === 0) {
        grid.columns.forEach(function(columnVal, i) {
            i++;
            newRule = postcss.rule({
                selector: appendSelectors(nthSelector, " > *:nth-child(" + grid.total_columns + "n + " + i + ")")
            }).append({
                prop: "width",
                value: columnVal
            });
            siblingContainer.append(newRule);
            overlayContent(grid, newRule.selector, siblingContainer, columnVal);
        });
    } else if (grid.columns_ratio.length === 1) {
        newRule = postcss.rule({
            selector: appendSelectors(nthSelector, " > *:nth-child(1n)")
        });
        if (grid.calc) {
            siblingContainer.append(newRule.append({
                prop: "width",
                value: "calc(" + grid.grid_col_width + ")"
            }));
            overlayContent(grid, newRule.selector, siblingContainer, "1/" + grid.grid_col_ratio + " (calc)");
        } else {
            siblingContainer.append(newRule.append({
                prop: "width",
                value: round(grid.grid_col_width)
            }));
            overlayContent(grid, newRule.selector, siblingContainer, "1/" + grid.grid_col_ratio + " (" + round(grid.grid_col_width, 2) + ")");
        }
        if (grid.columns_unit.length > 0) {
            grid.columns.forEach(function(columnVal, i) {
                columnVal = Number(columnVal) || columnVal;
                if (columnVal !== grid.total_ratio_columns) {
                    const nthCol = i > grid.columns.indexOf(grid.total_ratio_columns) ? i + grid.total_ratio_columns : i + 1;
                    newRule = postcss.rule({
                        selector: appendSelectors(nthSelector, " > *:nth-child(" + grid.total_columns + "n + " + nthCol + ")")
                    }).append({
                        prop: "width",
                        value: columnVal
                    });
                    siblingContainer.append(newRule);
                    overlayContent(grid, newRule.selector, siblingContainer, columnVal);
                }
            });
        }
    } else {
        grid.columns.forEach(function(columnVal, i) {
            i++;
            const newRule = postcss.rule({
                selector: appendSelectors(nthSelector, " > *:nth-child(" + grid.total_columns + "n + " + i + ")")
            });
            if (Number(columnVal)) {
                if (grid.calc) {
                    siblingContainer.append(newRule.append({
                        prop: "width",
                        value: "calc((" + grid.grid_col_width + ") * " + columnVal + ")"
                    }));
                    overlayContent(grid, newRule.selector, siblingContainer, columnVal + "/" + grid.grid_col_ratio + " (calc)");
                } else {
                    const columnWidth = round(unitMath([ grid.grid_col_width, columnVal ], " * "));
                    siblingContainer.append(newRule.append({
                        prop: "width",
                        value: columnWidth
                    }));
                    overlayContent(grid, newRule.selector, siblingContainer, columnVal + "/" + grid.grid_col_ratio + " (" + round(columnWidth, 2) + ")");
                }
            } else {
                siblingContainer.append(newRule.append({
                    prop: "width",
                    value: columnVal
                }));
                overlayContent(grid, newRule.selector, siblingContainer, columnVal);
            }
        });
    }
    if (grid.order && grid.order.length > grid.total_columns) {
        if (grid.warnings) {
            console.warn(`NTH-GRID: "${nthSelector}" order [${grid.order}] exceeds total column count of ${grid.total_columns} for columns [${grid.columns}]. Order not applied.`);
        }
    } else if (grid.order_offsets.length) {
        grid.order_offsets.forEach(function(offset, i) {
            const orderVal = grid.order[i];
            if (offset !== 0) {
                siblingContainer.append(postcss.rule({
                    selector: appendSelectors(nthSelector, " > *:nth-child(" + grid.total_columns + "n + " + orderVal + ")")
                }).append({
                    prop: "position",
                    value: "relative"
                }, {
                    prop: grid.dir_left,
                    value: grid.calc ? "calc(" + offset + ")" : round(offset)
                }));
            }
        });
    }
}

function gridContainer(grid, nthSelector, selectorContainer, siblingContainer) {
    if (grid.float) {
        selectorContainer.append({
            prop: "display",
            value: "block"
        });
        if (grid.float_legacy) {
            selectorContainer.append({
                prop: "*display",
                value: "inline-block"
            });
        }
        if (grid.order) {
            selectorContainer.append({
                prop: "*position",
                value: "relative"
            });
        }
    }
    if (grid.flex) {
        if (grid.flex_legacy) {
            selectorContainer.append({
                prop: "display",
                value: "-webkit-box"
            }, {
                prop: "display",
                value: "-ms-flexbox"
            });
        }
        selectorContainer.append({
            prop: "display",
            value: "flex"
        });
        if (grid.flex_legacy) {
            selectorContainer.append({
                prop: "-ms-flex-wrap",
                value: "wrap"
            });
        }
        selectorContainer.append({
            prop: "flex-wrap",
            value: "wrap"
        });
        if (grid.flex_legacy) {
            selectorContainer.append({
                prop: "-webkit-box-align",
                value: "start"
            }, {
                prop: "-ms-flex-align",
                value: "start"
            });
        }
        selectorContainer.append({
            prop: "align-items",
            value: "flex-start"
        });
        if (grid.direction === "rtl") {
            if (grid.flex_legacy) {
                selectorContainer.append({
                    prop: "-webkit-box-orient",
                    value: "horizontal"
                }, {
                    prop: "-webkit-box-direction",
                    value: "reverse"
                }, {
                    prop: "-ms-flex-direction",
                    value: "row-reverse"
                });
            }
            selectorContainer.append({
                prop: "flex-direction",
                value: "row-reverse"
            });
        }
    }
    if (grid.total_ratio_columns === 0) {
        selectorContainer.append({
            prop: "box-sizing",
            value: "content-box"
        });
    } else {
        selectorContainer.append({
            prop: "box-sizing",
            value: "border-box"
        });
    }
    if (grid.total_ratio_columns === 0 && grid.calc) {
        selectorContainer.append({
            prop: "width",
            value: "calc(" + grid.auto_width + ")"
        });
    } else if (grid.total_ratio_columns === 0) {
        selectorContainer.append({
            prop: "width",
            value: grid.auto_width
        });
    } else if (grid.width !== "100%") {
        selectorContainer.append({
            prop: "width",
            value: grid.width
        });
    } else {
        selectorContainer.append({
            prop: "width",
            value: "auto"
        });
    }
    if (grid.float) {
        siblingContainer.append(postcss.rule({
            selector: appendSelectors(nthSelector, ":after")
        }).append({
            prop: "content",
            value: "''"
        }, {
            prop: "display",
            value: "table"
        }, {
            prop: "clear",
            value: "both"
        }));
    }
}

function gridDebug(grid, nthSelector, selectorContainer, siblingContainer) {
    if (grid.debug) {
        const debugContent = [ "columns            : " + grid.columns, "gap                : " + grid.gap, "margin             : " + grid.margin, "width              : " + grid.width, "order              : " + grid.order, "direction          : " + grid.direction, "flex               : " + grid.flex, "flex-legacy        : " + grid.flex_legacy, "float              : " + grid.float, "float-legacy       : " + grid.float_legacy + "\\A ", "auto_width         : " + grid.auto_width, "calc               : " + grid.calc, "columns_ratio      : " + grid.columns_ratio, "columns_unit       : " + grid.columns_unit, "grid_col_ratio     : " + grid.grid_col_ratio, "grid_col_width     : " + grid.grid_col_width, "grid_width         : " + grid.grid_width, "order_offsets      : " + grid.order_offsets, "total_columns      : " + grid.total_columns, "total_ratio_columns: " + grid.total_ratio_columns, "total_unit_columns : " + grid.total_unit_columns ].join("\\A ");
        siblingContainer.append(postcss.rule({
            selector: appendSelectors(nthSelector, ":before")
        }).append({
            text: "Nth-Grid Debug"
        }, {
            prop: "content",
            value: '"' + debugContent + '"'
        }, {
            prop: "display",
            value: "block !important"
        }, {
            prop: "flex-basis",
            value: "100% !important"
        }, {
            prop: "overflow",
            value: "hidden !important"
        }, {
            prop: "padding",
            value: "1em !important"
        }, {
            prop: "background",
            value: grid.debug_background_color + " !important"
        }, {
            prop: "color",
            value: grid.debug_text_color + " !important"
        }, {
            prop: "font-family",
            value: '"Lucida Console", "Consolas", Monaco, monospace !important'
        }, {
            prop: "font-size",
            value: "12px !important"
        }, {
            prop: "line-height",
            value: "1.4 !important"
        }, {
            prop: "text-align",
            value: "left !important"
        }, {
            prop: "white-space",
            value: "pre !important"
        }));
    }
}

function gridOverlay(grid, nthSelector, selectorContainer, siblingContainer) {
    const overlayFontSize = "14px";
    if (grid.overlay) {
        selectorContainer.append({
            text: "Nth-Grid Overlay"
        }, {
            prop: "position",
            value: "relative"
        }, {
            prop: "visibility",
            value: "visible !important"
        }, {
            prop: "background",
            value: grid.overlay_margin_color + " !important"
        });
        siblingContainer.append(postcss.rule({
            selector: nthSelector + " > *"
        }).append({
            text: "Nth-Grid Overlay"
        }, {
            prop: "position",
            value: "relative !important"
        }, {
            prop: "min-height",
            value: unitMath([ overlayFontSize, 3 ], " * ") + " !important"
        }, {
            prop: "background",
            value: grid.overlay_column_color + " !important"
        }, {
            prop: "color",
            value: "transparent !important"
        }));
        siblingContainer.append(postcss.rule({
            selector: appendSelectors(nthSelector, " > *:before")
        }).append({
            text: "Nth-Grid Overlay"
        }, {
            prop: "position",
            value: "absolute !important"
        }, {
            prop: "top",
            value: "0 !important"
        }, {
            prop: "bottom",
            value: "0 !important"
        }, {
            prop: "left",
            value: "0 !important"
        }, {
            prop: "right",
            value: "0 !important"
        }, {
            prop: "height",
            value: overlayFontSize + " !important"
        }, {
            prop: "width",
            value: "100% !important"
        }, {
            prop: "margin",
            value: "auto !important"
        }, {
            prop: "color",
            value: grid.overlay_text_color + " !important"
        }, {
            prop: "font-size",
            value: overlayFontSize + " !important"
        }, {
            prop: "text-align",
            value: "center !important"
        }, {
            prop: "line-height",
            value: "1 !important"
        }));
        siblingContainer.append(postcss.rule({
            selector: nthSelector + " > * > *"
        }).append({
            text: "Nth-Grid Overlay"
        }, {
            prop: "visibility",
            value: "hidden !important"
        }));
    }
}

function normalize(val) {
    if (Number(val)) {
        return Number(val);
    } else if (getNumber(val) === 0) {
        return 0;
    } else if (val.toLowerCase() === "true" || val.toLowerCase() === "false") {
        return val.toLowerCase() === "true";
    } else {
        return val;
    }
}

var index = postcss.plugin("postcss-nth-grid", options => {
    options = options || {};
    const NTH_GLOBAL_PREFIX = "--nth-grid-";
    const NTH_SELECTOR = "nth-grid";
    return function(css) {
        css.walkRules(function(rule) {
            if (rule.selector === ":root") {
                rule.walkDecls(function(decl) {
                    if (decl.prop.indexOf(NTH_GLOBAL_PREFIX) === 0) {
                        const key = decl.prop.replace(NTH_GLOBAL_PREFIX, "").replace(/-/g, "_");
                        const arr = decl.value.split(" ").map(function(val) {
                            return normalize(val);
                        });
                        options[key] = arr.length > 1 ? arr : arr[0];
                    }
                });
                if (options.remove_globals) {
                    rule.walkDecls(function(decl) {
                        if (decl.prop.indexOf(NTH_GLOBAL_PREFIX) === 0) {
                            decl.remove();
                        }
                    });
                    if (rule.nodes.length === 0) {
                        rule.remove();
                    }
                }
            }
            if (rule.selector === NTH_SELECTOR) {
                const nthRule = rule;
                const nthSelector = nthRule.parent.selector;
                const settings = {};
                nthRule.parent.raws.semicolon = true;
                nthRule.walkDecls(function(decl) {
                    const key = decl.prop.replace(/-/g, "_");
                    const arr = decl.value.split(" ").map(function(val) {
                        return normalize(val);
                    });
                    settings[key] = arr.length > 1 ? arr : arr[0];
                });
                const grid = new Grid(settings, options);
                const selectorContainer = nthRule.cloneAfter({
                    selector: "nth-grid-output"
                }).removeAll();
                const siblingContainer = nthRule.clone({
                    selector: "nth-grid-sibling-output"
                }).removeAll();
                nthRule.parent.after(siblingContainer);
                gridContainer(grid, nthSelector, selectorContainer, siblingContainer);
                gridColumns(grid, nthSelector, selectorContainer, siblingContainer);
                gridOverlay(grid, nthSelector, selectorContainer, siblingContainer);
                gridDebug(grid, nthSelector, selectorContainer, siblingContainer);
                if (grid.float_legacy) {
                    [ selectorContainer, siblingContainer ].forEach(function(container) {
                        container.walk(function(node) {
                            if (node.value && getUnit(node.value) === "rem") {
                                const pxVal = getNumber(node.value) * grid.rem_base + "px";
                                node.parent.insertBefore(node, node.clone({
                                    prop: node.prop,
                                    value: pxVal
                                }));
                            }
                        });
                    });
                }
                [ selectorContainer, siblingContainer ].forEach(function(container) {
                    container.each(function(node) {
                        node.source = nthRule.source;
                        container.before(node);
                    });
                    container.remove();
                });
                nthRule.remove();
            }
        });
    };
});

module.exports = index;
//# sourceMappingURL=index.js.map