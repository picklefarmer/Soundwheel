
export default function(isObj){
let beatDivision 	= this.get('song.division'),
			map 					= [],
			notes					= [],
			strings 			= this.get('song.main.strings.options');

	if(isObj){
		notes = {}
		while(strings--){
			notes[strings] = {0:0}
		}
	}else{
		while(strings--){
			notes.push([null])
		}
	}

	while(beatDivision--){
		map.push(0)
	}
	
 	return {map,notes}
}
