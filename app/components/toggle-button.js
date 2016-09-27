import Ember from 'ember';

export default Ember.Component.extend({
  options:Ember.inject.service(),
	tagName:'li',
	classNameBindings:'bool:hit',
	click(){
//		this.toggleProperty('bool')
	},
  actions:{
    flip(){
      console.log('flip')
      this.toggleProperty('options.verticalTab')
    }
  }
});
