export default function(update,isRest){

		let measure = this.get('selected.measure.notes'),
				map			=	this.get('selected.measure.map'),
				type		=	isRest? 'r' : (['b','s'][~~this.get('sustain')]),
				beat    = this.get('beat');

		if(update.length){
			map.replace(beat,1,type)

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
