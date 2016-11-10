import Ember from 'ember';
/* main property */
import Tuning from '../mixins/tuning';
/* selected property */
import Selected from '../mixins/selected';
import PromiseProxy from '../mixins/promise-proxy'; 

export default Ember.Mixin.create(PromiseProxy,{

    firebase:Ember.inject.service(),
    local:Ember.inject.service(),
    auth:Ember.inject.service(),
		storageName:'songs',
		    instrument:Ember.computed({
		get(){
			return false
		},
		set(_,selection){

			console.log( ' instrument in mixin' ) 
      		var proxy;
        	return this.promiseWithSelectionAsObject(_,selection)

		}
		}),

		main:Ember.computed('auth.uid',{
			get(_){
				console.log(this, this.get('promiseWithContextAsObject'),_,'main error')
				let proxy = this.promiseWithContextAsObject(_),
						storageName	=	this.get('storageName'),
						_this = this;

      	proxy.then(()=>{//		  		if(this.get('auth.uid')){
					proxy.reopen(Tuning,{storageName})
					})
				return proxy
		}
		}),

    selected:Ember.computed('onLine',{
    	get(){
        	return null
      	},

      set(_,selection){

	    	console.log(selection, 'from song service' )

    		let proxy =  this.promiseWithSelection(_,selection)

    	  proxy.then((e)=>{
					console.log( ' prozy returned / then ... ' ) 
					proxy.reopen(Selected)
				})
					return proxy
			}
		}),
 
    instrumentNames:Ember.computed('auth.uid',{

    	get(_){
			console.log( ' instrument Names in mixin' ) 
      		var proxy = this.promiseWithContext(_),
        		_this = this;

        	proxy.then((rawNames)=>{
          		proxy.reopen({
            		filtered:Ember.computed('@each.enabled',{
						get(){
              			return this.filterBy('enabled').getEach('name')
						}
					}),
            		update(hash){
               			console.log( ' got content observe ' )  
               			Ember.run(  _this.get('firebase'),
							  	 "updateInstruments",
							   	 hash  )
            		}
          		})
			})
        	return proxy
		}
	}),


		actionNames:Ember.computed('auth.uid',function(_){
			return this.promiseWithContext(_)
		}),	

    routes:Ember.computed('auth.uid',{
      get(_){
        console.log ( 'getting the options object' ) 
        return this.promiseWithContext(_)
      }
    }),

    panels:Ember.computed('auth.id',{
      get(_){
        console.log ( 'getting the panels object' ) 
        var promise = this.promiseWithContext(_),
          _this = this;

        if(this.get('auth.uid')){
            promise.then(()=>{;
                promise.reopen({
                  menuBars:["right",
                            "left",
                            "middle",
                            "center",
                            "top",
                            "bottom"],
                  update(hash){
                    console.log( ' got content observe ' )  
                    Ember.run( _this.get('firebase'),
                            "updateOptions",
                            hash )
                   }
                })
            })
		}
        return promise
        }
    }),

	chords:Ember.computed('onLine',{
		get(_){
			var promise = this.promise(_),
				_this = this;
				  
				promise.then(()=>{
					promise.reopen({
						update(hash){
							console.log( ' got chords observe ',_this,_this.get('content'))
							Ember.run ( _this,_this.get('content.updateChords'), hash)

					  	}
					})
				})
			return promise
		}
	}),
  
  names:Ember.computed('onLine',{
		get(_){
      		return this.promise(_)
		}
	})

});
