import Ember from 'ember';
export default function(index,outdex,swap){

if(this.get('song.isPart')){



	var score = this.get('song.selected.composition'),
			output 	=	outdex!==undefined ? score.objectAt(outdex).objectAt(0) : score.objectAt(index).objectAt(0);

	let instance = score.reduce(function(a,b){
			if(b[0] === output){
				return b[1] > a?b[1]:a
			}else{
				return a
			}
	},0);

	if(swap){
		//...
	}
	
	if(outdex !== undefined){
		console.error(output,instance,'part')
		score.replace(index,1,[[output,instance]])
		this.set('song.selected.compIndex',index)
	
	}else{
		//insert
		score.insertAt(index+1,[output,instance+1]);
		this.get('song.selected.content').objectAt(output).lyrics.pushObject([])
		console.error(this.get('song.selected.content'),score,output,instance,'part')
	}


}else{

	var score = this.get('song.selected.part.fretboard'),
			output 	=	outdex!==undefined ? score.objectAt(outdex).notes : this.get('song.selected.measure.notes'),
			outMap	=	outdex!==undefined ? score.objectAt(outdex).map		:	this.get('song.selected.measure.map'),
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
		console.error(output,outMap,notes,map)
		score.insertAt(index+1,{notes,map});
		this.incrementProperty('song.selected.index');
	}

}
}
