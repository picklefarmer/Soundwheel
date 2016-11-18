
import Ember from 'ember';
export default Ember.Component.extend({
    tagName:'span',
		song:Ember.inject.service(),
		graphics:{
			verticalTab:"\uD83D\uDCA2",
			isMoji:"M",
//			areStrings:"S",
			isSpritz:'S',
      isToneToHue:'F',
      isFullScreen:'O',
			onLine:'\uD83C\uDF75',
      isExplain:'\u2754'
//      areFrets:"F"
		}
})
