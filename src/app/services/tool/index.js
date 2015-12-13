'use strict';

exports = module.exports = function(models) {
	return {
		new: require('./new')(models),
		getAll: require('./getall')(models),
		getTool: require('./gettool')(models)
	};
};
