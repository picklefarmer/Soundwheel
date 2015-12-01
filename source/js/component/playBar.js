App.PlayBarComponent = Em.Component.extend({
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
				Em.run.next(this.get('song'),'clock')
  },	

}
	
})
