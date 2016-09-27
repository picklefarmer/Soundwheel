import Ember      		from  'ember';
import beat_graphics	from  './functions/beat_graphics';
import Beams 					from  './functions/beams';
import Stave      		from  './instances/stave';
import svgToCtx				from  './functions/svgToCtx';
import TrebleGraph		from  './instances/treble';
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
		svgToCtx.call(this,FourFour,75,80)
		this.set('stave_offset',90)
	},

  clef(bars){

    let ctx = this.get('ctx'),
				stave_width = this.get('stave_width'),
        offset = 40;
    
		while(bars--){
     ctx.fillRect(0,bars*12 + offset,stave_width,2)
    }
		
		ctx.fillRect(stave_width-2,40, 640, 50)

		svgToCtx.call(this,TrebleGraph,65,40)
  },

  lyric:Ember.computed('index',function(){
  
  }),
  lyrics(measureIndex,lyric){
    let ctx     = this.get('ctx'),
        x       = this.get('measure_width') * measureIndex + this.get('stave_offset'),
				y = 140;

    if(lyric){
      ctx.fillText(lyric,x,y)
    }

  },

  measureBar(index){
    let offset = index* this.get('measure_width') + (index?this.get('stave_offset'):0),
        yoffset = 40;

   // console.log(index,'index measureBar',offset, this.get('measure_width'))
    this.get('ctx').fillRect(offset,yoffset,2,50)
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

						console.log(notes,notesArray,'beats')

				if(notesArray.length){

						console.log('beats it is')

					beat_graphics.apply(this,[notesArray,notesIndex])

				}else{
					
					console.log(measureAsObject[notes],'rest is rest')		
					if(measureAsObject[notes].rest !== true){	
						beat_graphics.apply(this,[measureAsObject[notes],notesIndex])
					}
				}
			},this)

			Ember.run(this,Beams,measureIndex)
			Ember.run(this,'lyrics',measureIndex,lyric)

    },this)
	}
});

