export default function(e){
		var f = Ember.run(this,"mouseFormat",e),
			measure = this.get('song.measure');

		// console.log('this is firing',measure,this.get('song'))

		Ember.run(this.get('song'),this.get('song.content.update'),f)
}


