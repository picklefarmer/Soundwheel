import Ember from 'ember';
import notemojiArr from './instances/notemoji';

export default Ember.Mixin.create({
	storage:Ember.computed({get(){
		let storage = JSON.parse(localStorage.songs);
		return storage
	},set(_,a,b){
					console.log('storage',a,b)
			return a
	}
	})
});
