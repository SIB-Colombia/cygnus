'use strict';

exports = module.exports = function(User, mailer) {
	return function(req, token, refreshToken, profile, done) {
		User.findOne({
			'linkedin.id': profile.id
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				return done(null, req.user, req.flash('errorMessage', 'This Linkedin account is already linked to an account in our system. Please unlink it from the existing to be able to re-link.'));
			}

			user = req.user;

			user.linkedin.id = profile.id;
			user.linkedin.token = token;
			user.linkedin.name = profile.displayName;
			user.linkedin.email = profile.emails[0].value;

			user.save(function(err) {
				if (err) {
					return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err));
				}

				mailer(user, 'linkedin', 'link');

				return done(null, user, req.flash('linkMessage', 'Your Linkedin account was linked!'));
			});
		});
	};
};
