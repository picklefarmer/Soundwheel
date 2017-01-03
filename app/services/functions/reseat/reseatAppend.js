import generateBlank from '../generateBlank';
import LiveObject 	from './../liveObject';
import recoil				from './recoil';

export default function(score,partIndex,ref,index,update){	console.log('append')

	let length 	= score.length,
			last 		= length-1,
			isFirst	=	index-1 === 0,
			isOne		=	last	=== 0,
			upIndex	=	index,
			top			=	true;

	if(isOne || isFirst){
		let {notes,map} = score.objectAt(0);
		ref.child('1').set({notes,map})
		score.insertAt(last,LiveObject(ref.child('1')))
		if(!isOne){
			recoil.call(last,index,score,ref)
		}
	}else{
		score.insertAt(last,LiveObject(ref.child(last)))
		recoil.call(last,index,score,ref)
		last = index
		console.log(index, length, ' final check ' ) 
		let {notes,map} =	generateBlank.call(this,true)
		ref.child(last).update({notes,map})
		score.replace(last,1, LiveObject(ref.child(last)))
		this.set('song.selected.index',index-1)
	}
}
