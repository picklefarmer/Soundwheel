export default function(tones,stanza){
			var ctx   = this.get('ctx'),
					instrument = this.get('instrument'),
					currentTime = ctx.context.currentTime;

			ctx.gain.cancelScheduledValues(currentTime);
			instrument.frequency.cancelScheduledValues(currentTime);
			ctx.gain.setValueAtTime(0.166,currentTime)

			let freqs  = new Float32Array(tones.map( tone=>this.get('freqs').objectAt(tone)));
//					freqlen=	stanza/freqs.length,i=1;
		  	

//				instrument.frequency.setValueAtTime(freqs[0],currentTime)
				instrument.frequency.setValueCurveAtTime(freqs,currentTime,stanza)

/*			for(let freq of freqs){ 
				instrument.frequency.exponentialRampToValueAtTime(freq,currentTime+(i*freqlen))
				i++
			}
*/

let valMap = new Float32Array([0.166,0.001]);



		  	ctx.gain.setValueCurveAtTime(valMap,currentTime, (stanza))
		  	//ctx.gain.exponentialRampToValueAtTime(0.0001,currentTime + (stanza))
//			this.set('toneIndex',tone)
				console.log( ' glide post _simple check' ) 
		  	//ctx.gain.setValueAtTime(0.0001,currentTime + (stanza))

  	};
