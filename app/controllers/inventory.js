import Ember from 'ember';

export default Ember.Controller.extend({
	model:Ember.computed({
		get(){
			return	Firebase.List.create({
				ref:chords
			})
		}
	}),
	selected:[],
	selectionBinding:"controllers.song.selection",
	differenceBinding:"controllers.song.difference",
	lowBinding:"controllers.song.low",
	needs:"song",
	isEditing:false,

	actions:{

		saveSelection(){
			var selection = this.get('selection');
			var index = this.get('model').indexOf(selection)
			this.get('model').replace(index,1,[this.get('selected')])
		},

		chordCapture(){
			var selection = this.get('selection');
			this.get('controllers.song').send('captureChord')
	//		this.get('model').removeObject(this.get('selection'))
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

		selector({chord,difference,low}){
			console.log ("action selector",chord)
			if(this.get('selection')===chord){
				this.setProperties({'selection'	:null,
							   	   	'difference':null,
									'low':null})
			}else{
				this.setProperties({'selection'	:chord,
							   	   	'difference':difference.length,
							   	   	'low':low})
				if(this.get('isEditing')){
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
