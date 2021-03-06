import Ember from 'ember';

export default Ember.Component.extend({

	tagName:"td",
	classNames:["chordbtn"],
	classNameBindings:["noteClass:hit"],

	content:Ember.computed('noteClass',{
		get(){
      console.log('a - note content')
			if(this.get('noteClass')){
				return " + " 
			}else{
				return " - " 
			}
		}
	}),

	fret:Ember.computed('low',{
    get(){
      console.log('getting a - note fret')
    },
		set(_,f){
      console.log ( 'fret ' )
			return f - this.get('low')
		}
	}),

	note:Ember.computed('low','index',{
		get(_,f){
      console.log( 'getting note for a-note' )
			return this.get('index') + this.get('low')
		}
	}),
  
  type:Ember.computed('noteClass','expression',function(){
    //return this.get('noteClass')?'&#x2600;':'&#127761;';

    let a = '\u2600',
        b = '\uD83C\uDF11',
        expression  = this.get('expression');
    
    if(expression){
      a = expression.a
      b = expression.b
    }
    
    return this.get('noteClass')?a:b;
  }),

	noteClass:Ember.computed('index','fret','low',{
		get(){
      console.log('note class')
			var notes = this.get( 'index' ) ,
				fret = this.get( 'fret');
				//console.log ( notes+ " notes" +" "+ fret + " fret")
			//
      console.log('note class post')
			return notes===fret
		}
	})


});
