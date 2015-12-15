'use strict';

var request = require('request');
var async = require('async');

/**
 * Resolves URL /
 * @param  {Object} Request params
 * @param  {Object} Response params
 */
exports.index = function() {
	return function(req, res) {
		async.series({
			data: function(callback) {
				request({
					url: 'http://localhost:4000/api/fichas',
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						callback(error, body);
					} else {
						callback(error);
					}
				});
			}
		}, function(err, results) {
			if(err) {
				console.log("Error getting data from API data");
			} else {
				console.log("Catalog API data successfully received2.");
				res.render('index', { data: JSON.stringify(results.data) });
			}
		});
	};
};
