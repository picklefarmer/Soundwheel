App.Selected = Ember.Mixin.create({

/*	measure:Em.computed('index','content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			return this.objectAt(this.get('index'))
		}
	}),
*/
	measureLength:0,

	hex:Em.computed('measure.notes.[]',{
		get(){
			console.log('hex init') 
			let notes = this.get('measure.notes');
			console.log(' hex notes' , notes ) 	
			let count = 0,
				array = notes.map( (e,f) =>  {
				  if(typeof e === 'object'){
					 var hex = "0x"+e.shift(),
						 notes = e,
						 length = 0,
						 output = [];
						
					while(hex>>=1){
				   //   console.log(hex%2);
						output[length++] = hex%2 ?
						notes.shift():null;
					}

					count = length>count?length:count;
				
					return output  
				  }else{
					return e
				 }
				});

			this.set('measureLength',count)

			return array
	  }
	  }),
	 
	  update(){
		return (+(measurePart.reduce((a,b)=> ~~a +""+ ~~b ))).toString(16)
			
	  },


		lyrics:Em.computed('measure',{
			get(){
				this.get('measure.lyric')
			},
			set(_,I,II){
				console.log(I,II)
				if(I){
					Em.run.throttle(this,'updator',I,12)
					// 		this.set('measure.lyric',I)
				}
				return this.get('measure.lyric')
			}
		}),

		updator(I,J,K){
			console.log(I,J,K,"ASDF")
			this.set('measure.lyric',I)
		},
/*
		index:Em.computed('content.[]',{
			get(){
				console.log( 'null index of proxy ' ) 
				return 0
			},
			set(_,b){
				console.log(this,b,"index of proxy")
				if(b < 0){
					b = this.get('length')-1
				}
				_ = b%this.get('length') || 0;
				Em.run(this,'playNotes',_ ) 

				return _
			}
		})

*/
	})
