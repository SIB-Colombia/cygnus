'use strict';

exports = module.exports = function(models) {
	return {
		getAll: require('./getall')(models)
	};
};
