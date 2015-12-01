App.IndexRoute = Em.Route.extend({

	beforeModel:function(){
		this.transitionTo("config")
		//this.transitionTo("song","edit","new")
	}

})
