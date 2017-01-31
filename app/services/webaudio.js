import Ember from 'ember';
import Tone from '../mixins/tone-object';
import Gain 		from './functions/generateGain';
import AudioTree from './instances/audioTree';
import ImpulseResponse from './functions/impulseResponse';

export default Ember.Service.extend(Tone,{
	init(){
		this._super()

		AudioTree.call(this)
	},
  instruments:Ember.inject.service(),
  song:Ember.inject.service(),

  tone(freqs){
  
      return this.get('toneObject')
                  .create({
                    song:this.get('song'),
                    instruments:this.get('instruments'),
                    freqs:freqs,
                    boardVolume:this.get('boardVolume'),
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
				compressor 	= ac.createDynamicsCompressor();
		return compressor
	}),

	kitVolume:Ember.computed({
		set(_,volume){
			var ac = this.get('kitVolume');
				ac.gain.value = volume;
				return ac
		},
		get(){
		   var ac 			= this.get('ac'),
        		gain		= ac.createGain();
			 		return gain
				}
	}),
	boardVolume:Ember.computed({
		set(_,volume){
			var ac = this.get('boardVolume');
				ac.gain.value = volume;
				return ac
		},
		get(){
		   var ac 			= this.get('ac'),
        		gain		= ac.createGain();
						return gain;
				}
	}),
	masterVolume:Ember.computed({
 		set(_,volume){
			var ac = this.get('masterVolume');

				ac.gain.value = volume;
				return ac
		},
		get(){
		   var ac 			= this.get('ac'),
        		gain		= ac.createGain();
			 		return gain
				}
	}),
ac:Ember.computed(function(){
		let ac = window.AudioContext || window.webkitAudioContext;
    return  new ac()
	})
})

