export default function(tone,stanza){

			console.log( ' post _simple check' ) 

			var ctx   = this.get('ctx'),
					instrument = this.get('instrument'),
			//		tempo = this.get('song.tempo')/1000,
					//tempo = this.get('song.tempo'),

					freq  = this.get('freqs').objectAt(tone),
		//			offset= tempo/8,

//					envelope = offset,//(Math.E/2),//  Math.PI/Math.E))/2,
	//				endTime = (stanza?stanza/tempo:tempo)-offset,
					currentTime = ctx.context.currentTime;

//		  	console.log(tone,endTime,"play")

		  	ctx.gain.exponentialRampToValueAtTime(0.166,currentTime)
		  	//ctx.gain.setTargetAtTime(0.166,currentTime, envelope)
		  	instrument.frequency.setValueAtTime(freq,currentTime)
console.log(currentTime)

		  	ctx.gain.exponentialRampToValueAtTime(0.001,currentTime + (stanza))
//				ctx.gain.setTargetAtTime(0.001,currentTime + stanza,2)
		  	//ramp(0.166,currentTime+tempo/16000)
				//
		  	//ctx.gain.exponentialRampToValueAtTime(0.001,currentTime)
		  	//ctx.gain.setTargetAtTime(0.001,currentTime + tempo,0.15)
	
		  	//ctx.gain.exponentialRampToValueAtTime(0.166,currentTime+tempo/16000)
				//
		  	//ctx.gain.setTargetAtTime(0.166,currentTime+tempo/16000,0.15)
  	};


