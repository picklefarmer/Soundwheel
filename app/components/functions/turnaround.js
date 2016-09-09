import Pitch from './pitch';

export default function(song){
				
  let pitchi = song.map(function(measure){

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

		let noteLength = function(noteTier,noteIndex){
	console.log('noteTier',noteTier)
				
  		if(noteTier.length){
					console.log(noteTier,noteIndex,'afirmed noteLength')
			}else{

					let noteLength = noteIndex;
			
					try{	
					while(!notes[++noteLength].length){
						notes[noteLength] = {rest:true}
					}
					}catch(e){
						console.error('error',notes)
					}
					noteLength -= noteIndex
					notes[noteIndex-1].map( e => e.l = noteLength)
					notes[noteIndex].rest = noteLength
					console.log('noteLength of notes',noteLength)
				}
		};

    let pitches = Object.keys(notes).forEach(function(e,f){
										noteLength(notes[e],e)
										if(notes[e].length){
											notes[e].sort((a,b)=>a.note>b.note)
										}
									})
  
    console.log(pitches,'pitchi notes')

		return Object.keys(notes).length ? notes: null

	},this);

  console.log(pitchi,'pitchi')
  return pitchi
};
	
