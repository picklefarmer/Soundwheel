import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
		updater:function(val,key){
      this.set('target.fretboard.options.'+val,key)
	    	console.log(this.get('target'),val,key,'_root actions')
    }
  }
})

          /*
        	var main = this.get('main'),
            	name = this.get('bar.name'),
            	hash = {};

        	hash[key] = val;

	    	main.set(name+".options."+key,val)
    		Ember.run(main,main.get("update"),hash ,name+"/options/")

		//this.sendAction('action',val,key)
      }*/

