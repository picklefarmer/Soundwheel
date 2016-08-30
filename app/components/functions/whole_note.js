
export default function(x,y,z){
      console.log('whole_note',x,y,this)
        let ctx = this.get('ctx'),
            note_width = this.get('note_width');
			
/*
        let note_width = this.get('note_width'),
          measure_width = this.get('measure_width'),
          measureIndex = z || this.get('measureIndex'),
          stave_key    = z? 0: this.get('stave_key'),
          ctx = this.get('ctx');
      console.log(note_width,measureIndex,' whole note' )
          y = y * note_width + y - stave_key 
          x = (x * note_width*2) + measureIndex*measure_width + 20;

*/
          y = y * note_width + y + 5
          x = x * note_width*2

          console.log(y,x, 'whole note')
          ctx.beginPath()
          ctx.ellipse(x,y,7,4,0,0,Math.PI*2)
          ctx.closePath()
          ctx.fill()
          ctx.beginPath()
          ctx.ellipse(x,y,2,4, -Math.PI/4,0,Math.PI*2)
          ctx.save()
          ctx.clip()
          ctx.clearRect(x-note_width,y-note_width,10,10)
          ctx.restore()
        }
 
