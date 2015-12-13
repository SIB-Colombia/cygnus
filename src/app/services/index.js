'use strict';

exports = module.exports = function(models) {
	return {
		profile: require('./profile')(models),
		tool: require('./tool')(models),
		directory: require('./directory')(models)
	};
};
