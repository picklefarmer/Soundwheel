import reseatIndexes from '../reseatIndexes';
import blank from '../generateBlank';

export default function(index,compIndex){
		if(this.get('song.onLine')){
			console.log('online init')
			reseatIndexes.call(this,index+1,false)
		}else{
			this.get('song.selected.part.fretboard')
				.insertAt(	index+1	,	blank.call(this,compIndex,index+1));
		}
		this.set('song.selected.index',index+1);

}
