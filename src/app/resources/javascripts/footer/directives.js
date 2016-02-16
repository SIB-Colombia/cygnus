'use strict';

angular.module('catalogApp')
	// =========================================================================
	// PARTNERS TOGGLE
	// =========================================================================
	.directive('togglePartners', function(){

		return {
			restrict: 'A',
			link: function(scope, element) {
				element.click(function(){
					angular.element('#modal-terminos').removeClass("display-footer-modal");
					angular.element('#modal-socios').toggleClass("display-footer-modal");
				});
			}
		};
	})

	// =========================================================================
	// TERMS TOGGLE
	// =========================================================================
	.directive('toggleTerms', function(){

		return {
			restrict: 'A',
			link: function(scope, element) {
				element.click(function(){
					angular.element('#modal-socios').removeClass("display-footer-modal");
					angular.element('#modal-terminos').toggleClass("display-footer-modal");
				});
			}
		};
	});
