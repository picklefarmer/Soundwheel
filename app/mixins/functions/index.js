


export default function(_,b){
				// anything
				console.log(this,b,"index of proxy")
				console.error('part_index',this.getProperties('compIndex','part'),b)
				
				if(this.get('compIndex') !== undefined	){
					let	length	=		this.get('part.fretboard.content.length');

					if(b < 0){
						b = length-1
						this.decrementProperty('compIndex')
					}else if(b >= length){
						b	=	0
						this.incrementProperty('compIndex')
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

