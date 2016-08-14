import Ember from 'ember';
import SetIndex from '../mixins/functions/index';
import hexCrunch from '../mixins/functions/hexcrunch';

export default Ember.Mixin.create({

	measure:Ember.computed('index','content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			return this.objectAt(this.get('index'))
		}
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
