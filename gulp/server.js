'use strict';

var gulp = require('gulp'),
		nodemon = require('gulp-nodemon');

var browserSync = require('browser-sync');

gulp.task('server', ['watch', 'browser-sync'], function () {

});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8000",
		files: ["src/**/*.*"],
		port: 7000,
		reloadDelay: 2000
	});
});

gulp.task('nodemon', function() {
	var started = false;
	return nodemon({
		script: 'app.js',
		ext: 'json',
		env: {
			'DEBUG': 'catalog:*',
			'LANGUAGE_DEFAULT': 'es'
		}
	})
	.on('start', function() {
		console.log('started!');
		if(!started) {
			started = true;
		}
	})
	.on('restart', function () {
		console.log('restarted!');
	});
});
