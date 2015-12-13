'use strict';

var debug = require('debug')('catalog:directory:getall');

exports = module.exports = function(models) {
	return function(req, callback) {
		models.Directory.find({}, ((req.query.fields)?req.query.fields.replace(',', ' '):''))
			.sort({'responsibleName.english': 'asc'})
			.exec(function(err, directories) {
				if (err) {
					callback(err);
				}
				callback(err, directories);
			});
	};
};
