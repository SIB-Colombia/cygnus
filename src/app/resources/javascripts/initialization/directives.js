'use strict';

angular.module('catalogApp')

	.directive('changeLayout', function(){
		return {
			restrict: 'A',
			scope: {
				changeLayout: '='
			},

			link: function(scope, element) {

				//Default State
				if(scope.changeLayout === '1') {
					element.prop('checked', true);
				}

				//Change State
				element.on('change', function(){
					if(element.is(':checked')) {
						scope.$apply(function(){
							scope.changeLayout = '1';
						});
					}
					else {
						scope.$apply(function(){
							scope.changeLayout = '0';
						});
					}
				});
			}
		};
	})

	// =========================================================================
	// AFFIX CONFIGURATION
	// =========================================================================
	.directive('enableAffix', function(){
		return {
			restrict: 'A',
			link: function(scope, element) {
				element.affix({
					offset: {
						top: 450
					}
				});
			}
		};
	})

	// =========================================================================
	// AFFIX CONFIGURATION
	// =========================================================================
	.directive('enableAffixSpecieDetail', function(){
		return {
			restrict: 'A',
			link: function(scope, element) {
				element.affix({
					offset: {
						top: 81
					}
				});
			}
		};
	});
