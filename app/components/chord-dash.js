import Ember from 'ember';

var debug, debug2;

export default Ember.Component.extend({

  song:Ember.inject.service(),
  tagName:"ul",
  classNames:['sidebar','chordBank'],

	model:Ember.computed('song.chords',{
		get(){
			return this.get('song.chords')//[[6,5,4]]
		}
	}),

	selectedBinding:"song.chordSelected",
	selectionBinding:"song.chordSelection",
	differenceBinding:"song.chordDifference",
	lowBinding:"song.chordLow",
	isEditingBinding:"song.chordEditFlag",
	actions:{

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
        		this.send('sendSelection')
		},

		sendSelection(){
              this.set('selected',Ember.copy(this.get('selection')))
		},

		selector({chord:selection,difference,low}){
//			console.log ("action selector",chord)
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
		toggleSelected(string,fret){
		
			let arr = this.get('selected');
			
			if(arr[string] === fret){
				fret = [undefined]
				if( (string === 0) || (string === arr.length-1) ){
					fret = null
				}
			}else{
				fret = [fret]
			}
			arr.replace(string,1,fret) 	
		
		},
		appendToSelectedCol(string,fret){
			console.log ("select col",string,fret)
			var arr = this.get('selected');

			if(string<0){
				arr.replace(0,0,[fret])
			}else{
				arr.replace(string-1,1,[arr[string-1],fret])	
			}
		},
		appendToSelected(string,fret,offset){
			console.log ("select append",string,fret,offset)
			var arr = this.get('selected');
			if(fret === 0){ 
				this.set('selected', arr.map(function(idx){return idx+2}))		
				fret = 1
			}
			arr.replace(string,1,[fret])	
			
		}
	}

});
