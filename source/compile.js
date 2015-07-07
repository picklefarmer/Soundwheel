
var	config    = require('./config.js');


var fs = require('fs'),
		compiler = require('../libs/ember-template-compiler_'+config.version),
		compilejs = require('babel'),
		emblem = require('emblem').default.compile;

var init = config.flags.join("\n")+"\nvar App = Ember.Application.create({"+config.debug.join(",\n")+"});\n"

module.exports.init = function(func,name){
		fs.writeFileSync('../compiled/output.js',"",{ encoding: "utf8" });
		fs.writeFileSync('../compiled/this.js',init,{ encoding: "utf8" });
}


module.exports.append = function(name,lemmish){
	var template,start,end,	
		input = fs.readFileSync(name, { encoding: 'utf8' });
	try	{
		if(lemmish){
			input = emblem(input);

			end = 3 
			start = 5
		}else{
			start = 6
			end = 4
		}
		template = compiler.precompile(input, false);
	}
	catch(e){
			console.log("[31m"+name+"[37m"+"\n" ,e ) 
			}
		output = 'Em.TEMPLATES["'+name.slice(start,name.length-end)+'"] = Ember.HTMLBars.template(' + template + ');\n';

		fs.appendFile('../compiled/output.js', output, { encoding: 'utf8' });
}

module.exports.es = function(name,inject){
	var input = fs.readFileSync(name, { encoding: 'utf8' }),
		template = compilejs.transform(input).code.split("\n"),
		output;
		template.splice(0,1)
		template = template.join("\n")+"\n";
		output =  template;

	fs.appendFile('../compiled/this.js', output, { encoding: 'utf8' });

}
