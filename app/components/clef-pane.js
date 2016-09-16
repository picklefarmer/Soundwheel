import Ember      from  'ember';
//import stave_Beat from  './functions/stave_beat';
import beat_graphics from  './functions/beat_graphics';
import Stave      from  './instances/stave';
/*temp*/

export default Ember.Component.extend(Stave,{
  tagName:'canvas',
  attributeBindings:['height','width'],
  width:640,

  didInsertElement(){

    let ctx = this.get('element').getContext('2d');
    
    this.set('ctx',ctx);
    console.log(ctx, 'clef pane ctx')
     Ember.run(this,'clef',5) 
  //   Ember.run(this,'renderNotes') 
     Ember.run(this,'rememberNotes') 
//		 rest_Note.call(this,[1,1])

  },
  clef(bars){
    let ctx = this.get('ctx'),
        offset = 40;
        while(bars--){
          ctx.fillRect(0,bars*12 + offset,640,2)
        }
  },
  measureBar(index){
    let offset = index* this.get('measure_width'),
        yoffset = 40;

   // console.log(index,'index measureBar',offset, this.get('measure_width'))
    this.get('ctx').fillRect(offset,yoffset,2,42)
  },

	createBeams(index){
		let eighthArray = this.get('barArray'),
				length			= eighthArray.length,
				ix					=	0,
				ctx					=	this.get('ctx'),
				grouping		= [];

		for(ix;ix < length;ix++){
			//if even
			if(ix%2){
				grouping[ix-1].push(eighthArray[ix])
			//if odd
			}else{
				grouping[ix] = []
				grouping[ix].push(eighthArray[ix])
			}
		}	
		grouping = grouping.filter(e=>e !== undefined)
		console.log(grouping, ' grouping ',grouping.length )

		console.log(eighthArray,'single')
		grouping.forEach( group => {
			if((group[1] === "rest") || !group[1]){

				console.log('drawing eight note singles',group)
				ctx.drawImage(this.get('graphics'),
				this.get('elements').eight_note.default * 10 + 12,
				10,
				20,
				70,
				group[0].x*20 + this.get('measureIndex')*240,
				-32 - group[0].y,
				20,
				70)

			}else{
							let start = group[0],
									end		= group[1],
									width	=	20,
									begin	=	index*240,
									yO		=	-10 || 110,
									xO		= 10,
									startX= xO + start.x*width+begin,
									startY= xO + -start.y+yO,
									endX	= xO + end.x*width+begin,
									endY	=	xO + -end.y+yO;
									
							ctx.beginPath()
							ctx.moveTo(startX,startY)
							ctx.lineTo(endX,endY)
							ctx.lineWidth = 4;
							ctx.stroke()
			}
			
		})	
	},

	barArray:[],
	maximumOffset:-32,

	rememberNotes(){

	  let measures = this.get('noteMatrix');
    console.log(measures , 'noteMatrix ala stave-pane')

    measures.forEach(function(measureAsObject,measureIndex){

      this.set('measureIndex',measureIndex)
			this.set('barArray',[])
			this.set('maximumOffset',-32)
      Ember.run(this,'measureBar',measureIndex)

			/*
			let debug = Object.keys(beatsAsObject).map(a=>{
							let b = beatsAsObject[a][0];
							return `${b.note},${b.o}`
			});
			console.log(beatsAsObject,'beatsAsObject')
*/

			Object.keys(measureAsObject).forEach((notes,notesIndex) => {

				let notesArray = measureAsObject[notes];

						console.log(notes,notesArray,'beats')

				if(notesArray.length){

						console.log('beats it is')

					beat_graphics.apply(this,[notesArray,notesIndex])

				}else{
					
					console.log(measureAsObject[notes],'rest is rest')		
					if(measureAsObject[notes].rest !== true){	
						beat_graphics.apply(this,[measureAsObject[notes],notesIndex])
					}
				/*
 
					let restLength = notes;
					console.log( measureAsObject[notes], 'rests a mode')				

					if(!measureAsObject[notes].rest	){
						while(!measureAsObject[++restLength].length){
							measureAsObject[restLength] = {rest:true}
						}
						restLength-=notes
						measureAsObject[notes] = {rest:restLength}
						console.log('rest of beats',restLength)
					}

				*/
				}
			},this)
      //measure.forEach(String,this)
			
			//Ember.run(this,'drawBar',measureIndex)
			Ember.run(this,'createBeams',measureIndex)

    },this)

//    notes.forEach(measureString,this)
	},
  /*
  renderNotes(){
    let notes = this.get('noteMatrix');
    console.log(notes , 'noteMatrix ala stave-pane')

    notes.forEach(function(measure,index){
      this.set('measureIndex',index)
      Ember.run(this,'measureBar',index)
      measure.forEach(String,this)
    },this)
//    notes.forEach(measureString,this)

  },


*/

});


/* NOTES
 
   string = 6
   forEach string => fret
    fret += interval[stringIndex]
    note = [fret%12,octave,(beat)]
  
    every note is measure becomes flattened to [2]

     
 */
