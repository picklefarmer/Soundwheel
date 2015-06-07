App.ApplicationController = Em.Controller.extend({
  inut:"mea-sure",
//  state:false,
  stats: ["resoviour"],
  belly:function(a,b,c){
  	console.log("belly app", a,b,c)
  	return "swindly"
  }.property(),
})

App.IndexRoute = Em.Route.extend({

	beforeModel:function(){
		this.transitionTo("config")
		//this.transitionTo("song","edit","new")
	}

})
