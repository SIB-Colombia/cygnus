'use strict';

var debug = require('debug')('catalog:tool:new');
var async = require('async');

exports = module.exports = function(models) {
	return function(req, callback) {
		if (!req.body) {
			return callback('no request body');
		}

		var newTool = new models.Tool();

		if(req.body.name) {
			newTool.name.english = req.body.name.english;
			newTool.name.spanish = req.body.name.spanish;
			newTool.name.portuguese = req.body.name.portuguese;
		}
		if(req.body.shortDescription) {
			newTool.shortDescription.english = req.body.shortDescription.english;
			newTool.shortDescription.spanish = req.body.shortDescription.spanish;
			newTool.shortDescription.portuguese = req.body.shortDescription.portuguese;
		}
		if(req.body.longDescription) {
			newTool.longDescription.english = req.body.longDescription.english;
			newTool.longDescription.spanish = req.body.longDescription.spanish;
			newTool.longDescription.portuguese = req.body.longDescription.portuguese;
		}
		newTool.categories = req.body.categories;
		newTool.urlWebsite  = req.body.urlWebsite;
		newTool.contactEmail = req.body.contactEmail;
		newTool.state = "approved";
		newTool.country  = req.body.country;
		newTool.createdAt = Date.now();
		newTool.suggestedBy = req.user._id;
		newTool.approvedBy = req.user._id;
		if(req.files) {
			newTool.thumbnailImage = req.files.file?req.files.file[0].filename:undefined;
			newTool.descriptiveImage = req.files.fileDescriptive?req.files.fileDescriptive[0].filename:undefined;
		}

		if((typeof req.body.selectedDirectory) === 'undefined' && req.body.directory.responsibleName) {
			// We must create a new directory
			var newDirectory = new models.Directory();
			newDirectory.responsibleName.english = req.body.directory.responsibleName.english;
			newDirectory.responsibleName.spanish = req.body.directory.responsibleName.spanish;
			newDirectory.responsibleName.portuguese = req.body.directory.responsibleName.portuguese;
			if(req.body.directory.subtitle) {
				newDirectory.subtitle.english = req.body.directory.subtitle.english;
				newDirectory.subtitle.spanish = req.body.directory.subtitle.spanish;
				newDirectory.subtitle.portuguese = req.body.directory.subtitle.portuguese;
			}
			if(req.body.directory.shortDescription) {
				newDirectory.shortDescription.english = req.body.directory.shortDescription.english;
				newDirectory.shortDescription.spanish = req.body.directory.shortDescription.spanish;
				newDirectory.shortDescription.portuguese = req.body.directory.shortDescription.portuguese;
			}
			newDirectory.category = req.body.directory.category;
			if(req.files) {
				newDirectory.thumbnailImage = req.files.fileDirectory?req.files.fileDirectory[0].filename:undefined;
			}
			newDirectory.urlWebsite = req.body.directory.urlWebsite;
			newDirectory.country = req.body.directory.country;
			newDirectory.email = req.body.directory.email;
			newDirectory.createdAt = Date.now();
			newDirectory.suggestedBy = req.user._id;
			newDirectory.approvedBy = req.user._id;
			newDirectory.state = "approved";

			async.series({
				saveDirectory: function(callback) {
					newDirectory.save(function(err, result) {
						if(err) {
							console.log(err);
							callback(err);
						} else {
							callback(err, result);
						}
					});
				},
				saveTool: function(callback) {
					newTool.directory = newDirectory._id;

					newTool.save(function(err, result) {
						if(err) {
							console.log(err);
							callback(err);
						}
						callback(err, result);
					});
				},
				saveExpertReview: function(callback) {
					if(req.body.expertReview) {
						models.Tool.findByIdAndUpdate(
							newTool._id,
							{
								$push: {
									"expertReview": {
										expert: req.user._id,
										textReview: req.body.expertReview.textReview,
										rating: req.body.expertReview.rating
									}
								}
							},
							{
								safe: true, upsert: true
							}, function(err, model) {
								if(err){
									console.log(err);
									callback(err);
								} else {
									callback(err, model);
								}
							}
						);
					} else {
						callback();
					}
				}
			}, function(err, results) {
				callback(err, results);
			});
		} else {
			// Old directory
			async.series({
				saveTool: function(callback) {
					newTool.directory = req.body.selectedDirectory;
					newTool.save(function(err, result) {
						if(err) {
							console.log(err);
							callback(err);
						} else {
							callback(err, result);
						}
					});
				},
				saveExpertReview: function(callback) {
					if(req.body.expertReview) {
						models.Tool.findByIdAndUpdate(
							newTool._id,
							{
								$push: {
									"expertReview": {
										expert: req.user._id,
										textReview: req.body.expertReview.textReview,
										rating: req.body.expertReview.rating
									}
								}
							},
							{
								safe: true, upsert: true
							}, function(err, model) {
								if(err){
									console.log(err);
									callback(err);
								} else {
									callback(err, model);
								}
							}
						);
					} else {
						callback();
					}
				}
			}, function(err, results) {
				callback(err, results);
			});

		}
	};
};
