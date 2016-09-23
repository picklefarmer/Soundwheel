import Ember from 'ember';
export default function(index){

	var score = this.get('song.selected'),
			notes = Ember.copy(score.get('measure.notes')),
			map		=	Ember.copy(score.get('measure.map'));

	score.insertAt(index+1,{notes,map});

	this.incrementProperty('song.selected.index');

}
