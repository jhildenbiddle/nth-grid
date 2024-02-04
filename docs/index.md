# Nth-Grid

[![NPM](https://img.shields.io/npm/v/nth-grid.svg?style=flat-square)](https://www.npmjs.com/package/nth-grid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/nth-grid/blob/master/LICENSE)
[![Sponsor this project](https://img.shields.io/static/v1?style=flat-square&label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/jhildenbiddle)

A lightweight and semantic CSS flexbox and float-based grid system for [Less](http://lesscss.org/), [PostCSS](https://github.com/postcss/postcss), [Sass](http://sass-lang.com/), and [Stylus](http://stylus-lang.com/).

## Features

- CSS flexbox and float-based grids
- Semantic HTML without grid-specific class names
- Simple, readable, easy-to-learn syntax
- Fixed and/or fluid grids, columns, gaps and margins
- Symmetric and asymmetric grids
- Column ordering
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

### Setup

Add the Nth-Grid mixin into your Less, Sass or Stylus file. The path to the mixin will vary depending on your installation method. For PostCSS, add Nth-Grid to your list of PostCSS plugins.

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

See the official [PostCSS documentation](https://github.com/postcss/postcss) for a complete list of bundlers and build tools.

<!-- tabs:end -->

### Grid columns

Nth-Grid requires a "wrapper" element to serve as the grid container. All direct descendants of this container are treated as grid elements.

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
  nth-grid(3);
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-usage1">
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
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>

  <!-- Row 2 -->
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
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
  nth-grid(
    columns: 3;
    gap: 2%;
  );
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-usage2">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
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
  nth-grid(
    columns: 3;
    gap: 2%;
    /*
      Column 3 is moved to the first position
      Column 1 is moved to the second position
      Column 2 is moved to the third position
    */
    order: 3 1 2;
  );
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-usage-order">
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
  nth-grid(
    columns: 3;
    gap: 2%;
    overlay: true; /* display column width */
    debug: true;   /* display grid configuration */
  );
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-usage-troubleshooting">
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

Nth-Grid for PostCSS provides two methods of defining global options:

**CSS**

```css
/* Nth-Grid global options in CSS */
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

**PostCSS configuration**

```javascript
// Nth-Grid Global Options
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

Nth-Grid for PostCSS provides two methods of defining global options:

**CSS**

```css
/* Nth-Grid global options in CSS */
:root {
  --nth-grid-rem-base: 16;
}
```

**PostCSS configuration**

```javascript
// Nth-Grid Global Options
var config = {
  // ...
  'rem-base': 16
};
```

<!-- tabs:end -->

### remove-globals

- Type: `boolean`
- Default: `true`

This option is only available for PostCSS.

Sets the Nth-Grid PostCSS processor to remove Nth-Grid global options specified in CSS after compilation.  This prevents these options from showing up in your compiled CSS. If the `:root` element is empty after removing all Nth-Grid global options, the root element CSS rule will be removed as well.

<!-- tabs:start -->

#### **Less**

```less
@nth-grid-remove-globals: true;
```

#### **Sass**

```scss
$nth-grid-remove-globals: true;
```

#### **Stylus**

```stylus
$nth-grid-remove-globals = true
```

#### **PostCSS**

Nth-Grid for PostCSS provides two methods of defining global options:

**CSS**

```css
/* Nth-Grid global options in CSS */
:root {
  --nth-grid-remove-globals: true;
}
```

**PostCSS configuration**

```javascript
// Nth-Grid Global Options
var config = {
  // ...
  'remove-globals': true
};
```

<!-- tabs:end -->

## Grid Options

### columns

- Type: `number` or space-separated `list` of values
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

A single *unitless* number:

```css
main {
  nth-grid(3); /* Columns: 1/3, 1/3, 1/3 */
}
```

A space-separated list of values:

```css
main {
  nth-grid(1 1 1); /* Columns: 1/3, 1/3, 1/3 */
}
```

Specifying via `columns`:

```css
main {
  nth-grid(
    columns: 1 1 1;
  );
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

Shorthand:

```css
main {
  nth-grid(1 2 3); /* Columns: 1/6, 2/6, 3/6 */
}
```

Specifying via `columns`:

```css
main {
  nth-grid(
    columns: 1 2 3;
  );
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
  .nth-grid(150px 150px);
}
```

Specifying via `@columns`:

```less
main {
  .nth-grid(
    @columns: 150px 150px
  );
}
```

##### **Sass**

Shorthand:

```scss
main {
  @include nth-grid(150px 150px);
}
```

Specifying via `$columns`:

```scss
main {
  @include nth-grid(
    $columns: 150px 150px
  );
}
```

##### **Stylus**

Shorthand:

```stylus
main
  nth-grid(150px 150px)
```

Specifying via `$columns`:

```stylus
main
  nth-grid(
    $columns: 150px 150px
  )
```

##### **PostCSS**

Shorthand:

```css
main {
  nth-grid(150px 150px);
}
```

Specifying via `columns`:

```css
main {
  nth-grid(
    columns: 150px 150px;
  );
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-columns-fixed">
    <div>Column 1</div>
    <div>Column 2</div>
  </div>
</div>

**Example: Mixed-width columns**

<!-- tabs:start -->

##### **Less**

Shorthand:

```less
main {
  .nth-grid(150px 1);
}
```

Specifying via `@columns`:

```less
main {
  .nth-grid(
    @columns: 150px 1
  );
}
```

##### **Sass**

Shorthand:

```scss
main {
  @include nth-grid(150px 1);
}
```

Specifying via `$columns`:

```scss
main {
  @include nth-grid(
    $columns: 150px 1
  );
}
```

##### **Stylus**

Shorthand:

```stylus
main
  nth-grid(150px 1)
```

Specifying via `$columns`:

```stylus
main
  nth-grid(
    $columns: 150px 1
  )
```

##### **PostCSS**

Shorthand:

```css
main {
  nth-grid(150px 1);
}
```

Specifying via `columns`:

```css
main {
  nth-grid(
    columns: 150px 1;
  );
}
```

<!-- tabs:end -->

<div class="app-frame mac centered">
  <div class="grid-demo-columns-mixed">
    <div>Column 1</div>
    <div>Column 2</div>
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
  nth-grid(
    columns: 3;
    gap: 2%;
    debug: true;

    /* Debug styles (optional) */
    $debug-background-color: #000;
    $debug-text-color: #ccc;
  );
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
    direction: rtl  // Sets right-to-left column flow
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
  direction: rtl // Sets right-to-left content flow

  nth-grid(
    /* ... */
    direction: rtl /* Sets right-to-left column flow */
  );
}
```

<!-- tabs:end -->

### flex

- Type: `boolean`
- Default: `true`

Generates flexbox-based grid CSS rules

### flex-legacy

- Type: `boolean`
- Default: `false`

Sets legacy compatibility mode for flexbox-based grids. Setting this option to `true` will result in additional CSS being generated for older browsers that require vendor-prefixed and "tweener" flexbox syntax (e.g, IE10).

### float

- Type: `boolean`
- Default: `false`

Generates float-based grid CSS rules

### float-legacy

- Type: `boolean`
- Default: `false`

Sets legacy compatibility mode for float-based grids. Setting this option to `true` will result in additional CSS being generated for IE7/8 compatibility. It is not necessary to set this option for IE9+.

### gap

Sets the vertical gaps (between rows) and horizontal gaps (between columns). Grid gaps can be specified as:

- A unit value for *matched* horizontal and vertical gaps (e.g., `2%`)
- A space-separated list of unit values as horizontal and vertical gaps (e.g., `0 10px`)

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

Shorthand:

```css
main {
  nth-grid(3, 2%);
}
```

Specifying [`columns`](#columns) and [`gap`](#gap):

```css
main {
  nth-grid(
    columns: 3;
    gap: 2%;
  );
}
```

<!-- tabs:end -->

<div class="app-frame mac centered" data-title="Grid Gaps">
  <div class="grid-demo-gap">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

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
  nth-grid(
    columns: 3;
    gap: 2%;
    overlay: true;

    /* Overlay styles (optional) */
    overlay-column-color: #333;
    overlay-margin-color: #999;
    overlay-text-color: #fff;
  );
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
- Equal-height columns
- Vertically-aligned columns

**Android v4.x Browser App**

- **CSS Calc() Limitations:** The "Browser" app the ships with Android v4.4 has [limited support for CSS calc() values](http://caniuse.com/#search=calc). Grid configurations that require CSS calc() values will therefore not render properly in this browser. Fortunately, Chrome for Android fully supports calc() values and enjoys a much larger market share than the the default "Browser" app.

**Internet Explorer 9**

- **CSS Calc() Limitations:** IE9 supports CSS calc() values up to 128 characters and will truncate values that exceed this length. Grids that require calc() values larger than 128 characters will therefore render incorrectly in this browser. This typically isn't an issue, although long calc() values can be generated when using the `order` setting with grids that contain a mix of fixed- and fluid-width columns, gaps and margins.

**Internet Explorer 7/8**

- **Grid Configurations:** As detailed in the [Legacy Browsers](#legacy-browsers) section, Nth-Grid provides legacy browser support for some (but not all) grid configurations. Please review this section for a list of compatible grid configurations.
- **CSS Minifiers:** Nth-Grid uses the the CSS "star hack" to target IE7 without requiring additional CSS classes, HTML markup or JavaScript. Many CSS minifiers will strip these rules by default during minification assuming legacy support is not needed. If you find that grids are not rendering properly in IE7 while using a CSS minifier, first disable to your minifier to see if this fixes the issue. If this resolves the issue, you most likely need to enable legacy support in your minifier settings.

## SassDoc

Nth-Grid includes SassDoc-compatible comments in the Sass source code. This makes including Nth-Grid documentation in your own SassDoc-generated documentation as simple as including `path/to/_nth-grid.sass` in the list of Sass files to process.

For more information on SassDoc, please visit [sassdoc.com](http://sassdoc.com).

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
