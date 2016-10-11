import Ember from 'ember';

export default Ember.Component.extend({
	song:Ember.inject.service(),
	tagName:'li',
	classNameBindings:'bool:hit',
  actions:{
    actionUp(){
      this.action()
    }
  }
});
