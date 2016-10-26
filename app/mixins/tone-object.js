window.onerror = function(e){
	window.alert(e)
}

import Ember from 'ember';
import createWaveTable from './functions/createWaveTable';
import play from './functions/playTone';

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
   	ctx:Ember.computed('ac',{
			get(){
     			return this.get('ac').createGain()
			}
		}),
	
    analyser:Ember.computed('ac',function(){
        let analyser =  this.get('ac').createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 1;
         this.get('ctx').connect(analyser)
         return analyser
    }), 

		tone:Ember.computed('ac',{
			get(){
				return this.get('ac').createOscillator()
			}
		}),

		play,
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
