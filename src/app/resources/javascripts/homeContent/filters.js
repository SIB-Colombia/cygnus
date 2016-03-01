'use strict';

angular.module('catalogApp')

	.filter('fixCommonNames', ['appDataService', function(appDataService) {
		return function(commonNames) {
			if(typeof commonNames !== 'undefined') {
				return commonNames.join(', ');
			}
		};
	}]);
