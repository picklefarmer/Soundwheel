import Ember from 'ember';
import Play from '../mixins/play';
import UpdateMethods from '../mixins/update-methods';

export default Ember.ObjectProxy.reopenClass({

  isServiceFactory:true
}).extend(UpdateMethods,Play,{

	init(){
		console.log('init song')
	},
  webaudio:Ember.inject.service(),
	tones:Ember.inject.service(),

  content:Ember.computed('onLine',{
		get(){
			var online = this.get('onLine')?"firebase":"local";
			return this.get(online)
		}
	}),
   
    onLine:false,
  
    meter:Ember.computed('tempo',{
		get(){
			return ~~((60/(this.get('tempo')))*1000) 
		}
	}),
  
    bpm:320,
  
    tempo:Ember.computed('bpm',{
		get(){
			return 2264 - this.get('bpm')
		}
	}),
 /*
  	playNotes
  		tempo,
		tones,
		cacheNotes,
		options.frontView
		measure	
	    index
  	
  */ 
    pause:false,
    beat:0,  
    cacheNotes:[[]],
  
    clock(){
		if(this.pause){ 
           this.incrementProperty('selected.index')
           Ember.run.later(this,'clock',this.get('tempo'))   
		} 
    },

	index:Ember.computed('selected.content.[]',{
		get(){
			console.log( 'null index of proxy ' ) 
			return 0
		},
		set(_,b){
			console.log(this,b,"index of proxy")
			if(b < 0){
				b = this.get('selected.content.length')-1
			}
			_ = b%this.get('selected.content.length') || 0;

			console.log( ' pre ')
			Ember.run(this,'playNotes',_ ) 

			return _
		}
	}),

	measure:Ember.computed('index','selected.content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			return this.get('selected').objectAt(this.get('index'))
		}
	}),

    volume:Ember.computed({
		get(){
			return .5
		},
		set(_,I){
		    console.log(_,I)
      		this.set('webaudio.masterVolume',I)
      		return I 
		}
	}),

    chordSelection:Ember.computed({
		get(){
			return null
		},
		set(_,I){
    		console.log(I)
		    return I 
		}
	}),
})


