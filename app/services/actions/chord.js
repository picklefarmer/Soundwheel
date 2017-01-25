export default {
  saveSelection(){
		Ember.run(this.get('chords'),"update",this.get('chords.content')) 
  },

	updateSelection(){
		var model = this.get('chords'),
				selected		=	this.get('chordSelected'),
        selection   = this.get('chordSelection'),
        index = model.indexOf(selection);

		this.set('chordSelection',selected)

		model.replace(index,1,[selected])
//  this.get('chord').replace(index,1,[selected])
	},

	chordCapture(){
		  var chord = this.get('song.selected.measure.notes').filter(e => e ? e : false),
              low   = Math.min.apply(this,chord),
              high  = Math.max.apply(this,chord),
              difference = Math.abs(low - high) + 1

          this.send('newSelection',{chord,high,difference,low})

	},

  newSelection({chord:notes,high,difference,low}={}){

    console.log("pre-model",this.get('chord'))
    notes = notes || Ember.A([1,1,1,1]);
    this.set('chordSelected',notes)
    this.get('chords').addObject(notes)
    this.set('chordSelection',notes)
    console.log("chordSelection",this.get('model')||"undefined",notes||"undefined",high,difference,low) 
  },

	deleteSelection(){
		var selection = this.get('chordSelection');
		this.get('chords').removeObject(selection)
		this.setProperties({chordSelected:null,chordSelection:null})
	},

	editSelected(){
		this.toggleProperty('isEditing')
        console.log(' is edit chord', this.get('selected'),this.get('selection'))
 	//	this.send('sendSelection')
	},
}
