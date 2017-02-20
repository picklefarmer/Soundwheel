import Ember          from 'ember';
import pulse          from './functions/pulse';
import Play           from '../mixins/play';
import beatIndex      from '../mixins/functions/beat';
import GalleryMap     from '../mixins/galleryMap';
import Storage	 	    from '../mixins/storage';
import UpdateMethods  from '../mixins/update-methods';

export default Ember.ObjectProxy.reopenClass({ isServiceFactory:true
}).extend(UpdateMethods,Play,GalleryMap,Storage,{

  onLine:0,
	dataArray:Ember.A([]),
	userAtSelection:Ember.computed('onLine','group','selected.selection',function(){
		if(this.get('user'))
		return		this.get('group').child('songs/'+this.get('selected.selection'))
	}),
  content:Ember.computed('onLine',{
		get(){
			var online = this.get('onLine')?"firebase":"local";
			return this.get(online)
		}
	}),
   
  
    	init(){
		console.log('init song')
		Ember.run(this,'clock','args from init')
	},

	isConvolver:false,
  webaudio:Ember.inject.service(),
	tones:Ember.inject.service(),
	//isKit:true,
  isEdit:false,
	kit:Ember.inject.service(),
	measureKit:Ember.computed('isKit','selected.index',function(){
		if(this.get('isKit') && this.get('selected.part.kit')){
		
		let kit = this.get('selected.part').kit.objectAt(this.get('selected.index'));
		console.error(kit,'kit')
			return kit
					//measure.kit');
		}
	}),

	options:Ember.inject.service(),

  isFullScreen:Ember.computed({
    get(){
      return false
    },
    set(_,I){
      if(I){
        document.documentElement.webkitRequestFullscreen()
      }else{
        document.webkitExitFullscreen() 
      }
      return I
    }
  }),
  chordEditFlag:true,
	isBeat:false,
	sustain:true,
	isPulse:true,
  isLoop:true,
	areFrets:true,
	areStrings:true,
	barType:'measure',
	minTempVal:264,

		stanza:Ember.computed('tempo',{
			get(){
				return this.get('tempo')/this.get('division')
			}
		}),
  
    bpm:2264,
    
    meter:Ember.computed('tempo',{
		  get(){
		  	return ~~((60/(this.get('tempo')))*1000) 
		  } 
	  }),

    tempo:Ember.computed('bpm',{
		  get(){
		  	return 4264 - this.get('bpm')
		  }
  	}),
 /*
  	playMatrix
  		tempo,
		tones,
		cacheNotes,
		options.frontView
		measure	
	    index
  	
  */
    play:true, 
    pause:false,
		division:8,
    cacheNotes:[[]],

    beat:Ember.computed({
      get(){ console.log( 'init get beat'); return 0},
    
			set:beatIndex
    }),

    pulse,

    clock(args){

			if(this.pause){
				if(!args){
						Ember.run(this,'pulse',0)
				}else{
					Ember.run(this,'pulse',args)
				}
			}

    },

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
		kitVolume:Ember.computed({

   get(){
				return .5
			},
		set(_,I){
		 	 console.log(_,I)
     		this.set('webaudio.kitVolume',I)
     	return I 
			}
		}),
 boardVolume:Ember.computed({
			get(){
				return .5
			},
		set(_,I){
		 	 console.log(_,I)
     		this.set('webaudio.boardVolume',I)
     	return I 
			}
		}),
		//...bring in from options
    chordSelection:Ember.computed({
		get(){
      console.log( ' chord Selection from song',false)
			return null
		},
		set(_,I){
      console.log( ' chord Selection from song',I)
		    return I 
		}
	}),
})


