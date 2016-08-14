export default function(_,b){
				console.log(b,"beat index")
	
				if(b < 0){
					b = this.get('division')-1
				}
				_ = b%this.get('division') || 0;


//        if(this.get('isBeat')){
  				Ember.run(this,this.get('playMatrix.beat'),_ ) 
  //      }

				return _


		}

/* 		updateMeter(beat,ctx,prog){
//			var ctx = this.get('options.meterBar');
			console.log('updateMeter',prog)
			let tempo = this.get('tempo');//~~this.get('tempo')/8;
			let progress = prog || 1;
			let time = progress+1 * ~~tempo/beat;

			window.requestAnimationFrame(function(){
				ctx.clearRect(0,0,900,150)
				ctx.fillStyle = "red";
				ctx.fillRect(0,0,900,150)
				ctx.fillStyle = "black";
				ctx.fillRect(60+progress*40,0,40,150)
			})

			if(progress < beat){
				Ember.run.later(this,'updateMeter',beat,ctx,++progress,time)
			}
			
		},
*/
