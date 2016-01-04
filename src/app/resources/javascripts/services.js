'use strict';

angular.module('catalogHome')

	//==============================================
	// BOOTSTRAP GROWL
	//==============================================
	.service('growlService', function(){
		var gs = {};
		gs.growl = function(message, type) {
			$.notify({
				message: message
			},{
				type: 'pastel',
				allow_dismiss: false,
				newest_on_top: true,
				placement: {
					from: 'top',
					align: 'right'
				},
				delay: 2500,
				animate: {
					enter: 'animated bounceIn',
					exit: 'animated bounceOut'
				},
				offset: {
					x: 15,
					y: 85
				},
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
									'<span data-notify="title">{1}</span>' +
									'<span data-notify="message">{2}</span>' +
									'</div>'
			});
		};

		return gs;
	})
