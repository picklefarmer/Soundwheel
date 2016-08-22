import Ember from 'ember';

export default Ember.Component.extend({
//	classNames:['platformer'],
		//
	tagName:"button",
  click(){
    this.sendAction('action',this.get('name'))
  },
/*	layout:Ember.computed({
		get(){
			return Ember.Handlebars.compile("<button {{action 'click' name }} >{{name}}</button>")
		}
	}),*/

	colors:Ember.computed('value',{
		get(){
			return ["hi","lo","match"][this.get('value')%this.get('inc')]
		}
	}),

});
