App.PlayBarComponent = Em.Component.extend({
actions:{
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
	    this.toggleProperty('song.pause')
    },	

}
	
})
