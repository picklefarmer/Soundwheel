import Ember from 'ember';
export default function(index,outdex,swap){


	var score = this.get('song.selected'),
			output 	=	outdex!==undefined ? score.objectAt(outdex).notes : score.get('measure.notes'),
			outMap	=	outdex!==undefined ? score.objectAt(outdex).map		:	score.get('measure.map'),
			notes = Ember.copy(output),
			map		=	Ember.copy(outMap);

	if(swap){
		let swapNotes = score.objectAt(index).notes,
				swapMap		=	score.objectAt(index).map;
		score.replace(outdex,1,{notes:swapNotes,map:swapMap})
	}

	if(outdex !== undefined){
		console.error(output,outMap,notes,map)
		score.replace(index,1,{notes,map});
		this.set('song.selected.index',index)
	}else{
		score.insertAt(index+1,{notes,map});
		this.incrementProperty('song.selected.index');
	}

}
