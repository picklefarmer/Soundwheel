//import noteLength from './notLength';
//
const noteLength = function(notes,noteIndex,map){
	let mapForward = noteIndex,
			mapReverse = noteIndex,
			prevLength = 0,
			noteLength = 1;

	while(map[++mapForward] === 0){
		noteLength++
	}

//	notes.map( note => note.l = noteLength)
	map.replace(noteIndex,1, noteLength)

},

backCheck = function(beat,map){

	let divisions	 = this.get('division'),
			mapReverse = beat,
			prevLength = 0;

	while(map[--mapReverse] < 1){
		prevLength++
	}

	
	console.log(map,beat, mapReverse,prevLength,"__check sustain")
	if((map[mapReverse] > 1) && prevLength){
		map.replace(mapReverse,1, [prevLength])
	}
};


export default function(update,isRest){

		let measure = this.get('selected.measure.notes'),
				map			=	this.get('selected.measure.map'),
				type		=	isRest? 0 : ([1,'s'][~~this.get('sustain')]),
				//type		=	isRest? 'r' : (['b','s'][~~this.get('sustain')]),
				beat    = this.get('beat');

				console.log(update,isRest,type,'is rest check')

		if(update.length){

			if(type === 's'){
				noteLength.call(this,update,beat,map)
			}else{
				map.replace(beat,1,[type])
			}
			backCheck.call(this,beat,map)
			let score = measure.map(
				function(string,n){

					if(string.length){//if string isArray
						let test_input = update[n];
						console.log(test_input, "test_input",update,string)
						string[beat] = update[n]

					}else{

						string = []
						string[beat] = update[n]

					}

					return string
				});
			console.log(score, `this is the
										 	result of the map`)	
			measure.replace(0,6,score)
			//measure[arguments.length]
		}else{
			//let [fret,string];
			//measure.replace(string,1,fret)
//				
		}
};
