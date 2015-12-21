'use strict';

angular.module('catalogHome')
	.controller('catalogHomeCtrl', ['$timeout', '$state', function($timeout, $state){

		this.isSearchActive = false;
		this.searchCondition = '';

		// Default status of left sidebar always active = true
		this.layoutType = true;

		// Status of left sidebar active = true
		this.sidebarToggle = true;

		this.init = function(data) {
			// Current user full name
			this.totalRegisters = data.total;
			this.registersData = data.hits;
		};

		this.selectRandomImage = function(images) {

		};

	}]);
