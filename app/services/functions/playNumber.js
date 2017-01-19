
export default function(beat){
	Ember.run(this.get('song'),this.get('song.playMatrix.beat'),beat ) 
}
