//import noteLength from './notLength';
//
const noteLength = function(noteIndex,map){
	let notes = this,
			mapForward = noteIndex,
			mapReverse = noteIndex,
			prevLength = 0,
			noteLength = 1;

	while(map[++mapForward] === 0){
		noteLength++
	}

//	notes.map( note => note.l = noteLength)
	map.replace(noteIndex,1, noteLength)

},

backCheck = function(mapReverse){
	let map = this,
			prevLength = 0;

	while(map[--mapReverse] < 1){
		prevLength--
	}

	if((map[mapReverse] > 1) && prevLength){
		map.replace(mapReverse,1, -prevLength)
	}

	map.replace(1,8,map)
};


export default function(update,isRest){

		let measure = this.get('selected.measure.notes'),
				map			=	this.get('selected.measure.map'),
				type		=	isRest? 0 : ([1,'s'][~~this.get('sustain')]),
				//type		=	isRest? 'r' : (['b','s'][~~this.get('sustain')]),
				beat    = this.get('beat');


		if(update.length){

			if(type === 's'){
				noteLength.call(update,beat,map)
			}else{
				map.replace(beat,1,type)
			}
			backCheck.call(map)
			let score = measure.map(
				function(string,n){

					if(string.length){//if string isArray
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
