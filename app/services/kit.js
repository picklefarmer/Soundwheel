import Ember from 'ember';
import kick from './functions/kick';
import hihat from './functions/hihat';
import snare from './functions/snare';

export default Ember.ArrayProxy.reopenClass({
	isServiceFactory:true
}).extend({
	webaudio:Ember.inject.service(),

	init(){
	
		var kl = this.get('kitList'),
				wa = this.get('webaudio'),
				content;

		content = kl.map( piece => this.get(piece))
			.map( piece => {
				return Ember.Object.create({
					ac:wa.get('ac'),
					mv:wa.get('kitVolume'),
          cp:wa.get('compressor'),
					play(){
						piece.call(this.get('ac'),this.get('mv'),this.get('cp'))
					}
				})
			},wa)

		this.set('content',Ember.A(content))

	},
	kitList:[
					'kick'
					,'hihat'
					,'snare'
	],

	kick,
	hihat,
	snare

})
