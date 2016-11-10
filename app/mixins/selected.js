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


	partNames:Ember.computed('playOrder',function(){
		let names = ['verse','chorus','bridge','outro','intro'],
				order	=	this.get('playOrder').uniq().map( name => names[name]);
			return order
	}),

	part:Ember.computed('partIndex',function(_){
		_ = this.get('partIndex')
						console.log(_, 'part_index')
		if(_ !== undefined ){
			return this.objectAt(this.get('playOrder').objectAt(_));
		}else{
			return this.get('content')
		}
	}),

	measure:Ember.computed('part','index','content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			if(this.get('partIndex') !== undefined){
				return this.get('part').objectAt(this.get('index'))
			}else{
				return this.objectAt(this.get('index'))
			}
		}
	}),

	partIndex:Ember.computed('playOrder.[]',{
		get(){
			if(this.get('playOrder')){
				return 0
			}			
		},
		set(_,index){

				_  = this.get('playOrder');
				if(index >= _.length){
					return 0
				}else if(index < 0){
					return _.length-1
				}
				
			return index	
		}
	}),
	fretboard:Ember.computed('measure.notes.[]',function(){
console.error( 'fretbard refresh',this.get('index'))	
			return this.get('part')
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
	measureLength:0,

	hex:Ember.computed('measure.notes.[]',{
		get(){
			console.log('hex init') 
			let notes = this.get('measure.notes');
			console.log(' hex notes' , notes ) 	
			
			let array = notes.map(hexCrunch,this);

			console.log( 'count', this.get('count'),this.get('measureLength'))
			this.set('measureLength',this.get('count'))
			this.set('count',0)
			
			return array
	  }
	  }),
	 	/*
	  update(){
				return (+(measurePart.reduce((a,b)=> ~~a +""+ ~~b ))).toString(16)
			
	  },
		*/

		lyrics:Ember.computed('measure',{
			get(){
				this.get('measure.lyric')
			},
			set(_,I,II){

				console.log(I,II,`assigning
												lyric`)
				return I
								/*
				if(I){
					Ember.run.throttle(this,'updator',I,12)
					// 		this.set('measure.lyric',I)
				}
				return this.get('measure.lyric')
				*/
			}
		}),

		updator(I,J,K){
			console.log(I,J,K,"ASDF")
			this.set('measure.lyric',I)
		},


  index:Ember.computed('content.[]',{
			get(){
				console.log(this,SetIndex, 'set index')
				console.log( 'get index of proxy ' ) 
				return 0
			},

			set:SetIndex
							
		/*
		 * (_,b){
				console.log(this,b,"index of proxy")
				/*
				if(b < 0){
					b = this.get('length')-1
				}
				_ = b%this.get('length') || 0;

				console.log( ' pre ' ) 
				Ember.run(this,'playnotes',_ ) 

				return _
			}
		*/
		})
})
