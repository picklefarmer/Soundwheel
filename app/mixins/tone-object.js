import Ember from 'ember';

export default Ember.Mixin.create({

		toneObject:Ember.Object.extend({

		init(){

			var MV   = this.get('masterVolume'),
				tone = this.get('tone'),
				ctx  = this.get('ctx'),
				ac   = this.get('ac');

			console.log('tone init')
		//  this.get('instruments.selected')
		//  Ember.run(this,"instrumentObserver")
			this.get('tone').start(0)
			tone.connect(ctx)
			ctx.gain.value = 0.166
			ctx.connect(MV)
		},

    instrument:Ember.computed('instruments.selected',{

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
				  	W =  ac.createPeriodicWave(  I.real, I.imag);
						
						console.log(I,"tone object map")

				  	tone.setPeriodicWave(W);

					}else if(typeof instrument === "string"){
				  	
						W	= ac.createPeriodicWave(
							new Float32Array([0.0,0.0]),
							new Float32Array([1.0,1.0])
						)
				  	
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
   	ctx:Ember.computed('ac',{
			get(){
     			return this.get('ac').createGain()
			}
		}),
		
		tone:Ember.computed('ac',{
			get(){
				return this.get('ac').createOscillator()
			}
		}),

    play(tone,stanza){

			console.log( ' post _simple check' ) 

			var ctx   = this.get('ctx'),
					instrument = this.get('instrument'),
					tempo = this.get('song.tempo')/1000,
					//tempo = this.get('song.tempo'),

					freq  = this.get('freqs').objectAt(tone),
					offset= tempo/8,

					envelope = offset,//(Math.E/2),//  Math.PI/Math.E))/2,
					endTime = (stanza?stanza/tempo:tempo)-offset,
					currentTime = ctx.context.currentTime;

		  	console.log(tone,endTime,"play")

		  	ctx.gain.setTargetAtTime(0.166,currentTime, envelope)
		  	instrument.frequency.setValueAtTime(freq,currentTime)

		  	ctx.gain.setTargetAtTime(0.001,currentTime + endTime,envelope)
		  	//ramp(0.166,currentTime+tempo/16000)
				//
		  	//ctx.gain.exponentialRampToValueAtTime(0.001,currentTime)
		  	//ctx.gain.setTargetAtTime(0.001,currentTime + tempo,0.15)
	
		  	//ctx.gain.exponentialRampToValueAtTime(0.166,currentTime+tempo/16000)
				//
		  	//ctx.gain.setTargetAtTime(0.166,currentTime+tempo/16000,0.15)
    	},

	    pause(){
    	// console.log( 'pause' ) 
      	this.get('ctx').gain.exponentialRampToValueAtTime(0.001,this.get('ctx').context.currentTime)
    	},

	    volume:Ember.computed({
			set(value){
  				this.get('ctx').gain.value = value;
			}
		})   
	})	

});
