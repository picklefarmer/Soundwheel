const x = 67;
const y = 50;
const offset = 18;
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

var meterCache = [[],[],[],[],[],[]];
var obj = {};
export default obj;

obj.beat = function(beat){
  this.get('selected.measure').notes.forEach(function(a,string){
			console.log('what is it:',a,beat,a[beat])
    let fret = a[beat] || mayu.call(this,a,beat),
        boardX = offset+(fret*x)+scale/2,
        boardY = offset/2+(y*string)+scale/2;
    if(fret){
		  Ember.run(this.get('tones').objectAt(string),'play',fret,8)
      boardWalk.call(this.get('options.frontView'),boardX,boardY)
    }    
  },this)
}

obj.audio = function(measure,args){
	
		var tones = this.get('tones'),
				tempo = this.get('tempo'),
				measure = this.get('selected.measure');
	
		tones.setEach('ctx.gain.value',0.001)
		
		//Ember.run.next(this,'pulse')

			console.log(measure,tempo)

		if(measure.notes){

			//Audio 
			measure.notes.forEach( Matrix , tones )
	

  		// Visual
			Ember.run(this,'pulse',0)
		//	measure.notes.forEach( Draw ,this.get('options.frontView'))
		
		}	
}

const Matrix = function(fret,string){
		
		let time = 0;
		if(typeof fret === "object"){
			fret.forEach(function(fret,time){
				if(fret !== null){
					Ember.run(this.objectAt(string),'play',fret, time)
				}else{
					console.log(' is null ',fret )
				}
			},this)
		}else{
			Ember.run(this.objectAt(string),'play',fret, time)
		}
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
}

obj.stanzaFunc = function(time){
	var ctx = this.get('options.frontView');

	this.get('selected.measure').notes.forEach(function(string,numer){
		if(string[time]){
			let boardX = offset + (string[time]*x) + scale/2,
					boardY = offset/2 + (y * numer ) + scale/2;

			boardWalk.call(ctx,boardX,boardY)
		}else{
			let boardX = offset + (string*x) + scale/2,
					boardY = offset/2 + (y * numer ) + scale/2;

					boardWalk.call(ctx,boardX,boardY)
		}
	})
};

const boardWalk = function(boardX,boardY){
		window.requestAnimationFrame(()=>{
       	this.clearRect(0,boardY-y/2,900,y) 
 				this.beginPath()
 				this.arc(boardX,	
				boardY,
				((scale/2)/rate)*20 || l,
				0,
				2*Math.PI)
   			this.closePath();
   			this.fill()
	})
};


