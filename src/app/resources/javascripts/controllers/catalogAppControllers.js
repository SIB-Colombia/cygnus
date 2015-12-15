'use strict';

angular.module('catalogHome')
	.controller('catalogHomeCtrl', ['$timeout', '$state', function($timeout, $state){

		this.init = function(data) {
			// Current user full name
			this.username = data;
		};

	}]);
