import Ember from 'ember';
import KeyDown from '../mixins/keydown';

export default Ember.Component.extend(KeyDown,{
	tagName:"textarea",
	attributeBindings:["value","rows","cols"]
});
