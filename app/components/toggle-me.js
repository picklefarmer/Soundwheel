import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'button',
  classNameBindings:['btn','isEnabled:btn-default:btn-info'],
  actions:{
    switchy(){
      this.toggleProperty('isEnabled')
    }
  }
});
