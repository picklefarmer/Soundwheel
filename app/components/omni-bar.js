import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
  left:{
		stepLeft:			{name:"\u25c0",	type:"action"},
  },
  right:{
    stepRight:		{name:"\u25b6", type:"action"},
		barType:{type:"select", name:{
						'meter'   :"\uD83D\uDCCF",
						'measure' :"\uD83D\uDCD0",
						'part'    :"\u2604",		
      }
		},

  }


});
