'use strict';

angular.module('catalogApp')
	//==============================================
	// Content zone controller
	//==============================================
	.controller('contentController', ['$timeout', '$state', 'appDataService', '$stateParams', 'SpecieFactory', '$sce', function($timeout, $state, appDataService, $stateParams, SpecieFactory, $sce){

		this.isSearchActive = false;
		this.searchText = $stateParams.q;
		this.currentPage = 1;
		this.itemsPerPage = 20;
		var sortType = null;

		if(typeof $stateParams.pagesize !== 'undefined') {
			appDataService.resultsByPagesValues.value = $stateParams.pagesize;
			this.itemsPerPage = $stateParams.pagesize;
		}
		if(typeof $stateParams.order !== 'undefined') {
			appDataService.orderDirection.value = $stateParams.order;
		}
		if(typeof $stateParams.sort !== 'undefined') {
			switch($stateParams.sort) {
				case 'betterMatch':
					sortType = null;
					break;
				case 'scientificName':
					sortType = 'taxonNombre';
					break;
				case 'commonName':
					sortType = 'listaNombresComunes';
					break;
			}
			appDataService.orderBy.value = $stateParams.sort;
		}
		if(typeof $stateParams.page !== 'undefined') {
			appDataService.page = parseInt($stateParams.page);
			this.currentPage = parseInt($stateParams.page);
		}

		//console.log($stateParams.q);
		//console.log(this.isSearchActive);

		if((typeof this.searchText !== 'undefined') || (typeof $stateParams.page !== 'undefined')) {
			if(typeof this.searchText !== 'undefined') {
				this.isSearchActive = true;
			}
			SpecieFactory.get({q:this.searchText, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, sort: sortType, order: appDataService.orderDirection.value, taxonomy: $stateParams.taxonomy, department: $stateParams.department, collection: $stateParams.collection}, function(data) {
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

					var foundText = '';
					for(var key in data.hits[i].highlight) {
						foundText = foundText+' ... '+data.hits[i].highlight[key];
					}
					foundText = foundText.replace(/<br>/g," ").substring(0,600)+'...';
					data.hits[i].foundText = $sce.trustAsHtml(foundText);

				}

				// New data load
				appDataService.data.totalRegisters = data.total;
				appDataService.data.registersData = data.hits;
			});

			// Get facets data
			SpecieFactory.get({q:this.searchText, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, sort: sortType, order: appDataService.orderDirection.value, taxonomy: $stateParams.taxonomy, department: $stateParams.department, collection: $stateParams.collection, facets: 'true'}, function(data) {
				appDataService.data.facets = data.groups.buckets;
			});
		}

		this.totalRegisters = function() {
			return appDataService.data.totalRegisters;
		};

		this.currentRegistersData = function() {
			return appDataService.data.registersData.length;
		};

		this.resultsByPagesValues = function() {
			return appDataService.resultsByPagesValues;
		};

		this.orderDirection = function() {
			return appDataService.orderDirection;
		};

		this.orderBy = function() {
			return appDataService.orderBy;
		};

		this.currentResults = function() {
			//console.log(appDataService.data.registersData);
			return appDataService.data.registersData;
		};

		// Select valid text to show in list view
		this.attributesResume = function(attributes) {
			var attributesResume = '';
			if(typeof attributes !== 'undefined') {
				if(typeof attributes.descripcionGeneral !== 'undefined') {
					attributesResume=attributesResume+attributes.descripcionGeneral.join(' ... ');
				}
				if(typeof attributes.descripcionTaxonomica !== 'undefined') {
					attributesResume=attributesResume+attributes.descripcionTaxonomica.join(' ... ');
				}
				if(typeof attributes.habitat !== 'undefined') {
					attributesResume=attributesResume+attributes.habitat.join(' ... ');
				}
				if(typeof attributes.ecologia !== 'undefined') {
					attributesResume=attributesResume+attributes.ecologia.join(' ... ');
				}
				if(typeof attributes.reproduccion !== 'undefined') {
					attributesResume=attributesResume+attributes.reproduccion.join(' ... ');
				}
			} else {
				return "Esta ficha no tiene detalles disponibles.";
			}
			attributesResume = attributesResume.replace(/<br>/g," ").substring(0,600)+'...';
			return $sce.trustAsHtml(attributesResume);
		};

		this.newSelectedPaginationSize = function() {
			$state.go('home', {q: this.searchText, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

		this.newSelectedOrderDirection = function() {
			$state.go('home', {q: this.searchText, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

		this.newSelectedOrderBy = function() {
			$state.go('home', {q: this.searchText, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

		this.changePage = function() {
			$state.go('home', {q: this.searchText, page: this.currentPage, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

	}]);
