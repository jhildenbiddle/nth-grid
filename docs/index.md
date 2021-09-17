# Nth-Grid

[![NPM](https://img.shields.io/npm/v/nth-grid.svg?style=flat-square)](https://www.npmjs.com/package/nth-grid)
[![GitHub Workflow Status (master)](https://img.shields.io/github/workflow/status/jhildenbiddle/nth-grid/Build%20&%20Test/master?label=checks&style=flat-square)](https://github.com/jhildenbiddle/nth-grid/actions?query=branch%3Amaster+)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/nth-grid/blob/master/LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/nth-grid/badge)](https://www.jsdelivr.com/package/npm/nth-grid)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fnth-grid&hashtags=css,developers,frontend,javascript)

A lightweight and semantic CSS grid, flexbox, and float-based grid system for [Less](http://lesscss.org/), [PostCSS](https://github.com/postcss/postcss), [Sass](http://sass-lang.com/), and [Stylus](http://stylus-lang.com/).

- [Documentation](https://jhildenbiddle.github.io/nth-grid/)
- [SassDocs](https://jhildenbiddle.github.io/nth-grid/sassdoc) (Sass mixin)

## Features

- CSS `grid`, `flexbox`, and `float`-based grids
- Clean and semantic markup without grid-specific class names
- Simple, readable, easy-to-learn syntax
- Fixed and/or fluid grids, columns, gaps and margins
- Symmetric and asymmetric grids
- Column ordering
- Equal-height columns
- Vertically-aligned columns
- RTL (right-to-left) layouts
- Grid overlays and debug information
- [SassDoc](http://sassdoc.com/) integration

**Support**

- [Less](http://lesscss.org/) v3+
- [PostCSS](https://github.com/postcss/postcss) v7, v8
- [Sass](http://sass-lang.com/) v1.17+
- [Stylus](http://stylus-lang.com/) 0.51+
- Modern and legacy browsers (IE9+ / IE7+ with polyfills)

## Why Nth-Grid?

Nth-Grid provides all of the features expected of a modern CSS grid system while simplifying grid concepts and implementation.

1. **Custom grids without limitations**

   Nth-Grid provides a level of flexibility that no other CSS grid system offers: display multiple custom grids on the same page, combine fixed and fluid columns in the same grid, add fixed gaps and margins to fluid grids, create single and multi-row grids, nest custom grids within custom grids, reorder columns, create equal height or vertically-aligned columns, change the grid direction for RTL layouts, and modify any grid setting on-the-fly in your responsive layouts. Nth-Grid handles all of this with a single mixin in your CSS using familiar grid concepts and terminology.

1. **Semantic grids without grid-specific CSS classes**

   Many popular grid systems require adding CSS classes to your HTML markup for grid containers, rows, columns, ordering, nesting, responsive breakpoints, etc. The end result is markup littered with grid-specific CSS classes, adding unnecessary bloat and making changes a time-consuming challenge. Nth-Grid keeps your markup clean and the CSS for your grid-based layouts where it belongs: in your CSS, named and applied as you see fit.

1. **Native support for multiple CSS processors**

   Nth-Grid is the only CSS grid system that provides native support for Less, PostCSS, Sass, and Stylus. The flexibility to work with the languages, frameworks, applications and command-line tools you are already familiar with provides the fastest integration with the smallest learning curve possible. This versatility also allows for the adoption of a single grid system across multiple projects, making it easy to transition between them.

1. **Support for modern and legacy browsers**

   Most grid systems have abandoned support for legacy browsers as modern browsers adopt new features that enable grid-based layouts. This leaves projects that require legacy browser support with an increasingly limited selection of grid systems to choose from. Nth-Grid supports a wide variety of grid layouts that are compatible with legacy browsers and enhanced functionality for modern browsers that support CSS features like [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) and [grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids).

## Installation

**NPM**

```bash
npm install nth-grid --save-dev
```

**Git**

```bash
# Clone repo
git clone https://github.com/jhildenbiddle/nth-grid.git

# Change directory
cd nth-grid

# Development (build & watch)
npm start
```

The following resources are available during development:

- Documentation: [http://localhost:3000](http://localhost:3000)
- Grids Demo: [http://localhost:3000/demo/](http://localhost:3000/demo/)
- SassDocs: [http://localhost:3000/sassdoc/](http://localhost:3000/sassdoc/)

## Usage

First, import the Nth-Grid mixin into your Less, Sass or Stylus file. The path to the mixin will vary depending on your installation method as well as your bundler/build tool(s). For PostCSS, add Nth-Grid to your list of PostCSS plugins.

<!-- tabs:start -->

##### **Less**

```less
@import "path/to/nth-grid/dist/less/_nth-grid";
```

##### **Sass**

Modern Sass (v1.33+ required): [`@use`](https://sass-lang.com/documentation/at-rules/use)

```scss
@use "path/to/nth-grid/dist/sass/_nth-grid" as *;
```

Legacy Sass (node-sass, libsass, Ruby Sass): [`@import`](https://sass-lang.com/documentation/at-rules/import)

```scss
@import "path/to/nth-grid/dist/sass/_nth-grid";
```

##### **Stylus**

```stylus
@import "path/to/nth-grid/dist/stylus/_nth-grid";
```

##### **PostCSS**

For configurations using `postcss.config.js`:

```javascript
module.exports = {
  plugins: [
    require('nth-grid')
  ]
}
```

See the official [PostCSS documentation](https://github.com/postcss/postcss) for a complete list of bundlers and build    tools.

<!-- tabs:end -->

Next, create your HTML markup. Nth-Grid requires one "wrapper" element to serve as the grid container. All direct descendants of the grid container are treated as grid columns.

Let's start with a basic three column grid:

```html
<main>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</main>
```

Apply the Nth-Grid mixin to the grid container. For simple grids that require specifying columns only, we can pass the column settings as the only argument to the mixin:

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(3);
}
```

##### **Sass**

```scss
main {
  .nth-grid(3);
}
```

##### **Stylus**

```stylus
main
  .nth-grid(3)
```

##### **PostCSS**

```css
main {
  nth-grid(3);
}
```

<!-- tabs:end -->

<div class="grid-3col">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

**Example 2:** We'll define a *different* three column grid on the `.myClass` element. Since this element has six child elements, this will produce a grid with two rows. Adding additional child elements will create additional rows.

```html
<div class="myclass">
  <!-- Row 1 -->
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
  <!-- Row 2 -->
  <div>Column 4</div>
  <div>Column 5</div>
  <div>Column 6</div>
  <!-- Add elements for additional rows... -->
</div>
```

2. Apply the Nth-Grid mixin to the grid container elements. The mixin will generate the CSS styles needed for the grid container and all of its direct descendants. Examples are provided below to demonstrate the Nth-Grid syntax for each CSS processor.

<!-- tabs:start -->

##### **Less**

```less
  // Minimal grid settings
  main {
      .nth-grid(
          @columns: 3       // 3 symmetric columns, each 1/3 of <main> width
      );
  }

  // All grid settings
  .myclass {
      .nth-grid(
          @columns: 1 2 3,  // 3 asymmetric columns: 1/6, 2/6, 3/6 of @width
          @gap: 1%,      // 1% horizontal and vertical column gaps
          @margin: 0 1%,    // 0% horizontal, 1% vertical grid margins
          @width: 960px,    // Fixed 960px container
          @order: 3 1 2,    // Column order
          @direction: ltr,  // Grid direction
          @legacy: false,   // Legacy browser support (IE7/8)
          @debug: false,    // Debug information displayed above grid
          @overlay: false   // Grid column overlay
      );
  }
```

##### **Sass**

```scss
  // Minimal grid settings
  main {
      .nth-grid(
          $columns: 3       // 3 symmetric columns, each 1/3 of <main> width
      );
  }

  // All grid settings
  .myclass {
      .nth-grid(
          $columns: 1 2 3,  // 3 asymmetric columns: 1/6, 2/6, 3/6 of $width
          $gap: 1%,      // 1% horizontal and vertical column gaps
          $margin: 0 1%,    // 0% horizontal, 1% vertical grid margins
          $width: 960px,    // Fixed 960px container
          $order: 3 1 2,    // Column order
          $direction: ltr,  // Grid direction
          $legacy: false,   // Legacy browser support (IE7/8)
          $debug: false,    // Debug information displayed above grid
          $overlay: false   // Grid column overlay
      );
  }
```

##### **Stylus**

```stylus
  // Minimal grid settings
  main
      .nth-grid(
          $columns: 3       // 3 symmetric columns, each 1/3 of <main> width
      )

  // All grid settings
  .myclass
      .nth-grid(
          $columns: 1 2 3,  // 3 asymmetric columns: 1/6, 2/6, 3/6 of $width
          $gap: 1%,      // 1% horizontal and vertical column gaps
          $margin: 0 1%,    // 0% horizontal, 1% vertical grid margins
          $width: 960px,    // Fixed 960px container
          $order: 3 1 2,    // Column order
          $direction: ltr,  // Grid direction
          $legacy: false,   // Legacy browser support (IE7/8)
          $debug: false,    // Debug information displayed above grid
          $overlay: false   // Grid column overlay
      )
```

##### **PostCSS**

```css
  /* Minimal grid settings */
  main {
      nth-grid(
          columns: 3;      /* 3 symmetric columns, each 1/3 of <main> width */
      );
  }

  /* All grid settings */
  .myclass {
      nth-grid(
          columns: 1 2 3;  /* 3 asymmetric columns: 1/6, 2/6, 3/6 of width argument */
          gap: 1%;      /* 1% horizontal and vertical column gaps */
          margin: 0 1%;    /* 0% horizontal, 1% vertical grid margins */
          width: 960px;    /* Fixed 960px container */
          order: 3 1 2;    /* Column order */
          direction: ltr;  /* Grid direction */
          legacy: false;   /* Legacy browser support (IE7/8) */
          debug: false;    /* Debug information displayed above grid */
          overlay: false;  /* Grid column overlay */
      );
  }
```

<!-- tabs:end -->





## Global Options

Nth-Grid provides global options for changing the default values used for most grid settings. Global options for each CSS processor are listed below along with their default values. Details for each option are available in the [Grid Settings](#grid-settings) section.

**Less**

```less
// Layout settings
@nth-grid-columns               : 1;
@nth-grid-gap                   : 0;
@nth-grid-margin                : 0;
@nth-grid-direction             : ltr;
@nth-grid-legacy                : false;

// Debug setting
@nth-grid-debug                 : false;
@nth-grid-debug-background-color: #000;
@nth-grid-debug-text-color      : #ccc;

// Overlay settings
@nth-grid-overlay               : false;
@nth-grid-overlay-column-color  : #333;
@nth-grid-overlay-margin-color  : #999;
@nth-grid-overlay-text-color    : #fff;

// Compilation settings
@nth-grid-rem-base              : 16;
@nth-grid-warnings              : true;
```

**Sass**

```scss
// Layout settings
$nth-grid-columns               : 1;
$nth-grid-gap                   : 0;
$nth-grid-margin                : 0;
$nth-grid-direction             : ltr;
$nth-grid-legacy                : false;

// Debug setting
$nth-grid-debug                 : false;
$nth-grid-debug-background-color: #000;
$nth-grid-debug-text-color      : #ccc;

// Overlay settings
$nth-grid-overlay               : false;
$nth-grid-overlay-column-color  : #333;
$nth-grid-overlay-margin-color  : #999;
$nth-grid-overlay-text-color    : #fff;

// Compilation settings
$nth-grid-rem-base              : 16;
$nth-grid-warnings              : true;
```

**Stylus**

```stylus
// Layout settings
$nth-grid-columns                = 1
$nth-grid-gap                    = 0
$nth-grid-margin                 = 0
$nth-grid-direction              = ltr
$nth-grid-legacy                 = false

// Debug setting
$nth-grid-debug                  = false
$nth-grid-debug-background-color = #000
$nth-grid-debug-text-color       = #ccc

// Overlay settings
$nth-grid-overlay                = false
$nth-grid-overlay-column-color   = #333
$nth-grid-overlay-margin-color   = #999
$nth-grid-overlay-text-color     = #fff

// Compilation settings
$nth-grid-rem-base               = 16
$nth-grid-warnings               = true
```

**PostCSS: Global Options in CSS**

Nth-Grid for PostCSS provides two methods of defining global options: in your CSS file or by passing a configuration object to the JavaScript plugin.

Global options defined in CSS will be take precedence over options specified in JavaScript. This allows you to define global options in JavaScript, then override them or set additional options when necessary in your CSS on a per-file basis.

Note the PostCSS-specific  `remove-globals` option. When this option is set to `true` Nth-Grid global options specified in CSS will be removed during compilation, preventing them from showing up in your compiled CSS. If the `:root` element declaration is empty after removing all Nth-Grid global options, it will be removed as well.

```css
/* Nth-Grid global options in CSS */
:root {
    /* Layout settings */
    --nth-grid-columns               : 1;
    --nth-grid-gap                   : 0;
    --nth-grid-margin                : 0;
    --nth-grid-direction             : ltr;
    --nth-grid-legacy                : false;

    /* Debug setting */
    --nth-grid-debug                 : false;
    --nth-grid-debug-background-color: #000;
    --nth-grid-debug-text-color      : #ccc;

    /* Overlay settings */
    --nth-grid-overlay               : false;
    --nth-grid-overlay-column-color  : #333;
    --nth-grid-overlay-margin-color  : #999;
    --nth-grid-overlay-text-color    : #fff;

    /* Compilation settings */
    --nth-grid-rem-base              : 16;
    --nth-grid-remove-globals        : true;
    --nth-grid-warnings              : true;
}
```

```javascript
// Example: Gulp task using Nth-Grid PostCSS plugin with global options and sourcemaps
gulp.task('css', function () {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    // Nth-Grid Global Options
    var options = {
        // Layout settings
        'columns'               : 1,
        'gap'                   : 0,
        'margin'                : 0,
        'direction'             : 'ltr',
        'legacy'                : false,

        // Debug settings
        'debug'                 : false,
        'debug-background-color': '#000',
        'debug-text-color'      : '#ccc',

        // Overlay settings
        'overlay'               : false,
        'overlay-column-color'  : '#333',
        'overlay-margin-color'  : '#999',
        'overlay-text-color'    : '#fff',

        // Compilation settings
        'rem-base'              : 16,
        'remove-globals'        : true,
        'warnings'              : true
    };

    return gulp.src('src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            // Pass options to Nth-Grid
            require('nth-grid')(options)
        ]))
        .pipe(sourcemaps.write('build/css/'))
        .pipe(gulp.dest('build/css/'));
});
```

## Grid Settings

Nth-Grid provides many grid settings, but you only need to specify the settings needed for your layout. If a setting is not specified, Nth-Grid will use default value listed in the [Global Options](#global-options) section.

Examples below are provided for the Sass/SCSS mixin, but the syntax is similar for other processors. See the [Quick Start](#quick-start) section for syntax variations between for Less, PostCSS Sass, and Stylus.

### columns

*Default:* `1`

Sets the column count, width and order for each grid row. All grids can be fixed- or fluid-width, determined by the width of container element.

- Accepts a single *unitless* value for symmetric, ratio-based grids.

  ```scss
  // Sass
  // A fluid, three column grid with symmetric columns
  .myclass {
      .nth-grid(
          // Columns-per-row = value (3)
          // Column ratio = value (3)
          // Column width = value / ratio
          // -----------------------------
          // All columns = 1/3 of .myclass
          $columns: 3
      );
  }
  ```

- Accepts a space-separated list of *unitless* values for asymmetric, ratio-based grids.

```scss
  // Sass
  // An fluid, three column grid with asymmetric columns
  .myclass {
      .nth-grid(
          // Columns-per-row = list length (3)
          // Column ratio = sum of values (6)
          // Column width = value / ratio
          // ---------------------------------------------------------
          // First column = 1/6, second = 2/6, third = 3/6 of .myclass
          $columns: 1 2 3
      );
  }
```

- Accepts a space-separated list of *matched unit* values.

  Nth-Grid will calculate the grid width and apply it to the grid container element.

  ```scss
  // Sass
  // A fixed, matched-unit, three column grid
  .myclass {
      .nth-grid(
          // Grid width = sum of values (960px)
          // Columns-per-row = list length (3)
          // Column width = column value / the ratio
          // ---------------------------------------------------
          // First column = 200px, second = 600px, third = 160px
          $columns: 200px 600px 160px
      );
  }
  ```

- Accepts a space-separated list of *mixed unit* values.

  Nth-Grid will generate a CSS calc() value for the grid width and apply it to the grid container element.

```scss
  // Sass
  // A fluid, mixed-unit, three column grid with fixed and fluid columns
  .myclass {
      .nth-grid(
          // Grid width = sum of values (12.5rem + 60vw + 160px)
          // Columns-per-row = list length (3)
          // Column width = column value
          // ----------------------------------------------------
          // First column = 12.5rem, second = 60vw, third = 160px
          $columns: 12.5rem 60vw 160px
      );
  }
```

- Accepts a space-separated list of *unit- and unitless* values.

  ```scss
  // Sass
  // A fluid, mixed-value, three column grid with fixed and fluid columns
  .myclass {
      .nth-grid(
          // Columns-per-row = list length (3)
          // Column ratio = sum of unitless values (4)
          // Fixed column width = value
          // Fluid column width = value / ratio - (.myclass - sum of fixed values)
          // -----------------------------------------
          // First column = 3/4 of (.myclass - 200px)
          // Second column = 1/4 of (.myclass - 200px)
          // Third column = 200px
          $columns: 3 1 200px
      );
  }
  ```

### gap

*Default:* `0`

Sets the vertical gaps (between rows) and horizontal gaps (between columns).

- Accepts a unit value for *matched* horizontal and vertical gaps.

  ```scss
  // Sass
  // A grid with a matched gaps
  .myclass {
      .nth-grid(
          // ...
          // Vertical and horizontal gaps = 2%
          $gap: 2%
      );
  }
  ```

- Accepts a space-separated list of unit values as *mixed* horizontal and vertical gaps.

```scss
  // Sass
  // A grid with a mixed gaps
  .myclass {
      .nth-grid(
          // ...
          // Vertical gaps = 0, horizontal gaps = 10px
          $gap: 0 10px
      );
  }
```

### margin

*Default:* `0`

Sets the vertical and horizontal margins of the grid *within* the grid container.

- Accepts a unit value for *matched* horizontal and vertical margins.

  ```scss
  // Sass
  // A grid with a matched margins
  .myclass {
      .nth-grid(
          // ...
          // Vertical and horizontal margins = 2%
          $margin: 2%
      );
  }
  ```

- Accepts a space-separated list of unit values as *mixed* horizontal and vertical margins.

```scss
  // Sass
  // A grid with a mixed margins
  .myclass {
      .nth-grid(
          // ...
          // Vertical margins = 0, horizontal margins = 10px
          $margin: 0 10px
      );
  }
```

### width

*Default:* `auto`

Sets the width of the grid container.

- Accepts a unit value.  When the `width` option is omitted, a width value of `auto` is applied to the grid container element.

  ```scss
  // Sass
  // A grid that is 80% of the width of its parent width
  .myclass {
      .nth-grid(
          // ...
          $width: 80%
      );
  }
  ```

### order

*Default:* `false`

Sets the column presentation order.

- Accepts `false` or a space-separated list of unitless values.

  ```scss
  // Sass
  // A grid with an adjusted column presentation order
  .myclass {
      .nth-grid(
          // Three columns
          $columns: 3,
          // Column 3 is moved to the first position
          // Column 1 is moved to the second position
          // Column 2 is moved to the third position
          $order: 3 1 2
      );
  }
  ```

### direction

*Default:* `ltr`

Sets the direction of the grid layout to support left-to-right (default) or right-to-left layouts. This sets the flow of grid columns but not the flow of content within columns. Content flow should be set by applying `dir="rtl"` to an HTML element or adding a `direction: rtl;` rule in your CSS.

- Accepts `ltr` or `rtl`.

  ```scss
  // Sass
  // A grid with right-to-left column flow for RTL layouts
  .myclass {
      direction: rtl;  // Sets right-to-left content flow
      .nth-grid(
          // ...
          $direction: rtl  // Sets right-to-left column flow
      );
  }
  ```

### legacy

*Default:* `false`

Sets legacy compatibility mode. This setting is typically set as a [global option](#global-options), but it can be set on a per-grid basis. When set to `true` additional CSS being generated for IE7/8 compatibility. It is not necessary to set this option for IE9+.

- Accepts `true` or `false`.

  ```scss
  // Sass
  // A grid with legacy browser support
  .myclass {
      .nth-grid(
          // ...
          $legacy: true
      );
  }
  ```

### debug

*Default:* `false`

Sets the display of grid debug information. Debug information is displayed above the grid and provides an easy way to view the values used by Nth-Grid to calculate the grid layout.

- Accepts `true` or `false`.

  ```scss
  // Sass
  // A grid with debug information displayed
  .myclass {
      .nth-grid(
          // ...
          $debug: true
      );
  }
  ```

- Debug presentation can be customized using the following settings:

```scss
  // Sass
  // A grid with customized debug information displayed
  .myclass {
      .nth-grid(
          // ...
          $debug: true,
          $debug-background-color: #000,
          $debug-text-color: #ccc
      );
  }
```

### overlay

*Default:* `false`

Sets the display of the grid column overlay. The overlay will render on top of your column content and display column information such as the original position (before `order` or `rtl` is applied) and calculated width.

- Accepts `true` or `false`.

  ```scss
  // Sass
  // A grid with the overlay displayed
  .myclass {
      .nth-grid(
          // ...
          $overlay: true
      );
  }
  ```

- Grid overlay presentation can be customized using the following settings:

```scss
  // Sass
  // A grid with a customized overlay displayed
  .myclass {
      .nth-grid(
          // ...
          $overlay: true,
          $overlay-column-color: #333,
          $overlay-margin-color: #999,
          $overlay-text-color: #fff
      );
  }
```

### rem-base

*Default:* `16`

This option must be set as a [global option](#global-options).

Sets the base font size for rem-to-pixel conversion for IE 7/8. This option is only necessary when the font size of the root element has been changed from the browser default of 16px.

- Accepts a number or pixel value.

### remove-globals

*Default:* `true`

This option is only available for PostCSS and must be set as a [global option](#global-options).

Sets the Nth-Grid PostCSS processor to remove Nth-Grid global options specified in CSS after compilation.  This prevents these options from showing up in your compiled CSS. If the `:root` element is empty after removing all Nth-Grid global options, the root element CSS rule will be removed as well.

- Accepts `true` or `false`.

### warnings

*Default:* `true`

Sets the output of grid layout warnings during compilation. Compilation warnings are generated when `legacy` is set to `true` and a grid configuration is defined that is not compatible with legacy browsers.

- Accepts `true` or `false`.

  ```scss
  // Sass
  // A grid with compilation warnings enabled
  .myclass {
      .nth-grid(
          // Mixed-unit grid configurations are not compatible with legacy browsers
          $columns: 2 200px,
          // Legacy browser support is enabled for this grid
          $legacy: true,
          // A warnings will be displayed during compilation
          $warnings: true
      );
  }
  ```

## Legacy Browsers

Nth-Grid uses a variety of CSS features to render grid layouts, some of which are not supported by legacy browsers. Polyfills exist that provide legacy support for some of these missing features, but not all missing features can be polyfilled.  As a result, Nth-Grid provides legacy browser support for some (but not all) grid configurations.

**Requirements**

1. [Selectivizr.js](https://github.com/keithclark/selectivizr) polyfill for nth-child support.
2. [Respond.js](https://github.com/scottjehl/Respond) polyfill for media query support (optional).
3. Nth-Grid's [legacy](#legacy) option set to `true`.
4. Nth-Grid's [rem-base](#rem-base) option set to the font size of the root element.

**Grid Configurations**

- Grid columns set to a single, *unitless* value. Requires percentage-based gap and margin values.
- Grid columns set to a list of *unitless* values. Requires percentage-based gap and margin values.
- Grid columns set to a list of *matched-unit* values. Requires similarly matched-unit gap and margin values.
- Grid columns set to a list of *unit- and unitless* values. Requires percentage-based column, gap and margin values.
- Column ordering
- Grid direction
- Grid overlay
- Grid debug information
- Grid values defined using `rem` units

The following grid configurations are not supported by legacy browsers due to lack of CSS [calc() values](http://caniuse.com/#feat=calc) and [flexbox](http://caniuse.com/#feat=flexbox) support:

- Grid columns set to a list of *mixed-unit* values
- Grid columns, gap, and margin values with *mixed* units.
- Equal-height columns
- Vertically-aligned columns

## SassDoc Integration

Nth-Grid includes SassDoc-compatible comments in the Sass source code. This makes including Nth-Grid documentation in your own SassDoc-generated documentation as simple as including `path/to/_nth-grid.sass` in the list of Sass files to process.

For more information on SassDoc, please visit [sassdoc.com](http://sassdoc.com).

## Compatibility Notes

**Android v4.x Browser App**

- **CSS Calc() Limitations:** The "Browser" app the ships with Android v4.4 has [limited support for CSS calc() values](http://caniuse.com/#search=calc). Grid configurations that require CSS calc() values will therefore not render properly in this browser. Fortunately, Chrome for Android fully supports calc() values and enjoys a much larger market share than the the default "Browser" app.

**Internet Explorer 9**

- **CSS Calc() Limitations:** IE9 supports CSS calc() values up to 128 characters and will truncate values that exceed this length. Grids that require calc() values larger than 128 characters will therefore render incorrectly in this browser. This typically isn't an issue, although long calc() values can be generated when using the `order` setting with grids that contain a mix of fixed- and fluid-width columns, gaps and margins.

**Internet Explorer 7/8**

- **Grid Configurations:** As detailed in the [Legacy Browsers](#legacy-browsers) section, Nth-Grid provides legacy browser support for some (but not all) grid configurations. Please review this section for a list of compatible grid configurations.
- **CSS Minifiers:** Nth-Grid uses the the CSS "star hack" to target IE7 without requiring additional CSS classes, HTML markup or JavaScript. Many CSS minifiers will strip these rules by default during minification assuming legacy support is not needed. If you find that grids are not rendering properly in IE7 while using a CSS minifier, first disable to your minifier to see if this fixes the issue. If this resolves the issue, you most likely need to enable legacy support in your minifier settings.

## FAQ

- **Why does Nth-Grid use floats instead of flexbox?**

  There are two reasons: *Compatibility* and *Performance*.

  Flexbox is great, and the fact that all [most browsers support it](http://caniuse.com/#feat=flexbox) is a wonderful thing. Unfortunately, older versions of Internet Explorer that still maintain an [appreciable market share](https://www.netmarketshare.com/browser-market-share.aspx?qprid=2&qpcustomd=0&qptimeframe=Y) do not support flexbox and a reliable polyfill is not available. If your requirements include only modern browsers, this won't be an issue (and congratulations — you're living the dream). If, however, you are required to support legacy browsers such as IE7/8/9, a CSS grid system based on flexbox isn't an option.

  From a performance standpoint, many articles have been written ([1](https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/), [2](http://www.smashingmagazine.com/2013/05/building-the-new-financial-times-web-app-a-case-study/), [3](https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow)) about the downsides of using flexbox to render full page layouts. While most performance issues were [found to be related to the older flexbox syntax](https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow), the flexbox properties used to render grids still require multiple rendering passes by the browser. Furthermore, flexbox layouts typically rely on the content to set the dimensions of a container which can [cause elements to shift](https://youtu.be/vPryjyFP5FM) as content is rendered.

  None of these issues are present with Nth-Grid as it does not rely on flexbox. Nth-Grid *does* use flexbox for some options such as equal-height columns and vertical alignment, but these options degrade gracefully in legacy browsers allowing developers to implement fallbacks when needed.

- **What about native CSS Grids?**

A native CSS [grid layout module](http://dev.w3.org/csswg/css-grid-1/) is coming and it [looks awesome](https://hacks.mozilla.org/2015/09/the-future-of-layout-with-css-grid-layouts/). Unfortunately, [browser support](http://caniuse.com/#feat=css-grid) is dismal at the moment. Until the CSS grid layout module is widely available and legacy browsers are no longer a concern, grid systems like Nth-Grid are the best option for grid-based layouts.

- **Where are the responsive grid settings?**

  Nth-Grid does not provide special CSS classes or mixins to generate responsive grids. This is an intentional design decision based on the assumption that developers prefer to choose their own method of managing responsive breakpoints. If there is a strong desire to add responsive functionality to Nth-Grid, this feature can be added in the future.

- **What should I do if I have a question, a feature request or found a bug?**

- The best option is to [file an issue](https://github.com/jhildenbiddle/nth-grid/issues) and we'll work together to resolve it.

- **Can I contribute to Nth-Grid?**

  Of course! Just create a [pull request](https://github.com/jhildenbiddle/nth-grid/pulls) on Github and we'll decide how to proceed after a review.

- **Can I fork Nth-Grid and modify the source code?**

  Go for it! The only ask is that you consider contributing to the main Nth-Grid project before releasing a separate version to the public. This will improve Nth-Grid for everyone and help avoid the potential confusion caused by having multiple Nth-Grid repos available.

## Contact

- Create a [Github issue](https://github.com/jhildenbiddle/nth-grid/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/nth-grid) or ❤️ [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fnth-grid&hashtags=css,developers,frontend,javascript) to support the project!

## License

This project is licensed under the MIT License. See the [MIT LICENSE](https://github.com/jhildenbiddle/nth-grid/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

---

### TODO

- [ ] Add `flex`, `flex-legacy`, `float`, and `float-legacy` documentation
- [ ] Review default values (i.e., disable `flex-legacy` by default)
- [ ] Fix SassDocs (listen two nth-grid mixins, review mixin comments)
