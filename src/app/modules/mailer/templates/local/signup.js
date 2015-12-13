'use strict';

exports = module.exports = function(service) {
	return {
		message: function(user, route, token) {
			return "<link href='https://fonts.googleapis.com/css?family=Oswald:400,700' rel='stylesheet' type='text/css'>" +
				"<div style=\"background:white url('http://http://52.32.172.44/images/images/bg1.jpg'); padding:60px; font-family: sans-serif\">" +
				"<div style=\"background:white; border:solid 1px #fbfbfb; border-radius:20px; padding:30px; color:#666; \">" +
				"<h1 style=\"font-family: 'Oswald' , 'Impact', sans-serif; font-size:4em; padding:0px margin:0px; line-height:1em; color:black; \" >THANK YOU FOR REGISTERING!</h1>" +
				'<p>' + 'Welcome to ' + service + ' ' + user.fullname + '!' + '</p>' +
				"<p>We're happy you joined the GEOBON community. To complete the process and confirm your e-mail address:</p>" +
				"<p>Please follow " + '<a href="' + route + '?token=' + token + '">this link</a>' + ' to verify your account: ' + '</p>' +
				"&nbsp;" +
				"<p><strong>The GEO BON Team</strong></p>" +
				"<div style=\"border-top:#ddd 1px solid; margin: 35px 0;\"></div>" +
				"<p style=\"font-size:0.8em; color:#aaa;\" >Questions and comments? Write us back at <a href=\"mailto:info@geobon.org\" style=\"color:#49aeb7; text-decoration:none;\">info@geobon.org </a></p>" +
				"</div>" +
				"</div>";
		},
		title: function() {
			return 'You signed up to bon in a box service! Please verify your email';
		}
	};
};
