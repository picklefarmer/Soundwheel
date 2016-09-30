import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
  tagName:"ul",
  classNames:["nav","sidebar"],
  options:Ember.inject.service(),

  actions:{
    instrument(a){
      console.log('instrument selection',a)
    }
  },		

	didInsertElement:function(){
	},

});
