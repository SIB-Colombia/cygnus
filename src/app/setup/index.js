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
