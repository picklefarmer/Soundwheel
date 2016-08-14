import Ember from 'ember';

export default Ember.Component.extend({
				tagName:"img",
        classNames:"backGround",
				attributeBindings:["slf:src"],
				slf:"images/dino.ico",
				click(){
					this.toggleProperty('song.isPulse')	
				},
				

				song:Ember.inject.service(),
});
