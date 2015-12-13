'use strict';

// simplify modules location
require('app-module-path').addPath(__dirname + '/src/app');
require('app-module-path').addPath(__dirname + '/config');

// dependencies
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var http = require('http');
var socketio = require('socket.io')();
var mongoose = require('mongoose');

// config and setup helpers
var config = require('application-config');
var setup = require('./src/app/setup');

// setup session store
var sessionStore = setup.sessions({
	cookieParser: cookieParser,
	env: config.get('env'),
	Store: RedisStore,
	session: session,
	url: config.get('database.redis.url'),
	prefix: config.get('database.redis.session.prefix'),
	db: config.get('database.redis.db'),
	secret: config.get('server.secret')
});

// create/configure express app
var app = setup.createExpressApp({
	env: config.get('env'),
	port: config.get('server.port'),
	viewEngine: 'jade',
	dir: __dirname,
	publicLocation: '/src/public',
	favicon: '/src/public/images/favicon.ico',
	stylesLocation: '/src/public/stylesheets',
	cookieParser: cookieParser,
	session: session,
	sessionKey: config.get('session.key'),
	sessionSecret: config.get('server.secret'),
	store: sessionStore,
	passport: passport,
	locales: config.get('locales'),
	logs: config.get('logs'),
	cookieName: 'locale',
	translationDir: __dirname + '/src/app/resources/locales',
	defaultLocale: config.get('initialeDefault')
});

// mail module
var mailer = require('modules/mailer')({
	env: config.get('env'),
	serviceName: config.get('service.name'),
	apiKey: config.get('mandrill.api.key'),
	senderAddress: config.get('mandrill.sender'),
	verificationRoute: config.get('email.verification.route')
});

// http and socket.io server(s)
var server = http.createServer(app);
var io = socketio.attach(server);

// configure socket.io
setup.configureSockets(io, {
	cookieParser: cookieParser,
	sessionStore: sessionStore,
	sessionKey: config.get('session.key'),
	sessionSecret: config.get('server.secret'),
});

// app dependencies (app specific)
var ipc = require('./src/app/modules/ipc')(0);
var models = require('./src/app/models')(mongoose);
var services = require('./src/app/services')(models);
var authentication = require('modules/authentication')(models, mailer);

// setup application
setup.connectToDatabase(mongoose, config.get('database.mongo.url'));

// app specific modules
require('modules/passport')(passport, authentication, models);

// load controllers
require(__dirname + '/src/app/routes/routers')(app, services, {
	verbose: true
});

// express error handling
setup.handleExpressError(app);

// run application
setup.run(server, config.get('server.port'));
