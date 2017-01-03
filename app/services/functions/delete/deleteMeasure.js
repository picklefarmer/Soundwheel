import reseatIndexes from '../reseatIndexes';

export default function(index){

		if(this.get('song.onLine')){
			reseatIndexes.call(this,index)
		}else{
			let part =	this.get('song.selected.part.fretboard');
			part.removeAt(index);

			if( index !== 0){
				this.decrementProperty('song.selected.index')
			}
		}
}
