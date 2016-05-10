import Ember from 'ember';

export default Ember.Component.extend({
	tagName:"tr",
	classNameBindings:['value:chordedit'],
	value:true,

	rows:Ember.computed({
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


});
