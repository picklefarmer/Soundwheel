import Ember from 'ember';

export default Ember.Component.extend({
  tagName:"button",
	song:Ember.inject.service(),
	classNames:['squaredOne'],
	classNameBindings:['bool:hit'],
  actions:{
    actionUp(){
      this.action()
    }
  }
});
