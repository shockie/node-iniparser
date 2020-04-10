# Node .ini Parser

Simple .ini parser for node, supports sections.
## Installation
npm:

```bash
npm install iniparser
```

## Usage
To parse a .ini file async:
```js
var iniparser = require('iniparser');
iniparser.parse('./config.ini', function(err, data) {
    var version = data.version;
});
```

To parse a .ini file sync:
```js
var iniparser = require('iniparser');
var config = iniparser.parseSync('./config.ini');
```

To parse a string in .ini format:
```js
var iniparser = require('iniparser');
var config = iniparser.parseString('foo=bar');
```
Optional `scan` argument. When `scan` is set to `true`, ini property value will be parsed. Default (`false`)
```ini
; example.ini
name=foo bar
age=33
single=false
```
```js
iniparser.parseSync('./example.ini');
iniparser.parseSync('./example.ini', true); // use type scan.
```
Result
```bash
{ name: 'foo bar', age: 33, single: false }
{ name: 'foo bar', age: '33', single: 'false' }
```

## License

(The MIT License)

Copyright (c) 2009-2010 Jordy van Gelder &lt;jordyvangelder@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
