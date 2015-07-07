var fs = require ( 'fs' ),
	walk = require ( 'walk' ),
	settings = require('./source/config.js');


var config = [
			//'libs',
			'css',
//			'compiled',
//			'scores'
			];

var js = [];
var css = [];


module.exports.toHtml = function(cb){
console.log( ' init compile html page ' ) 
	
var walker = walk.walk('../')
	walker.on('directory',function(root,stat,next){
	//console.log ( '[1m '+stat.name+'[0m')
		if(config.indexOf(stat.name) > -1){
			walk.walk(root+stat.name).on('file',function(root,file,nextFile){
				if(file.name.match('\.js$')){
					js.push(`<script src="${root+"/"+file.name}"></script>`)
				}else if(file.name.match('\.css$')){
					css.push(`<link rel="stylesheet" href="${root+"/"+file.name}">`)	
				}
				nextFile()
			})
		}
		next()
	})
	walker.on('end',function(){


	var uniqCss = css.filter(function(uniq,pos,self){
				return self.indexOf(uniq) === pos})
var field = ` 
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">

	<title>Sound Lab</title>
	${uniqCss.join(`
	`)}

</head>

<body>

	<script src="libs/jquery.min.js"></script>
	<script src="libs/colpick.js"></script>
	<script src="libs/ember-template-compiler_${settings.version}.js"></script>
	<script src="libs/ember.debug_${settings.version}.js"></script> 
	<script src="libs/firebase.js"></script>

	<script src="compiled/this.js"></script>
	<script src="compiled/output.js"></script>

</body>
</html>
`	
	//console.log ( field ) 
	fs.writeFileSync('../index.html',field)
		if(cb)cb()	
	})
}
