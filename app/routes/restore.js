import Ember from 'ember';

export default Ember.Route.extend({
	init(){
		console.log('restoring localStorage')
		delete localStorage.songs	
		history.back()
	}
});
