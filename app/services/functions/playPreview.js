import Ember from 'ember';

export default function(){
				console.log( 'this is from the playPreview',this)
	Ember.run(this,this.get('playMatrix.beat'),this.get('beat'))
}
