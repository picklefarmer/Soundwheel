import Ember from 'ember';

export default Ember.Route.extend({
	song:Ember.inject.service(),
	
	model:function(params){
		
			console.log( 'init , from isOnline route model ',params)
    
		Ember.run(this,'checkOnline',params.isOnline,params.y)

			return params
		},
			//			params.y = [params.y.split("")][params.x] || params.y
		checkOnline(isOnline,name){
			if(isOnline !== 'offline'){
				this.set('song.isOnline',true)
		
				Ember.run(this.get('song.options'),this.get('song.options.setUser'),isOnline)


			}else{
				this.set('song.isOnline',false)
				this.set('song.options.pairingParam',null)
			//	this.router.replaceWith('song',{isOnline:"offline",y:name})
					//this.set('song.isOnline',false)
			}
		},

});
