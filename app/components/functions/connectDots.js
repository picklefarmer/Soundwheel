const getY = function(beat){
	return (beat.note * 6) - ((3-beat.o)*(6*7))
};

export default function(chord,ctx,x){

	let length = chord.length,
			noteWidth	=	this.get('note_width')*2,
			first	 = 32-getY(chord[0])-noteWidth,
			last	 = 32-getY(chord[length-1])-noteWidth;

			x = this.get('stave_offset')+ x*20 + this.get('measureIndex')*240 + noteWidth
			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.moveTo(x,first)
			ctx.lineTo(x,last)

//			ctx.fillRect(x,32-getY(first),12,32-getY(last))
			ctx.stroke()
}
