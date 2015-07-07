var debug;

App.ChordDashComponent = Em.Component.extend({
  tagName:"ul",
  classNames:['sidebar','chordBank'],
	model:function(){
        return this.get('song.chords')//[[6,5,4]]
	}.property('song.chords'),
    song:Em.inject.service(),
	selectedBinding:"song.chordSelected",
	selectionBinding:"song.chordSelection",
	differenceBinding:"song.chordDifference",
    needs:"song",
	lowBinding:"song.chordLow",
	isEditingBinding:"song.chordEditFlag",
	actions:{

		saveSelection(){

          Em.run(this.get('song.chords'),"update",this.get('song.chords.content')) 
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
            notes = notes || Em.A([1,1,1,1]);
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
              this.set('selected',Em.copy(this.get('selection')))
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
                if(isEditing)
                    this.send('sendSelection')
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
})

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

App.ChordRowComponent = Em.Component.extend({
	tagName:"tr",
	classNameBindings:['value:chordedit'],
	value:true,
	rows:function(name,rows){
		console.log(rows) 
		var om = []
		om.length = rows.length +2
		return om
	}.property(),
	actions:{
		toggleSelected(string,fret){
			console.log ( "row" ,string, fret )
		   this.sendAction('action',string,fret)	
		}
	}

})

App.ArPegComponent = Em.Component.extend({
	tagName:"table",
	classNameBindings:["isEditing"],
	isEditing:false,
	chordNotes:Em.computed.filter('chord',function(e){if(e)return true}),
	low:Em.computed.min('chordNotes'),
	high:Em.computed.max('chordNotes'),
	difference:function(){
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
	}.property('high','low'),
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
	},
})

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

App.ANoteComponent = Em.Component.extend({
	tagName:"td",
	classNames:["chordbtn"],
	classNameBindings:["noteClass:hit"],
	content:function(){
		if(this.get('noteClass')){
			return " + " 
		}else{
			return " - " 
		}
	}.property('noteClass'),
	fret:function(name,f){
		return f - this.get('low')
	}.property('low'),
	note:function(name,f){
		return this.get('index') + this.get('low')
	}.property('low','index'),
	noteClass:function(name,f){
		var notes = this.get( 'index' ) ,
				fret = this.get( 'fret');
		//console.log ( notes+ " notes" +" "+ fret + " fret")
	return notes===fret
	}.property('index','fret','low'),
})

var debug2;

