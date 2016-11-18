import Ember from 'ember';
//import * as Simple from '../mixins/functions/simple';
//import * as Method from '../mixins/functions/playmethod';
import playMatrix from '../mixins/functions/playmatrix';
//import isOsc      from '../services/functions/drawOsc';
import Osc 		from '../components/functions/drawOsc';
import Chord 	from '../components/functions/drawOscArray';
import Spec 	from '../components/functions/drawSpec';
import Bar		from '../components/functions/drawBarGraph';

const x = 67;
const y = 50;
const offset = 18;
const scale = 36;

export default Ember.Mixin.create({
  globalKeydown:Ember.inject.service(),

actions:{
  isEdit(event){
    console.log(event,' this is of isEdit')
    event.stopPropagation()
    event.target.blur()
    this.set('isEdit',false)    
  },
	saveToStorage(){
		localStorage[this.get('storageName')] = JSON.stringify(this.get('storage'));
		console.log('saveToStorage')
	},
  sustain(){
				this.toggleProperty('sustain')
  },
  barType(barType){
    if(barType === 'meter'){
      this.set('isBeat',true)
    }else{
      this.set('isBeat',false)
    }
    if(barType === 'part'){
      this.set('isPart',true)
        if(!this.get('pause')){
           this.set('selected.index',0) 
        }
    }else{
      this.set('isPart',false)
    }
    
    this.set('barType',barType)
  },
	isConvolver(){
		let wa = this.get('webaudio'),
				ac = wa.get('ac'),
				co = wa.get('compressor'),
				re = wa.get('reverb'),
				ga = wa.get('masterVolume');

		if(this.toggleProperty('isConvolver')){
			ga.disconnect(co)
			ga.connect(re)
			re.connect(co)
		}else{
			re.disconnect(co)
			ga.disconnect(re)
			ga.connect(co)					
		}
	},
  isLoop(){
				this.toggleProperty('isLoop')
  },
	isPaint(){
		this.toggleProperty('isPaint')
	},
	isOsc(val){
				console.log(val, 'val from isOsc')
				let ctx =this.get('options.graphView'); 
				this.toggleProperty('isOsc')
				switch(val){
					case "Spec":Spec.call(this,null,ctx);break;
					case "Osc":Osc.call(this,null,ctx);break;
					case "Bars":Bar.call(this,null,ctx);break;
					case "Chord":Chord.call(this,null,ctx);break;
				}				
				this[val].call(this,null,ctx)
	},
	isBeat(){
				this.toggleProperty('isBeat')
	},
	isKit(){
console.log('isKit',this.get('isKit'))
		this.toggleProperty('isKit')

		if(!this.get('selected.part.kit')){
			//this.get('selected').setEach('kit',[0,5,0,5,0,5,0,0])  | copy drum loop?
			this.get('selected').forEach( e => e.kit = [0,2,2,2,0,2,2,0])
		}
	},
	stepLeft(){
		console.log( 'stepLeft ' ) 
    if(this.get('isBeat')){
			this.decrementProperty('beat')
		}else{
			this.decrementProperty('selected.index')
		}
	},
	stepRight(){
    if(this.get('isBeat')){
			this.incrementProperty('beat')
		}else{
			this.incrementProperty('selected.index')
		}
	},	
	play(){
//			console.log( 'play ' ,this.get('song.pause')) 
	    
			if(this.toggleProperty('pause')){
				Ember.run.next(this,'clock')
			}
  }
},

	playMatrix
})
