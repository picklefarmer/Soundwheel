import NoteGraphic from "./noteGraphic";

const x = 67;
const y = 50;
const offset = 10;
const scale = 36;
const rate = 16;
let tempo = 1944;

const kern = function(a){
				
	console.log(a,'I had the time of my life')

	return a || false
}
const mayu = function(a,beat){

	if(!this.get('isPulse')){
		return false
	}else{
		//if(beat===3||beat===0||beat===6){
			return a.length? a[beat] : a
		//}
	}
}


const targetScale = 1;
var yFactor = offset+(scale/2),
		xFactor	=	offset/2 + (scale/2);
var meterCache = [[],[],[],[],[],[]];
var obj = {}, lastNotes = [];
export default obj;

obj.beat = function(beat){
				console.log(beat, 'playMatrix')
	let audio = this.get('tones'),
			view	=	this.get('options.frontView'),
      stanza= this.get('stanza')/rate,
			print	= this.get('main.notemoji.options'),
			kit		= this.get('selected.measure.kit'),
			isKit = this.get('isKit'),
			holdNote=this.get('holdNote'),
			isMoji	=	this.get('isMoji');
			var time	= this.get('selected.measure.map').objectAt(beat);

	if(holdNote){
		lastNotes.forEach(function(coords){
			window.requestAnimationFrame(()=>{
				view.fillRect(coords[0]-24,coords[1]-24,48,48)
			})
		})
	}

	/*(	lastNotes = this.get('selected.measure').notes
						.map( (string,idx) => [string[beat],idx]	)

						.filter( group => group[0])
						.map( ([note,idx]) => [note*x + xFactor, idx*y + yFactor,note,idx]);
	) */

	lastNotes = this.get('selected.fretMeasure')
							.getEach(""+beat)
							.filter( a =>a?true:false)

	if(isKit && kit){
		toKitBin.call(this,kit.objectAt(beat))
	}

	lastNotes.forEach ( obj => {

		if( !obj[2].length){
			Ember.run(audio.objectAt(obj[3]),'play',obj[2],stanza/(9-time))
			boardWalk.call(this,view,obj[0],obj[1],print,stanza,isMoji)						
		}else{

			Ember.run(audio.objectAt(obj[3]),'glide',obj[2],stanza/(9-time))

			slideWalk.call(this,view,obj[0],obj[1],print,stanza,isMoji)						
		}
	},this)
}

const toKitBin = function(a){
		let val = a.toString(2);
		let kit = this.get('kit');
		while(val.length < 3){
			val = "0"+val
		}
		val.split('').forEach((e,f)=>{
			if(+e){
				kit.objectAt(f).play()
			}
		})
};
const slideWalk		= function(ctx,boardX,boardY,print,stanza,isMoji){

},

			boardWalk = function(ctx,boardX,boardY,print,stanza,isMoji){
		window.requestAnimationFrame(()=>{
//       	this.clearRect(0,boardY-y/2,900,y)
				NoteGraphic.call(this,ctx,boardX,boardY,print,stanza,isMoji)	
	})
};


obj.audio = function(measure,args){
	
		var tones = this.get('tones'),
				tempo = this.get('tempo'),
				measure = this.get('selected.measure');
	
		//tones.setEach('ctx.gain.value',0.001)
		
		//Ember.run.next(this,'pulse')

			console.log(measure,tempo)

		if(measure.notes){

			//Audio 
			//measure.notes.forEach( Matrix , tones )
	

  		// Visual
			Ember.run(this,'pulse',0)
		//	measure.notes.forEach( Draw ,this.get('options.frontView'))
		
		}	
}

const Matrix = function(string,stringIdx){
		
		let time = 0;
			string.forEach(function(fret,time){
				if(fret !== null){
					Ember.run(this.objectAt(stringIdx),'play',fret, time)
				}else{
					console.log(' is null ',fret )
				}
			},this)
}

const Draw = function(fret,string){

	if(typeof fret === "object"){

		fret.forEach(function(fret,time){

				let boardX = offset+(fret*x)+scale/2,
            boardY = offset/2+(y*string)+scale/2;

				Ember.run.later(this,boardWalk
						,boardX
						,boardY												
						,(time-1)*(tempo/6))
		},this)

	}else{

		let boardX = offset+(fret*x)+scale/2,
        boardY = offset/2+(y*string)+scale/2;
	
	 			boardWalk.call(this,boardX,boardY)	
	}
},
format = function(string,numer){
	if(string[time]){
		return [
		 	offset + ( string[time]*x) + scale/2,
			offset/2 + ( y * number ) + scale/2
		];
	}
};

obj.stanzaFunc = function(time){
	var ctx = this.get('options.frontView');
	
	this.get('song.lastNotes').forEach(function(coords){
		console.log(' coords ',coords)
		ctx.fillStyle = "black";
		ctx.fillRect(coords[0],coords[1],11,11)
						ctx.fill()
//		ctx.clearRect(coords[0]-3,coords[1]-3,6,6)
	})
	this.set('song.lastNotes',this.get('selected.measure').notes.map(format))

	this.get('song.lastNotes').forEach(function(coords){
				boardWalk.apply(ctx,coords)
	})
};

