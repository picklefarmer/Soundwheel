export default function(e){
		var f = Ember.run(this,"mouseFormat",e),
			measure = this.get('song.measure');

        console.log('this is firing',measure,this.get('song'))
				console.log( measure,`
												${this.get('song.measure')}
												${this.set('song.measure.notes.'+f[1],f[0])}`)

		Ember.run(this.get('song'),this.get('song.selected.unhex'),f)
		Ember.run(this.get('song'),this.get('song.content.update'),f)
}


