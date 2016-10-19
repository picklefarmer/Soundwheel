import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
	classNames: ['playbar'],
  buttons:{
		sustain:	{name:"\u221e", type:"toggle"},
		stepLeft:	{name:"\u25c0",	type:"action"},
		play:			{name:"\u23ef",	type:"action"},
    stepRight:{name:"\u25b6", type:"action"},
    isLoop:		{name:"\uD83D\uDD01",type:"toggle"},
		isOsc:{type:"select", name:{
						Osc:"\uD83C\uDF0A",
						Spec:"\uD83D\uDC88",
						Chord:"\uD83C\uDFB2",
						Bars:"\u231b"
				}
		},
		isBeat:{name:'\uD83D\uDCCF',type:"toggle"}

  }
	
});
