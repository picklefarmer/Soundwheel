import Ember from 'ember';

export default Ember.Component.extend({
	tagName:'li',
	classNameBindings:'bool:hit',
	click(){
//		this.toggleProperty('bool')
	}
});
