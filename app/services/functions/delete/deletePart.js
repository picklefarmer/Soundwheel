import recompose from './../recompose';
import reseat from './../reseatComposition';

export default function(index){
    let compIndex= this.get('song.selected.compIndex'),
        composition = this.get('song.selected.composition');
				index		= composition.objectAt(compIndex).objectAt(0);

		
		reseat.call(this, composition, compIndex, index)
		this.get('song.selected.composition').removeAt(compIndex,1);
		
		if(this.get('song.onLine')){
				let ref = this.get('song.user').child('songs/'+this.get('song.selected.selection'));
				recompose.call(this,composition,ref.child('composition'),compIndex,index, -1)
		}

		this.set('song.selected.compIndex',compIndex-1)


}
