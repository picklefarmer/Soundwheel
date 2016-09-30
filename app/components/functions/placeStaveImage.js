import drawImage	from './drawStaveItem';

export default function(beat,x,y,beatLength,measureIndex,isOdd,isFlip){

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

let saturate	= { ctx:this.get('ctx'),graphics,source,measureIndex,x,y,isOdd},
		flat = this.get('elements').flat *10 +12,
		sourceList= [[beat.isNatural,flat,-10],[dotted,dotted,10],[true,source,0]];

		for(let [bowl,source,offset] of sourceList){
			if(bowl){
				saturate.source = source
				saturate.isNatural	=	offset
				drawImage.call(this,saturate)
			}	
		}
}


