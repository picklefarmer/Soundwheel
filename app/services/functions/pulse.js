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
      	Ember.run.later(this,'pulse',++beat,this.get('stanza'))   
			}
	}


