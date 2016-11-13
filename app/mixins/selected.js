import Ember from 'ember';
import SetIndex from '../mixins/functions/index';
import hexCrunch from '../mixins/functions/hexcrunch';

var offset =  10,
		scale		= 36,
		x				= 67,
		y				= 50,
		yFactor = offset+(scale/2),
		xFactor	=	offset/2 + (scale/2);

export default Ember.Mixin.create({

	partNames:Ember.computed('parts',function(){
			//this.getEach('name')
			let names = this.getEach('name');
			console.log('name', names)
			return names

	}),
	partInstance:Ember.computed('composition','compIndex',function(){
		let {compIndex,composition}	= this.getProperties('compIndex','composition'),
				c			= composition.objectAt(compIndex);

		console.error( c, 'partInstance')
				return c[0]!==undefined? c[0]:c
	}),
//"playOrder":[[0,0],[0,1],1,[0,2],1,1],
	
	partOrder:Ember.computed('composition',function(){
		let order= this.get('composition');
		if(order){

			return order.map( each => {
				let couple = {};

				if(each.length){
					couple.index = each[0]
					couple.instance = each[1]
				}else{
					couple.index=  each
					couple.instance = 0
				}

				return couple
			})
		}
	}),
	part:Ember.computed('compIndex','partInstance',function(_){
		_ =this.objectAt(this.get('partInstance'));
			console.error(_,this.get('partInstance'),'part')
			return _
	}),
	/*
	
		_ = this.get('partIndex')
						console.log(_, 'part_index')
		if(_ !== undefined ){
			//this.get('composition')
			let part 		= this.get('playOrder').objectAt(_);
					part		= part.length? part[0] : part
					part 		= this.objectAt(part);

					console.log(part , 'part',this.get('content'))
			return part
		}else{
			return this.get('content')
		}
	}),
*/
	measure:Ember.computed('part','index','content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			if(this.get('compIndex') !== undefined){
				console.error(this.getProperties('index','part','compIndex','composition'),fretboard,'fretboard')
				let fretboard = this.get('part').fretboard.objectAt(this.get('index'));
				return fretboard
			}else{
				return this.objectAt(this.get('index'))
			}
		}
	}),

	measureLength:0,

	lyricInstance:Ember.computed('composition','compIndex','parts',function(_){
		
		_	=	this.get('composition');
					
			console.log('composition', _,this)
			if(!_){return}

			let compInstance = this.get('partOrder').objectAt(this.get('compIndex')).instance;

					return	this.get('part').lyrics.objectAt(compInstance)
////									.lyrics.objectAt(key.instance);
	}),

	lyrics:Ember.computed('lyricInstance','index',{
		get(){
			//return this.get('part').
			return	this.get('lyricInstance')
		},
	}),

	compIndex:Ember.computed('composition.[]',{
		get(){
			if(this.get('composition')){
				return 0
			}			
		},
		set(_,index){

				_  = this.get('composition');
				if(index >= _.length){
					return 0
				}else if(index < 0){
					return _.length-1
				}
				
			return index	
		}
	}),

 	index:Ember.computed('content.[]',{
		get(){return 0},
		set:SetIndex
	}),


	fretboard:Ember.computed('measure.notes.[]',function(){
console.error( 'fretbard refresh',this.get('index'))	
			return this.get('part.fretboard')
							.getEach('notes')
							.map( measure => measure.map( (string,indx) => string.length?string.map( fret =>{
								if(fret){
									return [fret*x + xFactor, indx*y + yFactor,fret,indx]
								}
								}):false
							))
/*
							.map( (string,idx) => string
								.map(beat=>[beat,idx])
								.filter( group => group[0])
								.map( ([note,id]) => [note*x + xFactor, id*y + yFactor,note,id])
							)
							*/

		
	}),

	fretMeasure:Ember.computed('index','fretboard',function(){
		 return this.get('fretboard').objectAt(this.get('index'))
	}),


})
