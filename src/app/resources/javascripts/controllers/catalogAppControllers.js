'use strict';

angular.module('catalogHome')
	.controller('catalogHomeCtrl', ['$timeout', '$state', function($timeout, $state){

		this.isSearchActive = false;
		this.searchCondition = '';

		// Default status of left sidebar always active = true
		this.layoutType = true;

		//Welcome Message
		growlService.growl('Bienvenido al catálogo de la biodiversidad', 'inverse');

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
