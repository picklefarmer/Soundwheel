import Ember from 'ember';
//import * as Simple from '../mixins/functions/simple';
//import * as Method from '../mixins/functions/playmethod';
import playMatrix from '../mixins/functions/playmatrix';
//import isOsc      from '../services/functions/drawOsc';
import Osc 		from '../components/functions/drawOsc';
import Chord 	from '../components/functions/drawOscArray';
import Spec 	from '../components/functions/drawSpec';
import Bar		from '../components/functions/drawBarGraph';

const x = 67;
const y = 50;
const offset = 18;
const scale = 36;

export default Ember.Mixin.create({

actions:{
  sustain(){
				this.toggleProperty('sustain')
  },
  isLoop(){
				this.toggleProperty('isLoop')
  },
	isPaint(){
		this.toggleProperty('isPaint')
	},
	isOsc(val){
				console.log(val, 'val from isOsc')
				let ctx =this.get('options.graphView'); 
				this.toggleProperty('isOsc')
				switch(val){
					case "Spec":Spec.call(this,null,ctx);break;
					case "Osc":Osc.call(this,null,ctx);break;
					case "Bars":Bar.call(this,null,ctx);break;
					case "Chord":Chord.call(this,null,ctx);break;
				}				
				this[val].call(this,null,ctx)
	},
	isBeat(){
				this.toggleProperty('isBeat')
	},
	stepLeft(){
		console.log( 'stepLeft ' ) 
    if(this.get('isBeat')){
			this.decrementProperty('beat')
		}else{
			this.decrementProperty('selected.index')
		}
	},
	stepRight(){
    if(this.get('isBeat')){
			this.incrementProperty('beat')
		}else{
			this.incrementProperty('selected.index')
		}
	},	
	play(){
//			console.log( 'play ' ,this.get('song.pause')) 
	    
			if(this.toggleProperty('pause')){
				Ember.run.next(this,'clock')
			}
  }},


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

