import Ember from 'ember'
export default function pulse(beat){
			console.log(beat)
			if(beat===0){
				this.set('beat',0)
			}else{
        this.incrementProperty('beat')
			}
			if(beat < this.get('division')-1){
				//Ember.run(this,this.get('playMatrix.stanzaFunc'),beat)
      	//Ember.run.later(this,'pulse',++beat,this.get('stanza'))  
				if(this.pause){ 
	      	Ember.run.later(this,'pulse',++beat,this.get('stanza'))   
				}
			}else{
	     	//Ember.run.later(this,function(beat,stanza){}'pulse',++beat,this.get('stanza'))   
	     	Ember.run.later(this,function(){
					this.incrementProperty('selected.index')
					this.pulse.call(this,0)	
				},this.get('stanza'))   
			}
	}


