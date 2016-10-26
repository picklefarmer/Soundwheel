import Ember from 'ember';
import Tone from '../mixins/tone-object';
import ImpulseResponse from './functions/impulseResponse';

export default Ember.Service.extend(Tone,{
  	instruments:Ember.inject.service(),
  	song:Ember.inject.service(),

  	tone(freqs){
  
      return this.get('toneObject')
                  .create({
                    song:this.get('song'),
                    instruments:this.get('instruments'),
                    freqs:freqs,
                    masterVolume:this.get('masterVolume'),
                    ac:this.get('ac')
                   })
  	},

  	tempo:Ember.computed('song.tempo',{
		get(){
    		return this.get('song.tempo')
		}
  	}),
  analyser:Ember.computed('ac','masterVolume',function(){
    const analyser = this.get('ac').createAnalyser();
		analyser.fftSize = 512;
		analyser.smoothingTimeConstant = 0.5;

    return analyser

  }),
	reverb:Ember.computed('ac',function(){
					console.error(' is con volver from web audio' ) 
			let ac = this.get('ac'),
					reverb = ac.createConvolver();

			reverb.buffer = ImpulseResponse(ac,4,4,false)
			return reverb
	}),
	compressor:Ember.computed('ac',function(){
		let ac 					=	this.get('ac'),
				analyser		=	this.get('analyser'),
				compressor 	= ac.createDynamicsCompressor();

				compressor.connect(ac.destination)
		   	compressor.connect(this.get('analyser'));

		return compressor
	}),
	masterVolume:Ember.computed({
  		get(){
		    var ac 			= this.get('ac'),
        		gain		= ac.createGain(),
	        	comp = this.get('compressor');

					gain.connect(comp)
        	return gain
		},
		set(_,volume){
			var ac = this.get('masterVolume');

				ac.gain.value = volume;
				return ac
		},
	}),

  	ac:Ember.computed({
		get(){
				let ac = window.AudioContext || window.webkitAudioContext;
		    return  new ac()
		}
	})
})

