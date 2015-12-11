'use strict';

var LocalStrategy = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;
var config = require('application-config');

var debug = require('debug')('catalogue:passport');

exports = module.exports = function(passport, authentication, models) {
	passport.serializeUser(function(user, done) {
		done(null, user.id); // this is what gets attached to the session
	});

	passport.deserializeUser(function(id, done) {
		models.User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email', // by default, local strategy uses username and password, we will override with email
		passwordField: 'password',
		passReqToCallback: true // allows us to pass back the entire request to the callback
	}, authentication.local.signup));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email', // by default, local strategy uses username and password, we will override with email
		passwordField: 'password',
		passReqToCallback: true // allows us to pass back the entire request to the callback
	}, authentication.local.login));

	passport.use(new RememberMeStrategy(function(token, done) {
		models.User.findOne({accesstoken: token}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (user === null) {
				return done(null, false);
			}
			return done(null, user);
		});
	}, authentication.local.rememberme));
};
