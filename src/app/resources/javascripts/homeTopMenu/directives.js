'use strict';

angular.module('catalogApp')
	// =========================================================================
	// MAINMENU COLLAPSE
	// =========================================================================

	.directive('toggleSidebar', function(){

		return {
			restrict: 'A',
			scope: {
				modelLeft: '=',
				modelRight: '=',
				modelLayoutType: '='
			},

			link: function(scope, element) {
				element.on('click', function(){

					if (element.data('target') === 'mainmenu') {
						if (scope.modelLayoutType === true && scope.modelLeft === true) {
							scope.$apply(function(){
								scope.modelLayoutType = false;
								scope.modelLeft = false;
							});
						} else if (scope.modelLayoutType === false && scope.modelLeft === false) {
							scope.$apply(function(){
								scope.modelLayoutType = true;
								scope.modelLeft = true;
							});
						}
					}

					// Future chat sidebar
					/*if (element.data('target') === 'chat') {
						if (scope.modelRight === false) {
							scope.$apply(function(){
								scope.modelRight = true;
							})
						}
						else {
							scope.$apply(function(){
								scope.modelRight = false;
							})
						}
					}*/

				});
			}
		};

	});
