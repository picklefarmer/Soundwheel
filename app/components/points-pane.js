
import Ember from 'ember';
export default Ember.Component.extend({
    tagName:'span',
		song:Ember.inject.service(),
		graphics:{
			verticalTab:"\uD83D\uDCA2",
			isMoji:"M",
//			areStrings:"S",
			isSpritz:'S',
      areFrets:"F"
		}
})
