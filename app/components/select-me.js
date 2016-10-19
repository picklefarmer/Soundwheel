import Ember from 'ember';
import Keydown from '../mixins/keydown';

export default Ember.Component.extend(Keydown,{
  content:[],
  tagName:"select",
  actions:{
    updateSelected(value){
				console.log(value,'value from option')
      this.set('selection',value)
    }
  },
  willRender(){
    this.set('selected',this.get('selection'))
  },
  change(val){
    console.log('beginning',val.target.value)
    if(this.isObj){
      this.action(val.target.value,val.target.prop)
    }else{
      this.set('selection',val.target.value)
    }
  },

});
