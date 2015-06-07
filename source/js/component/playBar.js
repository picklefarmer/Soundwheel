App.PlayBarComponent = Em.Component.extend({
actions:{
	back(){
		console.log( 'back ' ) 
		ctrl.send('play',true,"decrementProperty")
	},
	stepLeft(){
		console.log( 'stepLeft ' ) 
        this.decrementProperty('song.index')
	},
	stepRight(){
		console.log( 'stepRight ', this.get('song.index'))
       this.incrementProperty('song.index')
	},	
	play(){
		console.log( 'play ' ,this.get('song.pause')) 
	    this.toggleProperty('song.pause')
    },	

}
	
})
