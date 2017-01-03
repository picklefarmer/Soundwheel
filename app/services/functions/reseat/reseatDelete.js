export default function(score,partIndex,ref,index){


	console.log('delete')

	score[index].stop()
	score.removeAt(index,1)
	let o = 0;

	if(index === 0){
		
	}
	for(var l of score){
			console.log(l,o,index)
		if(o >= index){
			let {notes,map} = l;
			console.log(l,o,index,'in')
			score[o].stop().start(ref.child(o))
			ref.child(o).update({notes,map})
		}	
		o++	
	}

	if(score.length > 1){
		ref.child(o).remove()
	}else{
		score[0].stop().start(ref.child('0'))
		ref.child('1').remove()
	}

/*
			score[index].stop()
			score.removeAt(index,1)

			let i					= index?index-1:index,
			length				=	score.length;

			while(i <= length-1){
				let {notes,map}	=	score[i];
				console.log('rounds',notes,map,i)
				ref.child(i).update({notes,map})
				i++
			}

			i	=	index-1;

			while(i++ < length-1){
				score[i].stop().start(ref.child(i))
			}

			if(index){
				this.set('song.selected.index',index-1)
			}

			if(length > 1){
				ref.child(i).remove()
			}else{
				ref.child('1').remove()
			}

			*/
}
