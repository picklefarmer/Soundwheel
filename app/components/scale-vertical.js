import Ember from 'ember';



const gearic 			= function(){
		let amount 		= this.get('amount'),
				vertical	=	this.get('song.docHeight'),
				f					=	(1080 -vertical)/1000,
				portion		=	f ,
				heel			=	-portion;

			console.log( 'style_attribute', amount, portion)
		if(vertical){

			return `-webkit-transform-origin: top left;transform:scale(${portion})`;
		}
};

export default Ember.Component.extend({
  attributeBindings:['style'],
	song:Ember.inject.service(),
  willRender(){
  },
	//	style:Ember.computed('amount','song.docHeight',gearic)
		
		
		
	

})
