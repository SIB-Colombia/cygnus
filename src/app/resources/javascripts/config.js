'use strict';

angular.module('catalogHome')
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise("/");

		$locationProvider.html5Mode(true).hashPrefix('');

		$stateProvider

		//------------------------------
		// HOME
		//------------------------------

		.state('home', {
			url: '/',
			templateUrl: '/templates/home.html',
			views: {
				'header': {
					templateUrl: '/templates/header.html',
					controller: 'headerCtrl as hCtrl'
				},
				'footer': {
					templateUrl: '/templates/footer.html'
				}
			}
		});
	}]);
