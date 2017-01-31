export default function(tone,stanza){

			console.log( ' post _simple check' ) 


			this.set('toneIndex',tone)
			var ctx   = this.get('toneGain'),
					instrument = this.get('instrument'),

					freq  = this.get('freqs').objectAt(tone),
					currentTime = ctx.context.currentTime;

				ctx.gain.cancelScheduledValues(currentTime);
		  	ctx.gain.setValueAtTime(0.166,currentTime)
		  	instrument.frequency.setValueAtTime(freq,currentTime)

		  	ctx.gain.exponentialRampToValueAtTime(0.0001,currentTime + (stanza))
		  	//ctx.gain.setValueAtTime(0.0001,currentTime + (stanza))

  	};
