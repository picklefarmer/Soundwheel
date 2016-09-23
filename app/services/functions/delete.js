import Ember from 'ember';
export default function(index){
	if( !this.get('song.isBeat')){

		
		this.get('song.selected').removeAt(index,1);


		if( index === this.get('song.selected.length')){

			this.decrementProperty('song.selected.index')

		};
		
	}else{
		let beatIndex = this.get('song.beatIndex'),
				strings		=	this.get('song.main.strings'),
				theArr		=	[];
		
		while(strings--){
			theArr.push(null)	
		}

    Ember.run( this.get('song') ,this.get('song.content.update'),  theArr , true )


		//.removeAt(this.get('beatIndex'),1)	
	}

}
