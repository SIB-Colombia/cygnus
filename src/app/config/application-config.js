'use strict';

// dependencies
//var convict = require('convict');
//var util = require('util');
//var debug = require('debug')('bon-in-a-box-frontend:configuration');
//var validator = require('validator');

// catch all error without handler
/*process.on('uncaughtException', function(error) {
	debug('Caught exception without specific handler: ' + util.inspect(error));
	debug(error.stack, 'error');
	process.exit(1);
});

var config = module.exports = convict({
	env: {
		doc: 'Application environment.',
		format: ['production', 'development'],
		default: 'development',
		env: 'NODE_ENV'
	},
	service: {
		name: {
			doc: 'The name of your service/platform.',
			default: 'Bon in a box',
			env: 'SERVICE_NAME'
		}
	},
	session: {
		key: {
			doc: 'Session key',
			default: 'application.sid',
			env: 'SESSION_KEY'
		}
	},
	locales: {
		doc: 'List of valid languages',
		default: ['es', 'pt', 'en'],
		env: 'LANGUAGES'
	},
	initialeDefault: {
		doc: 'Default language',
		default: 'en',
		env: 'LANGUAGE_DEFAULT'
	},
	logs: {
		doc: 'Log save location',
		default: 'logs/dataportal-explorer.log',
		env: 'LOG'
	},
	server: {
		port: {
			doc: 'The server port to bind.',
			format: 'port',
			default: 8000,
			env: 'PORT'
		},
		secret: {
			doc: 'The application secret (sessions).',
			format: function(val) {
				if (!validator.isLength(val, 10)) {
					_throw(new Error('Application secret must be at least 10 characters'));
				}
			},
			default: 'temporalsecret',
			env: 'APPSECRET'
		}
	},
	client: {
		api: {
			path: {
				doc: 'The client api url path (relative)',
				default: '/api',
				env: 'CLIENT_API_PATH'
			}
		},
		domain: {
			doc: 'The client domain (hostname)',
			default: 'localhost',
			env: 'CLIENT_DOMAIN'
		}
	},
	mandrill: {
		api: {
			key: {
				doc: 'Mandrill API key',
				default: '0000000000',
				env: 'MANDRILL_API_KEY'
			}
		},
		sender: {
			doc: 'The "from" field for the verification emails',
			default: 'Bon in a box administrator <someuser@company.com>',
			env: 'MANDRILL_SENDER'
		}
	},
	email: {
		verification: {
			route: {
				doc: 'Where to redirect verification tokens',
				default: 'http://localhost:8000/auth/local/verify',
				env: 'EMAIL_VERIFICATION_ROUTE'
			}
		}
	},
	database: {
		mongo: {
			url: {
				doc: 'MongoDB url to connect to (including db reference)',
				default: 'mongodb://localhost/bon-in-a-box-app',
				env: 'MONGO_URL'
			}
		},
		redis: {
			url: {
				doc: 'Redis url to connect to (including auth string)',
				default: 'redis://localhost:6379',
				env: 'REDIS_URL'
			},
			host: {
				doc: 'Redis host database',
				default: 'localhost',
				env: 'REDIS_HOST'
			},
			port: {
				doc: 'Redis port',
				format: 'port',
				default: '6379',
				env: 'REDIS_PORT'
			},
			session: {
				prefix: {
					doc: 'Redis session prefix (to separate session for different processes)',
					default: 'sess:',
					env: 'REDIS_SESSION_PREFIX'
				}
			},
			db: {
				doc: 'Redis database number (0-15)',
				default: 0,
				env: 'REDIS_DB'
			}
		}
	},
	facebook: {
		client: {
			id: {
				doc: 'Facebook application client id.',
				default: 'abcdefghijklmnopqrstuvwxyz',
				env: 'FACEBOOK_CLIENT_ID'
			},
			secret: {
				doc: 'Facebook application client id.',
				default: 'abcdefghijklmnopqrstuvwxyz',
				env: 'FACEBOOK_CLIENT_SECRET'
			}
		},
		callback: {
			url: {
				doc: 'Facebook application callback url.',
				format: 'url',
				default: 'http://localhost:7000/auth/facebook/callback',
				env: 'FACEBOOK_CALLBACK_URL'
			}
		}
	},
	google: {
		client: {
			id: {
				doc: 'Google application client id.',
				default: 'abcdefghijklmnopqrstuvwxyz',
				env: 'GOOGLE_CLIENT_ID'
			},
			secret: {
				doc: 'Google application client id.',
				default: 'abcdefghijklmnopqrstuvwxyz',
				env: 'GOOGLE_CLIENT_SECRET'
			}
		},
		callback: {
			url: {
				doc: 'Google application callback url.',
				format: 'url',
				default: 'http://localhost:7000/auth/google/callback',
				env: 'GOOGLE_CALLBACK_URL'
			}
		}
	},
	linkedin: {
		client: {
			id: {
				doc: 'Linkedin application client id.',
				default: 'abcdefghijklmnopqrstuvwxyz',
				env: 'LINKEDIN_CLIENT_ID'
			},
			secret: {
				doc: 'Linkedin application client id.',
				default: 'abcdefghijklmnopqrstuvwxyz',
				env: 'LINKEDIN_CLIENT_SECRET'
			}
		},
		callback: {
			url: {
				doc: 'Linkedin application callback url.',
				format: 'url',
				default: 'http://localhost:7000/auth/linkedin/callback',
				env: 'LINKEDIN_CALLBACK_URL'
			}
		}
	}
});

// throw error
function _throw(m) {
	throw m;
}

// print the environment for debugging
debug(util.inspect(process.env, {
	colors: true
}));

// perform the config validation
config.validate();
*/

export var config = "hola mundo cruel";
