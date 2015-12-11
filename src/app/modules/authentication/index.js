'use strict';

exports = module.exports = function(models, mailer) {
	return {
		local: require('./local')(models, mailer)
	};
};
