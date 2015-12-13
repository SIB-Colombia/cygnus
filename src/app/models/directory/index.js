'use strict';

exports = module.exports = function(collection, mongoose) {
	var schema = mongoose.Schema({
		responsibleName: {
			english: {
				type: String,
				required: false,
				trim: true
			},
			spanish: {
				type: String,
				required: false,
				trim: true
			},
			portuguese: {
				type: String,
				required: false,
				trim: true
			}
		},
		subtitle: {
			english: {
				type: String,
				required: false,
				trim: true
			},
			spanish: {
				type: String,
				required: false,
				trim: true
			},
			portuguese: {
				type: String,
				required: false,
				trim: true
			}
		},
		category: {
			type: String,
			required: true
		},
		shortDescription: {
			english: {
				type: String,
				required: false,
				trim: true
			},
			spanish: {
				type: String,
				required: false,
				trim: true
			},
			portuguese: {
				type: String,
				required: false,
				trim: true
			}
		},
		thumbnailImage: {
			type: String,
			required: true
		},
		urlWebsite: {
			type: String,
			required: false
		},
		country: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true,
			default: 'pending'
		},
		email: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			required: true
		},
		suggestedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true
		},
		approvedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true
		}
	});

	return mongoose.model(collection, schema);
};
