App.ANoteComponent = Em.Component.extend({

	tagName:"td",
	classNames:["chordbtn"],
	classNameBindings:["noteClass:hit"],

	content:Em.computed('noteClasee',{
		get(){
			if(this.get('noteClass')){
				return " + " 
			}else{
				return " - " 
			}
		}
	}),

	fret:Em.computed('low',{
		set(_,f){
			return f - this.get('low')
		}
	}),

	note:Em.computed('low','index',{
		set(_,f){
			return this.get('index') + this.get('low')
		}
	}),

	noteClass:Em.computed('index','fret','low',{
		set(_,f){
			var notes = this.get( 'index' ) ,
				fret = this.get( 'fret');
				//console.log ( notes+ " notes" +" "+ fret + " fret")
			//
			return notes===fret
		}
	})

})


