import restInstance from '../instances/restLength';

export default function(beat,x,y,noteIndex,isFlip){
	let restCount = beat.rest;
	while(restCount--){
		this.get('barArray').push('rest')
	}

	return restInstance[beat.rest];
	
}

