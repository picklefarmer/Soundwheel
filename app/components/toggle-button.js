import Ember from 'ember';

export default Ember.Component.extend({
  tagName:"button",
	song:Ember.inject.service(),
	classNameBindings:'bool:hit',
  bool:Ember.computed('name',function(){
    return this.get('song.'+this.get('name'))
  }),
  actions:{
    actionUp(){
      this.action()
    }
  }
});
