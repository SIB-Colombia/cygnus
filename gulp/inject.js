'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles'], function () {
	var injectStylesHome = gulp.src([
		path.join(conf.paths.src, '/public/stylesheets/**/*.css'),
		path.join('!' + conf.paths.src, '/public/stylesheets/admin/**/*.css')
	], { read: false });

	var injectScriptsHome = gulp.src([
		path.join(conf.paths.src, '/public/javascripts/**/*.module.js'),
		path.join(conf.paths.src, '/public/javascripts/**/*.js'),
		path.join('!' + conf.paths.src, '/public/javascripts/final/**/*.js'),
		path.join('!' + conf.paths.src, '/public/javascripts/login/**/*.js'),
		path.join('!' + conf.paths.src, '/public/javascripts/admin/**/*.js'),
		path.join('!' + conf.paths.src, '/public/**/*.spec.js'),
		path.join('!' + conf.paths.src, '/public/**/*.mock.js')
	])
	.pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

	var injectOptionsHome = {
		ignorePath: [conf.paths.tmp, path.join(conf.paths.src, '/public')],
		addRootSlash: true,
		name: 'home'
	};

	gulp.src(path.join(conf.paths.src, '/app/layouts/layout.jade'))
		.pipe($.inject(injectStylesHome, injectOptionsHome))
		.pipe($.inject(injectScriptsHome, injectOptionsHome))
		.pipe(wiredep(_.extend({ignorePath: ['../../public']}, conf.wiredep)))
		.pipe(gulp.dest(path.join(conf.paths.src, '/app/layouts/final')));

	var injectStylesAdmin = gulp.src([
		path.join(conf.paths.src, '/public/stylesheets/admin/**/*.css')
	], { read: false });

	var injectScriptsAdmin = gulp.src([
		path.join(conf.paths.src, '/public/javascripts/admin/**/*.js')
	])
	.pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

	var injectOptionsAdmin = {
		ignorePath: [conf.paths.tmp, path.join(conf.paths.src, '/public')],
		addRootSlash: true,
		name: 'admin'
	};

	return gulp.src(path.join(conf.paths.src, '/app/layouts/layout_admin.jade'))
		.pipe($.inject(injectStylesAdmin, injectOptionsAdmin))
		.pipe($.inject(injectScriptsAdmin, injectOptionsAdmin))
		.pipe(wiredep(_.extend({ignorePath: ['../../public']}, conf.wiredep)))
		.pipe(gulp.dest(path.join(conf.paths.src, '/app/layouts/final')));
});
