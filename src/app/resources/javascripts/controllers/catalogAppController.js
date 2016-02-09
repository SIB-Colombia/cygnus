'use strict';

angular.module('catalogHome')
	//==============================================
	// Initialization controller
	//==============================================
	.controller('initController', ['$timeout', '$state', 'growlService', '$translate', '$window', 'appDataService', function($timeout, $state, growlService, $translate, $window, appDataService){

		// Default status of left sidebar always active = true (always true for width >= 1200px)
		this.layoutType = true;

		//Welcome Message
		$translate('welcomeMessage').then(function (welcomeMessage) {
			growlService.growl(welcomeMessage, 'inverse');
		});

		// By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
		this.sidebarToggle = {
			left: true,
			right: false
		};

		this.init = function(data, validResultsByPage, defaultResultByPage) {

			console.log("Initialization run");

			// Select a random image from available specie images
			for(var i = 0; i<data.hits.length; i++) {
				var imagen = null;
				if((typeof data.hits[i]._source.imagenesExternas !== 'undefined') || (typeof data.hits[i]._source.imagenes !== 'undefined')) {
					// This specie has external or local images for showing
					if(typeof data.hits[i]._source.imagenesExternas !== 'undefined') {
						// We have external images
						var imagen = data.hits[i]._source.imagenesExternas[Math.floor(Math.random()*data.hits[i]._source.imagenesExternas.length)];
					} else {
						// We have local images
						var imagen = data.hits[i]._source.imagenes[Math.floor(Math.random()*data.hits[i]._source.imagenes.length)];
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

			// Set initial configuration for small screens
			if($window.innerWidth < 1200) {
				this.layoutType = false;
				this.sidebarToggle.left = false;
			}

			appDataService.resultsByPagesValues.values = validResultsByPage;
			appDataService.resultsByPagesValues.value = defaultResultByPage.toString();

		};

	}])

	//==============================================
	// Header controller
	//==============================================
	.controller('headerController', ['$timeout', '$state', '$stateParams', 'appDataService', function($timeout, $state, $stateParams, appDataService){

		this.searchText = $stateParams.q;

		//$scope.state = $state.current;
		//$scope.params = $stateParams;

		//Fullscreen View
		this.fullScreen = function() {
			//Launch
			function launchIntoFullscreen(element) {
				if(element.requestFullscreen) {
					element.requestFullscreen();
				} else if(element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if(element.webkitRequestFullscreen) {
					element.webkitRequestFullscreen();
				} else if(element.msRequestFullscreen) {
					element.msRequestFullscreen();
				}
			}

			//Exit
			function exitFullscreen() {
				if(document.exitFullscreen) {
					document.exitFullscreen();
				} else if(document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if(document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
			}

			if (exitFullscreen()) {
				launchIntoFullscreen(document.documentElement);
			} else {
				launchIntoFullscreen(document.documentElement);
			}
		};

		// Search form submit
		this.onSearchFormSubmit = function() {
			$state.go('home', {q: this.searchText, page: 1, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

	}])

	//==============================================
	// Top menu controller
	//==============================================
	.controller('topMenuController', ['$timeout', '$state', 'appDataService', function($timeout, $state, appDataService){
		this.totalRegisters = function() {
			return appDataService.data.totalRegisters;
		};

		this.currentRegistersData = function() {
			return appDataService.data.registersData.length;
		};

	}])

	//==============================================
	// Filter menu controller
	//==============================================
	.controller('filterMenuController', ['$timeout', '$state', 'appDataService', '$stateParams', function($timeout, $state, appDataService, $stateParams){
		this.selectedFilters = [];

		if(typeof $stateParams.q !== 'undefined') {
			this.selectedFilters.push({
				value: $stateParams.q,
				type: "search"
			});
		}

		this.taxonomyFilters = [];
		if(typeof $stateParams.taxonomy !== 'undefined') {
			if(typeof $stateParams.taxonomy === 'string') {
				this.taxonomyFilters.push($stateParams.taxonomy);
				this.selectedFilters.push({
					value: $stateParams.taxonomy,
					type: "taxonomy"
				});
			} else {
				this.taxonomyFilters = $stateParams.taxonomy;
				for(var i = 0; i<$stateParams.taxonomy.length; i++) {
					this.selectedFilters.push({
						value: $stateParams.taxonomy[i],
						type: "taxonomy"
					});
				}
			}
		}
		this.departmentFilters = [];
		if(typeof $stateParams.department !== 'undefined') {
			if(typeof $stateParams.department === 'string') {
				this.departmentFilters.push($stateParams.department);
				this.selectedFilters.push({
					value: $stateParams.department,
					type: "department"
				});
			} else {
				this.departmentFilters = $stateParams.department;
				for(var i = 0; i<$stateParams.department.length; i++) {
					this.selectedFilters.push({
						value: $stateParams.department[i],
						type: "department"
					});
				}
			}
		}
		this.collectionFilters = [];
		if(typeof $stateParams.collection !== 'undefined') {
			if(typeof $stateParams.collection === 'string') {
				this.collectionFilters.push($stateParams.collection);
				this.selectedFilters.push({
					value: $stateParams.collection,
					type: "collection"
				});
			} else {
				this.collectionFilters = $stateParams.collection;
				for(var i = 0; i<$stateParams.collection.length; i++) {
					this.selectedFilters.push({
						value: $stateParams.collection[i],
						type: "collection"
					});
				}
			}
		}

		this.totalRegisters = function() {
			return appDataService.data.totalRegisters;
		};

		this.currentRegistersData = function() {
			return appDataService.data.registersData.length;
		};

		this.newFilterSelection = function() {
			$state.go('home', {q: $stateParams.q, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value, taxonomy: this.taxonomyFilters, department: this.departmentFilters, collection: this.collectionFilters});
		};

		this.removeFilterFromTags = function(tag, type) {
			switch(type) {
				case 'taxonomy':
					var index = this.taxonomyFilters.indexOf(tag);
					this.taxonomyFilters.splice(index,1);
					break;
				case 'department':
					var index = this.departmentFilters.indexOf(tag);
					this.departmentFilters.splice(index,1);
					break;
				case 'collection':
					var index = this.collectionFilters.indexOf(tag);
					this.collectionFilters.splice(index,1);
					break;
				case 'search':
					$stateParams.q = null;
					break;
			}
			$state.go('home', {q: $stateParams.q, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value, taxonomy: this.taxonomyFilters, department: this.departmentFilters, collection: this.collectionFilters});
		}

	}])

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
							var imagen = data.hits[i]._source.imagenesExternas[Math.floor(Math.random()*data.hits[i]._source.imagenesExternas.length)];
						} else {
							// We have local images
							var imagen = data.hits[i]._source.imagenes[Math.floor(Math.random()*data.hits[i]._source.imagenes.length)];
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
		}

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
