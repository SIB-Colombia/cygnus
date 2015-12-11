'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

gulp.task('jadetohtml', function () {

	gulp.src([path.join(conf.paths.src, '/app/views/dashboard/angular_partials/*.jade')])
		.pipe($.jade({
			pretty: true
		}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/public/views')));

	gulp.src([path.join(conf.paths.src, '/app/views/dashboard/template/*.jade')])
		.pipe($.jade({
			pretty: true
		}))
		.pipe(gulp.dest(path.join(conf.paths.src, '/public/template')));
});
