'use strict';

angular.module('catalogHome')
	.controller('catalogHomeCtrl', ['$timeout', '$state', function($timeout, $state){

		this.isSearchActive = false;
		this.searchCondition = '';

		this.init = function(data) {
			// Current user full name
			this.totalRegisters = data.total;
			this.registersData = data.hits;
		};

		this.selectRandomImage = function(images) {

		};

	}]);
