App.ChordBodyComponent = Em.Component.extend({
tagName:'table',
actions:{
		toggleSelected(string,fret){
//			console.log([string,fret])
			this.sendAction('action',string,fret)
		},
		appendToSelectedCol(string,fret){
			console.log ('appendToSelectedCol',string, fret) 
			this.sendAction('appendToSelectedCol',string,fret) 
		}	
	}
})


