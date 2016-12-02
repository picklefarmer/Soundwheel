import LiveObject from './liveObject';
import generateBlank from './generateBlank';

export default function(index,update){

		let score 			= this.get('song.selected.part.fretboard.content'),
				partIndex	=	this.get('song.selected.partInstance'),
				ref	 			= this.get('song.user').child('songs/'+this.get('song.selected.selection')).child('parts/'+partIndex+'/fretboard/');

		if(update===undefined){

			score[index].stop()
			score.removeAt(index,1)

			let i					= index-1,
			length		=	score.length;

			while(i++ < length-1){
				console.log('while' ,i,index, length, score) 
				let {notes,map} = score[i]
				score[i].stop().start(ref.child(i))
				ref.child(i).update({notes,map})
			}

			if(index){
				this.set('song.selected.index',index-1)
			}
			ref.child(i).remove()


		}else{

			let length 	= score.length,
					prev 		= length-1,
					upIndex	=	index,
					top			=	true;

			if(prev === 0 || index-1 === 0){
				upIndex = 0;
				console.log( ' previndex ' )		

				let {notes,map} = score.objectAt(0);

				console.log( {notes,map}, index, 'score',score)
				ref.child('1').set({notes,map})
//				this.set('song.selected.index',1)

				score.insertAt(prev,LiveObject(ref.child('1')))
			}else{

				score.insertAt(prev,LiveObject(ref.child(prev)))
			}
				console.log('length', length,'prev',prev)
			for(;prev>index;prev--){
				//update
				let {notes,map} = score[prev-1];
				console.log(prev,notes.length,map.length, ' first check ' ) 
				ref.child(prev).update({notes,map})
				//reseat
				if(!top){
					score.replace(prev,1,score[prev-1])
				}else{
					top = false
				}
			}
			if(upIndex){
				prev = index
				if(!update){
					console.log(index, length, ' final check ' ) 
					let {notes,map} =	generateBlank.call(this,true)
					ref.child(prev).update({notes,map})
				}else{
					let {notes,map} =	score[index];
					ref.child(prev).update({notes,map})
				}
				score.replace(prev,1, LiveObject(ref.child(prev)))
				this.set('song.selected.index',index-1)
			}
	}
}
