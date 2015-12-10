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
