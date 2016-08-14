import Ember from 'ember';

export default Ember.Mixin.create({
	song:Ember.inject.service(),
	globalKeydown:Ember.inject.service(),
	focusIn(){
		console.log('unbind from global keydown mixin')
		this.send('unbindGlobalEvents')
	},
	focusOut(){
		console.log('bind from global keydown mixin')
		this.send('bindGlobalEvents')
	},
	actions:{
		bindGlobalEvents(){
			Ember.$(document).keydown(e => Ember.run(this,this.get('globalKeydown.begin'),e))

				console.log(`global hotkeys reinstated`)
		},
		unbindGlobalEvents(){

			Ember.$(document).off('keydown')
				console.log(`global hotkeys removed`)
		}
	}
});
