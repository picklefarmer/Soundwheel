import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
	loopBtn:'\uD83D\uDD01',
	classNames: ['playbar'],
  buttons:{
    sustain:"\u221e",
    stepLeft:"\u25c0",
    play:"\u23ef",
    stepRight:"\u25b6",
 //   loop:"=loopBtn",
  },  
actions:{
  sustain(){
    this.toggleProperty('song.sustain')
  },
  loop(){
    this.toggleProperty('song.isLoop')
  },
	back(){
		console.log( 'debug ' ) 
        this.song.debug()
	},
	stepLeft(){
		console.log( 'stepLeft ' ) 
        this.decrementProperty('song.selected.index')
	},
	stepRight(){
		console.log( 'stepRight ')
       this.incrementProperty('song.selected.index')
	},	
	play(){
			console.log( 'play ' ,this.get('song.pause')) 
	    
			if(this.toggleProperty('song.pause')){
				Ember.run.next(this.get('song'),'clock')
			}
  },	

}
	
});
