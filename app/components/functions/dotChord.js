export default function(chord,pulse,fadeIn){

	var offset = 18,
			scale = 36,
			l = 8,
			chordTemp = this.get('chordTemp'),
			isLow			=	this.get('isLow'),
			ctx = this.get('options.centerView');
			
  chordTemp.map(([fret,string]) => ctx.clearRect(( fret+scale/2 ) -4  , string - 4  ,scale+ 8 ,8+ scale+offset))

	console.log('dotChord',chord,pulse)		
//	ctx.globalCompositeOperation = "source-over"
//	ctx.globalAlpha=	pulse || 0.5
		
	for(var [x,y] of chord){
		if(x){
			ctx.beginPath()

			ctx.arc(offset+x+scale/2,
				offset/2+y+scale/2,
				((scale/2)/8)*l,
				0,2*Math.PI
			)

			if(isLow){
				ctx.fill();
			}else{
				ctx.stroke()
			}
		}
	}
		this.set('chordTemp',chord)

	if(pulse){
		ctx.fillStyle = "rgba(255,255,255,0.5)" 
		ctx.globalAlpha=1
		return pulse+=0.125
	}else{
		ctx.globalAlpha=0.5
	}
	
	
		//ctx.globalAlpha=1
	
}


