import Ember from 'ember';

export default function(index){

		let beatIndex = this.get('song.beat'),
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
