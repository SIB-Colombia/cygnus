'use strict';

angular.module('sweetalert', [])
	.factory('swal', function() {
		return window.swal; //Underscore must already be loaded on the page
	});
