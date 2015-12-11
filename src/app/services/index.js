'use strict';

exports = module.exports = function(models) {
	return {
		profile: require('./profile')(models)
	};
};
