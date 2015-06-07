var debug;

App.InventoryController = Em.Controller.extend({
	model:function(){
		return	Firebase.List.create({
			ref:chords
			})
	}.property(),
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
		   	this.set('selected',Em.copy(this.get('selection')))
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
		var leng = [];
	 leng.length =  Math.abs(this.get('low') - this.get('high'))+1
	return leng
	}.property('high','low'),
	click(){
		console.log ( ' link  '  ) 
		this.sendAction('action',this.getProperties('chord','difference','low'))
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

