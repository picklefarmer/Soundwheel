import blank from './generateBlank';
import blankPart from './blankPart';

export default function(index){
	if(this.get('song.isPart')){

	let compIndex = this.get('song.selected.compIndex'),
			parts			=	this.get('song.selected.content');
		parts.insertAt(this.get('song.selected.composition.length')+1,blankPart.call(this))
		this.get('song.selected.composition').insertAt(compIndex+1,parts.length-1)
		this.get('song').set('isEdit',true)
		this.set('song.selected.compIndex',compIndex+1)	
	}else{
  	let {map,notes} = blank.call(this);


		this.get('song.selected.part.fretboard')
					.insertAt(	index+1	,{
						notes,
						map
					});

		this.set('song.selected.index',index+1);
	}
}
