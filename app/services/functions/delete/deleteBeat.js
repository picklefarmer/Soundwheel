import reseatIndexes from '../reseatIndexes';

export default function(index){

		let part =	this.get('song.selected.part.fretboard');
		if(this.get('song.onLine')){
			reseatIndexes.call(this,index)
		}else{
			part.removeAt(index);

			if( index !== 0){
				this.decrementProperty('song.selected.index')
			}
		}
		
}
