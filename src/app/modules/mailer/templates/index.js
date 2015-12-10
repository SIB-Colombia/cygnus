'use strict';

exports = module.exports = function(service) {
	return {
		local: require('./local')(service)
	};
};
