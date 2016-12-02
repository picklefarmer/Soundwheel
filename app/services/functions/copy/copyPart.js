export default function(index,outdex,swap){

	index = this.get('song.selected.compIndex')
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
		let oldIndex = score.objectAt(index).objectAt(0);

		reseat.call(this,score, index, oldIndex) 
		this.get('song.selected.composition').replace(index,1,[[output,score.objectAt(outdex).objectAt(1)]])
		this.set('song.selected.compIndex',index)
	
	}else{
		let newIndex = index+1;
		//insert
		score.insertAt(newIndex,[output,instance+1]);
		if(this.get('song.onLine')){
			let	ref	= this.get('song.user').child('songs/'+this.get('song.selected.selection'));
			recompose.call(this,composition,ref.child('composition'),compIndex,partIndex,1)

		}
		this.get('song.selected.content').objectAt(output).lyrics.pushObject([])
		this.set('song.selected.compIndex',newIndex)
		console.error(this.get('song.selected.content'),score,output,instance,'part')
	}


}

