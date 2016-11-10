export default function(e){
		console.log('pushChord')
    	var arr = this.get('song.chordSelection'),
        	[x,y] = [this.get('cacheX'),this.get('cacheY')],
        	low = this.get('song.chordLow'),
        	diffX = ~~((this.get('song.chordDifference')/2) -0.5),
					diffY = ~~(arr.length/2),
    	 		theArr = arr.map(e => e?e - low + x - diffX:0),
					stringNum = 6,//this.get('song.options')
        	measure = this.get('song.selected.measure.notes');

	    while(y--){
	      theArr.unshift(0)
	    }
	    while(diffY--){
	      theArr.shift()
	    }
	    while(theArr.length < stringNum){
	      theArr.push(0)
	    }

	    theArr = theArr.slice(0,6)

	    console.log(theArr.toString(),measure)

	    //theArr = theArr.map( ( e , f ) => e ? e : ( measure[f] || 0 )) 

	    console.log(theArr.toString(),measure)

	    console.log('is firing',arr)

	    Ember.run( this.get('song') ,this.get('song.content.update'),  theArr  )

}


