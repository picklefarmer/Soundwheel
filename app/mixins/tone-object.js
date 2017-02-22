
import Ember from 'ember';
import createWaveTable from './functions/createWaveTable';
import glide from './functions/glideTone';
import play from './functions/playTone';

export default Ember.Mixin.create({

		toneObject:Ember.Object.extend({

		init(){

			var boardVolume   = this.get('boardVolume'),
  				tone = this.get('tone'),
	  			toneGain  = this.get('toneGain');

			console.log('tone init')
		//  this.get('instruments.selected')
		//  Ember.run(this,"instrumentObserver")
			tone.start(0)
			tone.connect(toneGain)
			toneGain.connect(boardVolume)
			//ctx.gain.value = 0.166
			//ctx.connect(MV)
		},

    instrument:Ember.computed('instruments.selected',{

			get(){     
			
				console.log('tone init_instrumentObserver')
		
				var instrument = this.get('instruments.selected');


				if(instrument){

					let tone = this.get('tone'),
						ctx = this.get('toneGain'),
						ac = this.get('ac'),
						W,
						I;  
			   
					if( typeof instrument === "object"){
				  
						I =  instrument;
				  	W =  ac.createPeriodicWave(  I.real, I.imag,{disableNormalization:true});
						
						console.log(I,"tone object map")

				  	tone.setPeriodicWave(W);

					}else if(typeof instrument === "string"){
				  	
						W	= createWaveTable(ac)
									  	
						tone.setPeriodicWave(W)
				 	 		console.log('default') 
					}

					return tone
			  	
				}else{
					let ac = this.get('ac')	;
					let W	= createWaveTable(ac);
									  	
					let tone = this.get('tone');

					tone.setPeriodicWave(W)

					return tone
				} 

			}

		}),



/*
    freq:function(name,tone){
      return this.get('freqs').objectAt(tone)
    }.property('freqs'),
  */  
   	toneGain:Ember.computed('ac',{
			get(){
				let gain = this.get('ac').createGain();
				gain.gain.value = 4
     			return gain
					//this.get('ac').createGain()
			}
		}),
	
    analyser:Ember.computed('ac',function(){
        let analyser =  this.get('ac').createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0;
         this.get('toneGain').connect(analyser)
         return analyser
    }), 

		tone:Ember.computed('ac',{
			get(){
				return this.get('ac').createOscillator()
			}
		}),

		play,
		glide,
    pause(){
    	// console.log( 'pause' ) 
      	this.get('toneGain').gain.exponentialRampToValueAtTime(0.001,this.get('tone').context.currentTime)
    	},

	    volume:Ember.computed({
			set(value){
  				this.get('toneGain').gain.value = value;
			}
		})   
	})	

});
