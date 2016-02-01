'use strict';

angular.module('catalogHome')

	// =========================================================================
	// Acces to catalog of biodiversity api
	// =========================================================================
	.factory('SpecieFactory', ['$resource', function($resource){
		return $resource("http://localhost:4000/api/fichas/search", {q:'@q', pagesize:'@pagesize', page:'@page', order:'@order', sort:'@sort'});
	}]);
