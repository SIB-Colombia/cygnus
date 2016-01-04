'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

gulp.task('copylocales', function () {
	gulp.src([path.join(conf.paths.src, '/app/resources/locales/*.json')])
		.pipe($.debug({title: 'locales:'}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/public/locales')));
});
