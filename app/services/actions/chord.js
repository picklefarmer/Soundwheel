export default { _actions:{
    saveSelection(){

          Ember.run(this.get('song.chords'),"update",this.get('song.chords.content')) 
        },

		updateSelection(){
            var model = this.get('model'),
                selection   = this.get('selection'),
                index = model.indexOf(selection);

            this.set('selection',this.get('selected'))
		    this.get('model').replace(index,1,[this.get('selected')])
		},

		chordCapture(){
		  var chord = this.get('song.selected.measure.notes').filter(e => e ? e : false),
              low   = Math.min.apply(this,chord),
              high  = Math.max.apply(this,chord),
              difference = Math.abs(low - high) + 1

          this.send('newSelection',{chord,high,difference,low})

		},

     newSelection({chord:notes,high,difference,low}={}){

          console.log("pre-model",this.get('model'))
            notes = notes || Ember.A([1,1,1,1]);
            this.set('selected',notes)
            this.get('model').addObject(notes)
            this.set('selection',notes)
            console.log("chordSelection",this.get('model')||"undefined",notes||"undefined",high,difference,low) 
        },

		deleteSelection(){
			var selection = this.get('selection');
			this.get('model').removeObject(this.get('selection'))
		},

		editSelected(){
				this.toggleProperty('isEditing')
        console.log(' is edit chord', this.get('selected'),this.get('selection'))
        		this.send('sendSelection')
		},

		sendSelection(){
       this.set('selected',Ember.copy(this.get('selection')))
         console.log('selected from edit dash',this.get('selected'))
		},

		selector({chord:selection,difference,low}){
			console.log ("action selector",selection)
          var isEditing = this.get('isEditing')
			if(this.get('selection')===selection){
                if(isEditing){
                    console.log(this.get('isEditing'))
                    this.toggleProperty('isEditing')
                    console.log(this.get('isEditing'))
                }
                this.set('selection',null)
			/*	this.setProperties({'selection': null,
                                    'selected'	:null,
							   	   	'difference':null,
									'low':null})
                                   */
			}else{
				this.setProperties({selection:selection,
							   	   	difference:difference.length,
							   	   	low:low})
                if(isEditing){
                    this.send('sendSelection')
								}
			}
		},

}}
