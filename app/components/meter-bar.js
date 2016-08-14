import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
	tagName:"ul",
	classNames:["sidebar"],
  timeSignature:Ember.computed('song.division',{get(){

    var arr = [],
        count = this.get('song.division');

    while(count){
      arr.unshift(count)
        count--
    }
    return arr
  
  }}),
    
    //["|","-","|","-","|","-","|","-"]
	/*
	options:Ember.inject.service(),
	didInsertElement(){
		var element = this.get('element'),
				ctx     = element.getContext('2d'),
				width = Ember.$(document)[0].body.offsetWidth;
				element.width = width/2;
				this.set('options.meterBar',ctx)
	}	
	*/
});
