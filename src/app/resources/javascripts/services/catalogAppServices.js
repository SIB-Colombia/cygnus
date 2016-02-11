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
				allow_dismiss: true,
				newest_on_top: true,
				mouse_over: 'pause',
				showProgressbar: false,
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
									'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
									'<span data-notify="icon"></span>' +
									'<span data-notify="title">{1}</span>' +
									'<span data-notify="message">{2}</span>' +
									'<div class="progress" data-notify="progressbar">' +
									'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
									'</div>' +
									'<a href="{3}" target="{4}" data-notify="url"></a>' +
									'</div>'
			});
		};

		return gs;
	})

	//==============================================
	// Application data
	//==============================================
	.service('appDataService', function(){
		this.data = {
			totalRegisters: 0,
			registersData: null,
			facets: null
		};

		this.resultsByPagesValues = {
			"type": "select",
			"name": "Results by page",
			"value": "10",
			"values": ["10", "20", "50", "100"]
		};

		this.orderDirection = {
			"type": "select",
			"name": "Order direction",
			"value": "asc",
			"values": ["asc", "desc"]
		};

		this.orderBy = {
			"type": "select",
			"name": "Order by element name",
			"value": "betterMatch",
			"values": ["betterMatch", "scientificName", "commonName"]
		};

		this.page = 1;

	});
