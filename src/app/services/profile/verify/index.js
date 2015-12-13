'use strict';

var async = require('async');

exports = module.exports = function(models) {
	return function(req, callback) {
		if (!req.query) return callback(req.__('signup_verification_token_no_query'));
		if (!req.query.token) return callback(req.__('signup_verification_token_missing'));

		var uid, user;

		// todo - use async.waterfall for better flow
		async.series({
			checkToken: function(callback) {
				models.VerificationToken.findOne({
					token: req.query.token
				}, function(err, tokenEntry) {
					if (err) return callback(err);
					if (!tokenEntry) return callback(req.__('signup_verification_token_invalid'));

					uid = tokenEntry.uid;

					tokenEntry.remove(function(err) {
						callback(err);
					});
				});
			},
			verifyUser: function(callback) {
				if (!uid) return callback(req.__('signup_verification_token_invalid'));

				models.User.findById(uid, function(err, userEntry) {
					if (err) return callback(err);
					if (!userEntry) return callback(req.__('signup_verification_token_no_user'));

					user = userEntry;
					userEntry.verified = true;

					userEntry.save(function(err) {
						callback(err);
					});
				});

			},
			logInUser: function(callback) {
				if (!uid) return callback(req.__('signup_verification_token_invalid_no_login'));

				req.logIn(user, function(err) {
					callback(err);
				});
			}
		}, function(err, results) {
			callback(err);
		});
	};
};
