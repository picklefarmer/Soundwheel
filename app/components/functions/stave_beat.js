import Pitch      from  './pitch';
import whole_note from  './whole_note';
import half_note  from  './half_note';
import quarter_note  from  './quarter_note';
import rest_note  from  './rest_note';
import augmentation from  './augmentation';


export default function(beatArray,index){
      let isOdd		= false,
					arrayLength	= beatArray.length;
			console.log(beatArray,index,'beatArray')
			if(!beatArray.rest){
				beatArray.forEach(function(beat,f){
				if(f){

					let nextBeat = beatArray[f-1],
							difference = Math.abs((nextBeat.note + nextBeat.o) - beat.note + beat.o);

					console.log (difference, 'difference')
					if( difference < 2){
						if(isOdd){
							isOdd = false;	
						}else{
							isOdd = true
						}
					}else{
						isOdd = false;
					}
				}
        
        let note = [ 
  	          index,
							beat,
							isOdd
            ];

            augmentation.apply(this,note)
						switch(beat.l){
		          case 2:  quarter_note.apply(this,note);break;
		          case 3:  half_note.apply(this,note);break;
		          default:  half_note.apply(this,note);break;
						}
        },this)
			}else{
				console.log('implementing rest beat')
				if(beatArray.rest !== true){
					rest_note.apply(this,[beatArray.rest,index])
				}
			}
  }
/*
          let row = string[beat].length,
}else{
  
            while(row--){
              let note =  [
                       row,
                       pitch.call(this,pulse[row][0],index)
                        ];
              switch(string[beat][1]){
                case 1: whole_note.apply(this,note);break;
                default: half_note.apply(this,note);break;
              }
            }
          }
          */
