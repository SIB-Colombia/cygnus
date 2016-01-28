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
			$state.go('home', {q: this.searchText, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection, sort: appDataService.orderBy.value});
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
	// Content zone controller
	//==============================================
	.controller('contentController', ['$timeout', '$state', 'appDataService', '$stateParams', function($timeout, $state, appDataService, $stateParams){

		this.isSearchActive = false;
		this.searchText = $stateParams.q;

		if(typeof $stateParams.pagesize !== 'undefined') {
			appDataService.resultsByPagesValues.value = $stateParams.pagesize;
		}
		if(typeof $stateParams.order !== 'undefined') {
			appDataService.orderDirection.value = $stateParams.order;
		}
		if(typeof $stateParams.sort !== 'undefined') {
			appDataService.orderBy.value = $stateParams.sort;
		}

		//console.log($stateParams.q);
		//console.log(this.isSearchActive);

		if(typeof this.searchText !== 'undefined') {
			this.isSearchActive = true;
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
		}

		this.newSelectedPaginationSize = function() {
			$state.go('home', {q: this.searchText, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

		this.newSelectedOrderDirection = function() {
			$state.go('home', {q: this.searchText, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

		this.newSelectedOrderBy = function() {
			$state.go('home', {q: this.searchText, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value});
		};

	}]);
