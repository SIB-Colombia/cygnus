'use strict';

angular.module('catalogApp')
	//==============================================
	// Content zone controller
	//==============================================
	.controller('specieDetailController', ['$timeout', '$state', 'appDataService', function($timeout, $state, appDataService){

		this.specieDetail = function() {
			return appDataService.specieDetail;
		};

	}]);
