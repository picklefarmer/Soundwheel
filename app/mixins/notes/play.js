
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

