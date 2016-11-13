export default function(index, prev, swap){

	var measure = this.get('song.selected.measure');

	if(swap){
		let swapMap = measure.map[index];
		measure.map.replace(index,1,measure.map[prev])
		measure.map.replace(prev,1,swapMap)
		measure.notes.forEach(string =>{
				console.error(string[index],string[prev])
			let temp 			= string[index];
			
			string[index] = string[prev]
			string[prev]	=	temp;
		})
	}else{
			let score = measure.notes.map(
				function(string){
					string[index] = string[prev]
					return string
				});

			console.log(score,'dup_beat')
		measure.notes.replace(0,score)
/*
		measure.notes.forEach((string)=>{
		 string[index] = string[prev]
		})
		*/
	}
	measure.map.replace(index,1,[measure.map[prev]])
}
