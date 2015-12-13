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
				user.linkedin.token = token;
				user.linkedin.name = profile.displayName;
				user.linkedin.email = profile.emails[0].value;

				user.save(function(err) {
					if (err) {
						return done(null, false, req.flash('loginMessage', 'An error occured! - ' + err));
					}
					return done(null, user, req.flash('loginMessage', 'Welcome, via Linkedin login!'));
				});
			} else {
				var newUser = new User();

				newUser.linkedin.id = profile.id;
				newUser.linkedin.token = token;
				newUser.linkedin.name = profile.displayName;
				newUser.linkedin.email = profile.emails[0].value;
				newUser.email = profile.emails[0].value;
				newUser.verified = true;
				newUser.fullname = newUser.linkedin.name;

				var randomPassword = Math.random().toString(36).slice(-15);
				newUser.password = newUser.generateHash(randomPassword);

				newUser.save(function(err) {
					if (err) {
						return done(null, false, req.flash('signupMessage', 'An error occured! - ' + err)); // if error, return it via flash
					}

					mailer(newUser, 'linkedin', 'signup', null, randomPassword);
					return done(null, newUser, req.flash('signupMessage', 'Welcome, you registered through Linkedin!'));
				});
			}
		});
	};
};
