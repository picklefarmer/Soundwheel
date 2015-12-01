App.ChordRowComponent = Em.Component.extend({
	tagName:"tr",
	classNameBindings:['value:chordedit'],
	value:true,

	rows:Em.computed({
		set(_,rows){
			console.log(rows) 
			var om = [];

			om.length = rows.length +2
			return om
		}
	}),

	actions:{
		toggleSelected(string,fret){
			console.log ( "row" ,string, fret )
			this.sendAction('action',string,fret)	
		}
	}

})


