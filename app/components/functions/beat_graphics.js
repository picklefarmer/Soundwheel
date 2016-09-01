
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
testPlaceImage= function(ctx,graphics,source,measureIndex,x,y,isOdd){
    ctx.drawImage( 
/*simage*/  graphics,
/*sx*/      source,
/*sy*/      10,
/*swidth*/  20,
/*sheight*/ 70,
/*dx*/      x*20 + measureIndex*240 + (isOdd?20:0),
/*dy*/      10 - (y.note*5 - (y.o*25 )),
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
    testPlaceImage(this.get('ctx'),graphics,source,measureIndex,x,y,isOdd)
		if(beatLength === 'eight_note'){
		
		
		}
},
barArray		=	[],
drawBar		= function(){
	
},

lengthFunc	=	function({beat:beat.l}){
	let beatLength;

		switch(beat){
      case undefined: beatLength = 'eight_note';beatArray.push(beat);break;
      case 1: beatLength = 'eight_note';beatArray.push(beat);break;
      case 2: beatLength = 'quarter_note';break;
      case 3: beatLength = 'quarter_note';break;
      case 4: beatLength = 'half_note';break;
      case 5: beatLength = 'half_note';break;
      default: beatLength = 'whole_note';break;
    } 
	
	return beatLength
	
},
drawGraphics = function(beat,noteIndex,m_beat,x,measureIndex){

	let	octave				=	12,
			current				= beat.note + (3-beat.o)*octave,
			y							=	beat,
			note,
			beatLength;

  if(noteIndex){

    let next        = m_beat[noteIndex-1],
        nextBeat    = next.note + (3-next.o)*octave,
        difference  = Math.abs(nextBeat - current);
    
		odd(difference,isOdd)

  }else{

    isOdd = false;

  }
/*
    switch(beat.l){
      case undefined: beatLength = 'eight_note';break;
      case 1: beatLength = 'eight_note';break;
      case 2: beatLength = 'quarter_note';break;
      case 3: beatLength = 'quarter_note';break;
      case 4: beatLength = 'half_note';break;
      case 5: beatLength = 'half_note';break;
      default: beatLength = 'whole_note';break;
    } 
*/
		beatLength = lengthFunc(beat)
    
    note = [ beat, x , y, beatLength, measureIndex, isOdd ] ;
    //note = [ beat, x , y,'quarter_note'/* beatLength*/, measureIndex, isOdd ] ;


    placeImage.apply(this,note)
            
};


export default function(beat,index){
	
	var notesLength = beat.length,
			measureIndex = this.get('measureIndex'),
			noteIndex 	= 0;
	
	beatArray = []
	console.log(beat,index,notesLength,'beat_graphics')

  if(!beat.rest){
// drawBar()    
    for(noteIndex; noteIndex < notesLength;noteIndex++){
			console.log(notesLength,noteIndex,' noteIndex check')
      drawGraphics.call(this,beat[noteIndex],noteIndex,beat,index,measureIndex)
    }
  }else{
  
  }
	drawBar()
}
