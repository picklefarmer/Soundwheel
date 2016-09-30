import lengthFunc	from './beatLength';
import restFunc	from './restLength';
import drawImage from './drawStaveItem';
import placeImage from './placeStaveImage';

export default function(beat,index,isRest){

	var notesLength = beat.length,
			measureIndex = this.get('measureIndex'),
			noteIndex 	= 0;
	
  if(!isRest){	// drawBar()   || grouping <= ! 
    for(noteIndex; noteIndex < notesLength;noteIndex++){
      drawGraphics.call(this,beat[noteIndex],noteIndex,beat,index,measureIndex)
    }
  }else{
		restGraphics.call(this,beat,index,measureIndex)
  }
}

let drawGraphics = function(beat,noteIndex,m_beat,x,measureIndex){

	let	octave				=	12,
			current				= beat.note + (3-beat.o)*octave,
			y							=	(beat.note * 6) - ((3-beat.o)*(6*7)),
			isFlip				= flip.call(this,y),
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
		beatLength = lengthFunc.call(this,beat,x,y,noteIndex,isFlip,m_beat)
    
    note = [ beat, x , y, beatLength, measureIndex, isOdd, isFlip ] ;
    //note = [ beat, x , y,'quarter_note'/* beatLength*/, measureIndex, isOdd ] ;


    placeImage.apply(this,note)
            
},

isOdd = false,

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

flip = function(y){
	return y > this.get('measure_midPoint')
},

restGraphics = function(beat,x,measureIndex,index){
	//	beat,measureIndex,index)
	let restLength = restFunc.call(this,beat),
			rest			 = [ beat , x , -50, restLength, measureIndex];
			console.log('restmap', restLength)
			placeImage.apply(this,rest)
};
		/*				
			console.log(beat,`rests 
											is
									 			rests`) 
//		this.get('ctx').fillRect(index*20,0,20,20)
   // testPlaceImage(this.get('ctx'),graphics,source,measureIndex,x,y,isOdd,0)
	 	let source 			= this.get('elements'),
				restLength	= ['default','eigthRest','quarterRest','quarterRest','halfRest','halfRest'][beat.rest] || 'default';
	 	this.get('barArray').push('rest')
		testPlaceImage.call(this,	this.get('ctx'),
										this.get('graphics'),
										source[restLength] * 10 +12,
										measureIndex,
										index+ ~~(beat.rest -1)/2,
										-50,
										false,0)
										*/


