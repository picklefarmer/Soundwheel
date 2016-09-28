import beatInstance from '../instances/beatLength';

export default function(beat,x,y,noteIndex,isFlip,m_beat){

	let beatLength 		= beatInstance[beat.l],
			beatCount			= beat.l,
			maximumOffset = this.get('maximumOffset'),
			barArray 			= this.get('barArray'),
			isChord				=	m_beat.length > 1;

	if(noteIndex === 0){
		if(beatLength.name === 'eight_note'){
				if(isChord){
					barArray.push({y,x,isFlip,beat,chord:m_beat})
				}else{
					barArray.push({y,x,isFlip,beat})
				}
		}else{
			while(beatCount--){
				barArray.push('rest')
			}
		}
	}

	return beatLength
	
}


