import Ember from 'ember';

export default Ember.Mixin.create({
	init(){
			this._super()
		let	context = document.createElement('canvas'),
			ctx = context.getContext('2d');

			context = document.body.appendChild(context)

			console.log(context,ctx,'mixin of gallery')
			this.set('ctx',ctx)
			this.set('canvas',context)	
			Ember.run(this,'fillResources')
	},

	elementsList:[
		"augmentation",
		"half_note",
		"quarter_note",
		"rest_note",
		"Rests",
		"whole_note"
	],
	fillResources(){
	
	}
})

