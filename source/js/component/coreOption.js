App.CoreOptionComponent = Ember.Component.extend({

//	classNames:['platformer'],
		//
	tagName:"span",
	layout:Em.computed({
		get(){
			return Em.Handlebars.compile("<button {{action 'click' name }} >{{name}}</button>")
		}
	}),

	colors:Em.computed('value',{
		get(){
			return ["hi","lo","match"][this.get('value')%this.get('inc')]
		}
	}),

	actions:{
		click(name){
			console.log( "click" ,name) 
			//  Em.run(this.get('options'),name)
	   	 	this.get('ctrl').send("actionHandler",name)
		}
	}	
})


