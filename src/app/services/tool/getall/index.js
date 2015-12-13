'use strict';

var debug = require('debug')('catalog:tool:getall');

exports = module.exports = function(models) {
	return function(req, callback) {
		var query = {};
		if(req.query.query) {
			query = {
				$or: [
					{
						'name.english': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'name.spanish': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'name.portuguese': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'shortDescription.english': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'shortDescription.spanish': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'shortDescription.portuguese': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'longDescription.english': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'longDescription.spanish': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'longDescription.portuguese': new RegExp('.*'+req.query.query+'.*$', "i")
					},
					{
						'country': new RegExp('.*'+req.query.query+'.*$', "i")
					}
				]
			};
		}
		if(req.query.categories) {
			query.$and = [];
			if(Array.isArray(req.query.categories)) {
				for(var i = 0; i < req.query.categories.length; i++) {
					query.$and[i] = {'categories': req.query.categories[i]};
				}
			} else {
				query.$and[0] = {'categories': req.query.categories};
			}
		}
		if(req.query.status) {
			query.state = req.query.status;
		}
		models.Tool
			.find(query)
			.populate('directory')
			.exec(function(err, tools) {
			if (err) {
				callback(err);
			}
			callback(err, tools);
		});
	};
};
