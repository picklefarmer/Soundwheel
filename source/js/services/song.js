
App.SongService = Em.ObjectProxy.reopenClass({

  isServiceFactory:true
}).extend(App.UpdateMethods,App.PlayMixin,{

    webaudio:Em.inject.service(),
	tones:Em.inject.service(),
    content:Em.computed('onLine',{
		get(){
			var online = this.get('onLine')?"firebase":"local";
			return this.get(online)
		}
	}),
   
    onLine:false,
  
    meter:Em.computed('tempo',{
		get(){
			return ~~((60/(this.get('tempo')))*1000) 
		}
	}),
  
    bpm:320,
  
    tempo:Em.computed('bpm',{
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
           Em.run.later(this,'clock',this.get('tempo'))   
		} 
    },

	index:Em.computed('selected.content.[]',{
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
			Em.run(this,'playNotes',_ ) 

			return _
		}
	}),

	measure:Em.computed('index','selected.content.@each.notes',{
		get(){
			console.log(  'measure ' ) 
			return this.get('selected').objectAt(this.get('index'))
		}
	}),

    volume:Em.computed({
		get(){
			return .5
		},
		set(_,I){
		    console.log(_,I)
      		this.set('webaudio.masterVolume',I)
      		return I 
		}
	}),

    chordSelection:Em.computed({
		get(){
			return null
		},
		set(_,I){
    		console.log(I)
		    return I 
		}
	}),

})
