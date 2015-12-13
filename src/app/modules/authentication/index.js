'use strict';

exports = module.exports = function(models, mailer) {
	return {
		facebook: require('./facebook')(models, mailer),
		google: require('./google')(models, mailer),
		linkedin: require('./linkedin')(models, mailer),
		local: require('./local')(models, mailer)
	};
};
