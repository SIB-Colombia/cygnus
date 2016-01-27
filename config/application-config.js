'use strict';

// dependencies
var convict = require('convict');
var util = require('util');
var debug = require('debug')('catalog:configuration');
var validator = require('validator');

// catch all error without handler
process.on('uncaughtException', function(error) {
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
			default: 'Catálogo de la Biodiversidad',
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
		default: ['en', 'es'],
		env: 'LANGUAGES'
	},
	initialeDefault: {
		doc: 'Default language',
		default: 'es',
		env: 'LANGUAGE_DEFAULT'
	},
	logs: {
		doc: 'Log save location',
		default: 'logs/catalog.log',
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
	backend: {
		api: {
			path: {
				doc: 'Backend API url path',
				default: '/api',
				env: 'BACKEND_API_PATH'
			},
			server: {
				doc: 'Backend API connection URL',
				default: 'http://localhost',
				env: 'BACKEND_API_SERVER'
			},
			port: {
				doc: 'Backend API port',
				default: '4000',
				env: 'BACKEND_API_PORT'
			}
		}
	},
	assetsLocation: {
		doc: 'Location of app assets.',
		default: 'https://s3.amazonaws.com/catalog-assets',
		env: 'ASSETS_LOCATION'
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
			default: 'Catalog of Biodiversity administrator <someuser@company.com>',
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
		elasticSearch: {
			url: {
				doc: 'ElasticSearch url to connect to (including db reference)',
				default: 'localhost:9200',
				env: 'ELASTICSEARCH_URL'
			}
		},
		mongo: {
			url: {
				doc: 'MongoDB url to connect to (including db reference)',
				default: 'mongodb://localhost/catalog',
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
	},
	appConfig: {
		validResultsByPage: {
			doc: 'Valid values for results by page',
			default: ['10', '20', '50', '100'],
			env: 'APPCONFIG_VALID_RESULTS_BY_PAGE'
		},
		defaultResultsByPage: {
			doc: 'Default result by page (format must be one of the values of validResultsByPage',
			format: ['10', '20', '50', '100'],
			default: '10',
			env: 'APPCONFIG_DEFAULT_RESULTS_PAGE'
		},
		initialHomeRandomSpecies: {
			doc: 'How many random species to show initially in home page.',
			default: '5',
			env: 'APPCONFIG_HOME_RANDOM_SPECIES'
		},
		initialHomeSpecies: {
			doc: 'How many non random species to show initially in home page.',
			default: '5',
			env: 'APPCONFIG_HOME_SPECIES'
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
