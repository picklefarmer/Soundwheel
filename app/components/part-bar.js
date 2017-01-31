import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
	tagName:"ul",
	classNames:["sidebar",'part-bar',"scroll"],
  timeSignature:Ember.computed('song.division',{get(){

    var arr = [],
        count = this.get('song.division');

    while(count){
      arr.unshift(count)
        count--
    }
    return arr
  
  }}),
});
