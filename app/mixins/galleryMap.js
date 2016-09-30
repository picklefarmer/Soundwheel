import Ember from 'ember';
import half_note from '../components/functions/half_note';
import eight_note from '../components/functions/eight_note';
import quarter_note from '../components/functions/quarter_note';
import Rests from '../components/functions/Rests';
import Augmentation from '../components/functions/augmentation';
import Notes from '../components/functions/Notes';
import whole_note from '../components/functions/whole_note';
import Stave from '../components/instances/stave';
let x = 1, y= 10,spacing = 2;
let Suspension =	function(){
		console.log('suspension init')
		let sprocesses = 
		{	
		'whole_note'	:	['default'],
		'half_note'	:	['flipVertical','default','stem'],
		'quarter_note':	['flipVertical','default','stem'],
		'eight_note':	['flipVertical','default','stem','m_stem']
		},
				weave = function(name){
					console.log(name,sprocesses)
					let suspension 	= sprocesses[name]
							length			=	suspension.length;
					this.get('elements').set(name,Ember.Object.create({}))
					for(var l = 0; l<length;l++){
						console.log('weave', suspension[l],name)
						let operation = suspension[l];
						this.get('elements').get(name).set(operation,x)	
						//this.get('elements').get(name).set(operation,x+(l*spacing))	
						snap.call(this,operation,name)
					
					}
				},
				snap = function (func,name){
					console.log('snap',name,func)
					Notes[func].call(Notes,name,x+=spacing,this)
//					this.get('ctx').fillText(x,x*spacing*5,y+10)
		};

		Object.keys(sprocesses).forEach(weave,this)

};
	

let MIXIN = Ember.Mixin.create(Stave,{

	initFunc(){
		console.log('this is ctx' , this)
		let	context = document.createElement('canvas'),
			ctx = context.getContext('2d');

			//context = document.body.appendChild(context)

			console.log(context,ctx,'mixin of gallery')
			this.set('song.options.stave',ctx)
			this.set('song.options.staveCanvas',context)
			context.width=1200	
			Ember.run(this,'fillResources')
	},

	elementsList:[

		Suspension,
		Augmentation,
		//"rest_note",
		Rests,
	],
	
	elements:Ember.Object.create({}),

	/* Notes
 		flipHorizontal = stem,x+note_width
		flipVertical	=	stem,y
	 
 
  */


	fillResources(){
			console.log('mixin of gallery -- fill resources')
	 			//spacing = 5, 
		let	ctx = this.get('ctx');

		this.get('elementsList').forEach(e => {
			
			console.log(e , 'elements list mixin')	
			if(typeof e === "object"){

				console.log('object')
				Object.keys(e).forEach(f=>{
						this.get('elements').set(f,x)
						e[f].call(this,x+=spacing,y,ctx)
//						this.get('ctx').fillText(x,x*spacing*5,y+10)
				},this)

			}else{
				console.log('function')
				e.call(this,x,y,ctx)
				

			}
		},this)
		console.log(this.get('elements'),'elements graphic array')
	}
});
MIXIN[Ember.NAME_KEY] = "Gallery_Stave"
export default MIXIN
