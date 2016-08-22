
export default function(x,y){
      console.log('whole_note',x,y)
      let note_width = this.get('note_width'),
          measure_width = this.get('measure_width'),
          measureIndex = this.get('measureIndex'),
          stave_key    =  this.get('stave_key'),
          ctx = this.get('ctx');

      console.log(note_width,measureIndex,' whole note' )
          y = y * note_width + y - stave_key 
          x = (x * note_width*2) + measureIndex*measure_width + 20;
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
 
