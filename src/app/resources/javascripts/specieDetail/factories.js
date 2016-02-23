'use strict';

angular.module('catalogApp')

	// =========================================================================
	// Acces map explorer api
	// =========================================================================
	.factory('MapData', ['$http', '$resource', 'appDataService', function($http, $resource, appDataService){
		//return $resource("http://maps.sibcolombia.net/rest/occurrences/mappoints", {originisocountrycode:'@originisocountrycode', scientificname:'@scientificname'});
		return {
			mapData: function(){
				return $http.jsonp("http://maps.sibcolombia.net/rest/occurrences/mappoints?originisocountrycode=CO&scientificname="+ encodeURIComponent(appDataService.specieDetail.taxonNombre)+"&callback=JSON_CALLBACK");
			}
		};
	}]);
