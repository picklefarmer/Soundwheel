import Ember from 'ember';
//import * as Simple from '../mixins/functions/simple';
//import * as Method from '../mixins/functions/playmethod';
import playMatrix from '../mixins/functions/playmatrix';

const x = 67;
const y = 50;
const offset = 18;
const scale = 36;

export default Ember.Mixin.create({
	
		playMatrix
})

//					x : 67,
	//		   	y : 50,
    //    	offset : 18,
//      		tempo : ~~(this.get('tempo')/50),
        	//rate = 800,//~~(this.get('tempo'))/this.get('selected.measureLength')+1,
  //      	scale : 36,
  //      	soundBank : this.get('tones'),
  //      	tempChord : this.get('cacheNotes'),
  //      	index : _index || ~~this.get('selected.index').toString(),
  //ctx :  this.get('options.frontView'),
  //rate : ~~(this.tempo/2)-1,
  //

	//Audio
//	simple:Simple.simple,
//	_simple:Simple._simple,

	//Visual
		/*
				instrument
				\lyrics
				\measure
				meter

	 	*/
	//method:Method.method,
	//_method:Method._method

