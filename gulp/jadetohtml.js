'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

gulp.task('jadetohtml', function () {
	gulp.src([
			path.join(conf.paths.src, '/app/views/main/templates/*.jade'),
			path.join(conf.paths.src, '/app/views/fichas/templates/*.jade')])
		.pipe($.jade({
			pretty: true
		}))
		.pipe($.debug({title: 'jadetohtml:'}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/public/templates')));
});
