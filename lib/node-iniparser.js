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
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
exports.parse = function(file, callback){
	if(!callback){
		return;
	}
	fs.readFile(file, 'utf8', function(err, data){
		if(err){
			callback(err);
		}else{
			callback(null, parse(data));
		}
	});
};

exports.parseSync = function(file){
	return parse(fs.readFileSync(file, 'utf8'));
};

function parse(data){
	var value = {};
	var lines = data.split(/\r\n|\r|\n/);
	var section = null;
	lines.forEach(function(line){
		if(regex.comment.test(line)){
			return;
		}else if(regex.param.test(line)){
			var match = line.match(regex.param);
			if(section){
				value[section][match[1]] = match[2];
			}else{
				value[match[1]] = match[2];
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

exports.parseString = parse;


function safe (val) {
	return (val + "").replace(/[\n\r]+/g, " ");
}

exports.stringify = function (obj) {
	var ini = [];
	for (var section in obj) if (section !== "-") {
		ini.push("[" + safe(section) + "]\n");
		for (var key in obj[section]) {
			ini.push("\t" + safe(key));
			ini.push((obj[section][key] === true) ? "\n" : " = " + safe(obj[section][key]) + "\n");
		}
	}
	return ini.join("");
};
