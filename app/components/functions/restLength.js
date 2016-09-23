import restInstance from '../instances/restLength';

export default function(beat,x,y,noteIndex,isFlip){

	return restInstance[beat.rest];
	
}

