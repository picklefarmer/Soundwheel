export default {

		eigthRest(x,y,ctx){
			let note_width = this.get('note_width');
			y = y * note_width + y -4
			x = x * note_width*2
						ctx.beginPath()
						ctx.arc(x,y,2,0,Math.PI*2)
						ctx.fill()
						ctx.beginPath()
						ctx.moveTo(x,y+2)
						ctx.quadraticCurveTo(x+4,y+2,x+6,y)
						ctx.lineTo(x+1,y+12)
						ctx.lineWidth =1.5
						ctx.stroke()
		},
			
		quarterRest(x,y,ctx){
			let note_width = this.get('note_width');
			y = y * note_width + y -4
			x = x * note_width*2

						let offset = -5;
					 	y+=offset	
						ctx.beginPath()
						ctx.moveTo(x, y-4)
						ctx.lineTo(x+6,y+6)
						ctx.quadraticCurveTo(x,y+10,x+5,y+14)

						ctx.quadraticCurveTo(x,y+18,x+3,y+22)
						ctx.quadraticCurveTo(x-5,y+10,x+5,y+14)
						ctx.lineTo(x,y+8)
						ctx.quadraticCurveTo(x+6,y+4,x,y-4)
						ctx.stroke()
						ctx.fill()
		},
		halfRest(x,y,ctx){
			let note_width = this.get('note_width');
			y = y * note_width + y -4
			x = x * note_width*2

			ctx.fillRect( x, y, 10, 4);
		}


};
