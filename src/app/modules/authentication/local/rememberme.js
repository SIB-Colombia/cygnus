'use strict';

var async = require('async');

exports = module.exports = function(User) {
	return function(usr, done) {

		var user = usr;

		async.series({
			updateSessionToken: function(callback) {
				var token = user.generateRememberMeToken(64);

				user.accesstoken = token;
				callback();
			},
			saveProfile: function(callback) {
				user.save(function(err) {
					callback(err);
				});
			}
		}, function(err, result) {
			done(err, user.accesstoken);
		});
	};
};
