import Ember from 'ember';

export default Ember.Component.extend({

	list:Ember.computed('bar',{
		set(_,list){
			console.log( 'list of select - range' )
			return this.get('bar.options')
		}
	}),

	actions:{
    	updater(val,index){
    		console.log(val,index,'_root actions')
        	this.sendAction('action',val,index)
    	}
  	}


});
