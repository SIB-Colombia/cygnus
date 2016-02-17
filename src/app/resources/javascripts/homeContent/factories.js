'use strict';

angular.module('catalogApp')

	// =========================================================================
	// Acces to catalog of biodiversity api
	// =========================================================================
	.factory('SpecieFactory', ['$resource', function($resource){
		//return $resource("http://54.172.124.188:4000/api/fichas/search", {q:'@q', pagesize:'@pagesize', page:'@page', order:'@order', sort:'@sort', taxonomy:'@taxonomy', department:'@department', collection:'@collection', facets:'@facets'});
		return $resource("http://localhost:4000/api/fichas/search", {q:'@q', pagesize:'@pagesize', page:'@page', order:'@order', sort:'@sort', taxonomy:'@taxonomy', department:'@department', collection:'@collection', facets:'@facets'});
	}]);
