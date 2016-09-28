import lengthFunc	from './beatLength';
import restFunc	from './restLength';
import testPlaceImage from './drawStaveItem';

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

placeImage = function(beat,x,y,beatLength,measureIndex,isOdd,isFlip){

    let graphics	= this.get('graphics'),
			 	dotted		= beatLength.mod,
				beatName	=	beatLength.name,
				source,
				type		 	= isOdd?'stem':(isFlip?'flipVertical':'default');
			
		if(!beat.rest){	
    		source   	= this.get('elements')[beatName][type] *10 +12
		}else{
				source		= this.get('elements')[beatName] * 10 +12
		}

		switch(dotted){
				case undefined: break;
				default: dotted = this.get('elements').dotted * 10 + 12;break;
		}

		// Just draw without stem for now | draw stem in with beam
		if(beatName === "eight_note"){
				if( isFlip ){		
					source	 = this.get('elements')[beatName].stem * 10 +12;
				}else{
					source	 = this.get('elements')[beatName].m_stem * 10 +12;
				}
		}


    console.log('place image graphics', beatLength,source, this.get('elements'))

    testPlaceImage.call(this,this.get('ctx'),graphics,source,measureIndex,x,y,isOdd,0)

		if(beat.natural === false){
			let	flats		 	= this.get('elements').flat * 10 + 12;
	    testPlaceImage.call(this,this.get('ctx'),graphics,flats,measureIndex,x,y,isOdd,-10)
		}
		if(dotted){
			testPlaceImage.call(this,this.get('ctx'),graphics,dotted,measureIndex,x,y,isOdd,10)
		}
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


