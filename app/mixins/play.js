import Ember from 'ember';

export default Ember.Mixin.create({

	simple(x,y,offset,scale,note){
		var hex = this.get('song.selected.hex');
			console.log( hex, 'fretboard hex reference' ) 
		let	measure = hex.map((chord,string) => {
				if(typeof chord === 'object'){
					return chord.map((e,part) => { 
						if(e){
							return  Ember.run(this,'_simple',
										   x,y,offset,
										   scale,note,
										   string,e,part)
						}
				  	})
			  	}else if(chord){
					return  Ember.run(this,'_simple',
								   x,y,offset,
								   scale,note,
								   string,chord)
			  	}else{
					return null
			  	}
			}).filter(e => e?e:false)

		return measure

				//      this.set('song.cacheNotes',measure)
	},

	 _simple(x,y,offset,scale,note,string,chord,part){
        
		Ember.run(note.objectAt(string),'play',chord,part || 0)

        return [offset+(chord*x)+scale/2,
                offset/2+(y*string)+scale/2
               ]
	},
	
	_method(notes,scale,rate,ctx,time){
    	var _this = this;

        Ember.run.later( () => {
        	window.requestAnimationFrame(()=>{  
        		ctx.beginPath()
                notes.map(([fret,string]) => {
                	ctx.arc(fret,	string,	((scale/2)/rate)*20||l,	0,2*Math.PI)
                    ctx.closePath();
                })

 		    	ctx.fill()
            })
        },time*rate)
	},

	method(chord,scale,rate,ctx,beat,phrase){
    	var phrase = phrase || this.get('song.selected.measureLength')+1,
        	beat = beat || this.get('song.beat'),
        	notes = [];
			//  add Ember.later , add tempChord=> clearRect
	        //rate = ~~(tempo/measureLength);

	    if( beat < phrase){
		    chord.forEach( string => {
        		if( string[beat] && typeof string[beat][0] === 'object'){
            		console.log( ' nest' )         

		            notes.push(string[beat])

        		}else{
		            console.log(' rest ' ) 
        	        notes.push(string);
          		}
     		})

          	console.log(`
                        notes:`,notes,
                      `
                        beat:`,beat,
                      `
                        phrase:`,phrase)

	    	Ember.run(this,'_method',notes,scale,rate,ctx,beat) 
    		Ember.run.later(this,'method',chord,scale,0,ctx,++beat,phrase,rate)

		}else{

			this.set('song.beat',0)

    	}
  },

	playNotes(_index){

    	var chord =  this.get('measure');

//    	console.log(this.get('song.selected.measure'),chord,"log of measure")

      	if(!chord)return

      	chord = chord.notes

      	let x = 67,
        	y = 50,
        	offset = 18,
        	rate = 24,
      		tempo = ~~(this.get('tempo')/50),
        	scale = 36,
        	note = this.get('tones'),
        	tempChord = this.get('cacheNotes'),
        	index = _index || ~~this.get('song.selected.index').toString(),
        	ctx =  this.get('options.frontView');
        	rate = ~~(tempo/2)-1;

		console.log('ctx from playNotes in fretboard', ctx)
		//     ctx.clearRect(0,0,1400,300)
		//     note.setEach('freq',0)
		
    	note.setEach('ctx.gain.value',0.1)

	    chord = Ember.run(this,'simple',x,y,offset,scale,note)
          
	     Ember.run(this,'method',chord,scale,rate,ctx)
	},



})

/* 
   * [2,4,5,4,3],
   * [2,4,5,4,3],
   * [2,4,5,4,3],
   * [2,4,5,4,3],
   * [2,4,5,4,3],
   * [2,4,5,4,3],
*/
/* 
 chord.forEach((notes,string)=>{
	if(typeof notes[0] === 'object'){
	  notes.forEach( (part,time) => { if(part) 
	  Ember.run(this,'_method',part,scale,rate,ctx,time) })
	}else{ 
	  Ember.run(this,'_method',notes,scale,rate,ctx) }
})
 */


/*
string       |0|          |1|         |2|         |3|         |4|         |5| 
 [                                                                           ]
[           ], [177,277] , [177,277] , [177,277] , [177,277] , [177,277]  
m  |0|    [177,277]    
e  |1|    [177,277] 
t  |2|    [177,277]     
e  |3|    [177,277]
r  |4|    [177,277]

*/  

/*
chord = chord.map((e,f) => { 
   if(e){
     Ember.run(note.objectAt(f),'play',e,+("0."+f))
        return  [ offset+(e*x)+scale/2,
        offset/2+(y*f)+scale/2
               ]
   }else{
         //  note.objectAt(f).pause()
   }
}).filter(e => e?e:false)
        
this.set('song.cacheNotes',chord)
*/

/* 
for(var l = 0; l <rate; l++){	
	Ember.run.later(this,(l)=>{
    	window.requestAnimationFrame(()=>{
    		tempChord.map(([fret,string]) => ctx.clearRect(fret-scale/2,string-scale/2,scale,scale))
      		if(this.get('song.selected.index') === index){
//      		console.log(index,this.get('song.index'))
	  			ctx.beginPath()
        		chord.map(([fret,string]) => {  
           			console.log(fret,"Fret",string,"String")
		    	    ctx.arc(fret,	string,	((scale/2)/rate)*24,
							0,2*Math.PI)
           			ctx.closePath();
        		})
    			ctx.fill()
      		}
        })
	},l,(Math.sin(60/l)+1)*l*tempo)
	//tempo*l);
}
*/

