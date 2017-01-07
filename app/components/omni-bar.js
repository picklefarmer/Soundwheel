import Ember from 'ember';
import Numeric from './../mixins/instances/numeric';
export default Ember.Component.extend({
	classNames: ['menubar'],
  song:Ember.inject.service(),
  beatMask:Numeric,
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
