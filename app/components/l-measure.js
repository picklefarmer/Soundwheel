import Ember from 'ember';

export default Ember.Component.extend({

  classNameBindings:['current:hit','highlight:selected'],
	tagName:"li",
	measure:Ember.computed('index',{
		get(){
      return this.get('beatMask').objectAt(this.get('index'))
			var measure = this.get('index').toString()

			if(	measure[1] ){
				return measure
			}

			return "0"+measure
		}
	}),

    envelope:Ember.computed('boundValue',{
		get(){
      		return this.get('boundValue')
		}
	}),


});
