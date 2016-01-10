'use strict';

angular.module('catalogHome')
	.controller('catalogHomeCtrl', ['$timeout', '$state', 'growlService', '$translate', '$window', function($timeout, $state, growlService, $translate, $window){

		this.isSearchActive = false;
		this.searchCondition = '';

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
			// Current user full name
			this.totalRegisters = data.total;
			this.registersData = data.hits;

			if($window.innerWidth < 1200) {
				this.layoutType = false;
				this.sidebarToggle.left = false;
			}
		};

		this.selectRandomImage = function(images) {

		};

	}]);
