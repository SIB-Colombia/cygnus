'use strict';

// common dependencies
var debug = require('debug')('catalog:indexController');
var request = require('request');
var async = require('async');

// config and setup helpers
var config = require('application-config');

/**
 * Resolves URL /
 * @param  {Object} Request params
 * @param  {Object} Response params
 */
exports.index = function() {
	return function(req, res) {
		async.series({
			dataRandom: function(callback) {
				request({
					url: config.get('backend.api.server')+':'+config.get('backend.api.port')+config.get('backend.api.path')+'/fichas/random?pagesize='+config.get('appConfig.initialHomeRandomSpecies'),
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode === 200) {
						callback(error, body);
					} else {
						callback(error);
					}
				});
			},
			dataNonRandom: function(callback) {
				request({
					url: config.get('backend.api.server')+':'+config.get('backend.api.port')+config.get('backend.api.path')+'/fichas?pagesize='+config.get('appConfig.initialHomeSpecies'),
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode === 200) {
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
				console.log("Catalog API data successfully received.");
				results.dataRandom.hits = results.dataRandom.hits.concat(results.dataNonRandom.hits);
				res.render('index', { data: JSON.stringify(results.dataRandom), validResultsByPage: JSON.stringify(config.get('appConfig.validResultsByPage')), defaultResultByPage: config.get('appConfig.defaultResultsByPage') });
			}
		});
	};
};
