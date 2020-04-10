var assert = require('assert').strict,
	iniparser = require('../lib/node-iniparser'),
	initFilePath = __dirname + '/files/test.ini';

it('async read file', function(){
	iniparser.parse(initFilePath, function(err, config){
		assert.equal(err, null);
	});
});

it('async read non-existing file', function(){
	iniparser.parse('./files/doesnotexists.ini', function(err, config){
		assert.equal(err.code, 'ENOENT');
		assert.equal(config, undefined);
	});
});

it('sync read file', function(){
	var config = iniparser.parseSync(initFilePath);
	assert.notEqual(config, null);
});

it('sync read non-existing file', function(){
	assert.throws(function(){
		var config = iniparser.parseSync('./files/doesnotexists.ini');
	});
});

it('async read file and look for variable', function(){
	iniparser.parse(initFilePath, function(err, config){
		assert.equal(err, null);
		assert.equal(config.foo, 'bar');
	});
});

it('async read file and look for section', function(){
	iniparser.parse(initFilePath, function(err, config){
		assert.equal(err, null);
		assert.notEqual(config.worlds, null);
		assert.equal(config.worlds.earth, 'awesome');
		assert.notEqual(config.section2, null);
		assert.equal(config.section2.bar, 'foo');
	});
});

it('sync read file and look for variable', function(){
	var config = iniparser.parseSync(initFilePath);
	assert.equal(config.foo, 'bar');
});

it('sync read file and look for section', function(){
	var config = iniparser.parseSync(initFilePath);
	assert.notEqual(config.worlds, null);
	assert.equal(config.worlds.earth, 'awesome');
	assert.notEqual(config.section2, null);
	assert.equal(config.section2.bar, 'foo');
});

it('variable with space at the end', function () {
	var config = iniparser.parseSync(initFilePath);
	assert.notEqual('bar ', config.var_with_space_at_end);
	assert.equal('bar', config.var_with_space_at_end);
});

it('look for a commented out variable', function(){
	var config = iniparser.parseSync(initFilePath);
	assert.equal(config.section2.test, undefined);
});

it('variable with space in value', function(){
	var config = iniparser.parseSync(initFilePath);
	assert.equal(config.section2.there_is, "a space in here with = and trailing tab");
});

it('value is parsed when scan is true', function(){
	var config = iniparser.parseSync(initFilePath, true);
	assert.equal(config.Scan.name, "foo bar");
	assert.equal(config.Scan.age, 33);
	assert.equal(config.Scan.single, false);
});

it('value is not parsed when scan is false', function(){
	var config = iniparser.parseSync(initFilePath);
	assert.equal(config.Scan.name, "foo bar");
	assert.equal(config.Scan.age, "33");
	assert.equal(config.Scan.single, "false");
});
