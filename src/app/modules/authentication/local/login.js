'use strict';

exports = module.exports = function(User) {
	return function(req, email, password, done) {
		User.findOne({
			'email': email
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, req.flash('loginMessage', req.__('login.user_not_found')));
			}
			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', req.__('login.wrong_password')));
			}
			return done(null, user, req.flash('loginMessage', req.__('login.welcome')));
		});
	};
};
