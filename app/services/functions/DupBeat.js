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
		measure.notes.forEach((string)=>{
		 string[index] = string[prev]
		})
	}
	measure.map.replace(index,1,measure.map[prev])
}
