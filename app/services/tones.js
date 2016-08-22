import Ember from 'ember';

export default Ember.ArrayProxy.reopenClass({
	isServiceFactory:true
}).extend({

	webaudio:Ember.inject.service(),
	song:Ember.inject.service(),
	_isLeft:false,
	isLeft:Ember.computed('song.main.isLeft.enabled','song.main.isFulfilled',{
		get(){	
			console.log(onProxy,onService,"how fired")
			let onProxy   = this.get('_isLeft'),
				onService = this.get('song.main.isLeft.enabled');

			if( onProxy !== onService ){
				console.log('reversing content')
				this.content.reverse()
				this.set('_isLeft', onService) 
			}
			return this.get('_isLeft')
		}
	}),

	tuning:Ember.observer('song.main.tuning.options',()=>{
    	console.log('tunings from'+`
        	      `+'the instruments') 
	}),

    _init:true,
	init(){
			let song = this.get('song');

      console.log(`
                  tone object created
                  `)


      var strings = this.get('strings')
                        .map(this.get('webaudio.tone'),
                             this.get('webaudio'))

       this.set('content', Ember.A(strings))

			 this.setEach('ctx.gain.value',0.001)
			 console.log(' after tones init' )

	//		 Ember.run.next(this.get('song'),'clock', 'working from tones service')
    },

	strings:Ember.computed('song.main.intervals',{
		get(_){
			console.log('init from notes',
					   	this.get('song.main'),
						this.get('song.main.intervals') ) 
			let notesMap = [ ],
				octaves = [.5,1,2,4],
				intervals = this.get('song.main.intervals') || [7,5,5,5,4,5],
				octave  = 0,
				relativeTone = intervals.shift()+octave || 4,
				arrays =  [],
				indexes = [],
				strings = this.get('song.main.strings.options') || 6,
				frets   = this.get('song.main.frets.options') || 22,
				string = 5,
				frequencies = [
								261.63,	//	0
									277.18,	//	1
									293.66,	//	2 
									311.13,	//	3 
									329.63,	//	4 
									349.23,	//	5 
									369.99,	//	6 
									392,	  //	7
									415.3, 	//	8
									440,	  //	9	
									466.16,	//	10 
									493.88  //	11 
							  ];

				intervals.unshift(relativeTone);

			notesMap  = octaves
						  .map( multiplier => frequencies
						  .map( frequency => multiplier * frequency ))
						  .reduce((e,f)=>e.concat(f))

		/*
				while(string >= 0){
				  let start; 
				  switch(string){
					  case 5:  start = 4 + ( 4*5 ) + 4 ;break;
					  case 4:  start = 4 + ( 3*5 ) + 4 ;break;
					  default: start = 4 + ( string*5 );break;
				  }
				   strings[string] = notesMap.slice(start,start+frets)
				  strings[string].unshift(1)
				   string--
				}
		*/
				//      should be 6
			//this.set('song.notesMap',notesMap)
				arrays = intervals
						.map( (step,string) => {
							let start;
							if(string === 0){
								start = relativeTone
							}else{
								start = intervals.reduce( (a,b,f) => {
									return f< string? a+b : a},
								relativeTone);
							}
							indexes.push(start)
							step  = notesMap.slice(start,start+frets)                 
							step.unshift(1)

							return step 
						});

			this.set('indexes',indexes)

			console.log('arrays',`
						  `,    
						  intervals,`
						  `,
						  strings,`
						  `,                 
						  arrays)

			if(this.get('_init')){
				console.log('initializing tuning')
				this.set('_init',false)
				return arrays.reverse() //strings
			}else{ 
				console.log('updating tuning',this.get('_isLeft'))
				if (this.get('isLeft') === true) {
					arrays = arrays.reverse()
			}

				this.get('content').forEach( (e,f) => {
					e.set('freqs',arrays[f])
				})
				return arrays
			}
		}
	}),
	
	update:Ember.computed('song.strings','isLeft',{
		get(){
		}
	})
})
