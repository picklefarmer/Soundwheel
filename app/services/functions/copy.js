import Ember from 'ember';
import Part from './copy/copyPart';
import Measure from './copy/copyMeasure';

export default function(index,outdex,swap){

	if(this.get('song.isPart')){
		Part.call(this,imdex,outdex,swap)
	}else{
		Measure.call(this,index,outdex,swap)
	}
}
	/*

		 composition: [
		 	{ name:'verse',instance:0},
		 	{ name:'chorus',instance:0},
		 	{ name:'verse',instance:1},
		 	{ name:'chorus',instance:0},
		 	{ name:'verse',instance:2},
		 ] 

		 content: [
			 {name:'verse', ...},
			 {name:'chorus', ...},
		 ]

	*/

