# Nth-Grid

[![NPM](https://img.shields.io/npm/v/nth-grid.svg?style=flat-square)](https://www.npmjs.com/package/nth-grid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/nth-grid/blob/master/LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/nth-grid/badge)](https://www.jsdelivr.com/package/npm/nth-grid)
[![Sponsor this project](https://img.shields.io/static/v1?style=flat-square&label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/jhildenbiddle)

A highly versatile semantic grid system with legacy browser support for [Less](http://lesscss.org/), [PostCSS](https://github.com/postcss/postcss), [Sass](http://sass-lang.com/), and [Stylus](http://stylus-lang.com/).

!> Native [CSS grid layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) have been [supported](https://caniuse.com/?search=display%3A%20grid) in modern browsers since 2020 and offer a far better experience than custom grid systems like Nth-Grid. For projects that require legacy browser support, Nth-Grid remains an excellent choice for grid-based layouts.

## Features

- Flexbox and float-based CSS grids
- Semantic HTML without grid-specific class names
- Simple, easy-to-learn syntax
- Fixed and/or fluid grids, columns, rows, gaps and margins
- Symmetric and asymmetric grids
- Adjustable column order independent of DOM order
- LTR and RTL layouts
- Grid overlays and debug information
- [SassDoc](http://sassdoc.com/) integration

**Support**

- [Less](http://lesscss.org/) v3+
- [PostCSS](https://github.com/postcss/postcss) v7, v8
- [Sass](http://sass-lang.com/) v1.17+
- [Stylus](http://stylus-lang.com/) 0.51+
- Modern and legacy browsers (IE9+, IE7 & IE8 with polyfills)

## Why Nth-Grid?

Nth-Grid provides all of the features expected of a modern CSS grid system while simplifying grid concepts and implementation.

1. **Custom grids without limitations**

   Nth-Grid provides a level of flexibility that no other CSS grid system offers: display multiple custom grids on the same page, combine fixed and fluid columns in the same grid, add fixed gaps and margins to fluid grids, create single and multi-row grids, nest custom grids within custom grids, reorder columns, change the grid direction for RTL layouts, and modify any grid setting on-the-fly in your responsive layouts. Nth-Grid handles all of this with a single mixin in your CSS using familiar grid concepts and terminology.

1. **Semantic grids without grid-specific CSS classes**

   Many popular grid systems require adding CSS classes to your HTML markup for grid containers, rows, columns, ordering, nesting, responsive breakpoints, etc. The end result is markup littered with grid-specific CSS classes, adding unnecessary bloat and making changes a time-consuming challenge. Nth-Grid keeps your markup clean and the CSS for your grid-based layouts where it belongs: in your CSS, named and applied as you prefer.

1. **Native support for multiple CSS processors**

   Nth-Grid is the only CSS grid system that provides native support for Less, PostCSS, Sass, and Stylus. The flexibility to work with the languages, frameworks, applications and command-line tools you are already familiar with provides the fastest integration with the smallest learning curve possible. This versatility also allows for the adoption of a single grid system across multiple projects, making it easy to transition between them.

1. **Support for modern and legacy browsers**

   Most grid systems have abandoned support for legacy browsers as modern browsers adopt new features that enable grid-based layouts. This leaves projects that require legacy browser support with an increasingly limited selection of grid systems to choose from. Nth-Grid supports a wide variety of grid layouts that are compatible with legacy browsers and enhanced functionality for modern browsers that support CSS features like [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) and [grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids).

## Installation

**NPM**

```bash
npm install nth-grid --save-dev
```

**CDN**

See [Setup](#setup) for details.

## Usage

### Setup

Add the Nth-Grid mixin into your Less, Sass or Stylus file. The path to the mixin will vary depending on your installation method. For PostCSS, add Nth-Grid to your list of PostCSS plugins.

<!-- tabs:start -->

##### **Less**

**Local**

```less
@import "path/to/nth-grid/dist/less/_nth-grid";
```

**CDN**

Available on [jsdelivr](https://www.jsdelivr.com/package/npm/nth-grid) (below), [unpkg](https://unpkg.com/browse/nth-grid/), and other CDN services that auto-publish npm packages.

```less
@import "https://cdn.jsdelivr.net/npm/nth-grid@1/dist/less/_nth-grid";
```

?> Note the `@` version lock in the URLs above. This prevents breaking changes in future releases from affecting your project and is therefore the safest method of loading dependencies from a CDN. When a new major version is released, you will need to manually update your CDN URLs by changing the version after the `@` symbol.

##### **Sass**

**Local**

```scss
// Modern Sass (v1.33+ required)
@use "path/to/nth-grid/dist/sass/_nth-grid" as *;

// Legacy Sass (node-sass, libsass, Ruby Sass)
@import "path/to/nth-grid/dist/sass/_nth-grid";
```

**CDN**

Available on [jsdelivr](https://www.jsdelivr.com/package/npm/nth-grid) (below), [unpkg](https://unpkg.com/browse/nth-grid/), and other CDN services that auto-publish npm packages.

```scss
// Modern Sass (v1.33+ required)
@use "https://cdn.jsdelivr.net/npm/nth-grid@1/dist/sass/_nth-grid" as *;

// Legacy Sass (node-sass, libsass, Ruby Sass)
@import "https://cdn.jsdelivr.net/npm/nth-grid@1/dist/sass/_nth-grid";
```

?> Note the `@` version lock in the URLs above. This prevents breaking changes in future releases from affecting your project and is therefore the safest method of loading dependencies from a CDN. When a new major version is released, you will need to manually update your CDN URLs by changing the version after the `@` symbol.

##### **Stylus**

**Local**

```stylus
@import "path/to/nth-grid/dist/stylus/_nth-grid";
```

**CDN**

Available on [jsdelivr](https://www.jsdelivr.com/package/npm/nth-grid) (below), [unpkg](https://unpkg.com/browse/nth-grid/), and other CDN services that auto-publish npm packages.

```stylus
@import "https://cdn.jsdelivr.net/npm/nth-grid@1/dist/stylus/_nth-grid";
```

?> Note the `@` version lock in the URLs above. This prevents breaking changes in future releases from affecting your project and is therefore the safest method of loading dependencies from a CDN. When a new major version is released, you will need to manually update your CDN URLs by changing the version after the `@` symbol.

##### **PostCSS**

For configurations using `postcss.config.js`:

```javascript
module.exports = {
  plugins: [
    require('nth-grid')
  ]
}
```

See the official [PostCSS documentation](https://github.com/postcss/postcss) for a complete list of bundlers and build tools.

<!-- tabs:end -->

### Grid columns

Nth-Grid requires a "wrapper" element to serve as a grid container. All direct descendants of this container are treated as grid elements.

A simple three column grid with equal width [columns](#columns) can be created as follows:

```html
<main>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</main>
```

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
  @include nth-grid(3);
}
```

##### **Stylus**

```stylus
main
  nth-grid(3)
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-columns-symmetric">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### Grid rows

Grid rows are created when the number of elements in a grid container exceeds the number of grid [columns](#columns) specified.

For example, a three column grid with two rows can be created as follows:

```html
<main>
  <!-- Row 1 -->
  <div>A</div>
  <div>B</div>
  <div>C</div>

  <!-- Row 2 -->
  <div>D</div>
  <div>E</div>
  <div>F</div>
</main>
```

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @gap: 2%
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $gap: 2%
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3
    $gap: 2%
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    gap: 2%;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-gap">
    <!-- Row 1 -->
    <div>A</div>
    <div>B</div>
    <div>C</div>
    <!-- Row 2 -->
    <div>D</div>
    <div>E</div>
    <div>F</div>
  </div>
</div>

### Grid order

Column order can be changed independently of the order the grid elements appear in the DOM.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @gap: 2%,
    // Column 3 is moved to the first position
    // Column 1 is moved to the second position
    // Column 2 is moved to the third position
    @order: 3 1 2
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $gap: 2%,
    // Column 3 is moved to the first position
    // Column 1 is moved to the second position
    // Column 2 is moved to the third position
    $order: 3 1 2
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3
    $gap: 2%
    // Column 3 is moved to the first position
    // Column 1 is moved to the second position
    // Column 2 is moved to the third position
    $order: 3 1 2
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    gap: 2%;
    /*
      Column 3 is moved to the first position
      Column 1 is moved to the second position
      Column 2 is moved to the third position
    */
    order: 3 1 2;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-order">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### Troubleshooting

Nth-Grid's [overlay](#overlay) and [debug](#debug) options can be used to help troubleshoot grid configurations.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @gap: 2%,
    @overlay: true, // display column width
    @debug: true    // display grid configuration
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $gap: 2%,
    $overlay: true, // display column width
    $debug: true    // display grid configuration
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3
    $gap: 2%
    $overlay: true // display column width
    $debug: true   // display grid configuration
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    gap: 2%;
    overlay: true; /* display column width */
    debug: true;   /* display grid configuration */
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-troubleshooting">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

## Global Options

Nth-Grid provides global options for changing the default values used for most grid settings. Global options for each CSS processor are listed below along with their default values. Details for each option are available in the [Grid Options](#grid-options) section.

<!-- tabs:start -->

#### **Less**

```less
// Layout settings
@nth-grid-columns               : 1;
@nth-grid-gap                   : 0;
@nth-grid-margin                : 0;
@nth-grid-direction             : ltr;
@nth-grid-flex                  : true;
@nth-grid-flex-legacy           : false;
@nth-grid-float                 : false;
@nth-grid-float-legacy          : false;

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

#### **Sass**

```scss
// Layout settings
$nth-grid-columns               : 1;
$nth-grid-gap                   : 0;
$nth-grid-margin                : 0;
$nth-grid-direction             : ltr;
$nth-grid-flex                  : true;
$nth-grid-flex-legacy           : false;
$nth-grid-float                 : false;
$nth-grid-float-legacy          : false;

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

#### **Stylus**

```stylus
// Layout settings
$nth-grid-columns                = 1
$nth-grid-gap                    = 0
$nth-grid-margin                 = 0
$nth-grid-direction              = ltr
$nth-grid-flex                   = true;
$nth-grid-flex-legacy            = false;
$nth-grid-float                  = false;
$nth-grid-float-legacy           = false;

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

#### **PostCSS**

Nth-Grid for PostCSS allows global options to be defined via CSS and/or JS:

```css
/* Nth-Grid global options (CSS) */
:root {
  /* Layout settings */
  --nth-grid-columns               : 1;
  --nth-grid-gap                   : 0;
  --nth-grid-margin                : 0;
  --nth-grid-direction             : ltr;
  --nth-grid-flex                  : true;
  --nth-grid-flex-legacy           : false;
  --nth-grid-float                 : false;
  --nth-grid-float-legacy          : false;

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
// Nth-Grid global options (JS)
var config = {
  // Layout settings
  'columns'               : 1,
  'gap'                   : 0,
  'margin'                : 0,
  'direction'             : 'ltr',
  'flex'                  : true;
  'flex-legacy'           : false;
  'float'                 : false;
  'float-legacy'          : false;

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

module.exports = {
  plugins: [
    require('nth-grid')(config)
  ]
}
```

<!-- tabs:end -->

### rem-base

- Type: `number` or pixel value (e.g. `16`, `16px`)
- Default: `16`

Sets the base font size for rem-to-pixel conversion for IE 7/8. This option is only necessary when the font size of the root element has been changed from the browser default of 16px.

<!-- tabs:start -->

#### **Less**

```less
@nth-grid-rem-base: 16;
```

#### **Sass**

```scss
$nth-grid-rem-base: 16;
```

#### **Stylus**

```stylus
$nth-grid-rem-base = 16
```

#### **PostCSS**

Nth-Grid for PostCSS allows global options to be defined via CSS and/or JS:

```css
/* Nth-Grid global options (CSS) */
:root {
  --nth-grid-rem-base: 16;
}
```

```javascript
// Nth-Grid global options (JS)
var config = {
  'rem-base': 16
};

module.exports = {
  plugins: [
    require('nth-grid')(config)
  ]
}
```

<!-- tabs:end -->

### remove-globals

- Type: `boolean`
- Default: `true`

This option is only available for PostCSS.

Sets the Nth-Grid PostCSS processor to remove Nth-Grid global options specified in CSS after compilation.  This prevents these options from showing up in your compiled CSS. If the `:root` element is empty after removing all Nth-Grid global options, the root element CSS rule will be removed as well.

Nth-Grid for PostCSS allows global options to be defined via CSS and/or JS:

```css
/* Nth-Grid global options (CSS) */
:root {
  --nth-grid-remove-globals: true;
}
```

```javascript
// Nth-Grid global options (JS)
var config = {
  'remove-globals': true
};

module.exports = {
  plugins: [
    require('nth-grid')(config)
  ]
}
```

## Grid Options

### columns

- Type:
  - A unitless `number` representing the column count and ratio width (e.g., `3`)
  - A space-separated list of values, each representing a column's ratio or unit width (e.g., `1 2 3`, `150px 2 1`)
- Default: `1`

Sets the column count, width and order for each grid row.

**Example: Symmetric, ratio-based, fluid grids**

<!-- tabs:start -->

##### **Less**

A single *unitless* number:

```less
main {
  .nth-grid(3); // Columns: 1/3, 1/3, 1/3
}
```

A space-separated list of values:

```less
main {
  .nth-grid(1 1 1); // Columns: 1/3, 1/3, 1/3
}
```

Specifying via `@columns`:

```less
main {
  .nth-grid(
    @columns: 1 1 1 // Columns: 1/3, 1/3, 1/3
  );
}
```

##### **Sass**

A single *unitless* number:

```scss
main {
  @include nth-grid(3); // Columns: 1/3, 1/3, 1/3
}
```

A space-separated list of values:

```scss
main {
  @include nth-grid(1 1 1); // Columns: 1/3, 1/3, 1/3
}
```

Specifying via `$columns`:

```scss
main {
  @include nth-grid(
    $columns: 1 1 1 // Columns: 1/3, 1/3, 1/3
  );
}
```

##### **Stylus**

A single *unitless* number:

```stylus
main
  nth-grid(3) // Columns: 1/3, 1/3, 1/3
```

A space-separated list of values:

```stylus
main
  nth-grid(1 1 1) // Columns: 1/3, 1/3, 1/3
```

Specifying via `$columns`:

```stylus
main
  nth-grid(
    $columns: 1 1 1
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 1 1 1; /* Columns: 1/3, 1/3, 1/3 */
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered" data-title="Symmetric Grid">
  <div class="grid-demo-columns-symmetric">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

**Example: Asymmetric, ratio-based, fluid grid**

<!-- tabs:start -->

##### **Less**

Shorthand:

```less
main {
  .nth-grid(1 2 3); // Columns: 1/6, 2/6, 3/6
}
```

Specifying via `@columns`:

```less
main {
  .nth-grid(
    @columns: 1 2 3
  );
}
```

##### **Sass**

Shorthand:

```scss
main {
  @include nth-grid(1 2 3); // Columns: 1/6, 2/6, 3/6
}
```

Specifying via `$columns`:

```scss
main {
  @include nth-grid(
    $columns: 1 2 3
  );
}
```

##### **Stylus**

Shorthand:

```stylus
main
  nth-grid(1 2 3) // Columns: 1/6, 2/6, 3/6
```

Specifying via `$columns`:

```stylus
main
  nth-grid(
    $columns: 1 2 3
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 1 2 3; /* Columns: 1/6, 2/6, 3/6 */
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-columns-asymmetric">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

**Example: Fixed-width columns**

<!-- tabs:start -->

##### **Less**

Shorthand:

```less
main {
  .nth-grid(100px 100px 100px);
}
```

Specifying via `@columns`:

```less
main {
  .nth-grid(
    @columns: 100px 100px 100px
  );
}
```

##### **Sass**

Shorthand:

```scss
main {
  @include nth-grid(100px 100px 100px);
}
```

Specifying via `$columns`:

```scss
main {
  @include nth-grid(
    $columns: 100px 100px 100px
  );
}
```

##### **Stylus**

Shorthand:

```stylus
main
  nth-grid(100px 100px 100px)
```

Specifying via `$columns`:

```stylus
main
  nth-grid(
    $columns: 100px 100px 100px
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 100px 100px 100px;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-columns-fixed">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

**Example: Mixed-width columns**

<!-- tabs:start -->

##### **Less**

Shorthand:

```less
main {
  .nth-grid(150px 1 150px);
}
```

Specifying via `@columns`:

```less
main {
  .nth-grid(
    @columns: 150px 1 150px
  );
}
```

##### **Sass**

Shorthand:

```scss
main {
  @include nth-grid(150px 1 150px);
}
```

Specifying via `$columns`:

```scss
main {
  @include nth-grid(
    $columns: 150px 1 150px
  );
}
```

##### **Stylus**

Shorthand:

```stylus
main
  nth-grid(150px 1 150px)
```

Specifying via `$columns`:

```stylus
main
  nth-grid(
    $columns: 150px 1 150px
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 150px 1 150px;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-columns-mixed">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### debug

- Type: `boolean`
- Default: `false`

Sets the display of grid debug information. Debug information is displayed above the grid and provides an easy way to view the values used by Nth-Grid to calculate the grid layout.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @gap: 2%,
    @debug: true,

    // Debug styles (optional)
    @debug-background-color: #000,
    @debug-text-color: #ccc
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $gap: 2%,
    $debug: true,

    // Debug styles (optional)
    $debug-background-color: #000,
    $debug-text-color: #ccc
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3
    $gap: 2%
    $debug: true

    // Debug styles (optional)
    $debug-background-color: #000
    $debug-text-color: #ccc
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    gap: 2%;
    debug: true;

    /* Debug styles (optional) */
    $debug-background-color: #000;
    $debug-text-color: #ccc;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-debug">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### direction

- Type: `ltr`|`rtl`
- Default: `ltr`

Sets the direction of the grid layout to support left-to-right (default) or right-to-left layouts. This sets the flow of grid columns but not the flow of content within columns. Content flow should be set by applying `dir="rtl"` to an HTML element or adding a `direction: rtl;` rule in your CSS.

<!-- tabs:start -->

##### **Less**

```less
main {
  direction: rtl; // Sets right-to-left content flow

  .nth-grid(
    // ...
    @direction: rtl  // Sets right-to-left column flow
  );
}
```

##### **Sass**

```scss
main {
  direction: rtl; // Sets right-to-left content flow

  @include nth-grid(
    // ...
    $direction: rtl  // Sets right-to-left column flow
  );
}
```

##### **Stylus**

```stylus
main
  direction: rtl // Sets right-to-left content flow

  nth-grid(
    // ...
    $direction: rtl  // Sets right-to-left column flow
  )
```

##### **PostCSS**

```css
main {
  direction: rtl /* Sets right-to-left content flow */

  nth-grid {
    /* ... */
    direction: rtl; /* Sets right-to-left column flow */
  };
}
```

<!-- tabs:end -->

### flex

- Type: `boolean`
- Default: `true`

Generates flexbox-based grid CSS rules.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @flex: true // default
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $flex: true // default
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3,
    $flex: true // default
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    flex: true; /* default */
  };
}
```

<!-- tabs:end -->

**Output**

```css
main {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  box-sizing: border-box;
  width: auto;
}
main > *:nth-child(1n) {
  box-sizing: border-box;
  position: static;
  left: auto;
  margin-top: 0;
  margin-left: 0;
}
main > *:nth-child(-n+3) {
  margin-top: 0;
}
main > *:nth-child(3n+1) {
  margin-left: 0;
}
main > *:nth-last-child(-n+3) {
  margin-bottom: 0;
}
main > *:nth-child(1n) {
  width: 33.33333%;
}
```

### flex-legacy

- Type: `boolean`
- Default: `false`

Sets legacy compatibility mode for flexbox-based grids. Setting this option to `true` will result in additional CSS being generated for older browsers that require vendor-prefixed and "tweener" flexbox syntax (e.g, IE10).

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @flex: true,
    @flex-legacy: true
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $flex: true,
    $flex-legacy: true
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3,
    $flex: true,
    $flex-legacy: true
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    flex: true;
    flex-legacy: true;
  };
}
```

<!-- tabs:end -->

**Output**

```css
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  box-sizing: border-box;
  width: auto;
}
main > *:nth-child(1n) {
  box-sizing: border-box;
  position: static;
  left: auto;
  margin-top: 0;
  margin-left: 0;
}
main > *:nth-child(-n+3) {
  margin-top: 0;
}
main > *:nth-child(3n+1) {
  margin-left: 0;
}
main > *:nth-last-child(-n+3) {
  margin-bottom: 0;
}
main > *:nth-child(1n) {
  width: 33.33333%;
}
```

### float

- Type: `boolean`
- Default: `false`

Generates float-based grid CSS rules

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @flex: false, // Optional
    @float: true
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $flex: false, // Optional
    $float: true
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3,
    $flex: false, // Optional
    $float: true
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    flex: false; /* Optional */
    float: true;
  };
}
```

<!-- tabs:end -->

**Output**

```css
main {
  display: block;
  box-sizing: border-box;
  width: auto;
}
main:after {
  content: "";
  display: table;
  clear: both;
}
main > *:nth-child(1n) {
  box-sizing: border-box;
  position: static;
  left: auto;
  float: left;
  clear: none;
  margin-right: 0;
  margin-top: 0;
  margin-left: 0;
}
main > *:nth-child(-n+3) {
  margin-top: 0;
}
main > *:nth-child(3n+1) {
  clear: left;
  margin-left: 0;
}
main > *:nth-last-child(-n+3) {
  margin-bottom: 0;
}
main > *:nth-child(1n) {
  width: 33.33333%;
}
```

### float-legacy

- Type: `boolean`
- Default: `false`

Sets legacy compatibility mode for float-based grids. Setting this option to `true` will result in additional CSS being generated for IE7/8 compatibility. It is not necessary to set this option for IE9+.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @flex: false, // Optional
    @float: true,
    @float-legacy: true
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $flex: false, // Optional
    $float: true,
    $float-legacy: true
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3,
    $flex: false, // Optional
    $float: true,
    $float-legacy: true
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    flex: false, /* Optional */
    float: true;
    float-legacy: true;
  };
}
```

<!-- tabs:end -->

**Output**

```css
main {
  display: block;
  *display: inline-block;
  box-sizing: border-box;
  width: auto;
}
main:after {
  content: "";
  display: table;
  clear: both;
}
main > *:nth-child(1n) {
  box-sizing: border-box;
  position: static;
  left: auto;
  float: left;
  clear: none;
  margin-right: 0;
  *display: inline;
  *float: none;
  *vertical-align: top;
  *zoom: 1;
  margin-top: 0;
  margin-left: 0;
}
main > *:nth-child(-n+3) {
  margin-top: 0;
}
main > *:nth-child(3n) {
  *margin-right: -2px;
}
main > *:nth-child(3n+1) {
  clear: left;
  margin-left: 0;
}
main > *:nth-last-child(-n+3) {
  margin-bottom: 0;
}
main > *:last-child {
  margin-bottom: 0;
}
main > *:nth-child(1n) {
  width: 33.33333%;
}
```

### gap

- Type:
  - A single value for horizontal and vertical gaps (e.g., `2%`)
  - A space-separated list of horizontal and vertical gap values (e.g., `0 10px`)
- Default: `0`

Sets the vertical gaps (between rows) and horizontal gaps (between columns).

<!-- tabs:start -->

##### **Less**

Shorthand:

```less
main {
  .nth-grid(3, 2%);
}
```

Specifying [`@columns`](#columns) and [`@gap`](#gap):

```less
main {
  .nth-grid(
    @columns: 3,
    @gap: 2%
  );
}
```

##### **Sass**

Shorthand:

```scss
main {
  @include nth-grid(3, 2%);
}
```

Specifying [`$columns`](#columns) and [`$gap`](#gap):

```scss
main {
  @include nth-grid(
    $columns: 3,
    $gap: 2%
  );
}
```

##### **Stylus**

Shorthand:

```stylus
main
  nth-grid(3, 2%)
```

Specifying [`$columns`](#columns) and [`$gap`](#gap):

```stylus
main
  nth-grid(
    $columns: 3,
    $gap: 2%
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    gap: 2%;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered" data-title="Grid Gaps">
  <div class="grid-demo-gap">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### margin

- Type:
  - A single value for horizontal and vertical margins (e.g., `2%`)
  - A space-separated list of horizontal and vertical margin values (e.g., `0 10px`)
- Default: `0`

Sets the vertical and horizontal margins of the grid *within* the grid container.

<!-- tabs:start -->

##### **Less**

```less
main {
  border: 1px solid orange;

  .nth-grid(
    @columns: 3,
    @margin: 2%
  );
}
```

##### **Sass**

```scss
main {
  border: 1px solid orange;

  @include nth-grid(
    $columns: 3,
    $margin: 2%
  );
}
```

##### **Stylus**

```stylus
main
  border: 1px solid orange

  nth-grid(
    $columns: 3,
    $margin: 2%
  )
```

##### **PostCSS**

```css
main {
  border: 1px solid orange;

  nth-grid {
    columns: 3;
    margin: 2%;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered" data-title="Grid Margin">
  <div class="grid-demo-margin">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### order

- Type: A space-separated list of `number`s (e.g., `1 2 3`) or `false` for DOM order
- Default: `false`

Sets the column presentation order.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @gap: 2%,
    // Column 3 is moved to the first position
    // Column 1 is moved to the second position
    // Column 2 is moved to the third position
    @order: 3 1 2
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $gap: 2%,
    // Column 3 is moved to the first position
    // Column 1 is moved to the second position
    // Column 2 is moved to the third position
    $order: 3 1 2
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3
    $gap: 2%
    // Column 3 is moved to the first position
    // Column 1 is moved to the second position
    // Column 2 is moved to the third position
    $order: 3 1 2
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    gap: 2%;
    /*
      Column 3 is moved to the first position
      Column 1 is moved to the second position
      Column 2 is moved to the third position
    */
    order: 3 1 2;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-order">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### overlay

- Type: `boolean`
- Default: `false`

Sets the display of the grid column overlay. The overlay will render on top of your column content and display column information such as the original position (before `order` or `rtl` is applied) and calculated width.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @gap: 2%,
    @overlay: true,

    // Overlay styles (optional)
    @overlay-column-color: #333,
    @overlay-margin-color: #999,
    @overlay-text-color: #fff
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $gap: 2%,
    $overlay: true,

    // Overlay styles (optional)
    $overlay-column-color: #333,
    $overlay-margin-color: #999,
    $overlay-text-color: #fff
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3
    $gap: 2%
    $overlay: true

    // Overlay styles (optional)
    $overlay-column-color: #333
    $overlay-margin-color: #999
    $overlay-text-color: #fff
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    gap: 2%;
    overlay: true;

    /* Overlay styles (optional) */
    overlay-column-color: #333;
    overlay-margin-color: #999;
    overlay-text-color: #fff;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-overlay">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

### warnings

- Type: `boolean`
- Default: `true`

Sets the output of grid layout warnings during compilation. Compilation warnings are generated when `legacy` is set to `true` and a grid configuration is defined that is not compatible with legacy browsers.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    // Mixed-unit grid configurations are not compatible with legacy browsers
    @columns: 2 200px,
    @legacy: true,
    @warnings: true
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    // Mixed-unit grid configurations are not compatible with legacy browsers
    $columns: 2 200px,
    $legacy: true,
    $warnings: true
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    // Mixed-unit grid configurations are not compatible with legacy browsers
    $columns: 2 200px
    $legacy: true
    $warnings: true
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    /* Mixed-unit grid configurations are not compatible with legacy browsers */
    columns: 2 200px;
    legacy: 3;
    warnings: true;
  };
}
```

<!-- tabs:end -->

**Output**

```text
NTH-GRID: "main" requires calc() support. This grid will not render properly in legacy browsers.
```

### width

- Type: A valid CSS [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) value
- Default: `auto`

Sets the width of the grid container.

<!-- tabs:start -->

##### **Less**

```less
main {
  .nth-grid(
    @columns: 3,
    @width: 75%
  );
}
```

##### **Sass**

```scss
main {
  @include nth-grid(
    $columns: 3,
    $width: 75%
  );
}
```

##### **Stylus**

```stylus
main
  nth-grid(
    $columns: 3,
    $width: 75%
  )
```

##### **PostCSS**

```css
main {
  nth-grid {
    columns: 3;
    width: 75%;
  };
}
```

<!-- tabs:end -->

<div class="app-frame mac centered" data-title="Grid Margin">
  <div class="grid-demo-width">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

## Legacy Browsers

Nth-Grid uses a variety of CSS features to render grid layouts, some of which are not supported by legacy browsers. Polyfills exist that provide legacy support for some of these missing features, but not all missing features can be polyfilled.  As a result, Nth-Grid provides legacy browser support for some (but not all) grid configurations.

**Requirements**

1. [Selectivizr.js](https://github.com/keithclark/selectivizr) polyfill for nth-child support
2. [Respond.js](https://github.com/scottjehl/Respond) polyfill for media query support (optional)
3. Nth-Grid's [legacy](#legacy) option set to `true`
4. Nth-Grid's [rem-base](#rem-base) option set to the font size of the root element

The following grid configurations are not supported by legacy browsers due to lack of CSS [calc() values](http://caniuse.com/#feat=calc) and [flexbox](http://caniuse.com/#feat=flexbox) support:

- Grid columns set to a list of *mixed-unit* values
- Grid columns, gap, and margin values with *mixed* units.

**Android v4.x Browser App**

- **CSS Calc() Limitations:** The "Browser" app the ships with Android v4.4 has [limited support for CSS calc() values](http://caniuse.com/#search=calc). Grid configurations that require CSS calc() values will therefore not render properly in this browser. Fortunately, Chrome for Android fully supports calc() values and enjoys a much larger market share than the the default "Browser" app.

**Internet Explorer 9**

- **CSS Calc() Limitations:** IE9 supports CSS calc() values up to 128 characters and will truncate values that exceed this length. Grids that require calc() values larger than 128 characters will therefore render incorrectly in this browser. This typically isn't an issue, although long calc() values can be generated when using the [`order`](#order) setting with grids that contain a mix of fixed- and fluid-width columns, gaps, and margins.

**Internet Explorer 7/8**

- **Grid Configurations:** Nth-Grid provides legacy browser support for some but not all grid configurations. See the requirements above for details.
- **CSS Minifiers:** Nth-Grid uses the the CSS "star hack" to target IE7 without requiring additional CSS classes, HTML markup or JavaScript. Many CSS minifiers will strip these rules by default during minification assuming legacy support is not needed. If you find that grids are not rendering properly in IE7 while using a CSS minifier, first disable to your minifier to see if this fixes the issue. If this resolves the issue, you most likely need to enable legacy support in your minifier settings.

## SassDoc

Nth-Grid includes SassDoc-compatible comments in the Sass source code. This makes including Nth-Grid in your own SassDoc documentation as simple as including `path/to/_nth-grid.sass` in the list of Sass files to process.

For more information on SassDoc, please visit [sassdoc.com](http://sassdoc.com).

## Development

```bash
# Clone repo
git clone https://github.com/jhildenbiddle/nth-grid.git

# Change directory
cd nth-grid

# Development (build & watch)
npm start
```

- Documentation: [http://localhost:3000](http://localhost:3000)
- Grid Demos: [http://localhost:3000/demo/](http://localhost:3000/demo/)
- SassDocs: [http://localhost:3000/sassdoc/](http://localhost:3000/sassdoc/)

## Sponsorship

A [sponsorship](https://github.com/sponsors/jhildenbiddle) is more than just a way to show appreciation for the open-source authors and projects we rely on; it can be the spark that ignites the next big idea, the inspiration to create something new, and the motivation to share so that others may benefit.

If you benefit from this project, please consider lending your support and encouraging future efforts by [becoming a sponsor](https://github.com/sponsors/jhildenbiddle).

Thank you! 🙏🏻

<iframe src="https://github.com/sponsors/jhildenbiddle/button" title="Sponsor jhildenbiddle" height="35" width="116" style="border: 0; margin: 0;"></iframe>

## Contact & Support

- Follow 👨🏻‍💻 **@jhildenbiddle** on [Twitter](https://twitter.com/jhildenbiddle) and [GitHub](https://github.com/jhildenbiddle) for announcements
- Create a 💬 [GitHub issue](https://github.com/jhildenbiddle/nth-grid/issues) for bug reports, feature requests, or questions
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/nth-grid) and 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fnth-grid&hashtags=developers,frontend,css,less,postcss,sass,scss) to promote the project
- Become a 💖 [sponsor](https://github.com/sponsors/jhildenbiddle) to support the project and future efforts

## License

This project is licensed under the [MIT license](https://github.com/jhildenbiddle/nth-grid/blob/master/LICENSE).

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
