//import Augmentation from 'augmentation';

export default function(x,y,isHang,isMulti){
/*
      let note_width = this.get('note_width'),
          measureIndex = this.get('measureIndex'),
          measure_width = this.get('measure_width'),
          stave_key     = this.get('stave_key'),
          ctx = this.get('ctx'),
					y 	= yObject.note + yObject.o;

          console.log(x,yObject,isOdd,' half note' )
          y = y * note_width + (y) - stave_key 
          x = (x * note_width * 5) + measureIndex*measure_width + (isOdd? 30 : 20);
          
          if(!isOdd){
						ctx.fillRect(x+note_width-2,y,2,-30)
					}
*/
				let ctx = this.get('ctx'),
						note_width = this.get('note_width');
						y = y * note_width +y +5;
						x = x * note_width*2 -2.5

					if(isHang !== false){
						ctx.beginPath()
						ctx.moveTo(x+note_width-2,y)
						ctx.lineTo(x+note_width-1,y+(isHang?24:-24))
						if(!isMulti){
							ctx.bezierCurveTo(x+1,y+(isHang?16:-16),x+20,y+(isHang?12:-12),x+6,y+(isHang?4:-4))
						}
						ctx.lineWidth =2;
						ctx.stroke()
					}


    	ctx.beginPath() 
					ctx.ellipse(x,y,4,6,Math.PI/4,0,Math.PI*2)
					ctx.fill()
        };

			


