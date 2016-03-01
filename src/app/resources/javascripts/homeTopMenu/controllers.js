'use strict';

angular.module('catalogApp')
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

	}]);
