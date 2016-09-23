export default function(){
		console.log('playSwitch observer')
		var proxy  = this.get('song.selected.isFulfilled');

	    if(proxy){
    		this.addObserver('song.selected.measure.notes.@each',this.playNotes) 
      		Ember.run.next(()=>{console.log( `play switch Ember.${true}` , this.get('song.selected.measure'))})
    	}else if(!proxy){
    		console.log( `play switch Ember.${false}` ) 
      		this.removeObserver('song.selected.measure.notes.@each',this.playNotes) 
    	}
}


