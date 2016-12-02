import Ember from 'ember';
import LiveObject from './liveObject';

export default function(ref,parts){

	console.log(ref,parts)
	var i = 0;
	for(let part of parts){
		let _part = part
		let index = 0;
		for(let n of parts[i].fretboard){
			_part.fretboard[index] = LiveObject.call(this,ref,i,index)
			index+=1
		}
		parts[i++]=_part
	}
	console.log('onChange', parts,ref)
	return parts
}
