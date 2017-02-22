import Ember from 'ember';
import reseatIndexes from './../reseatIndexes';

export default function(index,outdex,swap){

	var score = this.get('song.selected.part.fretboard.content'),
			output 	=	outdex!==undefined ? score.objectAt(outdex).notes : this.get('song.selected.measure.notes'),
			outMap	=	outdex!==undefined ? score.objectAt(outdex).map		:	this.get('song.selected.measure.map'),
			notes = Ember.copy(output),
			map		=	Ember.copy(outMap);

	if(swap){
		//update to onLine
		let swapNotes = score.objectAt(index).notes,
				swapMap		=	score.objectAt(index).map;
		score.replace(outdex,1,{notes:swapNotes,map:swapMap})
	}

	if(outdex !== undefined){
		console.error(output,outMap,notes,map)
			///update to onLine
		score.replace(index,1,{notes,map});
		this.set('song.selected.index',index)
	}else{
		console.error({output,outMap,notes,map})
		if(this.get('song.onLine')){
			reseatIndexes.call(this,index+1,index)
		}else{
			score.insertAt(index+1,{notes,map});
			this.incrementProperty('song.selected.index');
		}
	}

}
