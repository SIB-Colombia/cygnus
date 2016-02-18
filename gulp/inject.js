'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles'], function () {
	var injectStylesHome = gulp.src([
		path.join(conf.paths.src, '/public/stylesheets/**/*.css')
	], { read: false });

	var injectScriptsHome = gulp.src([
		path.join(conf.paths.src, '/public/javascripts/modules/*.js'),
		path.join(conf.paths.src, '/public/javascripts/initialization/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/services/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/homeHeader/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/homeTopMenu/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/filterMenu/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/homeContent/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/footer/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/catalogApp.js'),
		path.join(conf.paths.src, '/public/javascripts/config.js'),
		path.join(conf.paths.src, '/public/javascripts/app.js'),
		path.join('!' + conf.paths.src, '/public/**/*.spec.js'),
		path.join('!' + conf.paths.src, '/public/**/*.mock.js')
	])
	.pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

	var injectScriptsSpeciesDetail = gulp.src([
		path.join(conf.paths.src, '/public/javascripts/modules/*.js'),
		path.join(conf.paths.src, '/public/javascripts/services/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/initialization/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/catalogApp.js'),
		path.join(conf.paths.src, '/public/javascripts/config.js'),
		path.join(conf.paths.src, '/public/javascripts/homeTopMenu/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/specieDetail/**/*.js'),
		path.join(conf.paths.src, '/public/javascripts/app.js'),
		path.join('!' + conf.paths.src, '/public/**/*.spec.js'),
		path.join('!' + conf.paths.src, '/public/**/*.mock.js')
	])
	.pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

	var injectOptionsSpecieDetail = {
		ignorePath: [conf.paths.tmp, path.join(conf.paths.src, '/public')],
		addRootSlash: true,
		name: 'specieDetail'
	};

	var injectOptionsHome = {
		ignorePath: [conf.paths.tmp, path.join(conf.paths.src, '/public')],
		addRootSlash: true,
		name: 'home'
	};

	gulp.src(path.join(conf.paths.src, '/app/layouts/specieDetail/layout.jade'))
		.pipe($.inject(injectStylesHome, injectOptionsSpecieDetail))
		.pipe($.inject(injectScriptsSpeciesDetail, injectOptionsSpecieDetail))
		.pipe(wiredep(_.extend({ignorePath: ['../../public/']}, conf.wiredep)))
		.pipe(gulp.dest(path.join(conf.paths.src, '/app/layouts/specieDetail/final')));

	return gulp.src(path.join(conf.paths.src, '/app/layouts/home/layout.jade'))
		.pipe($.inject(injectStylesHome, injectOptionsHome))
		.pipe($.inject(injectScriptsHome, injectOptionsHome))
		.pipe(wiredep(_.extend({ignorePath: ['../../public/']}, conf.wiredep)))
		.pipe(gulp.dest(path.join(conf.paths.src, '/app/layouts/home/final')));
});
