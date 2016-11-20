import blank from './generateBlank';
//insert isLive check to return proxy object
import blankPart from './blankPart';

export default function(index){
	if(this.get('song.isPart')){

	let compIndex = this.get('song.selected.compIndex'),
			composition=this.get('song.selected.composition'),
			parts			=	this.get('song.selected.content');
	console.error(parts,'parts')
		parts.pushObject(blankPart.call(this))
		
		composition.insertAt(compIndex+1,
					//index
				[	parts.length-1,
					//instance
					0
				])

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


