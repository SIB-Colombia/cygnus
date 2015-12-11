'use strict';

// Dependencies
var async = require('async');

exports = module.exports = function(User, VerificationToken, mailer) {
	return function(req, email, password, done) {
		User.findOne({
			'email': email
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				return done(null, false, req.flash('signupMessage', req.__('signup.email_already_used')));
			}
			if (!req.body.fullname) {
				return done(null, false, req.flash('signupMessage', req.__('signup.full_name_required')));
			}

			var newUser = new User();

			newUser.email = email;
			newUser.password = newUser.generateHash(password);
			newUser.fullname = req.body.fullname;

			var uid;

			async.series({
				saveUser: function(callback) {
					newUser.save(function(err, product) {
						if (err) {
							return callback(err);
						}
						uid = product._id;
						callback();
					});
				},
				sendVerificationMail: function(callback) {
					var newToken = new VerificationToken();

					newToken.uid = uid;
					newToken.token = newToken.generateToken(uid);

					newToken.save(function(err, product) {
						if (!err) {
							mailer(newUser, 'local', 'signup', product.token);
						}
						callback(err);
					});
				}
			}, function(err, results) {
				if (err) {
					return done(null, false, req.flash('signupMessage', req.__('signup.user_account_create_error') + ' - ' + err));
				}
				return done(null, newUser, req.flash('signupMessage', req.__('signup.success')));
			});
		});
	};
};
