

App.UpdateMethods = Ember.Mixin.create(App.PromiseProxy,{

    firebase:Em.inject.service(),
    local:Em.inject.service(),
    auth:Em.inject.service(),

    instrument:Em.computed({
		get(){
			return false
		},
		set(_,selection){

			console.log( ' instrument in mixin' ) 
      		var proxy;
        	return this.promiseWithSelectionAsObject(_,selection)

		}
		}),

		main:Em.computed('auth.uid',{
			get(_){
				console.log(this, this.get('promiseWithContextAsObject'),_,'main error')
				let proxy = this.promiseWithContextAsObject(_),
						_this = this;

      	proxy.then(()=>{//		  		if(this.get('auth.uid')){
					proxy.reopen(App.Tuning)
					})
				return proxy
		}
		}),

    selected:Em.computed('onLine',{
    	get(){
        	return null
      	},

      set(_,selection){

	    	console.log(selection, 'from song service' )

    		let proxy =  this.promiseWithSelection(_,selection)

    	  proxy.then((e)=>{
					console.log( ' prozy returned / then ... ' ) 
					proxy.reopen(App.Selected)
				})
					return proxy
			}
		}),
 
    instrumentNames:Em.computed('auth.uid',{

    	get(_){
			console.log( ' instrument Names in mixin' ) 
      		var proxy = this.promiseWithContext(_),
        		_this = this;

        	proxy.then((rawNames)=>{
          		proxy.reopen({
            		filtered:Em.computed('@each.enabled',{
						get(){
              			return this.filterBy('enabled').getEach('name')
						}
					}),
            		update(hash){
               			console.log( ' got content observe ' )  
               			Em.run(  _this.get('firebase'),
							  	 "updateInstruments",
							   	 hash  )
            		}
          		})
			})
        	return proxy
		}
	}),


    options:Em.computed('auth.uid',{
      get(_){
        console.log ( 'getting the options object' ) 
        return this.promiseWithContext(_)
      }
    }),

    panels:Em.computed('auth.id',{
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
                    Em.run( _this.get('firebase'),
                            "updateOptions",
                            hash )
                   }
                })
            })
		}
        return promise
        }
    }), 

	chords:Em.computed('onLine',{
		get(_){
			var promise = this.promise(_),
				_this = this;
				  
				promise.then(()=>{
					promise.reopen({
						update(hash){
							console.log( ' got chords observe ',_this,_this.get('content'))
							Em.run ( _this.get('content'), 'updateChords', hash)

					  	}
					})
				})
			return promise
		}
	}),
  
  names:Em.computed('onLine',{
		get(_){
      		return this.promise(_)
		}
	})
})
  

