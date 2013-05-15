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
    comment: /^\s*;.*$/
};

/*
 * parses a .ini file
 * @param: {String} file, the location of the .ini file
 * @param: {Object} options, the options to run the parse with
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
module.exports.parse = function(file, options, callback){
    if(typeof(options) == 'function' && !callback) {
        //backwards compatibility with non-optioned method
        callback = options;
        options = null;
    }
    if(!callback){
        return;
    }
    fs.readFile(file, 'utf8', function(err, data){
        if(err){
            callback(err);
        }else{
            callback(null, parse(data, options));
        }
    });
};

module.exports.parseSync = function(file, options){
    return parse(fs.readFileSync(file, 'utf8'), options);
};

function parse(data, options){
    var parseOptions = options ? options : {};
    var value = {};
    var lines = data.split(/\r\n|\r|\n/);
    var section = null;
    lines.forEach(function(line){
        if(regex.comment.test(line)){
            return;
        }else if(regex.param.test(line)){
            var match = line.match(regex.param);
            var lineValue =  match[2];
            if(lineValue != null && parseOptions.treatEmptyStringsAsNull === true && !lineValue.trim()) {
                lineValue = null;
            }
            if(section){
                value[section][match[1]] = lineValue;
            }else{
                value[match[1]] = lineValue;
            }
        }else if(regex.section.test(line)){
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }else if(line.length == 0 && section){
            section = null;
        };
    });
    return value;
}

module.exports.parseString = parse;
