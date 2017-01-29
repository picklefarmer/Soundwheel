import {sun} from './../../mixins/instances/notemoji';

const A = '#d8faff',
      C = '#382496',
      D = '#12182A',
      E = '#34d8d7',
      B = chroma.scale([C,E,A]).colors(8);
const offset = 18,
			scale = 36,
      fontHeight= 1.68,
      rotation  = 4,
			l		=	8,
      factor  = (Math.PI*2)/8,
      sliceWidth  = factor,
			graphic = function(x,y,ctx,back,overMoji){
				let X = offset+x+scale/2,
						Y	=	offset/2+y+scale/2;

        for(var v = 9; v > 0; v--){
          let pi = v*factor;
          ctx.fillStyle = B[(v+rotation)%7]
            ctx.beginPath()
          ctx.arc(X,Y,18,pi,pi+sliceWidth,false)
          ctx.lineTo(X,Y)
          ctx.fill()
        }
				ctx.beginPath()
//				ctx.strokeStyle = 'coral'
        ctx.fillStyle = A
				ctx.fillText(overMoji,X-8,Y+5)
				ctx.stroke()

        
				ctx.strokeStyle =D //back
				ctx.arc(X,Y,
					((scale/2)/8)*l,
					0,2*Math.PI
				)
			};
export default function(chord,pulse,fadeIn){

			var chordTemp = this.get('chordTemp'),
					isLow			=	this.get('isLow'),
					back			=	this.get('song.main.overlay'),
					overMoji	=	this.get('song.main.bankmoji.options') || '\u2600',
					ctx = this.get('options.centerView');
			
  chordTemp.map(([fret,string]) => ctx.clearRect(( fret+scale/2 ) -4  , string - 4  ,scale+ 8 ,8+ scale+offset))

		ctx.strokeStyle = this.get('song.main.overlay')
    ctx.lineWidth = '3.25'
		ctx.fillStyle 	= 'red'
		ctx.font = fontHeight+'rem Ariel';
    ctx['text-align'] = 'center'
		console.log('dotChord' , this.get('song.main.hover'))	
//	ctx.globalCompositeOperation = "source-over"
//	ctx.globalAlpha=	pulse || 0.5
		
	for(var [x,y] of chord){
		if(x){
			graphic(x,y,ctx,back,overMoji)
		
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


