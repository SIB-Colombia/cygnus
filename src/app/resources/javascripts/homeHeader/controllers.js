'use strict';

angular.module('catalogApp')
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

	}]);
