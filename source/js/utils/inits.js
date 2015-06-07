Em.Application.initializer({
  name:"firebase-init",
  before:'firebase-compile',

  initialize:function(container ,App){
 
   App.register('login:side',Ember.Object.extend({
      menuBar:function(){
        return $.getJSON("./json/routes.json")
      }.property()
   }));

   App.register('login:auth',Ember.Object.extend({
      menuBar:function(){
        return $.getJSON("./json/routesAuth.json")
      }.property()
   }));

   App.register('settings:actions',Ember.Object.extend({
		click:function(param){
//DEBUG = param
				console.log('free',param)//.set('hide',true))
			}
   }))

   App.register('settings:side',Ember.Object.extend({

      menuBars:["left","right","bottom","top","center","middle"],
	  datas:function(){
			this.get('data').then(data => this.set('datas',data));
	  }.property(),
      data:function(){
			//return $.getJSON('./json/panelsDefault.json');
			return $.getJSON('./json/panelsAuth.json',function(err){
//          console.log(err)
      });
	 }.property()
   }));   
  }
})

/*

var base = new Firebase('https://acroeven.firebaseio.com/music');
var chords = base.child('chords');

*/		
//App.SongController = Em.Controller.extend({
/*
		needs:'inventory',
		songs:function(){

						var one = Firebase.List.create({ref:base})
						//	console.log ( one.names ) 
						return one

				}.property(),

*/
//App.InventoryController = Em.Controller.extend({
/*
	model:function(){
		return	Firebase.List.create({
			ref:chords
			})
	}.property(),

*/

