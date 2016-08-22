import Ember from 'ember';
import Save from './functions/saveAction';

export default Ember.Service.extend({

	song:Ember.inject.service(),

	clear(){
		this.get('centerView').clearRect(0,0,1400,300)
	},
  new(){
    console.log('new')
  },

	save:Save,

	actionNames:Ember.computed(function(){
		let actionNames = this.get('song.actionNames');
			console.log(actionNames, 	`Action Names
											from 
											Options Service`)

		return actionNames
	})
})
