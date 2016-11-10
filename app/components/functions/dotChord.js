export default function(chord){

	var offset = 18,
			scale = 36,
			l = 8,
			chordTemp = this.get('chordTemp'),
			ctx = this.get('options.centerView');
			
  chordTemp.map(([fret,string]) => ctx.clearRect(fret+scale/2,string,scale,scale+offset))
        
	ctx.globalCompositeOperation = "source-over"
	ctx.globalAlpha=	0.5
	ctx.fillStyle = "white" 
		
	for(var [x,y] of chord){
		if(x){
			ctx.beginPath()

			ctx.arc(offset+x+scale/2,
				offset/2+y+scale/2,
				((scale/2)/8)*l,
				0,2*Math.PI
			)

			ctx.fill();
		}
	}
	ctx.globalAlpha=1

	this.set('chordTemp',chord)
}


