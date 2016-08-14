export default function(_,b){
				console.log(this,b,"index of proxy")
	
				if(b < 0){
					b = this.get('length')-1
				}
				_ = b%this.get('length') || 0;

				console.log( ' pre ' ) 
//				Ember.run(this,'playNotes',_ ) 

				return _


		}

