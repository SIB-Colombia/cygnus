'use strict';

/**
 * Resolves URL /
 * @param  {Object} Request params
 * @param  {Object} Response params
 */
exports.index = function() {
	return function(req, res) {
		res.render('index');
	};
};
