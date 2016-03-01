'use strict';

angular.module('catalogApp')
	// =========================================================================
	// START PHOTO SLIDER
	// =========================================================================
	.directive('enablePhotoSlider', ['$timeout', function (timer) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				element.ready(function(){
					var sliderStart = function () {
						$(".rslides").photoGallery({
							timeout: 10000,
							speed: 3000,
							pager: true,
							random: true,
							pause: true
						});
					};

					timer(sliderStart, 0);
				});
			}
		};
	}])

	// =========================================================================
	// AFFIX CONFIGURATION
	// =========================================================================
	.directive('enableAffixHeader', function(){
		return {
			restrict: 'A',
			link: function(scope, element) {
				element.affix({
					offset: {
						top: 0
					}
				});
			}
		};
	});
