'use strict';

exports = module.exports = function(collection, mongoose) {
	var schema = mongoose.Schema({
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true
		},
		text: {
			type: String,
			required: true
		},
		score: {
			type: Number,
			required: false
		}
	});

	return mongoose.model(collection, schema);
};
