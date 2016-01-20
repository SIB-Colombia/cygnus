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

		this.init = function(data) {
			// Initial full data load
			appDataService.data.totalRegisters = data.total;
			appDataService.data.registersData = data.hits;

			// Set initial configuration for small screens
			if($window.innerWidth < 1200) {
				this.layoutType = false;
				this.sidebarToggle.left = false;
			}
		};

	}])

	//==============================================
	// Header controller
	//==============================================
	.controller('headerController', ['$timeout', '$state', function($timeout, $state){

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

	}])

	//==============================================
	// Content zone controller
	//==============================================
	.controller('contentController', ['$timeout', '$state', 'appDataService', function($timeout, $state, appDataService){

		this.isSearchActive = false;
		this.searchCondition = '';

		this.totalRegisters = function() {
			return appDataService.data.totalRegisters;
		};

		this.currentRegistersData = function() {
			return appDataService.data.registersData.length;
		};

		this.onSearchFormSubmit = function() {
			console.log("sopas");
			$state.go('home', {q: this.searchCondition});
		};

	}]);
