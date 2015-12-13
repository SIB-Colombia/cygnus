'use strict';

exports = module.exports = function(collection, mongoose) {
	var schema = mongoose.Schema({
		name: {
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
		categories: {
			type: [String],
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
		longDescription: {
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
			required: false
		},
		descriptiveImage: {
			type: String,
			required: true
		},
		urlWebsite: {
			type: String,
			required: false
		},
		contactEmail: {
			type: String,
			required: true
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
		},
		directory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'directory',
			required: true
		},
		expertReview: [
			{
				expert: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user',
					required: false
				},
				textReview: {
					type: String,
					required: false
				},
				rating: {
					type: Number,
					required: false
				}
			}
		]
	});

	return mongoose.model(collection, schema);
};
