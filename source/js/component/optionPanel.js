App.OptionPanelComponent = Em.Component.extend({
tagName:"ul",
  classNames:["nav","sidebar"],
  options:Em.inject.service(),
   actions:{
    instrument(a){
      console.log('instrument selection',a)
    },
    actionHandler(name){
      console.log ( 'actionHAndler',name)
      Em.run(this.get('options'),name)
    }  
  },		
	didInsertElement:function(){
	this.set('controller.belly',Ember.Binding.from("parentView.controller.belly").to("controller.belly")) 
	//this.set('controller.state',Ember.Binding.from("parentView.controller.state").to("controller.state")) 
   	this.get('controller.belly').connect(this)	
   	//this.get('controller.state').connect(this)	
	console.log( this.get('controller.belly')  )
	},
})
