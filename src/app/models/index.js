'use strict';

exports = module.exports = function(mongoose) {
	return {
		User: require('./user')('user', mongoose),
		VerificationToken: require('./verification-token')('verificationtoken', mongoose),
		Directory: require('./directory')('directory', mongoose),
		Tool: require('./tool')('tool', mongoose)
	};
};
