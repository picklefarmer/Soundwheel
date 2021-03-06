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

		tipJar:Ember.computed(function(_){
			return this.promiseLocal(_)
		}),

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

		amount:Ember.computed(function(_){
			return this.promiseFire(_)
		}),
    leaders:Ember.computed('user','onLine',function(_){
      let proxy = this.promiseAsObject(_);
			let firebaseRef = this.get('firebase.base').ref(_).on('value', up => proxy.set('content',up.val()));
			proxy.then(()=>{
				proxy.reopen({
					ref:firebaseRef
				})
			})
			
      return proxy;
    }),

		main:Ember.computed('onLine','auth.uid',{
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

//				if(this.get('isOnline')){
	//				Ember.run(this.get('firebase'),this.get('firebase.selected'))	
		//		}

	    	console.log(selection, 'from song service' )

    		let proxy 			= 	this.promiseWithSelection(_,selection);

    	  proxy.then((e)=>{
					console.log(e, ' prozy returned / then ... ' ) 
					let composition = this.get('composition');
					proxy.reopen(Selected,{composition})
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

    panels:Ember.computed('auth.uid',{
      get(_){
        console.log ( 'getting the panels object',{online:this.get('onLine')} ) 
        var promise = this.promiseWithContext(_),
          _this = this;

        if(this.get('auth.uid')){
					console.log('auth.uid')
            promise.then((e)=>{
							console.log(e, ' panels object on auth')
							
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

	chords:Ember.computed('auth.uid',{
		get(_){
			var promise = this.promiseWithContext(_),
				_this = this;
				  
				promise.then(()=>{
					promise.reopen({
						update(hash){
							console.log( ' got chords observe ',_this,_this.get('content'))
							Ember.run ( _this.get('content'),_this.get('content.updateChords'), hash)

					  	}
					})
				})
			return promise
		}
	}),
  
  names:Ember.computed('onLine',{
		get(_){
			if(this.get('onLine')&&this.get('auth.uid')){
				return this.promiseWithContext(_)
			}else{
				console.log('get names on update-methods',{thus:this,online:this.get('onLine')})
     		return this.promise(_)
			}
		}
	})

});
