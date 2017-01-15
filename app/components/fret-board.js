import Ember from 'ember';
//import play from '../mixins/play';
import chordHover  from './functions/chordHover';
import dotChord 	 from './functions/dotChord';
import fadeIn			 from './functions/fadeInChord';
import mouseFormat from './functions/mouseFormat';
import pushChord from './functions/pushChord';
import pushNote from './functions/pushNote';
var C = 'instrument-type';

export default Ember.Component.extend({
  options:Ember.inject.service(),
	song:Ember.inject.service(),

 	tones:Ember.inject.service(),  
	globalKeydown:Ember.inject.service(),	

	names:{
    'backView':C,
    'graphView':C,
    'centerView':C,
		'spritzView':'spritz-inc',
    'frontView':C,
	},

	classNames:['tablet'],
	classNameBindings:['verticalTab','isTutorial'],
  isTutorial:Ember.computed.alias('song.isExplain'),
  
  verticalTab:Ember.computed.alias('song.verticalTab'),
	mouseFormat,
	pushChord,
	pushNote,
	dotChord,
	chordHover,

	chordTemp:[],
	tempChord:[],
	volume:	0.25,

	didInsertElement(){
		//this.set('options.fretboard',this.get('element'))
///		Ember.$(window).on('resize', e => Ember.run.debounce(this.get('song'),function(e){this.set('docHeight',Ember.$(document.body).height())//console.log('e',e,document.body.scrollHeight)//this.set('docHeight' , },e,150))

   	Ember.$(document).off('keydown')
   	Ember.$(document).off('keyup')
		Ember.$(document).keyup(e => Ember.run(this,this.get('globalKeydown.end'),e))
		Ember.$(document).keydown(e => Ember.run(this,this.get('globalKeydown.begin'),e))
	},

	willDestroyElement(){
    Ember.$(document).off('keydown')
    Ember.$(document).off('keyup')
  },

	//cut	
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
		Ember.run(this,'chordHover',e)
	},
	
	click(e){
		if(this.get('song.chordSelection')){
			Ember.run.once(this,'pushChord',e)
		}else{
			Ember.run.once(this,'pushNote',e)
		}
	},
	
	mouseLeave(){
		//TODO contemplate the use of promises here;

		if(this.get('song.chordSelection')){
			Ember.run.once(this.get('options'),'clear')
			if(!this.get('song.pause')){
//				Ember.run.once(this,fadeIn)
			}
		}
	}

	//playSwitch:Ember.observer('song.selected.isFulfilled',playSwitch)

})

