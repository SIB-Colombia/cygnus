'use strict';

/**
 * Resolves URL /
 * @param  {Object} Request params
 * @param  {Object} Response params
 */
var debug = require('debug')('catalog:specieDetailsController');
var async = require('async');
var request = require('request');

exports.show = function() {
	return function(req, res) {
		async.series({
			specieData: function(callback) {
				request({
					url: 'http://localhost:4000/api/fichas/'+req.params._specieId,
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
				res.send(err);
			}

			res.setHeader('Cache-Control', 'public, max-age=2592000000');
			res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
			res.render('show', { data: JSON.stringify(results.specieData), registerURL: "http://www.biodiversidad.co/ficha/id/"+results.specieData.catalogoEspeciesId, ogTitle: results.specieData.taxonNombre } );
		});
	};
};
