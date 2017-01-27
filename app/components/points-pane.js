
import Ember from 'ember';
export default Ember.Component.extend({
		classNames:['is-inline'],
		song:Ember.inject.service(),
		graphics:[
			{"name":"verticalTab",	label:"\uD83D\uDCA2" 						},
			{"name":"isMoji",				label:"M"												},
			{"name":"isSpritz",			label:'S'												},
			{"name":"isToneToHue",	label:'\u0beb',	class:'reverse'	},
			{"name":"isFullScreen",	label:'O'												},
			{"name":"isMoon",				label:"\uD83D\uDD76"						},
			{"name":"onLine",				label:'\uD83C\uDF75'						},
			{"name":"isExplain",		label:'\u2754'									},
			{"name":"isToolTip",		label:'\uD83D\uDECE'						}
		]
//      areFrets:"F"
//			areStrings:"S",
		
})
