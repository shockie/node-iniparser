# Node .ini parser

Simple .ini parser for node, supports sections

To parse a .ini file async:
<pre>
var iniparser = require('iniparser');
iniparser.parse('./config.ini', function(err,data){
	var version = data.version;
});
</pre>

To parse a .ini file sync:
<pre>
var iniparser = require('iniparser');
var config = iniparser.parseSync('./config.ini');
</pre>

To parse a string in .ini format:
<pre>
var iniparser = require('iniparser');
var config = iniparser.parseString('foo=bar');
</pre>

## Options
The following options can be passed in as the second parameter to all 3 parse methods:

treatEmptyStringsAsNull: Stores a setting as a null value if an empty string is detected as the value.


To parse a .ini file async with options:
<pre>
var iniparser = require('iniparser');
var options = {
    treatEmptyStringsAsNull: true
}
iniparser.parse('./config.ini', options, function(err,data){
	var version = data.version;
});
</pre>

To parse a .ini file sync with options:
<pre>
var iniparser = require('iniparser');
var options = {
    treatEmptyStringsAsNull: true
}
var config = iniparser.parseSync('./config.ini', options);
</pre>

To parse a string in .ini format with options:
<pre>
var iniparser = require('iniparser');
var options = {
    treatEmptyStringsAsNull: true
}
var config = iniparser.parseString('foo=bar', options);
</pre>

## Installation
npm:

`npm install iniparser`
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
