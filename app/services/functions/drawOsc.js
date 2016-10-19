import Ember from 'ember';
import Osc 	from '../../components/functions/drawOsc';
import Spec from '../../components/functions/drawSpec';
import Bar	from '../../components/functions/drawBarGraph';

export default Ember.computed({
	get(){
			return ""
	},
	
	set(_,val){
		let ctx =this.get('options.graphView'); 
		//this.toggleProperty('isOsc')
		Osc.call(this,null,ctx)

		return val
	}				
})

