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
		}

  });

	const bower_dir = 'bower_components/';

	app.import(bower_dir + 'jquery-colpick/js/colpick.js')
	app.import(bower_dir + 'jquery-colpick/css/colpick.css')
	
	app.import('vendor/bootstrap.min.css');
	app.import('vendor/chroma.min.js');
	
	app.import(bower_dir + 'firebase/firebase-debug.js')

  return app.toTree();
};
