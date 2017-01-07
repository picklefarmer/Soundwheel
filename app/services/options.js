import Ember from 'ember';
import Save from './functions/saveAction';
import New from './functions/newAction';

const depth = {
		0:"offline",
		1:"global",
		2:"group",
		3:"groupAtSelection"
};

export default Ember.Service.extend({

  verticalTab:false,
	song:Ember.inject.service(),
  router:Ember.inject.service('-routing'),


	chat:Ember.computed('depth',function(){
		var level =  depth[this.get('depth')] || 0;
		return this.get('song.firebase').get(level).child('chat')
	}),
	leaders:Ember.computed('depth',function(){
		var	level	=	 depth[this.get('depth')] || 0;
		return this.get('song.firebase').get(level).chat('leaders')
	}),

	setGroup(group){
		let base = this.get('song.firebase');
			
		base.set('group',base.get('base').ref(group))
//		this.set('song.firebase.user',this.get('song.firebase.base').ref(user))
		console.log(this.get('song.firebase.user'),'song.user from params.isOnline')

		this.set('pairingParam',group)
		this.set('song.onLine',true)
	},

	couple:Ember.computed('pairingParam','song.auth.displayName',function(){
		let pairingParam = this.get('pairingParam');
		if(pairingParam && pairingParam !== this.get('song.auth.displayName')){
			return true		
		}
		
	}),
  songConfig(params){
		let {tempo:bpm,voice:instrument} = params;

		console.error(bpm,instrument,'params')
		this.setProperties({bpm,instrument})
  },
  updateUrl(selected){
    let router = this.get('router.router'),
        selection = selected || this.get('song.selected.selection');

      router.replaceWith(router.currentPath,{y:selection})
  },
	clear(){
		this.get('centerView').clearRect(0,0,1400,300)
	},
  new:New,
	save:Save,

	actionNames:Ember.computed(function(){
		let actionNames = this.get('song.actionNames');
			console.log(actionNames, 	`Action Names
											from
											Options Service`)

		return actionNames
	})
})
