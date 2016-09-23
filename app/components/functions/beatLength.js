import beatInstance from '../instances/beatLength';

const beam = function(y,x,isFlip,beat,noteIndex,barArray,maximumOffset){
	this.name = 'eight_note';
/*	
	if(noteIndex === 0){
	
		barArray.push({y,x,isFlip,beat});
	
	}else if(y > maximumOffset){
		console.log('maximumOffset break')
		this.set('maximumOffset',y)
	}else{
		console.log('maximumOffset pass',	noteIndex,x,y)
	}
	*/
};

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
	console.log('dotted', beatLength,'', beat.l)	
	return beatLength
	
}


