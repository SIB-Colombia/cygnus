'use strict';

angular.module('catalogHome')
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

		/* Translation provider configuration */
		// Static language translation files
		$translateProvider.useStaticFilesLoader({
			prefix: '/locales/',
			suffix: '.json'
		});
		// Default language
		$translateProvider.preferredLanguage('es');
		// remember language
		$translateProvider.useLocalStorage();
		// Sanitize translation text
		$translateProvider.useSanitizeValueStrategy('sanitize');

		$urlRouterProvider.otherwise("/");

		$locationProvider.html5Mode(true).hashPrefix('');

		$stateProvider

		//------------------------------
		// HOME
		//------------------------------

		.state('home', {
			url: '/?q&pagesize',
			views: {
				'header': {
					templateUrl: '/templates/header.html',
					controller: 'headerController as hCtrl'
				},
				'topNavigation': {
					templateUrl: '/templates/topNavigation.html',
					controller: 'topMenuController as topMenuCtrl'
				},
				'footer': {
					templateUrl: '/templates/footer.html'
				},
				'filterSideMenu': {
					templateUrl: '/templates/filterMenu.html'
				},
				'content': {
					templateUrl: '/templates/contentHome.html',
					controller: 'contentController as contentCtrl'
				}
			}
		});
	}]);
