





export default function(){

let beatDivision 	= this.get('song.division'),
			map 					= [],
			notes					= [],
			strings 			= this.get('song.main.strings.options');

	while(strings--){
		notes.push([null])
	}

	while(beatDivision--){
		map.push(0)
	}
  return {map,notes}
}
