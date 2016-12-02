export default function(index){

	let ref,partIndex;
		console.error(parts,'parts')

	if(this.get('song.onLine')){
		ref	= this.get('song.user').child('songs/'+this.get('song.selected.selection'))
		partIndex	= parts.length;

		ref.child('parts').update({[partIndex]:	blankPart.call(this)})
		ref.child('parts').child(partIndex+'/fretboard/0').update(blank.call(this,true))
		parts.pushObject(blankPart.call(this,ref,partIndex,true))

	}else{
	
		parts.pushObject(blankPart.call(this,compIndex+1,0))
	}
		//add composition on ref (  ) 	

		composition.insertAt(compIndex+1,
					//index
				[	parts.length-1,
					//instance
					0
				])

		if(this.get('song.onLine')){
			recompose.call(this,composition,ref.child('composition'),compIndex,partIndex,1)
		}


		this.get('song').set('isEdit',true)
		this.set('song.selected.compIndex',compIndex+1)	
}
