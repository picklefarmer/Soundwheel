App.ChordBtnComponent = Em.Component.extend({
	tagName:"td",
	classNameBindings:['value:chordbtn'],
	value:true,
	name:"+",
	actions:{
		toggleSelected(string,fret){
			console.log([string,fret])
			this.sendAction('action',string,fret)
		}
	}
})


