


if(require){
!function(){
		require('nw.gui').Window.get().showDevTools();
		require('nw.gui').Window.get().setTransparent(true);

		require('babel/register');
	var reIndex = require('./htmlCompiler.js');
	var path = './css';
	var fs = require('fs');

/*	fs.watch(path, function(e,f) {
		
	console.log( 'css') 
		reIndex.toHtml(function(){
				if (location)
				  location.reload();
			})
		});
*/	  
		fs.watch("./compiled", function(e,f) {
		 
	console.log( 'js') 
			if (location)
			  location.reload();
		});


	}()
}
