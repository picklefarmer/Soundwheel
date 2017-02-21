import Ember from 'ember';
import BackView from './functions/backView'
export default Ember.Component.extend({
 	name:null,
	tagName:'canvas',
	classNames:['tablature'],
	classNameBindings:['song.chordSelection:chord'],
	attributeBindings:['id',"height","width"], //STYLE
	song:Ember.inject.service(),
	options:Ember.inject.service(),
	//strings number
	color:Ember.computed('song.main.fretboard.options',{
		get(){
    		var color = this.get('song.main.fretboard.options') || {
					['fret marker']:'rgb(0,0,0)',
					background:'rgb(255,255,255)',
					notes:'fff'
				};
			//console.log('color','changed',color)
		    return color
		}
	}),

	height:Ember.computed('song.main.strings.options',{
		get(){
	    	var size = 50;
    		//return (this.get('song.main.strings.options') * size) || 300
			return 300
		}
	}),

  //frets number
	width:Ember.computed('song.main.frets.options',{
		get(){
		    var size = 61.33; 
		/*	
		 	console.log(`width
						 was
						 set/changed
						`)
		*/
	   		return 1472
		 //   return (this.get('song.main.frets.options') * size) || 1472
		}
	}),

	style:Ember.computed({
		get(){
     
    		console.log('style two ',this.get('height'),this.get('width'))
    		return ""
		}
  	}),

	didInsertElement(){
    	//console.log('did Insert Element',this.get('name'))

      	var name	= this.get('name'),
        	canvas	= this.get('element'),
					size		=	this.get('size'),
					ctx  = canvas.getContext('2d');
				if(size){
				console.log( ' initializing size',size)
					canvas.width = size.width
					canvas.height =size.height
				}
        this.set('ctx',ctx)

        this.set(name,ctx);
        ctx = this.get(name)
				if(name === 'graphView'){
					this.get('options').set(name+'Canvas',canvas)
				}
        this.get('options').set(name,ctx)
	},
	graphView:Ember.computed('color',{
			set(a,ctx){
				//DrawOsc.call(this.get('song'),a,ctx)
				return ctx
			}
	}),
	frontView:Ember.computed('color',{
    	get(){
    		return this.get('ctx')
	    },  
    	set(a,ctx){
				ctx.font="bolder 22px serif";

   			ctx.fillStyle = "#"+this.get('color.notes')//"white";//"rgba(155,155,155,.79)"
				ctx.strokeStyle = "white";
				return ctx
	    }
	}),

	centerView:Ember.computed('color',{
    	get(){
        	this.get('ctx')
        },
      	set(a,ctx){
			//ctx.fillStyle = 
			ctx.lineWidth = 3
			ctx.strokeStyle = "black"
			ctx.font="bolder 22px serif"
			return ctx
      	}
	}),

	backView:Ember.computed('height','width','color',{
	    get(){
    		return this.get('ctx')
    	},
			set:BackView
	})
});
