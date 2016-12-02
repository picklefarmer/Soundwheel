//insert isLive check to return proxy object
import Part from './append/appendPart';
//import Beat from '/append/appendBeat;
import Measure from './append/appendMeasure';

export default function(index){
	let compIndex = this.get('song.selected.compIndex'),
			composition=this.get('song.selected.composition'),
			parts			=	this.get('song.selected.content');

if(this.get('song.isPart')){
	Part.call(this,index,compIndex,composition,parts)
	}else{
	Measure.call(this,index,compIndex)
	}
}


