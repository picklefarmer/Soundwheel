

//Instrument Visualization

import soupedIp from 'mixins/functions/soupedip';
import fretNosie from '../mixins/functions/fretnoise.js';
import string from '../mixins/functions/string.js';
import fret from '../mixins/functions/fret.js';
//import fret from '../mixins/functions/fret.js';
//import fret from '../mixins/functions/fret.js';


export function	_method(notes,scale,rate,ctx,time){

				
	var _this = this,l;

		window.requestAnimationFrame(()=>{  



		ctx.beginPath()



			 notes.map(([fret,string]) => {



					ctx.arc(

							fret,
//+++---+++////////**////----**+++/----**+++/*---*+*/*-*/+-*/+*/--*/+*/-*/+*/-*/
							string,


							((fretNoise()
							||soupedIp())
							))


							 ctx.closePath();


					})

				   	ctx.fill()
   
				})

//		},	time*rate)
}

export function	method(chord,scale,rate,ctx,beat,phrase){
    	var phrase = phrase || this.get('selected.measureLength')+1,
        	beat = beat || this.get('beat'),
        	notes = [];
					/*  add Ember.later , add tempChord=> clearRect /* **=-*=-*/	
					//
					//
					//
					//  
	        //rate = ~~(tempo/measureLength);
					//
					//
					//
				for(let l = 0; l < 8; l++){



						Ember.run.later(this,'updateMeter',l,l*300)


				}
console.log( phrase, 'phrase')
	    if( beat < phrase){
					console.log('tick',beat)
				
		    chord.forEach( string => {
        		if( string[beat] && typeof string[beat][0] === 'object'){
            		console.log( ' nest' )         

		            notes.push(string[beat])

        		}else{
		            console.log(' rest ' ) 
        	        notes.push(string);
          		}
     		})

				Ember.run(this,'_method',notes,scale,rate,ctx,beat) 
    		Ember.run.later(this,'method',chord,scale,0,ctx,++beat,phrase,rate)

          	console.log(`
                        notes:`,notes,
                      `
                        beat:`,beat,
                      `
                        phrase:`,phrase)
				console.log(this, 'this is sparta')
				
			

		}else{

			this.set('beat',0)

    	}
  }


