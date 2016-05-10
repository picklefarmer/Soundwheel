import Ember from 'ember';

export default Ember.Component.extend({

    list:Ember.computed('bar.options',{
		get(){
      		var arr = [],
				property = this.get('bar.options');

				console.log(property, 'property of select-set component')

			arr = Object.keys(property).map( key  =>  {
               	return {"name":key,"hex":property[key]}
            })

			return arr
		}
	}),

    actions:{
		updater:function(val,key){
        	var main = this.get('main'),
            	name = this.get('bar.name'),
            	hash = {};

        	hash[key] = val;

	    	main.set(name+".options."+key,val)
    		Ember.run(main,main.get("update"),hash ,name+"/options/")

	    	console.log(val,key,'_root actions')
		//this.sendAction('action',val,key)
      }
   }

});
