import Ember from 'ember';
export default function(index){

  if(this.get('song.isPart')){


    let compIndex= Number(this.get('song.selected.compIndex')),
        composition = this.get('song.selected.composition'),
				index		= composition.objectAt(compIndex).objectAt(0);

    if(!composition.any( ([a,b]) => a===index )){
			this.get('song.selected.content').removeAt(index)
		}

		composition.removeAt(compIndex,1);
		this.set('song.selected.compIndex',compIndex-1)

  }else if( !this.get('song.isBeat')){

		
		this.get('song.selected.part.fretboard').removeAt(index,1);


		if( index === this.get('song.selected.length')){

			this.decrementProperty('song.selected.index')

		};
		
	}else{

		let beatIndex = this.get('song.beatIndex'),
				strings		=	this.get('song.main.strings.options')+1,
				map 			= this.get('song.selected.measure.map'),
				theArr		=	[];

//		map.replace(beatIndex,1,'r')
//
		console.error(map,'pre - map')	

		for(var l = 0;l <= strings;l++){
			theArr.push(null)	
		}

		console.error('theArr', theArr ) 

    Ember.run( this.get('song') ,this.get('song.content.update'),  theArr , true )

		console.error(map,'post - map')	

		//.removeAt(this.get('beatIndex'),1)	
    
	}

}
