'use strict';

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;
var config = require('application-config');

var debug = require('debug')('catalog:passport');

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

	passport.use(new FacebookStrategy({
		clientID: config.get('facebook.client.id'),
		clientSecret: config.get('facebook.client.secret'),
		callbackURL: config.get('facebook.callback.url'),
		passReqToCallback: true
	}, authentication.facebook.auth));

	passport.use(new GoogleStrategy({
		clientID: config.get('google.client.id'),
		clientSecret: config.get('google.client.secret'),
		callbackURL: config.get('google.callback.url'),
		passReqToCallback: true
	}, authentication.google.auth));

	passport.use(new LinkedinStrategy({
		clientID: config.get('linkedin.client.id'),
		clientSecret: config.get('linkedin.client.secret'),
		callbackURL: config.get('linkedin.callback.url'),
		passReqToCallback: true
	}, authentication.linkedin.auth));

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
