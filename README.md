# `glob-capture-regex`

> Convert glob patterns to regular expressions, including the feature of capturing groups within the glob pattern.

## Installation

```console
$ npm i glob-capture-regex
```

## Usage

```js
const globCaptureRegex = require('glob-capture-regex');

const globWithGroups = 'my/gl(*)b/pattern/(**).js';
const path = 'my/glob/pattern/with/capture/groups.js';

const { glob, regex } = globCaptureRegex(globWithGroups).parse();

console.log(glob); // my/gl*b/pattern/**.js

console.log(regex.match(path)); 
// [
//    'my/glob/pattern/with-capture-groups.js', 
//    'o', 
//    'with/capture/groups'
// ];
```

## API

### `globCaptureRegex(glob: string)`

Converts a glob pattern to a regular expression with capture groups.

- `glob` - (`string`) - The glob pattern to convert.

**Returns:** An object with the following properties:

```txt
{
    // A getter that returns the glob pattern without the capture groups.
    glob: Getter<string>,

    // A getter that returns the regular expression with capture groups
    regex: Getter<RegExp>, 
    
    // Function which return an object with both the `glob` and the `regex`
    parse: function
}
```
