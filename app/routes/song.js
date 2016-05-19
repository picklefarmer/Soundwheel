import Ember from 'ember';
var DEBUG;

export default Ember.Route.extend({
		model:function(params){
		
			params.y = [params.y.split("")][params.x] || params.y
			return params
		},
	
		actions:{
			ride:function(x,y){
				this.router.replaceWith("song",{x:x,y:y})
			},
	
		loading:function(){
				console.log ( "THIS _ IS _ LOADING" ) 
			}
		}
})
