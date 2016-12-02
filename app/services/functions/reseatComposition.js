export default function(composition,compIndex,index){

    if(!composition.any( ([a,b],f) => f!==compIndex&&a===index )){

			if(this.get('song.onLine')){
				let ref = this.get('song.user').child('songs/'+this.get('song.selected.selection')),
						content = this.get('song.selected.content');
					
					
				ref.child('parts').child(index).remove()
				content.forEach( (e,f)=>{
						if ( f > index){
								console.log(f, 'end of line')
								let {fretboard,name,kit,lyrics} = e,
										map		=	fretboard.getEach('map'),
										notes	=	fretboard.getEach('notes');

								
								fretboard = map.map( (e,f) =>{return  {map:e,notes:notes[f]}})
								console.log(fretboard)
							
								ref.child('parts').child(f-1).update({fretboard,name,kit,lyrics})
								if(f === content.length-1){
									ref.child('parts').child(f).remove()
								}
							}
				})
			}
			this.get('song.selected.content').removeAt(index)
      this.set('song.selected.composition',
        composition.map(([a,b])=>[a>index?a-=1:a,b]))
		}
}
