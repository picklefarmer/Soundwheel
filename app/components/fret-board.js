import Ember from 'ember';
import play from '../mixins/play';

export default Ember.Component.extend(play,{
  options:Ember.inject.service(),
	song:Ember.inject.service(),

 	tones:Ember.inject.service(),  
	globalKeydown:Ember.inject.service(),	

	names:['backView','frontView','centerView'],

	classNames:['tablet'],

	chordTemp:[],
	tempChord:[],
	volume:	0.25,

	didInsertElement(){
   	this.get('tones.strings')
		Ember.$(document).keydown(e => Ember.run(this,this.get('globalKeydown.begin'),e))
	},

	willDestroyElement(){
    	Ember.$(document).off('keydown')
  },

	pushNote(e){
		var f = Ember.run(this,"mouseFormat",e),
			measure = this.get('song.measure');

        console.log('this is firing',measure,this.get('song'))
				console.log( measure,`
												${this.get('song.measure')}
												${this.set('song.measure.notes.'+f[1],f[0])}`)

		Ember.run(this.get('song'),this.get('song.selected.unhex'),f)
		Ember.run(this.get('song'),this.get('song.content.update'),f)
	},

	pushChord(e){
		console.log('pushChord')
    	var arr = this.get('song.chordSelection'),
        	[x,y] = [this.get('cacheX'),this.get('cacheY')],
        	low = this.get('song.chordLow'),
        	diffX = ~~((this.get('song.chordDifference')/2) -0.5),
					diffY = ~~(arr.length/2),
    	 		theArr = arr.map(e => e - low + x - diffX),
					stringNum = 6,//this.get('song.options')
        	measure = this.get('song.selected.measure.notes');

	    while(y--){
	      theArr.unshift(0)
	    }
	    while(diffY--){
	      theArr.shift()
	    }
	    while(theArr.length < stringNum){
	      theArr.push(0)
	    }

	    theArr = theArr.slice(0,6)

	    console.log(theArr.toString(),measure)

	    //theArr = theArr.map( ( e , f ) => e ? e : ( measure[f] || 0 )) 

	    console.log(theArr.toString(),measure)

	    console.log('is firing',arr)

	    Ember.run( this.get('song') ,this.get('song.content.update'),  theArr  )

	},

	chordHover(e){
		var arr = this.get('song.chordSelection'),
			low = this.get('song.chordLow'),
			[  x , y  ]	= Ember.run(this,"mouseFormat",e);

		if( (x !== this.get('cacheX')) || ( y !==this.get('cacheY')) ){
			this.setProperties({cacheX:x,cacheY:y }) 

			console.log(x,y,"cache",arr)	
			let diffX = ~~((this.get('song.chordDifference')/2) -0.5),
				diffY = ~~(arr.length/2);
				
			arr = arr.map((fret,string)=>{
				fret-=low;
				fret+=x;	
				string+=y;					
				fret-=diffX;
				string-=diffY;
				fret*=67;
				string*=50;
				return [fret,string]
			})

			Ember.run(this,'dotChord',arr)

		}
	},
		
	dotChord(chord){
		var offset = 18,
			scale = 36,
			l = 8,
			chordTemp = this.get('chordTemp'),
			ctx = this.get('options.centerView');
			
    	chordTemp.map(([fret,string]) => ctx.clearRect(fret+scale/2,string,scale,scale+offset))
        
        ctx.globalCompositeOperation = "source-over"
		ctx.globalAlpha=	0.5
		ctx.fillStyle = "white" 
		
		for(var [x,y] of chord){
			ctx.beginPath()
			ctx.arc(offset+x+scale/2,
					offset/2+y+scale/2,
					((scale/2)/8)*l,
					0,2*Math.PI)
					ctx.fill();
		}

		this.set('chordTemp',chord)
		ctx.globalAlpha=1
	},

	clear(ctx='options.frontView'){
		this.get(ctx).clearRect(0,0,1400,300)
	},

	mouseMoveBinding:"mouseSelection",
	mouseSelection:Ember.computed('song.chordSelection',{
		get(){
    		console.log ( 'moving')
		  	if(this.get('song.chordSelection')){
				return this.get('chordOverlay')
			}

	  		return null
		}
	}),
	
  	chordOverlay(e){
		Ember.run.throttle(this,'chordHover',e,2)
	},
	
	click(e){
		if(this.get('song.chordSelection')){
			Ember.run.once(this,'pushChord',e)
		}else{
			Ember.run.once(this,'pushNote',e)
		}
	},
	
	mouseLeave(){
		if(this.get('song.chordSelection')){
			Ember.run.once(this.get('options'),'clear')
		}
	},

	mouseFormat(E){
		//console.log( this.get('element').offsetTop,"OFFSETTOP") 
		var [ x , y ]	=	[
			   					E.offsetX == undefined ? E.pageX - (this.get('element').offsetLeft +40): E.offsetX,
			   					E.offsetY == undefined ? E.pageY - (this.get('element').offsetTop): E.offsetY
							];
		
			E = [ x , y ]=[~~((x-10)/(1472/23)),~~((y-5)/(300/6))];
		return E
	},
/*
	playSwitch:Ember.observer('song.selected.isFulfilled',function(){
		console.log('playSwitch observer')
		var proxy  = this.get('song.selected.isFulfilled');

	    if(proxy){
    		this.addObserver('song.selected.measure.notes.@each',this.playNotes) 
      		Ember.run.next(()=>{console.log( `play switch Ember.${true}` , this.get('song.selected.measure'))})
    	}else if(!proxy){
    		console.log( `play switch Ember.${false}` ) 
      		this.removeObserver('song.selected.measure.notes.@each',this.playNotes) 
    	}

	}),
 */

})

