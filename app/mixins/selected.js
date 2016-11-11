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
			let names = this.get('parts').getEach('name');
			console.log('name', names)
				return names

	}),
//"playOrder":[[0,0],[0,1],1,[0,2],1,1],
	partOrder:Ember.computed('playOrder',function(){
		let order= this.get('playOrder');
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
	part:Ember.computed('partIndex',function(_){
		_ = this.get('partIndex')
						console.log(_, 'part_index')
		if(_ !== undefined ){
			let part 		= this.get('playOrder').objectAt(_);
					part		= part.length? part[0] : part
					part 		= this.objectAt(part);
					console.log(part , 'part',this.get('content'))
			return part
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
		lyricInstance:Ember.computed('partIndex','parts',function(){
					let key = this.get('partOrder').objectAt(this.get('partIndex'));
					return	this.get('parts').objectAt(key.index).lyrics.objectAt(key.instance);
		}),
		lyrics:Ember.computed('lyricInstance','index',{
			get(){
				//return this.get('part').
					return	this.get('lyricInstance')
			},
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
