const repeat  = function(corpse,pulse){

			if(pulse <= 1){
				setTimeout(()=>{
					requestAnimationFrame(()=>{
						pulse = this.dotChord(corpse,pulse)
						repeat.call(this,corpse,pulse)
					})
				},100)
			}
}

export default function(){
	let ctx 			= this.get('options.centerView'),
			rising		= this.get('song.selected.fretMeasure')
									.getEach(""+this.get('song.beat'))
									.filter( a =>a?true:false),
			pulse			=	0.125;
console.log(rising, ' fadeInChord ' ) 
	if(rising.length){
		Ember.run.later(this,repeat,rising,pulse,160)
	}
	
}
