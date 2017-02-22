import Ember from 'ember';
import Keydown from '../mixins/keydown';

export default Ember.Component.extend(Keydown,{
  content:[],
  tagName:"select",
  change(val){
    console.log('beginning',this.action,val.target.value)
    if(this.action){
      this.action(val.target.value,val.target.prop)
    }else{
      this.set('selection',val.target.value)
    }
  },

});
