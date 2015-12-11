'use strict';

var debug = require('debug')('catalogue:profile:remember');
var async = require('async');

exports = module.exports = function() {
	return function(req, callback) {
		if (!req.body) {
			return callback('no request body');
		}

		var user = req.user;

		async.series({
			updateSessionToken: function(callback) {
				if (!req.body.remember_me) {
					return callback();
				}

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
			callback(err, user.accesstoken);
		});
	};
};
