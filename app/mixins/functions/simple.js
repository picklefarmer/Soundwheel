//Audio
								
export function	_simple(x,y,offset,scale,soundBank,string,fret,part){
       console.log( '_simple pre',`
											 soundBank${soundBank},
											 string${string},
											 fret${fret},
											 part${part}`) 

		Ember.run(soundBank.objectAt(string),'play',fret,part || 0)

        return [offset+(fret*x)+scale/2,
                offset/2+(y*string)+scale/2
               ]
	}

export function simple(x,y,offset,scale,soundBank){
		console.log('debug --- starting', x, y, offset, scale, soundBank, this.get('selected'))
		var hex = this.get('selected.hex');
			console.log( hex, 'fretboard hex reference' ) 
		let	measure = hex.map((chord,string) => {
				if(typeof chord === 'object'){
					return chord.map((e,part) => { 
						if(e){
							return  Ember.run(this,'_simple',
										   x,y,offset,
										   scale,soundBank,
										   string,e,part)
						}
				  	})
			  	}else if(chord){
					return  Ember.run(this,'_simple',
								   x,y,offset,
								   scale,soundBank,
								   string,chord)
			  	}else{
					return null
			  	}
			}).filter(e => e?e:false)

		return measure

				//      this.set('song.cacheNotes',measure)
	}
