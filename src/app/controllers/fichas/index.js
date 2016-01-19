'use strict';

/**
 * Resolves URL /
 * @param  {Object} Request params
 * @param  {Object} Response params
 */
var async = require('async');
var request = require('request');

exports.show = function() {
	return function(req, res) {
		var registerID = req.params._id;

		async.waterfall([
				function(callback) {
					request({
						url: 'http://www.biodiversidad.co:3000/index.php/api/ficha/'+registerID,
						method: 'GET',
						json: true
					}, function(error, response, body) {
						if (!error && response.statusCode === 200) {
							callback(error, body);
						} else {
							res.send(body);
						}
					});
				},
				function(arg1, callback) {
					var result = JSON.parse(arg1.replace(/^\s+|\s+$/g, ''));
					result[registerID].currentImages = [];
					request({
						url: 'http://www.biodiversidad.co:3000/index.php/api/external_images?taxon_nombre='+encodeURIComponent(result[registerID].info_taxonomica.taxonnombre),
						method: 'GET',
						json: true
					}, function(error, response, body) {
						if (!error && response.statusCode === 200) {
							if(body.length > 0) {
								for (var i = 0; i < body.length; i++) {
									result[registerID].currentImages[i] = {};
									result[registerID].currentImages[i].imageURL = body[i].imageurl;
									result[registerID].currentImages[i].imageLicense = body[i].imagelicense;
									result[registerID].currentImages[i].imageRights = body[i].imagerights;
									result[registerID].currentImages[i].imageSource = body[i].imagesource;
									result[registerID].currentImages[i].imageRightsHolder = body[i].imagerightsholder;
									result[registerID].currentImages[i].imageExternal = true;
								}
							}
							callback(null, result);
						} else {
							callback(error, result);
						}
					});
				}
			], function(err, result) {

					if(err) {
						res.send(err);
					}

					var metaTagOgImage;
					if (typeof result[registerID].atributos !== "undefined" && typeof result[registerID].atributos.imagenThumb270 !== "undefined") {
						for( var i = 0; i < result[registerID].atributos.imagenThumb270.length; i++) {
							result[registerID].currentImages[result[registerID].currentImages.length] = {};
							result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = result[registerID].atributos.imagenThumb270[i];
						}
					} else if (typeof result[registerID].atributos !== "undefined" && typeof result[registerID].atributos.imagenThumb140 !== "undefined") {
							for( var i = 0; i < result[registerID].atributos.imagenThumb140.length; i++) {
								result[registerID].currentImages[result[registerID].currentImages.length] = {};
								result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = result[registerID].atributos.imagenThumb140[i];
							}
					} else {
						if(result[registerID].currentImages.length < 1){
							if(typeof result[registerID].reino != "undefined") {
								if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "aves") {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
		          					result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/aves.png";
								} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "reptilia") {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/reptiles.png";
								} else if(result[registerID].reino.toLowerCase() == "animalia" && (result[registerID].clase.toLowerCase() == "mammalia" || result[registerID].clase.toLowerCase() == "mamalia")) {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/mamiferos.png";
								} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "insecta") {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/insectos.png";
								} else if(result[registerID].reino.toLowerCase() == "plantae") {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/plantas.png";
								} else if(result[registerID].reino.toLowerCase() == "fungi") {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/hongos.png";
								} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "amphibia") {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/anfibios.png";
								} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].phylum.toLowerCase() == "mollusca") {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/moluscos.png";
								} else {
									result[registerID].currentImages[result[registerID].currentImages.length] = {};
									result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = "/images/taxon_icons/vida.png";
								}
							}
						}
					}

					res.setHeader('Cache-Control', 'public, max-age=2592000000');
					res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
					res.render('show', { data: result[registerID], data2: JSON.stringify(result[registerID]), metaImageOg: metaTagOgImage, registerURL: "http://www.biodiversidad.co/ficha/id/"+registerID, ogTitle: result[registerID].info_taxonomica.taxonnombre } );
			});
	};
};
