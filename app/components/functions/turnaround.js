import NoteLength from './notLength';
import Pitch from './pitch';

export default function(song){
				
  let pitchi = song.map(function(measure,measureIndex){

		let notes = {};
		
    measure.forEach( function(string,stringIndex){
			if(typeof string === 'object'){      
	      string.forEach( function(beat,beatIndex){

  	      if(typeof notes[beatIndex] !== 'object'){
            notes[beatIndex] = []
    	    }

					if(beat){
						let pitch = Pitch.call(this,beat,stringIndex,beatIndex);
						notes[beatIndex].push(pitch)
					}
      	}, this);
			}else{
				
			}
		},this)

		let map	=	this.get('song.selected').objectAt(measureIndex)['map'],
    pitches = Object.keys(notes).forEach(function(e,f){
		
			let type = map[f]						
			
			NoteLength.call(notes,type,[map,notes[e],e,type])

			if(notes[e].length){
				notes[e].sort((a,b)=>(a.note + a.o*12)<(b.note+b.o*12))
			}
		},notes)

 		console.log(notes , `to
									 see
								 if
							notes
					 is properly
			 applied`)		 
    console.log(pitches,'pitchi notes')

		return Object.keys(notes).length ? notes: null

	},this);

  console.log(pitchi,'pitchi')
  return pitchi
};
	
