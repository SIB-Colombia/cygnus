'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

//var browserSync = require('browser-sync');

function isOnlyChange(event) {
	return event.type === 'changed';
}

gulp.task('watch', ['inject', 'jadetohtml'], function () {
	//gulp.watch([path.join(conf.paths.src, '/app/layouts/layout.jade'), 'bower.json'], ['inject']);

	gulp.watch([
		path.join(conf.paths.src, '/app/**/*.css'),
		path.join(conf.paths.src, '/app/**/*.styl')
	], function(event) {
		if(isOnlyChange(event)) {
			gulp.start('styles');
		} else {
			gulp.start('inject');
		}
	});

	gulp.watch([
		path.join(conf.paths.src, '/app/layouts/**/layout.jade')
	], function(event) {
		gulp.start('inject');
	});

	gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
		if(isOnlyChange(event)) {
			gulp.start('scripts');
		} else {
			gulp.start('inject');
		}
	});

	gulp.watch([path.join(conf.paths.src, '/app/views/**/templates/*.jade')], function(event) {
		gulp.start('jadetohtml');
	});

	gulp.watch([path.join(conf.paths.src, '/app/resources/locales/*.json')], function(event) {
		gulp.start('copylocales');
	});

});
