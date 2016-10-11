import Ember from 'ember';

export default Ember.Mixin.create({
    
		list:Ember.computed('@each.enabled','@each.options',{
			get(){
				var objArray = [];
				var content = this.get('content');
				console.log('change of options')
				Object.keys(content).forEach(key => {
					objArray.push({
						"name":key,
						"enabled":content[key].enabled,
						"options":this.get(key).options
					})
				})
				return objArray
			}
		}),            
		stringsArr:[4,5,6],
		fretsArr:[16,24,26],
		tuningArr:['a','A','b','c','C','d','D','e','f','F','g','G'],
						/*
		strings:Ember.computed( 'content.tuning.options','content.strings.options',{
			get(){
				return 6
			},
			set(_,v,r){
				var strings   = this.get('content.strings'),
					stringsL  = strings.options,
					selected  = this.get('content.tuning'),
					length    = selected.options.length;
  
				console.log('strings proxy',stringsL,length)         
	  
				if( stringsL !== length){

					console.log('strings proxy !2')         

					if(length > stringsL){
				
						console.log('length too long',length)
			
						selected.options.length = stringsL                
			  
					}else if(length < stringsL){

						console.log('length too short')
						while(length < stringsL){                    
							selected.options[length] = "a"
							length++
						}
					}

					this.set('tuning.options',selected.options)
					this.notifyPropertyChange('list')
					console.log(this.get('content.tuning.options'),"tuning proxy result")
				}
				return strings
			}
		}),

			*/
		intervals:Ember.computed('content.tuning.options',{
			get(){
				console.log( ' init intervals ' ) ;
				let notes     = this.get('tuningArr'),
					selected  = this.get('tuning.options'),
					intervals = [],
					indexes   = [];
		  
				indexes   = selected.map( e => notes.indexOf(e))

				intervals = indexes.map(  (e,f)=>{
					if(f){
						let p = (indexes[f-1]-e)%12;
						return p  > 6 ? 12-p  : Math.abs(p);
					}else{
						return e
					}
				})

  /*
	7   ( initial note)
	0   (  5  ) 
	5   (  5  )
	10  (  5  )
	2   (  4  )
	7   (  5  )
  */
				console.log('intervals', `
				 ${intervals}
				 `)
	
				return intervals
			}
	}),
/*
	update(hash,path){
		console.log( ' got main observe ' )  
		Ember.run( _this.get('firebase'),
			  "updateMain",
			 hash ,path)
	}
*/
});
