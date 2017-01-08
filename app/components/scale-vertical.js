import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings:['style'],
  willRender(){
    this.set('style', `transform:scale(${1-1/this.get('amount')})`)
  }

})
