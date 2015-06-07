
App.LyricsView = Em.View.extend({})

App.CoreComponent = Ember.Component.extend({
//	classNames:['platformer'],
	tagName:"span",
	layout:function(){
			return Em.Handlebars.compile("<button {{action 'click' name }} >{{name}}</button>")
	}.property(),
	colors:function(){
		return ["hi","lo","match"][this.get('value')%this.get('inc')]
	}.property('value'),
	actions:{
	        click(name){
			console.log( "click" ,name) 
   //           Em.run(this.get('options'),name)
	          this.get('ctrl').send("actionHandler",name)
			}
	}	
})
App.CheckComponent = Em.Checkbox.extend({
    checkedBinding:'option',
    optionsCheck:function(){
      return this.get('parentView.options').get(this.get('name'))
    }.property('option'),
	name:function(e,f,g){
			this.set('option',Em.computed.alias('parentView.options.song.'+f))
			return f  
	}.property(),
})
App.SwitchComponent = Em.Select.extend({
  content:['edit','muSong','song'],
		valueDidChange:function(a,b,c){
				console.log( a ,b , c ) 
//			this.get('controller').send('ride',this.get('value'),this.get('controller.model.y'))
		}.observes('value')
})

App.LabelForComponent = Em.Component.extend({
	tagName:"label",
	attributeBindings:["for"]
})

App.OctavesController = Ember.Controller.extend({
		needs: ['song'],
		x:Em.computed.alias('controllers.song.model.x'),
		y:Em.computed.alias('controllers.song.model.y'),
	    isActive: function() {
//	console.log('octave',~~this.get('y')[this.get('x')],this.get('x'))
 //   return ~~this.get('y')[this.get('x')] === this.get('model');
    }.property('x,y')
})
