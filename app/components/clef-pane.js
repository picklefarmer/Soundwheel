import Ember      		from  'ember';
import beat_graphics	from  './functions/beat_graphics';
import Beams 					from  './functions/beams';
import Stave      		from  './instances/stave';
import svgToCtx				from  './functions/svgToCtx';
import Treble					from  './instances/treble';
import Bass						from  './instances/bass';
import FourFour				from  './instances/4';


export default Ember.Component.extend(Stave,{

  tagName:'canvas',
  attributeBindings:['height','width','src'],
  width:640,

	click(){
	
		let element = this.get('element'),
				canvas = document.createElement('canvas'),
				canvasCollect	= this.get('canvasCollect'),
				canLength			= canvasCollect.length,
				y							=	this.get('stave_height'),
				o							= 0,
				ctx 	 = canvas.getContext('2d');

								
				canvas.height = y * canLength;
				canvas.width	= this.get('stave_width')

		for(o; o < canvasCollect.length;o++){
				ctx.drawImage(canvasCollect[o],0,o*y)
		}
		let url = canvas.toDataURL();	
			this.sendAction('action',url)

	},

  didInsertElement(){

    let element = this.get('element'),
				ctx			= element.getContext('2d');

		this.get('canvasCollect').push(element)
    
    this.set('ctx',ctx);

		ctx.font = this.get('stave_font')

    console.log(ctx, 'clef pane ctx')
     Ember.run(this,'clef',5)
		if(this.get('index') === 0)
     Ember.run(this,'timeSignature',5) 
     Ember.run(this,'rememberNotes') 

  },

	timeSignature(){

		svgToCtx.call(this,FourFour,100,80)
		svgToCtx.call(this,FourFour,76,80)
		this.set('stave_offset',90)
	},

  clef(bars){

    let ctx = this.get('ctx'),
				stave_width = this.get('stave_width'),
				staffs	=	this.get('isBass')?2:1,
				staffOffset = 60,
        offset = 40,
				barsTemp = bars;
   
	 	while(staffs--){
			while(bars--){
    	 ctx.fillRect(0,bars*12 + (staffOffset* staffs)+offset,stave_width,2)
    	}
			bars = barsTemp
		}
		
		ctx.fillRect(stave_width-2,40, 640, 50)

		svgToCtx.call(this,Treble,65,40)

		if(this.get('isBass')){
			svgToCtx.call(this,Bass,122,15)
			ctx.beginPath()
			ctx.arc(42,120,3,0,Math.PI*2)
			ctx.arc(42,132,3,0,Math.PI*2)
			ctx.fill()
		}
  },

  lyric:Ember.computed('index',function(){
  
  }),
  lyrics(measureIndex,lyric){
    let ctx     = this.get('ctx'),
        x       = this.get('measure_width') * measureIndex + this.get('stave_offset'),
				y = this.get('isBass')?10:140;

    if(lyric){

      ctx.fillText(lyric,x,y)
    }

  },

  measureBar(index){
    let offset = index* this.get('measure_width') + (index?this.get('stave_offset'):0),
        yoffset = 40;

   // console.log(index,'index measureBar',offset, this.get('measure_width'))
    this.get('ctx').fillRect(offset,yoffset,2,50)
		if(this.get('isBass')){
    	this.get('ctx').fillRect(offset,yoffset+60,2,50)
		}
  },

	barArray:[],
	maximumOffset:-32,

	rememberNotes(){

	  let measures = this.get('noteMatrix');
    console.log(measures , 'noteMatrix ala stave-pane')

    measures.forEach(function(measureGroup,measureIndex){

      let measureAsObject = measureGroup.stave,
          lyric           = measureGroup.lyric;

      this.set('measureIndex',measureIndex)
			this.set('barArray',[])
			this.set('maximumOffset',-32)
      Ember.run(this,'measureBar',measureIndex)

			Object.keys(measureAsObject).forEach((notes,notesIndex) => {

				let notesArray = measureAsObject[notes];

				//chord
				if(notesArray.length){
					beat_graphics.apply(this,[notesArray,notesIndex])
				//rest
				}else{
					//sustained rest
					if(notesArray.rest !== true){	
						beat_graphics.apply(this,[notesArray,notesIndex,true])
					}
				}
			},this)

			Ember.run(this,Beams,measureIndex)
			Ember.run(this,'lyrics',measureIndex,lyric)

    },this)
	}
});

