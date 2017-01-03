import recompose from './../recompose';
import reseat from './../reseatComposition';

export default function(compIndex,outdex,swap){
console.log({compIndex,outdex,swap})
	var score = this.get('song.selected.composition'),
			output 	=	outdex!==undefined ? score.objectAt(outdex).objectAt(0) : score.objectAt(compIndex).objectAt(0);

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
		let oldIndex = score.objectAt(compIndex).objectAt(0);

		reseat.call(this,score, compIndex, oldIndex) 
		this.get('song.selected.composition').replace(compIndex,1,[[output,score.objectAt(outdex).objectAt(1)]])
		this.set('song.selected.compIndex',compIndex)
	
	}else{
		let newIndex = compIndex+1;
		//insert
		score.insertAt(newIndex,[output,instance+1]);
		if(this.get('song.onLine')){
			let	ref	= this.get('song.user').child('songs/'+this.get('song.selected.selection'));
			ref.update({composition:this.get('song.selected.composition')})
//			recompose.call(this,score,ref.child('composition'),compIndex,outdex,1)

		}
		this.get('song.selected.content').objectAt(output).lyrics.pushObject([])
		this.set('song.selected.compIndex',newIndex)
		console.error(this.get('song.selected.content'),score,output,instance,'part')
	}


}

