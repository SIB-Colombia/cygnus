'use strict';

angular.module('catalogHome')

	.directive('changeLayout', function(){
		return {
			restrict: 'A',
			scope: {
				changeLayout: '='
			},

			link: function(scope, element, attr) {

				//Default State
				if(scope.changeLayout === '1') {
					element.prop('checked', true);
				}

				//Change State
				element.on('change', function(){
					if(element.is(':checked')) {
						localStorage.setItem('ma-layout-status', 1);
						scope.$apply(function(){
							scope.changeLayout = '1';
						});
					}
					else {
						localStorage.setItem('ma-layout-status', 0);
						scope.$apply(function(){
							scope.changeLayout = '0';
						});
					}
				});
			}
		};
	})

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

			link: function(scope, element, attr) {
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

	})

	// =========================================================================
	// SUBMENU TOGGLE
	// =========================================================================

	.directive('toggleSubmenu', function(){

		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.click(function(){
					element.next().slideToggle(200);
					element.parent().toggleClass('toggled');
				});
			}
		};
	})

	// =========================================================================
	// SUBMENU TOGGLE
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
	// FILTER TOGGLE
	// =========================================================================
	.directive('toggleFilter', function(){
		return {
			restrict: 'A',
			scope: {
				groupName: '=',
				departmentName: '=',
				collectionName: '=',
				type: '=',
				taxonomyFilters: '=',
				departmentFilters: '=',
				collectionFilters: '=',
				selectedFilters: '='
			},
			link: function(scope, element, attrs) {
				element.on('click', function() {
					if(element.hasClass('selected')) {
						switch(scope.type) {
							case 'taxonomy':
								var index = scope.taxonomyFilters.indexOf(scope.groupName);
								scope.taxonomyFilters.splice(index,1);
								break;
							case 'department':
								var index = scope.departmentFilters.indexOf(scope.departmentName);
								scope.departmentFilters.splice(index,1);
								break;
							case 'collection':
								var index = scope.collectionFilters.indexOf(scope.collectionName);
								scope.collectionFilters.splice(index,1);
								break;
						}

						scope.selectedFilters.splice(index,1);
					} else {
						switch(scope.type) {
							case 'taxonomy':
								scope.taxonomyFilters.push(scope.groupName);
								break;
							case 'department':
								scope.departmentFilters.push(scope.departmentName);
								break;
							case 'collection':
								scope.collectionFilters.push(scope.collectionName);
								break;
						}
					}
					element.toggleClass('selected');
				});
			}
		};
	});
