var assert = require('assert'),
	path = require('path'),
	iniparser = require('../lib/node-iniparser');

describe('node-iniparser', function(){
	it('async read file', function(done){
		iniparser.parse(path.join(__dirname, './files/test.ini'), function(err, config){
			assert.equal(err, null);
			done();
		});
	});
	it('async read non-existing file', function(done){
		iniparser.parse(path.join(__dirname, './files/doesnotexists.ini'), function(err, config){
			assert.equal(err.code, 'ENOENT');
			assert.equal(config, null);
			done();
		});
	});
	it('sync read file', function(){
		var config = iniparser.parseSync(path.join(__dirname, './files/test.ini'));
		assert.notEqual(config, null);
	});
	it('sync read non-existing file', function(){
		assert.throws(function(){
			var config = iniparser.parseSync(path.join(__dirname, './files/doesnotexists.ini'));
		});
	});
	it('async read file and look for variable', function(done){
		iniparser.parse(path.join(__dirname, './files/test.ini'), function(err, config){
			assert.equal(err, null);
			assert.equal(config.foo, 'bar');
			done();
		});
	});
	it('async read file and look for section', function(done){
		iniparser.parse(path.join(__dirname, './files/test.ini'), function(err, config){
			assert.equal(err, null);
			assert.notEqual(config.worlds, null);
			assert.equal(config.worlds.earth, 'awesome');
			assert.notEqual(config.section2, null);
			assert.equal(config.section2.bar, 'foo');
			done();
		});
	});
	it('sync read file and look for variable', function(){
		var config = iniparser.parseSync(path.join(__dirname, './files/test.ini'));
		assert.equal(config.foo, 'bar');
	});
	it('sync read file and look for section', function(){
		var config = iniparser.parseSync(path.join(__dirname, './files/test.ini'));
		assert.notEqual(config.worlds, null);
		assert.equal(config.worlds.earth, 'awesome');
		assert.notEqual(config.section2, null);
		assert.equal(config.section2.bar, 'foo');
	});
	it('variable with space at the end', function () {
		var config = iniparser.parseSync(path.join(__dirname, './files/test.ini'));
		assert.notEqual('bar ', config.var_with_space_at_end);
		assert.equal('bar', config.var_with_space_at_end);
	});
	it('look for a commented out variable', function(){
		var config = iniparser.parseSync(path.join(__dirname, './files/test.ini'));
		assert.equal(config.section2.test, null);
	});
	it('variable with space in value', function(){
		var config = iniparser.parseSync(path.join(__dirname, './files/test.ini'));
		assert.equal(config.section2.there_is, "a space in here with = and trailing tab");
	});

	it('asynchronously allows blank lines in section', function(done){
		iniparser.parse(path.join(__dirname, './files/test.ini'), {
			skip_blank_lines: true
		}, function(err, config){
			assert.notEqual(config.foo, 'bar');
			assert.equal(config.DEFAULT.foo, 'bar');
			assert.equal(config.section3.allows, 'blank lines');
			done();
		});
	});

	it('synchronously allows blank lines in section', function(){
		var config = iniparser.parseSync(path.join(__dirname, './files/test.ini'), {
			skip_blank_lines: true
		});
		assert.notEqual(config.foo, 'bar');
		assert.equal(config.DEFAULT.foo, 'bar');
		assert.equal(config.section3.allows, 'blank lines');
	});
});