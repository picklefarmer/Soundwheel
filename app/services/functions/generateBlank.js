export default function(){

let beatDivision 	= this.get('song.division'),
			map 					= [],
			notes					= [],
			strings 			= this.get('song.main.strings');

	while(strings--){
		notes.push([null])
	}

	while(beatDivision--){
		map.push('r')
	}
  return {map,notes}
}
