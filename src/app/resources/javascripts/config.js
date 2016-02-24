'use strict';

angular.module('catalogApp')
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
		//$translateProvider.useSanitizeValueStrategy('sanitize');

		$urlRouterProvider.otherwise("/");

		$locationProvider.html5Mode(true).hashPrefix('');

		$stateProvider

		//------------------------------
		// HOME
		//------------------------------

		.state('home', {
			url: '/?q&pagesize&sort&order&page&taxonomy&department&collection',
			views: {
				'@': {
					templateUrl: '/templates/home.html'
				},
				'header@home': {
					templateUrl: '/templates/header.html',
					controller: 'headerController as hCtrl'
				},
				'topNavigation@home': {
					templateUrl: '/templates/topNavigation.html',
					controller: 'topMenuController as topMenuCtrl'
				},
				'footer@home': {
					templateUrl: '/templates/footer.html'
				},
				'filterSideMenu@home': {
					templateUrl: '/templates/filterMenu.html',
					controller: 'filterMenuController as filterMenuCtrl'
				},
				'content@home': {
					templateUrl: '/templates/contentHome.html',
					controller: 'contentController as contentCtrl'
				}
			}
		})

		.state('details', {
			url: '/fichas/:specieId',
			views: {
				'@': {
					templateUrl: '/templates/homeSpecieDetail.html'
				},
				'header@details': {
					templateUrl: '/templates/headerSpecieDetail.html',
					controller: 'headerDetailController as headerDetailCtrl'
				},
				'topNavigation@details': {
					templateUrl: '/templates/topNavigationSpecieDetail.html',
					controller: 'topMenuController as topMenuCtrl'
				},
				'specieDetailSideMenu@details': {
					templateUrl: '/templates/sideMenuSpecieDetail.html'
				},
				'specieDetailContent@details': {
					templateUrl: '/templates/contentSpecieDetail.html',
					controller: 'specieDetailController as specieDetailCtrl'
				},
				'footer@details': {
					templateUrl: '/templates/footer.html'
				}
			}
		})

		.state('terms', {
			url: '/terms',
			views: {
				'@': {
					templateUrl: '/templates/homeTerms.html'
				},
				'header@terms': {
					templateUrl: '/templates/headerSpecieDetail.html',
					controller: 'headerDetailController as headerDetailCtrl'
				},
				'termsContent@terms': {
					templateUrl: '/templates/termsContent.html'
				},
				'footer@terms': {
					templateUrl: '/templates/footer.html'
				}
			}
		});

	}]);
