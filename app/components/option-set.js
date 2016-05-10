import Ember from 'ember';

export default Ember.Component.extend({
	selected:Ember.computed({
		set(_,I,II){
		    console.log(II,I)
    		if(I && II){
      			if(I !== II){
        			console.log(I," option set stuff")
			        this.send('updater',I, this.get('index')) 
      			}
			}
    		return I || this.get('selection') || this.get('bar.options')
		}
	}),

	actions:{
    	updater(val,index){
		 	this.sendAction('action',val,index)
			console.log('actions',val,index)
		}
 	}


});
