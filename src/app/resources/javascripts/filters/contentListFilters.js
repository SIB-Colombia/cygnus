'use strict';

angular.module('catalogHome')

	.filter('fixCommonNames', ['appDataService', function(appDataService) {
		return function(commonNames) {
			if(typeof commonNames !== 'undefined')
				return commonNames.join(', ');
		};
	}]);
