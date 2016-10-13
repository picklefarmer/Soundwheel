import Ember from 'ember';
//import play from '../mixins/play';
import chordHover from './functions/chordHover';
import dotChord from './functions/dotChord';
import mouseFormat from './functions/mouseFormat';
import pushChord from './functions/pushChord';
import pushNote from './functions/pushNote';

export default Ember.Component.extend({
  options:Ember.inject.service(),
	song:Ember.inject.service(),

 	tones:Ember.inject.service(),  
	globalKeydown:Ember.inject.service(),	

	names:['backView','frontView','centerView'],

	classNames:['tablet'],
	classNameBindings:['verticalTab'],
  verticalTab:Ember.computed.bool('options.verticalTab'),

	mouseFormat,
	pushChord,
	pushNote,
	dotChord,
	chordHover,

	chordTemp:[],
	tempChord:[],
	volume:	0.25,

	didInsertElement(){

		Ember.$(document).keydown(e => Ember.run(this,this.get('globalKeydown.begin'),e))
	},

	willDestroyElement(){
    	Ember.$(document).off('keydown')
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
	}

	//playSwitch:Ember.observer('song.selected.isFulfilled',playSwitch)

})

