/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

// simplify modules location
require('app-module-path').addPath(__dirname + '/config');

var gutil = require('gulp-util');

// config and setup helpers
var config = require('../config/application-config');

exports.assetsLocation = config.get('assetsLocation');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
	src: 'src',
	tmp: '.tmp'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
	exclude: [/bootstrap\.css/],
	directory: 'src/public/bower_components/'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
	'use strict';

	return function(err) {
		gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
		this.emit('end');
	};
};
