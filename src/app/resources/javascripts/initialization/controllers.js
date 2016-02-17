'use strict';

angular.module('catalogApp')
	//==============================================
	// Initialization controller
	//==============================================
	.controller('initController', ['$timeout', '$state', 'growlService', '$translate', '$window', 'appDataService', function($timeout, $state, growlService, $translate, $window, appDataService){

		// Default status of left sidebar always active = true (always true for width >= 1200px)
		this.layoutType = true;

		// By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
		this.sidebarToggle = {
			left: true,
			right: false
		};

		this.initSpecieDetail = function(data) {
			console.log("Initialization specie data");
			console.log(data);
			appDataService.specieDetail = data;

			// Set initial configuration for small screens
			if($window.innerWidth < 1200) {
				this.layoutType = false;
				this.sidebarToggle.left = false;
			}
		};

		this.specieDetail = function() {
			return appDataService.specieDetail;
		};

		this.init = function(data, validResultsByPage, defaultResultByPage, facets) {

			console.log("Initialization run");

			// Select a random image from available specie images
			for(var i = 0; i<data.hits.length; i++) {
				var imagen = null;
				if((typeof data.hits[i]._source.imagenesExternas !== 'undefined') || (typeof data.hits[i]._source.imagenes !== 'undefined')) {
					// This specie has external or local images for showing
					if(typeof data.hits[i]._source.imagenesExternas !== 'undefined') {
						// We have external images
						imagen = data.hits[i]._source.imagenesExternas[Math.floor(Math.random()*data.hits[i]._source.imagenesExternas.length)];
					} else {
						// We have local images
						imagen = data.hits[i]._source.imagenes[Math.floor(Math.random()*data.hits[i]._source.imagenes.length)];
					}
					data.hits[i]._source.selectedImage = {
						url: imagen.url,
						rightsHolder: ((imagen.rightsHolder !== 'undefined') && ((typeof imagen.rightsHolder) !== 'undefined'))?imagen.rightsHolder:null
					};
				} else {
					// Check kind of taxonomy for anonymous image
					//console.log(data.hits[i]);
					switch(data.hits[i]._source.taxonomia.reino.toLowerCase()) {
						case 'plantae':
							data.hits[i]._source.selectedImage = {
								url: '/images/taxonomy_generic/plantas.png',
								rightsHolder: null
							};
							break;
						case 'fungi':
							data.hits[i]._source.selectedImage = {
								url: '/images/taxonomy_generic/hongos.png',
								rightsHolder: null
							};
							break;
					}
					switch(data.hits[i]._source.taxonomia.clase.toLowerCase()) {
						case 'insecta':
							data.hits[i]._source.selectedImage = {
								url: '/images/taxonomy_generic/insectos.png',
								rightsHolder: null
							};
							break;
						case 'amphibia':
							data.hits[i]._source.selectedImage = {
								url: '/images/taxonomy_generic/anfibios.png',
								rightsHolder: null
							};
							break;
					}
				}
			}

			// Initial full data load
			appDataService.data.totalRegisters = data.total;
			appDataService.data.registersData = data.hits;
			appDataService.data.facets = facets.groups.buckets;

			// Set initial configuration for small screens
			if($window.innerWidth < 1200) {
				this.layoutType = false;
				this.sidebarToggle.left = false;
			}

			appDataService.resultsByPagesValues.values = validResultsByPage;
			appDataService.resultsByPagesValues.value = defaultResultByPage.toString();

			//Welcome Message
			$translate('welcomeMessage').then(function (welcomeMessage) {
				growlService.growl(welcomeMessage, 'inverse');
			});

		};

	}]);
