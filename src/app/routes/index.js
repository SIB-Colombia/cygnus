'use strict';

// dependencies
var logger = require('winston');
var path = require('path');
var crypto = require('crypto');
var express = require('express'),
		fs = require('fs');
var multer  = require('multer');

// Storage strategy to localdisk with file rename (includes extension)
var storage = multer.diskStorage({
	destination: 'src/public/uploads/',
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (err) {
				return cb(err);
			}
			cb(null, raw.toString('hex') + path.extname(file.originalname));
		});
	}
});

var upload = multer({ storage: storage });

module.exports = function(parent, services, options) {
	var verbose = options.verbose;
	fs.readdirSync(__dirname + '/../controllers').forEach(function(name) {
		verbose && logger.info('\n %s:', name);
		var obj = require('./../controllers/' + name),
			name = obj.name || name,
			prefix = obj.prefix || '',
			app = express(),
			method,
			path,
			callCallback;

		// allow specifying the view engine
		if (obj.engine) {
			app.set('view engine', obj.engine);
		}
		app.set('views', __dirname + '/../views/' + name);

		// error handlers

		// development error handler
		// will print stacktrace
		if (app.get('env') === 'development') {
			app.use(function(err, req, res, next) {
				res.status(err.status || 500);
				console.log(__dirname + '/../views/');
				res.render('error', {
					message: err.message,
					error: err
				});
			});
		}

		// production error handler
		// no stacktraces leaked to user
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: {}
			});
		});

		app.use('/auth', function(req, res, next) {
			if (req.isAuthenticated() && req.user.verified) {
				return res.redirect('/');
			}
			return next();
		});

		app.use('/account/dashboard', function(req, res, next) {
			if (req.isAuthenticated() && req.user.verified && (req.user.role === 'administrator')) {
				return next();
			}
			return res.redirect('/');
		});

		app.use('/account', function(req, res, next) {
			if (req.isAuthenticated() && req.user.verified) {
				return next();
			}
			return res.redirect('/');
		});

		app.use('/', function(req, res, next) {
			if (req.isAuthenticated() && req.user.verified) {
				if(req.user.role === 'administrator') {
					res.locals.admin = true;
				}
				res.locals.username = req.user.fullname;
			}
			return next();
		});

		// before middleware support
		if (obj.before) {
			path = '/' + name + '/:' + name + '_id';
			app.all(path, obj.before);
			verbose && console.log(' ALL %s -> before', path);
			path = '/' + name + '/:' + name + '_id/*';
			app.all(path, obj.before);
			verbose && console.log(' ALL %s -> before', path);
		}

		// generate routes based
		// on the exported methods
		for (var key in obj) {
			callCallback = false;
			var multipartImageLoad = undefined;
			// "reserved" exports
			if (~['name', 'prefix', 'engine', 'before'].indexOf(key) || ~key.indexOf('Callback')) {
				continue;
			}
			// route exports
			switch (key) {
				case 'index':
					method = 'get';
					path = '/';
					break;
				default:
					throw new Error('unrecognized route: ' + name + '.' + key);
			}
			path = prefix + path;
			verbose && console.log(' %s %s -> %s', method.toUpperCase(), path, key);
		}
		// mount the app
		parent.use(app);
	});
};
