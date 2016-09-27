import beatInstance from '../instances/beatLength';

export default function(beat,x,y,noteIndex,isFlip){

	let beatLength = beatInstance[beat.l],
			maximumOffset = this.get('maximumOffset'),
			barArray = this.get('barArray'),
			boxSet			= [y,x,isFlip,beat,noteIndex,barArray,maximumOffset];

	if(beatLength.name === 'eight_note' && noteIndex === 0){
			barArray.push({y,x,isFlip,beat})
	}else{
		barArray.push('rest')
	}

	return beatLength
	
}


