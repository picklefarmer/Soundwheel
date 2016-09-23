import Ember from 'ember';
export default function(){

	this.toggleProperty('song.pause');
	
	Ember.run(this.get('song'),'clock',0)
	
	console.log('play',this.get('song.pause'))

}
