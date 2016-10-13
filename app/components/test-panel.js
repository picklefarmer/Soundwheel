import Ember from 'ember';

export default Ember.Component.extend({
song:Ember.inject.service(),
actions:{
				ren(){
								this.rerender()
				}
}
});
