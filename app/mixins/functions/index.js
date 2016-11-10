export default function(_,b){

				console.log(this,b,"index of proxy")
				console.log('part_index',this.get('partIndex'),b)
				
				if(this.get('partIndex') !== undefined	){
					let block 	= 	this.get('partIndex'),
							length	=		this.get('part.length');

					if(b < 0){
						b = length-1
						this.decrementProperty('partIndex')
					}else if(b >= length){
						b	=	0
						this.incrementProperty('partIndex')
					}
					return b

				}else{
				
					if(b < 0){
						b = this.get('length')-1
					}
					_ = b%this.get('length') || 0;
				}
				console.log( ' pre ' ) 
//				Ember.run(this,'playNotes',_ ) 

				return _


		}

