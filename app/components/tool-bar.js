import Ember from 'ember';

export default Ember.Component.extend({
  classNames:"toolbar",
  song:Ember.inject.service(),
  willRender(){
    console.log(this.get('source'), 'source')
  }
});
