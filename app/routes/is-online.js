import Ember from 'ember';
var	checkOnline = function(group,name){
	if(group !== 'offline'){
//		this.set('song.isOnline',1)
		Ember.run(this.get('song.options'),this.get('song.options.setGroup'),group)
	}else{
		this.set('song.isOnline',0)
		//		this.set('song.options.pairingParam',null)
	}
};
export default Ember.Route.extend({
	song:Ember.inject.service(),
	model:function(params){
		console.log( 'init , from isOnline route model ',params)
		checkOnline.call(this,params.isOnline,params.y)
		return params
	},
});
