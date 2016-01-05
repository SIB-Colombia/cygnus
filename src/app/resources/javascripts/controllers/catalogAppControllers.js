'use strict';

angular.module('catalogHome')
	.controller('catalogHomeCtrl', ['$timeout', '$state', 'growlService', '$translate', function($timeout, $state, growlService, $translate){

		this.isSearchActive = false;
		this.searchCondition = '';

		// Default status of left sidebar always active = true
		this.layoutType = true;

		//Welcome Message
		$translate('welcomeMessage').then(function (welcomeMessage) {
			growlService.growl(welcomeMessage, 'inverse');
		});

		// By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
		this.sidebarToggle = {
			left: false,
			right: false
		};

		this.init = function(data) {
			// Current user full name
			this.totalRegisters = data.total;
			this.registersData = data.hits;
		};

		this.selectRandomImage = function(images) {

		};

	}]);
