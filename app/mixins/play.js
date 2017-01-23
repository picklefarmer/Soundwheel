import Ember from 'ember';
//import * as Simple from '../mixins/functions/simple';
//import * as Method from '../mixins/functions/playmethod';
import playMatrix from '../mixins/functions/playmatrix';
//import isOsc      from '../services/functions/drawOsc';
import Osc 		from '../components/functions/drawOsc';
//import Chord  from '../services/actions/chord';
import OscArr 	from '../components/functions/drawOscArray';
import Spec 	from '../components/functions/drawSpec';
import Bar		from '../components/functions/drawBarGraph';
import ChatPass from './functions/chatPass';
import Numeric  from './instances/numeric';
const actions = {
  
};
const x = 67;
const y = 50;
const offset = 18;
const scale = 36;

export default Ember.Mixin.create({
	/* temp */
	isParty:true,

  globalKeydown:Ember.inject.service(),

actions:{
  saveSelection(){
		Ember.run(this.get('chords'),"update",this.get('chords.content')) 
  },

	updateSelection(){
		var model = this.get('chords'),
				selected		=	this.get('chordSelected'),
        selection   = this.get('chordSelection'),
        index = model.indexOf(selection);

		this.set('chordSelection',selected)

		model.replace(index,1,[selected])
//  this.get('chord').replace(index,1,[selected])
	},

	chordCapture(){
		  var chord = this.get('song.selected.measure.notes').filter(e => e ? e : false),
              low   = Math.min.apply(this,chord),
              high  = Math.max.apply(this,chord),
              difference = Math.abs(low - high) + 1

          this.send('newSelection',{chord,high,difference,low})

	},

  newSelection({chord:notes,high,difference,low}={}){

    console.log("pre-model",this.get('chord'))
    notes = notes || Ember.A([1,1,1,1]);
    this.set('chordSelected',notes)
    this.get('chords').addObject(notes)
    this.set('chordSelection',notes)
    console.log("chordSelection",this.get('model')||"undefined",notes||"undefined",high,difference,low) 
  },

	deleteSelection(){
		var selection = this.get('chordSelection');
		this.get('chords').removeObject(selection)
		this.setProperties({chordSelected:null,chordSelection:null})
	},

	editSelected(){
		this.toggleProperty('isEditing')
        console.log(' is edit chord', this.get('selected'),this.get('selection'))
 		this.send('sendSelection')
	},

	sendSelection(){
     this.set('chordSelected',Ember.copy(this.get('chordSelection')))
         console.log('selected from edit dash',this.get('selected'))
	},

  overLabel(name){
    if(this.get('isToolTip')){
      this.set('barOverlay',name)
    }
  },
  outLabel(){
    if(this.get('isToolTip')){
      this.set('barOverlay',null)
    }
  },
  messageIn(action,message){
    let varm = [
      this.get('selected.compIndex'),
      this.get('selected.index'),
      this.get('beat')
    ],
    {displayName,uid} =  ChatPass.call(this);
    this.get('userAtSelection').child('chat').push({displayName,uid,message,varm})
      action()

    console.log(message,this.get('userAtSelection'),'messageIn on actions')
  },
  isEdit(partInstance,event){
    console.log(event,' this is of isEdit')
    event.stopPropagation()
    event.target.blur()
    this.set('isEdit',false)   
   if(this.get('onLine')){
    this.get('user').child('songs/'+this.get('selected.selection')).child('parts').child(partInstance).update({'name':event.target.value})

   } 
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
					case "Chord":OscArr.call(this,null,ctx);break;
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
    this.toggleProperty('play')
			if(this.toggleProperty('pause')){
				Ember.run.next(this,'clock')
			}
  }
},

	playMatrix
})
