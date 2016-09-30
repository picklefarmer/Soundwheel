import Ember from 'ember';
export default function(index){
	if( !this.get('song.isBeat')){

		
		this.get('song.selected').removeAt(index,1);


		if( index === this.get('song.selected.length')){

			this.decrementProperty('song.selected.index')

		};
		
	}else{

		let beatIndex = this.get('song.beatIndex'),
				strings		=	this.get('song.main.strings')+1,
				map 			= this.get('song.selected.measure.map'),
				theArr		=	[];
		console.error(map,'pre - map')	
//		map.replace(beatIndex,1,'r')
		while(strings--){
			theArr.push(null)	
		}

    Ember.run( this.get('song') ,this.get('song.content.update'),  theArr , true )

		console.error(map,'post - map')	

		//.removeAt(this.get('beatIndex'),1)	
	}

}
