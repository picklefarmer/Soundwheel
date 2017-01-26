import Ember from 'ember';
import KeyDown from '../mixins/keydown';

export default Ember.TextField.extend(KeyDown,{
  classNames:"span-me",
  keyDownBinding:'statis',
  attributeBindings:['onblur','onfocus','size'],
	classNameBindings:['dynamicWidth::dynamicWidth'],
//	size:300,
	size:Ember.computed('dynamicWidth','value.length',function(){
		if(this.get('dynamicWidth')){
			return this.get('value.length')
		}
	}),
	valueLength:Ember.computed('value.length',function(){return this.get('value').length}),
  statis:Ember.computed('aether',function(){
    if(this.get('aether')){
      return this.get('keyFunction')
    }else{
      return this.get('aKeyFunction')
    }
  }),
  focusIn(){
    this._super()
    this.set('temp',this.get('value')) 
    console.log('opening circuit')
  },
  focusOut(){
    this._super()
    let value = this.get('value');
    if(this.get('temp') !== value){
      console.log('closing circuit')
      this.sendAction('upload',value)
    }
  },
  aKeyFunction(event){
    if(event.keyCode === 13){
        event.stopPropagation()
        event.target.blur()
    }
  },
  keyFunction(event){
    console.log(event,'event')
    if(event.keyCode === 13){
      this.aether(event)
    }
  }
});
