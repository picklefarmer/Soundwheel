import Ember from 'ember';
import Save from './functions/saveAction';
import New from './functions/newAction';

export default Ember.Service.extend({

  verticalTab:true,
	song:Ember.inject.service(),
  router:Ember.inject.service('-routing'),
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
