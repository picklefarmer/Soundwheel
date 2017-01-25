import Ember from 'ember';

export default Ember.Component.extend({
  tagName:"button",
	song:Ember.inject.service(),
	classNames:['squaredOne'],
	classNameBindings:['bool:hit'],
  displayText:Ember.computed('bool','desc',function(desc){
    desc = this.get('desc')
    if(typeof desc === 'object'){
      return desc[~~this.get('bool')]
    }else{
      return desc
    }
  }),
  actions:{
    actionUp(){
      if(this.action){
        this.action()
      }
    }
  }
});
