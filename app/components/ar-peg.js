import Ember from 'ember';

export default Ember.Component.extend({

	tagName:"table",
	classNameBindings:["isEditing"],
	isEditing:false,
	chordNotes:Ember.computed.filter('chord',function(e){if(e){return true}}),
	low:Ember.computed.min('chordNotes'),
	high:Ember.computed.max('chordNotes'),

	difference:Ember.computed('high','low',{
		get(){
			var aom = new Date().getTime()

			Ember.run.scheduleOnce('afterRender',this,function(){
				var eom = new Date().getTime()
				console.log('after Render', eom - aom)
			})

			var leng = [],
        	    length =  Math.abs(this.get('low') - this.get('high'))+1;

            console.log(length)

            leng.length = length

			return leng
		}
	}),

	click(){
		console.log ( ' link  ' ,this.get('low') )
		this.sendAction('action',this.getProperties('chord','difference','low'))
	},

    touchEnd(){
        this.send('click') 
    },

	actions:{

		toggleSelected(string,fret){
			console.log ('toggleSelected',string, fret) 
			this.get('higher').send('toggleSelected',string,fret) 
		},

		appendToSelectedCol(string,fret){
			console.log ('appendToSelectedCol',string, fret) 
			this.get('higher').send('appendToSelectedCol',string,fret,this.get('low')) 
		},

		appendToSelected(string,fret){
			console.log ('appendToSelected',string, fret) 
			this.get('higher').send('appendToSelected',string,fret,this.get('low')) 
		}
	}

});
