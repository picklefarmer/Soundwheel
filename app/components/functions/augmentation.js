export default {



	sharp(x,y){
		let ctx = this.get('ctx'),
			measure_width = this.get('measure_width'),
			measureIndex = this.get('measureIndex'),
			stave_key   = this.get('stave_key'),
			note_width = this.get('note_width');
								//y					=	yObject.note + yObject.o;
									
					 
						//y = y * note_width + (y) - stave_key 
						//x = (x * note_width * 5) + measureIndex*measure_width + (isOdd?40:6)
						
						y = y * note_width + y -12
          	x = x * note_width*2

			ctx.beginPath()
			ctx.moveTo(x+2,y)
			ctx.lineTo(x+2,y+16)

			ctx.moveTo(x+7,y-2)
			ctx.lineTo(x+7,y+14)

			ctx.lineWidth =2
			ctx.stroke()

			ctx.beginPath()
			ctx.moveTo(x,y+6)
			ctx.lineTo(x+9,y+2)

			ctx.moveTo(x,y+12)
			ctx.lineTo(x+9,y+8)

			ctx.lineWidth =4
			ctx.stroke()
			/*
		let lineLength = 18,
				offset = 3,
				suspension = 9,
				skew	=  6,
				nudge	=  0;

			//horizontal
			ctx.moveTo(nudge+x,y+offset)
			ctx.lineTo(x+lineLength-nudge,y+offset-skew)

			ctx.moveTo(nudge+x,y+suspension)
			ctx.lineTo(x+lineLength-nudge,y+suspension-skew)

			ctx.lineWidth=3
			ctx.stroke()
			//vertical
			ctx.moveTo(x+offset,y)
			ctx.lineTo(x+offset,y+lineLength)

			ctx.moveTo(x+suspension,y-skew)
			ctx.lineTo(x+suspension,y+lineLength-skew+nudge)

			ctx.lineWidth=2
			ctx.stroke()
*/
	},

	flat(x,y){
		let ctx = this.get('ctx'),
				measure_width = this.get('measure_width'),
				measureIndex = this.get('measureIndex'),
				stave_key   = this.get('stave_key'),
				note_width = this.get('note_width');
	//			y					=	yObject.note + yObject.o;
			
		y = y * note_width + y -4
		x = x * note_width*2

		//y = y * note_width + (y) - stave_key 
		//x = (x * note_width * 5) + measureIndex*measure_width + (isOdd?40:6)
		ctx.beginPath()

		ctx.moveTo(x-1,y-12)
		ctx.lineTo(x-1,y+4)
		ctx.quadraticCurveTo(x+6,y-2,x-1,y-4)
		ctx.lineWidth = 2
		ctx.stroke()
		ctx.closePath()
		/*
		ctx.ellipse(x,y,4,5, -Math.PI/2,Math.PI*2,Math.PI)
		ctx.closePath()
		ctx.fill()
		ctx.beginPath()
		ctx.ellipse(x+1,y,1,3, Math.PI,0,Math.PI*2)
		ctx.save()
		ctx.clip()
		ctx.clearRect(x-note_width,y-note_width,10,10)
		ctx.restore()
		*/

		//ctx.fillRect(x-1,y+4,2,-14)

}
}
