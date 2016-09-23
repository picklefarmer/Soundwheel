import Ember from 'ember';
export default function(direction){

		if(this.get('song.isBeat')){
			this[direction]('song.beat')
		}else{
			this[direction]('song.selected.index')
      Ember.run(this.get('song'),this.get('song.playMatrix.audio'))
		}

}
