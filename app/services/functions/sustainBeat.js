export default function(update){


let 	division 			=	this.get('division'),
			divisionCount	= division -1,
			measure 			= this.get('selected.measure.notes'),
			map						=	this.get('selected.measure.map'),
			newMap 				= [],
			newNotes,
			strings 			= this.get('main.strings.options');

		newNotes = update.map( e => [e])

/*	while(strings--){
		newNotes.push([null])
	}
*/
		newMap.push(8)

	while(divisionCount--){
		newMap.push(0)
	}
	
	map.replace(0,division,newMap)
	measure.replace(0,6,newNotes)

}
