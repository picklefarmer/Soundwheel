import Ember from 'ember';
import SetIndex from '../mixins/functions/index';
import hexCrunch from '../mixins/functions/hexcrunch';

var offset =  10,
		scale		= 36,
		x				= 67,
		y				= 50,
		yFactor = 26,//offset+(scale/2),
		xFactor	=	36;//offset/2 + (scale/2);

export default Ember.Mixin.create({
	
	partNames:Ember.computed('content.@each.name',function(){
			//this.getEach('name')
			let names = this.getEach('name');
			console.log('name', names)
			return names

	}),

	partInstance:Ember.computed('composition','compIndex',function(){
		let {compIndex,composition}	= this.getProperties('compIndex','composition'),
				c			= composition.objectAt(compIndex);

		console.error( c, 'partInstance')
				return c[0]!== undefined? c[0]:c
	}),

	part:Ember.computed('compIndex','partInstance',function(_){
		_ =this.objectAt(this.get('partInstance'));
			console.error(_,this.get('content'),this,this.get('partInstance'),'part')
			return _
	}),

	measure:Ember.computed('part','index','content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			if(this.get('compIndex') !== undefined){
				console.error(this.getProperties('index','part','compIndex','composition'),fretboard,'fretboard')
				let fretboard = this.get('part').fretboard.content.objectAt(this.get('index'));
				return Ember.A(fretboard)
			}else{
				return this.objectAt(this.get('index'))
			}
		}
	}),

	measureLength:0,

	instance:Ember.computed('compIndex','composition.[]',function(){
		return this.get('composition').objectAt(this.get('compIndex'))[1]
	}),

	lyricInstance:Ember.computed('instance','parts',function(_){
		
			let compInstance = this.get('instance');

					return	this.get('part').lyrics[compInstance]
	}),

	lyrics:Ember.computed('lyricInstance',{
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
		console.error('liveobjectpush',this.get('part.fretboard'))
		console.error( 'fretbard refresh',this.get('index'))	
		 	return Ember.A(this.get('part.fretboard.content')
							.getEach('notes')
							.map( measure => measure.map( (string,indx) => string.length?string.map( fret =>{
								if(fret){
									return [fret*x + xFactor, indx*y + yFactor,fret,indx]
								}
								}):false)))
	}),

	fretMeasure:Ember.computed('index','fretboard',function(){
		 return Ember.A(this.get('fretboard').objectAt(this.get('index')))
	}),


})
