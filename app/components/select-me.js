import Ember from 'ember';

export default Ember.Component.extend({
  content:[],
  actions:{
    updateSelected(value){
      this.set('selection',value)
    }
  },
  selection:"null"

});
