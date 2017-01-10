import Ember from 'ember';



const gearic 			= function(){
		let amount 		= this.get('amount'),
				f					=	.005288,
				vertical	=	this.get('song.docHeight')-128,
				portion		=	1-f * (vertical/amount) ,
				heel			=	-portion;

			console.log( 'style_attribute', amount, portion)
		if(vertical){

			return `transform:scale(${portion}) translateY(${heel}) translateX(${heel}rem)`;
		}
};

export default Ember.Component.extend({
  attributeBindings:['style'],
	song:Ember.inject.service(),
  willRender(){
  },
	style:Ember.computed('amount','song.docHeight',gearic)
		
		
		
	

})
