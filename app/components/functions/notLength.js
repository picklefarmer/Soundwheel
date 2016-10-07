const sustain = function(map,noteTier,noteIndex,type){

	let notes = this,
			mapBudge = noteIndex,
			noteLength = type;

	//while(map[++mapBudge] === 'r'){
	while(map[++mapBudge] === 0){
		notes[mapBudge] = {rest:true}
		noteLength++
	}

  

	notes[noteIndex].map( note => note.l = type)
	console.log('sustain', noteLength, notes)

},	

beat	=	function(map,noteTier,noteIndex){

	let notes = this,
			mapBudge = noteIndex,
			restLength = 0;
		
},

rest		=	function(map,noteTier,noteIndex){

	let notes = this,
			mapBudge = noteIndex,
			restLength = 1;
		
	if(!notes[noteIndex].rest	){
					
		//while(map[++mapBudge] === 'r'){
		while(map[++mapBudge] === 0){
			restLength++
			notes[mapBudge] = {rest:true}
		}

		notes[noteIndex] = {rest:restLength}
	}

};

export default function(	noteType,	apple){

	console.log('noteType',noteType)	
	switch(noteType){
/*
		case 's':	sustain.apply(this,apple);	break;
		case 'b':	beat.apply(this,apple);			break;
		default	:	rest.apply(this,apple);			break;
    */
		case   0:	rest.apply(this,apple);			break;
		case   1:	beat.apply(this,apple);			break;
    default :	sustain.apply(this,apple);	break;


	}

};



