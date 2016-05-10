import Ember from 'ember';

export default Ember.Component.extend({
//	classNames:['platformer'],
		//
	tagName:"span",
	layout:Ember.computed({
		get(){
			return Ember.Handlebars.compile("<button {{action 'click' name }} >{{name}}</button>")
		}
	}),

	colors:Ember.computed('value',{
		get(){
			return ["hi","lo","match"][this.get('value')%this.get('inc')]
		}
	}),

	actions:{
		click(name){
			console.log( "click" ,name) 
			//  Ember.run(this.get('options'),name)
	   	 	this.get('ctrl').send("actionHandler",name)
		}
	}	

});
