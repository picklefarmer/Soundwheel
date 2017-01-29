import Ember from 'ember';

export default Ember.Component.extend({
	song:Ember.inject.service(),

	padding:Ember.computed({set(_,V){this.get('element').style.padding = V+'rem'}}),
  classNames:['displayTable'],
	classNameBindings:['autohide','lyricPane','song.verticalTab:canon']
})
