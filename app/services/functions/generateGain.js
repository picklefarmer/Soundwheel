import Ember from 'ember';

const generateGain = function(){
	let ac = this.get('ac'),
			gain = ac.createGain();

	return gain 
};
export default function(name){
	return Ember.computed({
		get(){
			let ac = this.get('ac'),
					gain	=	ac.createGain();

			return gain
		},
		set(_,volume){
			console.log(name, this,'gain',volume)
			this.get(name).gain.volume = volume
		}
	})
};
