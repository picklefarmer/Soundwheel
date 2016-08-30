
let isOdd = false,

odd = function(difference,isOdd){

  if( difference < 2){
    if(isOdd){
      isOdd = false;
    }else{
      isOdd = true 
    }
  }else{
    isOdd = false;      
  }
},
testPlaceImage= function(ctx,graphics,source,measureIndex,x,y){
    ctx.drawImage( 
/*simage*/  graphics,
/*sx*/      source,
/*sy*/      10,
/*swidth*/  20,
/*sheight*/ 70,
/*dx*/      x*20 + measureIndex*240,
/*dy*/      y*10 - 50,
/*dwidth*/  20,
/*dheight*/ 70)

},
placeImage = function(beat,x,y,beatLength,measureIndex,isOdd){

//    image, sx, sy, swidth, sheight, dx, dy, dwidth,dheight)  
    //placeImage(beat,x,y,beatLength)
    let graphics = this.get('graphics'),
        source   =  this.get('elements')[beatLength].default *10 +12 /*[isOdd? 'stem':'default']*/;
    //this.get('ctx').fillText(source,x*30,y*10 - 20)
  //  this.get('ctx').fillText(beatLength,x*30,y*10)
//    this.get('ctx').fillText(beat.l,x*30,y*10)
//    this.get('ctx').fillText(this.get('elements')[beatLength].default,x*20,y*10)
    console.log('place image graphics', beatLength,source)
    testPlaceImage(this.get('ctx'),graphics,source,measureIndex,x,y)
},

drawGraphics = function(beat,noteIndex,m_beat,x,measureIndex){

  if(noteIndex){

    let next        = m_beat[noteIndex-1],
        nextBeat    = next.note + next.o,
        current     = beat.note + beat.o,
        difference  = Math.abs(nextBeat - current),
        y           = current,
        note,
        beatLength;

    switch(beat.l){
      case undefined: beatLength = 'eight_note';break;
      case 1: beatLength = 'eight_note';break;
      case 2: beatLength = 'quarter_note';break;
      case 3: beatLength = 'quarter_note';break;
      case 4: beatLength = 'half_note';break;
      case 5: beatLength = 'half_note';break;
      default: beatLength = 'whole_note';break;
    } 

    odd(difference,isOdd)
    
    note = [ beat, x , y, beatLength, measureIndex, isOdd ] ;
    //note = [ beat, x , y,'quarter_note'/* beatLength*/, measureIndex, isOdd ] ;


    placeImage.apply(this,note)
            
  }else{

    isOdd = false;

  }
};


export default function(beat,index){
  console.log(beat,index,'beat_graphics')

  var notesLength = beat.length;

  if(!beat.rest){
    
    for(var noteIndex = 0; noteIndex < notesLength;noteIndex++){
      drawGraphics.call(this,beat[noteIndex],noteIndex,beat,index,this.get('measureIndex'))
    }
  }else{
  
  }
}
