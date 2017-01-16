import Ember from 'ember';

export default Ember.Component.extend({
  song:Ember.inject.service(),
  classNameBindings:['inline:inline-block','playbar'],
  willRender(){
    console.log(this.get('peep'),'peep')
  },
  buttons:{
		sustain:			{name:"\u221e", 			type:"toggle"},
		isConvolver:	{name:"\uD83D\uDCEF", type:"action"},

//\u27b0"
//		stepLeft:			{name:"\u25c0",	type:"action"},
		play:					{name:"\u23ef",	type:"action"},
  //  stepRight:		{name:"\u25b6", type:"action"},
    isLoop:				{name:"\uD83D\uDD01",type:"toggle"},
		isOsc:{type:"select", name:{
						Osc:"\uD83C\uDF0A",
						Spec:'\uD83D\uDC53',
						Chord:"\uD83C\uDFB2",
						Bars:"\u231b"
				}
		},
		//graphics | points
		isPaint:{name:"\uD83D\uDC88",type:"toggle"},
//		isBeat:{name:'\uD83D\uDCCF',type:"toggle"},
		isKit:{name:"\uD83D\uDC50",type:"action"}

  }
	
});
