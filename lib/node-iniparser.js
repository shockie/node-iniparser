/*
 * get the file handler
 */
var fs = require('fs');

/*
 * define the possible values:
 * section: [section]
 * param: key=value
 * comment: ;this is a comment
 */
var regex = {
    section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
    param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/,
    string: /^"(.*)"$/,
};

/*
 * parses a .ini file
 * @param: {String} file, the location of the .ini file
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
module.exports.parse = function (file, callback, scan = false) {
    if (!callback) {
        return;
    }
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, parse(data, scan));
        }
    });
};

module.exports.parseSync = function (file, scan = false) {
    return parse(fs.readFileSync(file, 'utf8'), scan);
};

function eval(value, scan) {
    if (!scan || value === "") {
        return value;
    }

    var matches = null;
    if ((matches = value.match(regex.string)) !== null) {
        return matches[1];
    } else if (!isNaN(matches = Number(value))) {
        return matches;
    } else if ((matches = value.toLowerCase()) === 'true') {
        return true;
    } else if (matches === 'false') {
        return false;
    } else if (matches === 'null') {
        return null;
    }
    return value;
}

function parse(data, scan) {
    var value = {};
    var lines = data.split(/\r\n|\r|\n/);
    var section = null;
    var match = null;
    lines.forEach(function (line) {
        if (regex.comment.test(line)) {
            return;
        } else if ((match = line.match(regex.param)) !== null) {
            if (section) {
                value[section][match[1]] = eval(match[2], scan);
            } else {
                value[match[1]] = eval(match[2], scan);
            }
        } else if ((match = line.match(regex.section)) !== null) {
            value[match[1]] = {};
            section = match[1];
        } else if (line.length === 0 && section) {
            section = null;
        }
    });
    return value;
}

module.exports.parseString = parse;
