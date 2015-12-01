App.ToneObject = Em.Mixin.create({
		toneObject:Em.Object.extend({
		init(){
			var MV   = this.get('masterVolume'),
				tone = this.get('tone'),
				ctx  = this.get('ctx'),
				ac   = this.get('ac');

			console.log('tone init')
		//  this.get('instruments.selected')
		//  Em.run(this,"instrumentObserver")
			this.get('tone').start(0)
			tone.connect(ctx)
			ctx.gain.value = 0.166
			ctx.connect(MV)
		},

	    instrument:Em.computed('instruments.selected',{
			get(){     
				console.log('tone init_instrumentObserver')

				var instrument = this.get('instruments.selected');

				if(instrument){
					let tone = this.get('tone'),
						ctx = this.get('ctx'),
						ac = this.get('ac'),
						W,
						I;  
			   
					if( typeof instrument === "object"){
				  
						I =  instrument;
				  		W =  ac.createPeriodicWave(  I.real, I.imag)

				  		console.log(I,"tone object map")

				  		tone.setPeriodicWave(W);

					}else if(typeof instrument === "string"){
				  		W	= ac.createPeriodicWave(new Float32Array([0.0,0.0]),
						   							new Float32Array([1.0,1.0]));
				  		tone.setPeriodicWave(W)
				 	 	console.log('default') 
					}
					return tone
			  	}else{
					
					return this.get('tone')
				} 
			}
		}),



/*
    freq:function(name,tone){
      return this.get('freqs').objectAt(tone)
    }.property('freqs'),
  */  
     	ctx:Em.computed('ac',{
			get(){
      			return this.get('ac').createGain()
			}
		}),

    	tone:Em.computed('ac',{
			get(){
				return this.get('ac').createOscillator()
			}
		}),

	    play(tone,offset){

			var ctx   = this.get('ctx'),
				instrument = this.get('instrument'),
				tempo = this.get('song.tempo'),
				freq  = this.get('freqs').objectAt(tone),
				offset= offset || 0,
				currentTime = ctx.context.currentTime + offset;

		  	console.log(tone,offset,"play")

		  	//ctx.gain.exponentialRampToValueAtTime(0.166,currentTime+tempo/16000)
		  	ctx.gain.setTargetAtTime(0.166,currentTime+tempo/16000,0.15)
		  	//ramp(0.166,currentTime+tempo/16000)
		  	instrument.frequency.setValueAtTime(freq,currentTime)
		  	ctx.gain.exponentialRampToValueAtTime(0.001,currentTime+tempo/2000)
		  	//ctx.gain.exponentialRampToValueAtTime(0.001,currentTime+tempo/2000)
    	},

	    pause(){
    	// console.log( 'pause' ) 
      	this.get('ctx').gain.exponentialRampToValueAtTime(0.001,this.get('ctx').context.currentTime)
    	},

	    volume:Em.computed({
			set(value){
  				this.get('ctx').gain.value = value;
			}
		})   
	})	
})
