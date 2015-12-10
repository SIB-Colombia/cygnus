'use strict';

// common dependencies
var debug = require('debug')('catalogue:setup');
var util = require('util');
var url = require('url');
var colors = require('colors');
var path = require('path');
var winston = require('winston');

// express dependencies
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var serveStatic = require('serve-static');

// internationalization dependencies
var i18n = require('i18n');

// socket.io dependecies
var socketHandshake = require('socket.io-handshake');

// create session store
module.exports.sessions = function(options) {
	var authObject;

	if ('production' === options.env) {
		var parsedUrl = url.parse(options.url);

		authObject = {
			prefix: options.prefix,
			host: parsedUrl.hostname,
			port: parsedUrl.port,
			db: options.db,
			pass: parsedUrl.auth ? parsedUrl.auth.split(":")[1] : null,
			secret: options.secret
		};

		return new options.Store(authObject);
	} else {
		return (new options.session.MemoryStore());
	}
};

// configure express
module.exports.createExpressApp = function(options) {
	options.env = options.env || 'development';

	var app = express();

	// set view engine and parsers
	app.set('view engine', options.viewEngine);
	app.set('json spaces', 2);

	// express common config
	app.set('port', options.port);
	app.use(morgan('dev'));
	app.use(compression());
	app.use(options.cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(methodOverride());
	app.use(options.session({
		secret: options.sessionSecret,
		name: options.sessionKey,
		store: options.store,
		resave: true,
		saveUninitialized: true
	}));
	app.use(options.passport.initialize());
	app.use(options.passport.session());
	app.use(options.passport.authenticate('remember-me'));
	app.use(flash());
	app.use(require('stylus').middleware(options.dir + options.stylesLocation));

	app.use(favicon(options.dir + options.favicon));

	var logger = new(winston.Logger)({
		transports: [
			new(winston.transports.Console)()
		]
	});

	// express dev and production config
	if ('development' === options.env) {
		app.use(errorHandler());
		app.use(serveStatic(path.join(options.dir, options.publicLocation)));

		logger = new(winston.Logger)({
			transports: [
				new(winston.transports.Console)()
			]
		});
	} else if ('production' === options.env) {
		var oneMonth = 60 * 60 * 24 * 30;
		app.use(serveStatic(path.join(options.dir, options.publicLocation), {
			maxAge: oneMonth
		}));

		logger = new(winston.Logger)({
			transports: [
				new(winston.transports.Console)({
					level: 'error'
				}),
				new(winston.transports.File)({
					filename: options.logs
				})
			]
		});
	}

	// Initialize app local variables
	app.use(function(req, res, next) {
		if ((typeof req.cookies.locale) === 'undefined') {
			res.locals.currentLocale = i18n.getLocale();
		} else {
			res.locals.currentLocale = req.cookies.locale;
		}
		res.locals.locales = options.locales;
		next();
	});

	i18n.configure({
		// setup some locales - other locales default to en silently
		locales: options.locales,
		// sets a custom cookie name to parse locale settings from
		cookie: options.cookieName,
		// where to store json files - defaults to './locales'
		directory: options.translationDir,
		defaultLocale: options.defaultLocale
	});

	app.use(i18n.init);

	logger.info('Catalogue of biodiversity ' + options.codeVersion + ' - Frontend: initial configuration loaded.');
	return app;
};

// configure socket.io
module.exports.configureSockets = function(io, options) {
	io.use(socketHandshake({
		store: options.sessionStore,
		key: options.sessionKey,
		secret: options.sessionSecret,
		parser: options.cookieParser()
	}));
};
