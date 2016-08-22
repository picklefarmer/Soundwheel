export default function(x,yObject,isOdd){
  if(yObject.natural){
    let ctx = this.get('ctx'),
        measure_width = this.get('measure_width'),
        measureIndex = this.get('measureIndex'),
        stave_key   = this.get('stave_key'),
        note_width = this.get('note_width'),
				y					=	yObject.note + yObject.o;
          
   
    y = y * note_width + (y) - stave_key 
    x = (x * note_width * 5) + measureIndex*measure_width + (isOdd?40:6)
    ctx.beginPath()
    ctx.ellipse(x,y,4,5, -Math.PI/2,Math.PI*2,Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(x+1,y,1,3, Math.PI,0,Math.PI*2)
    ctx.save()
    ctx.clip()
    ctx.clearRect(x-note_width,y-note_width,10,10)
    ctx.restore()

    ctx.fillRect(x-1,y+4,2,-14)

  }        
}

