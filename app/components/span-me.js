import Ember from 'ember';
import KeyDown from '../mixins/keydown';

export default Ember.TextField.extend(KeyDown,{
  classNames:"span-me",
  keyDownBinding:'statis',
  statis:Ember.computed('aether',function(){
    if(this.get('aether')){
      return this.get('keyFunction')
    }else{
      return undefined
    }
  }),
  keyFunction(event){
    console.log(event,'event')
    if(event.keyCode === 13){
      this.aether(event)
    }
  }
});
