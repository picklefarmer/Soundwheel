import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
  panelOptions:[
    'right','left','middle','bottom'
  ]
})
