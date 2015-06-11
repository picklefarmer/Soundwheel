var	 walk    = require('walk'),
	 hbsFiles  = [],
	 jsFiles   = [],
	 mixins	   = [],
	 config    = require('./config.js');
	 compile = require('./compile.js');

var date = new Date()
console.log("[1;33m"+date.getHours()+":"+date.getMinutes()+"[0;37m")


compile.init()
// Walker options
var walker  = walk.walk('.', { followLinks: false });

walker.on('file', function(root, stat, next) {
	if(stat.name.match('back')			||
	   stat.name.match('compile\.js$')	||
	   stat.name.match('config\.js$')	||
	   stat.name.match('em6\.js$')){
//		console.log('given')
		next()
	}else{
		// Add this file to the list of files
	if( root.match('mixins')){
		if(stat.name.match('js$')){
			mixins.push(root + '/' + stat.name);	
		}else{
			next()
		}	
	}else if((stat.name.match('js$'))){
//		console.log(stat.name)
    	jsFiles.push(root + '/' + stat.name);
	}else if((stat.name.match('hbs$'))){
//		console.log(stat.name)
    	hbsFiles.push([root + '/' + stat.name,false]);
	}else if(config.emblem){
		if((stat.name.match('em$'))){
//			console.log(stat.name)
    		hbsFiles.push([root + '/' + stat.name,true]);
		}
	}
    next();
	}
});

walker.on('end', function() {
	mixins.forEach(function(e){
		compile.es(e)	
	})
	jsFiles.forEach(function(e){
//		console.log(e)			
		compile.es(e)
	})
	hbsFiles.forEach(function(e){
//		console.log(e)
		if(!e[1]){
			compile.append(e[0])
		}else{
			console.log('emblem')
			compile.append(e[0],true)
		}
	})

console.log("[1;32m"+(new Date().getTime() - date.getTime())+"[0;37m")
});
