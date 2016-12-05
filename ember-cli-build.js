/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
			sassOptions: {
		  	includePaths: [
					'bower_components/bootstrap-theme-bootswatch-flatly/scss/',
		      'bower_components/foundation/scss',
					'node_modules/compass-mixins/lib/'

				]
		},
		fingerprint:{
			enabled:false
		}

  });

	const bower_dir = 'bower_components/',
				firebase	=	bower_dir + 'firebase/firebase-';

	app.import(bower_dir + 'jquery-colpick/js/colpick.js')
	app.import(bower_dir + 'jquery-colpick/css/colpick.css')
	
	app.import('vendor/bootstrap.min.css');
	app.import('vendor/chroma.min.js');

	app.import(firebase+'app.js')
	app.import(firebase+'database.js')
	app.import(firebase+'auth.js')

//	app.import(bower_dir + 'firebase2/firebase-debug.js')

  return app.toTree();
};
