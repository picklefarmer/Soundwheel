const sustain = function(map,noteTier,noteIndex){

	let notes = this,
			mapBudge = noteIndex,
			noteLength = 1;

	while(map[++mapBudge] === 'r'){
		notes[mapBudge] = {rest:true}
		noteLength++
	}
	notes[noteIndex].map( note => note.l = noteLength)
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
					
		while(map[++mapBudge] === 'r'){
			restLength++
			notes[mapBudge] = {rest:true}
		}

		notes[noteIndex] = {rest:restLength}
	}

};

export default function(	noteType,	apple){

	console.log('noteType',noteType)	
	switch(noteType){

		case 's':	sustain.apply(this,apple);	break;
		case 'b':	beat.apply(this,apple);			break;
		default	:	rest.apply(this,apple);			break;

	}

};



