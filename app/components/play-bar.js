import Ember from 'ember';

export default Ember.Component.extend({
actions:{
	back(){
		console.log( 'debug ' ) 
        this.song.debug()
	},
	stepLeft(){
		console.log( 'stepLeft ' ) 
        this.decrementProperty('song.index')
	},
	stepRight(){
		console.log( 'stepRight ')
       this.incrementProperty('song.index')
	},	
	play(){
		console.log( 'play ' ,this.get('song.pause')) 
	    if(this.toggleProperty('song.pause'))
				Ember.run.next(this.get('song'),'clock')
  },	

}
	
});
