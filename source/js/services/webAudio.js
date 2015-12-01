
App.WebaudioService = Em.Service.extend(App.ToneObject,{
  	instruments:Em.inject.service(),
  	song:Em.inject.service(),

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

  	tempo:Em.computed('song.tempo',{
		get(){
    		return this.get('song.tempo')
		}
  	}),

	masterVolume:Em.computed({
  		get(){
		    var ac = this.get('ac'),
        	gain = ac.createGain(),
        	comp = ac.createDynamicsCompressor();

        	gain.connect(comp)
        	comp.connect(ac.destination)

        	return gain
		},
		set(_,volume){
			var ac = this.get('masterVolume');

				av.gain.value = volume;
				return ac
		},
	}),

  	ac:Em.computed({
		get(){
		    return  new (window.AudioContext || window.webkitAudioContext)
		}
	})
})

