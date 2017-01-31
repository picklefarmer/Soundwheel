import Ember from 'ember';
export default Ember.Component.extend({
  song:Ember.inject.service(),
  isVisibleBinding:'song.isToolTip',
  tipClass:Ember.computed('song.tipJar','name',function(){
    let tipJar = this.get('song.tipJar'),
        name   = this.get('name');
    if(name)
    return tipJar.get(name)
  }),
  classNames:['tool-tip'],
})
