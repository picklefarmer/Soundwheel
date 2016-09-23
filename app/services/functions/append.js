export default function(index){
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


	this.get('song.selected')
					.insertAt(	index+1	,{
						notes,
						map
					});

	this.set('song.selected.index',index+1);
}
