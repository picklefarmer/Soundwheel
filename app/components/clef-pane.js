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

		grouping.forEach( group => {
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
		})	
	},

	drawBar(index){
		let barArray = this.get('barArray'),
				arrayLength = barArray.length,
				tempLength	=	arrayLength,
				measureOffset=	index*240;
				
		if(arrayLength){

			//determine direction
			let slopeDirection = 0;

			while(--tempLength > 0){
				let diffSlope = barArray[tempLength].y - barArray[tempLength-1].y;
				console.log('bar', diffSlope)
				if(diffSlope <= 0){
					slopeDirection++
				}else{
					slopeDirection--
				}
			}
			console.log('bar slope',slopeDirection)

							/*
			if(slope < 0){
				barArray.sort((a,b)=>b)
			}
*/
			let boundsX 	= barArray.map(a=>a.x),
					boundsY 	= barArray.map(a=>a.y),
					verticalOffset = 110 || -this.get('maximumOffset') || 110,
					highY			=	Math.max.apply(Math,boundsY),
					lowY			=	Math.min.apply(Math,boundsY),
					highX			=	Math.max.apply(Math,boundsX),
					lowX 			=	Math.min.apply(Math,boundsX),
					ctx 			=	this.get('ctx'),
					highIndex = boundsY.lastIndexOf(highY),
					lowIndex	= boundsY.indexOf(lowY),
					dHigh			= barArray[highIndex].x,
					dLow			= barArray[lowIndex].x,
					highDif		= highX - dHigh,
					lowDif		= dLow  - lowX,
					slope			= (lowY - highY) / ((dLow || lowX) - (dHigh || highX)),
					adjLow		= lowDif * 20,
					adjHigh		= highDif * 20,
					oppLow		= Math.tan(slope) * adjLow,
					oppHigh 	= Math.tan(slope) * adjHigh;
					
			if(lowDif){
			
			}

			if(highDif){
			
			}
					console.log('barA slope', `
								oppLow:${oppLow}
								oppHigh:${oppHigh}
								adjLow:${adjLow}
								adjHigh:${adjHigh}
								lowX:${lowX}
								highX:${highX}
								lowY:${lowY}
								highY:${highY}
								(lowY - highY / lowX - highX)
								slope:${slope}
								highDif:${highDif}
								lowDif:${lowDif}
								dLow:${dLow}
								dHigh:${dHigh}
								lowIndex:${lowIndex}
								highIndex:${highIndex}
								`)
			/*
			 
			 /---------x
			 |			0	n
			 |		0		0
			 |	0
			 y

			 highX, highY + 
			 */
			//determine the difference x between highX/Y and lowX/Y's

			console.log(barArray, 'barArray',`high:${highY}\nlow:${lowY}`)
			ctx.beginPath()
			if(slopeDirection < 0 ){
				ctx.moveTo(10+lowX*20+measureOffset,oppHigh + verticalOffset+highY)
				ctx.lineTo(10+highX*20+measureOffset,oppHigh + verticalOffset+lowY)
			}else{
				ctx.moveTo(10+lowX*20+measureOffset,verticalOffset+lowY)
				ctx.lineTo(10+highX*20+measureOffset,verticalOffset+highY)
			}
			ctx.lineWidth=5
			ctx.stroke()

//			console.log(this.get('maximumOffset'),'maximumOffset')
		}
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

					let restLength = notes;
					
					while(!measureAsObject[++restLength].length){
						measureAsObject[restLength] = {rest:true}
					}
					restLength-=beats
					measureAsObject[notes] = {rest:restLength}
					console.log('rest of beats',restLength)
					beat_graphics.apply(this,[measureAsObject[notes],notesIndex])
					
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
