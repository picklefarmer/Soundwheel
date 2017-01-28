import {sun} from './../../mixins/instances/notemoji';

const offset = 18,
			scale = 36,
			l		=	8,
			graphic = function(x,y,ctx,back){
				let X = offset+x+scale/2,
						Y	=	offset/2+y+scale/2;
				ctx.beginPath()
				ctx.strokeStyle = 'coral'
				ctx.fillText('\u2600',X-18,Y+14)
				ctx.stroke()

				ctx.strokeStyle = back
				ctx.arc(X,Y,
					((scale/2)/8)*l,
					0,2*Math.PI
				)
			};
export default function(chord,pulse,fadeIn){

			var chordTemp = this.get('chordTemp'),
					isLow			=	this.get('isLow'),
					back			=	this.get('song.main.overlay'),
					overMoji	=	this.get('song.main.overMoji') || '\u2600',
					ctx = this.get('options.centerView');
			
  chordTemp.map(([fret,string]) => ctx.clearRect(( fret+scale/2 ) -4  , string - 4  ,scale+ 8 ,8+ scale+offset))

		ctx.strokeStyle = this.get('song.main.overlay')
		ctx.fillStyle 	= 'red'
		ctx.font = '4rem Ariel';
		console.log('dotChord' , this.get('song.main.hover'))	
//	ctx.globalCompositeOperation = "source-over"
//	ctx.globalAlpha=	pulse || 0.5
		
	for(var [x,y] of chord){
		if(x){
			graphic(x,y,ctx,back)
		
			if(isLow){
				ctx.fill();
			}else{
				ctx.stroke()
			}
		}
	}
		this.set('chordTemp',chord)

/*
 *
	if(pulse){
		ctx.fillStyle = "rgba(255,255,255,0.5)" 
		ctx.globalAlpha=1
		return pulse+=0.125
	}else{
		ctx.globalAlpha=0.5
	}
	
	*/
		//ctx.globalAlpha=1
	
}


