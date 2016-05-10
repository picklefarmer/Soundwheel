import Ember from 'ember';

export default Ember.Component.extend({

    checkedBinding:'option',

    optionsCheck:Ember.computed('option',{
		get(){
			return this.get('parentView.options').get(this.get('name'))
		}
		
	}),

	name:Ember.computed({
		set(_,f){
			this.set('option',Ember.computed.alias('parentView.options.song.'+f))
			return f  
		}
	})


});
