'use strict';

var debug = require('debug')('catalog:tool:gettool');

exports = module.exports = function(models) {
	return function(req, callback) {
		var query = {_id: req.params._id};
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
