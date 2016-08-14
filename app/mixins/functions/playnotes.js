//Audio Visual Setup
//per measure
import playMatrix from '../functions/playmatrix';

export default function(_index){
			/*
			 *
			 *
			 * add index to function argument
			 *
			 */

    	var chord =  this.get('measure');
    	console.log(this.get('selected.measure'),chord,"log of measure")

      	if(!chord){
					return
				}

      	chord = chord.notes

      	let args = {
					x : 67,
			   	y : 50,
        	offset : 18,
      		tempo : ~~(this.get('tempo')/50),
        	//rate = 800,//~~(this.get('tempo'))/this.get('selected.measureLength')+1,
        	scale : 36,
        	soundBank : this.get('tones'),
        	tempChord : this.get('cacheNotes'),
        	index : _index || ~~this.get('selected.index').toString(),
        	ctx :  this.get('options.frontView'),
        	rate : ~~(this.tempo/2)-1
				}


		console.log('ctx from playNotes in fretboard', args.ctx)
		//     ctx.clearRect(0,0,1400,300)
		//     note.setEach('freq',0)

			playMatrix(chord,args)
			/*		
    	soundBank.setEach('ctx.gain.value',0.0)

			// Audio
	    chord = Ember.run(this,'simple',x,y,offset,scale,soundBank)

      // Visual    
	    Ember.run(this,'method',chord,scale,rate,ctx)
			*/
}


