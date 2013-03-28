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
 * @param: {Object} options, possible options
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
module.exports.parse = function(file, options, callback){
	if(typeof options == 'function'){
		callback = options;
		options = {};
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
	if(!options){
		options = {};
	}

	options.skip_blank_lines = options.skip_blank_lines || false;

	var value = {},
		lines = data.split(/\r\n|\r|\n/),
		section = null;

	lines.forEach(function(line){
		if(regex.comment.test(line) || (!line.trim().length && options.skip_blank_lines)){
			return;
		}else if(regex.param.test(line)){
			var match = line.match(regex.param);
			if(section){
				value[section][match[1]] = match[2];
			}else if(!section && options.skip_blank_lines){
				if(!value.DEFAULT){
					value.DEFAULT = {};
				}
				value.DEFAULT[match[1]] = match[2];
			}else {
				value[match[1]] = match[2];
			}
		}else if(regex.section.test(line)){
			var match = line.match(regex.section);
			value[match[1]] = {};
			section = match[1];
		}else if(!line.length && section){
			if(options.skip_blank_lines){
				return;
			}
			section = null;
		}
	});
	return value;
}

module.exports.parseString = parse;
