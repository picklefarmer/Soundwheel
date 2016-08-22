import Ember from 'ember';

export default Ember.Route.extend({
	song:Ember.inject.service(),
	
	model:function(params){
		
			console.log( 'init , from isOnline route model ',params)
    
			//Ember.run(this,'checkOnline',params.isOnline,params.y)

			return params
		},
			//			params.y = [params.y.split("")][params.x] || params.y
		checkOnline(isOnline,name){
			if(isOnline === "online"){
				this.set('song.isOnline',true)	
			}else{
				this.router.replaceWith('song',{isOnline:"offline",y:name})
					//this.set('song.isOnline',false)
			}
		},

});
