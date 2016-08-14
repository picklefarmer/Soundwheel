import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'option',
  attributeBindings:['selected'],
  selected:Ember.computed('val','sail',{
    get(){
      var one = this.get('val') === this.get('sail');
      console.log( one, 'is selected option')
        return one
    }
  })
});
