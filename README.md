[![Build Status](https://secure.travis-ci.org/aaronpowell/bespoke-hide.png?branch=master)](https://travis-ci.org/aaronpowell/bespoke-hide) [![Coverage Status](https://coveralls.io/repos/aaronpowell/bespoke-hide/badge.png)](https://coveralls.io/r/aaronpowell/bespoke-hide)

# bespoke-hide

Hide/Unhide slides from the presentation. Stores your settings in localStorage so it's persisted across reloads

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/aaronpowell/bespoke-hide/master/dist/bespoke-hide.min.js
[max]: https://raw.github.com/aaronpowell/bespoke-hide/master/dist/bespoke-hide.js

## Usage

This plugin is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  hide = require('bespoke-hide');

bespoke.from('#presentation', [
  hide()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.plugins.hide()
]);
```

## Package managers

### npm

```bash
$ npm install bespoke-hide
```

### Bower

```bash
$ bower install bespoke-hide
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
