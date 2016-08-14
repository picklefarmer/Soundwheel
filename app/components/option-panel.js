import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
  tagName:"ul",
  classNames:["nav","sidebar"],
  options:Ember.inject.service(),

  actions:{
    instrument(a){
      console.log('instrument selection',a)
    },
    actionHandler(name){
      console.log ( 'actionHAndler',name)
      Ember.run(this.get('options'),name)
    }  
  },		

	didInsertElement:function(){
	this.set('controller.belly',Ember.Binding.from("parentView.controller.belly").to("controller.belly")) 
	//this.set('controller.state',Ember.Binding.from("parentView.controller.state").to("controller.state")) 
   	this.get('controller.belly').connect(this)	
   	//this.get('controller.state').connect(this)	
	console.log( this.get('controller.belly')  )
	},

});
