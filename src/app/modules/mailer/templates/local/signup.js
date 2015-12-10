'use strict';

exports = module.exports = function(service) {
	return {
		message: function(user, route, token) {
			return "<h1 style=\"font-family: 'Oswald' , 'Impact', sans-serif; font-size:4em; padding:0px margin:0px; line-height:1em; color:black; \" >THANK YOU FOR REGISTERING!</h1>" +
				'<p>' + 'Welcome to ' + service + ' ' + user.fullname + '!' + '</p>' +
				"<p>We're happy you joined to Catalogue of biodiversity. To complete the process and confirm your e-mail address:</p>" +
				"<p>Please follow " + '<a href="' + route + '?token=' + token + '">this link</a>' + ' to verify your account: ' + '</p>' +
				"&nbsp;" +
				"<p><strong>Catalogue of Biodiversity Team</strong></p>";
		},
		title: function() {
			return 'You signed up to Catalogue of Biodiversity! Please verify your email';
		}
	};
};
