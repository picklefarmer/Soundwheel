import Ember from 'ember';
import IndexWatcher from './indexWatcher';
import LiveObject from './liveObject';

export default function(ref,parts){

	console.log(ref,parts)
	var i = 0;
	for(let part of parts){
		let length	=	part.fretboard.length,
				index		=	0,
				_part = part;
		_part.fretboard	=	 IndexWatcher.call(this,ref.child(i+'/fretboard/'),part.fretboard.length)
		for(index;index<length;index+=1){
		console.log(length,index,part,'liveobject')
			_part.fretboard.pushObject(LiveObject.call(this,ref.child(i+'/fretboard/'+index),i,index))
		}
		_part.fretboard.start()
		parts[i++]=_part
	}
	console.log('onChange', parts,ref)
	return parts
}
