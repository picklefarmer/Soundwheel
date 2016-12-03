import Ember from 'ember';

const release = function(){
  this.sendAction('release')
},
  press = function(){
    this.sendAction('press')
};

export default Ember.Component.extend({
  tagName:'button',
  mouseDown:press,
  mouseUp:release
})
