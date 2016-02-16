'use strict';

angular.module('catalogApp')
	//==============================================
	// Filter menu controller
	//==============================================
	.controller('filterMenuController', ['$timeout', '$state', 'appDataService', '$stateParams', function($timeout, $state, appDataService, $stateParams){
		this.selectedFilters = [];

		if(typeof $stateParams.q !== 'undefined') {
			this.selectedFilters.push({
				value: $stateParams.q,
				type: "search"
			});
		}

		this.taxonomyFilters = [];
		if(typeof $stateParams.taxonomy !== 'undefined') {
			if(typeof $stateParams.taxonomy === 'string') {
				this.taxonomyFilters.push($stateParams.taxonomy);
				this.selectedFilters.push({
					value: $stateParams.taxonomy,
					type: "taxonomy"
				});
			} else {
				this.taxonomyFilters = $stateParams.taxonomy;
				for(var i = 0; i<$stateParams.taxonomy.length; i++) {
					this.selectedFilters.push({
						value: $stateParams.taxonomy[i],
						type: "taxonomy"
					});
				}
			}
		}
		this.departmentFilters = [];
		if(typeof $stateParams.department !== 'undefined') {
			if(typeof $stateParams.department === 'string') {
				this.departmentFilters.push($stateParams.department);
				this.selectedFilters.push({
					value: $stateParams.department,
					type: "department"
				});
			} else {
				this.departmentFilters = $stateParams.department;
				for(var i = 0; i<$stateParams.department.length; i++) {
					this.selectedFilters.push({
						value: $stateParams.department[i],
						type: "department"
					});
				}
			}
		}
		this.collectionFilters = [];
		if(typeof $stateParams.collection !== 'undefined') {
			if(typeof $stateParams.collection === 'string') {
				this.collectionFilters.push($stateParams.collection);
				this.selectedFilters.push({
					value: $stateParams.collection,
					type: "collection"
				});
			} else {
				this.collectionFilters = $stateParams.collection;
				for(var i = 0; i<$stateParams.collection.length; i++) {
					this.selectedFilters.push({
						value: $stateParams.collection[i],
						type: "collection"
					});
				}
			}
		}

		this.totalRegisters = function() {
			return appDataService.data.totalRegisters;
		};

		this.currentRegistersData = function() {
			return appDataService.data.registersData.length;
		};

		this.newFilterSelection = function() {
			$state.go('home', {q: $stateParams.q, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value, taxonomy: this.taxonomyFilters, department: this.departmentFilters, collection: this.collectionFilters});
		};

		this.removeFilterFromTags = function(tag, type) {
			switch(type) {
				case 'taxonomy':
					var index = this.taxonomyFilters.indexOf(tag);
					this.taxonomyFilters.splice(index,1);
					break;
				case 'department':
					var index = this.departmentFilters.indexOf(tag);
					this.departmentFilters.splice(index,1);
					break;
				case 'collection':
					var index = this.collectionFilters.indexOf(tag);
					this.collectionFilters.splice(index,1);
					break;
				case 'search':
					$stateParams.q = null;
					break;
			}
			$state.go('home', {q: $stateParams.q, page: appDataService.page, pagesize: appDataService.resultsByPagesValues.value, order: appDataService.orderDirection.value, sort: appDataService.orderBy.value, taxonomy: this.taxonomyFilters, department: this.departmentFilters, collection: this.collectionFilters});
		};

		this.getFacetsData = function() {
			console.log(appDataService.data.facets);
			return appDataService.data.facets;
		};

	}]);
