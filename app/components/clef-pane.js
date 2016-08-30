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
          ctx.fillRect(0,bars*10 + offset,640,2)
        }
  },
  measureBar(index){
    let offset = index* this.get('measure_width'),
        yoffset = 40;

   // console.log(index,'index measureBar',offset, this.get('measure_width'))
    this.get('ctx').fillRect(offset,yoffset,2,42)
  },
	rememberNotes(){

	  let notes = this.get('noteMatrix');
    console.log(notes , 'noteMatrix ala stave-pane')

    notes.forEach(function(beatsAsObject,index){

      this.set('measureIndex',index)

      Ember.run(this,'measureBar',index)
			console.log(beatsAsObject,'beatsAsObject')
			Object.keys(beatsAsObject).forEach((beats,beat) => { 
				let beatKey = beatsAsObject[beats];
				console.log(beats,beatKey,'beats')
				if(beatKey.length){
					console.log('beats it is')
					beat_graphics.apply(this,[beatKey,beat])
				}else{

					let restLength = beats;
					
					while(!beatsAsObject[++restLength].length){
						beatsAsObject[restLength] = {rest:true}
					}
					restLength-=beats
					beatsAsObject[beats] = {rest:restLength}
					console.log('rest of beats',restLength)
					beat_graphics.apply(this,[beatsAsObject[beats],beat])
					
				}
			},this)
      //measure.forEach(String,this)

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
