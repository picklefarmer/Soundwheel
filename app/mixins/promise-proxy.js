import Ember from 'ember';

const RsvpE = Ember.ArrayProxy.extend(Ember.PromiseProxyMixin);
const RsvpO = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

export default Ember.Mixin.create({

		promiseLocal(method){
			console.log('local',method)
			var promise = new Ember.RSVP.Promise((res,rej) =>{
				Ember.run(this,this.get('local.'+method),res,rej,new Date())
			});
			return RsvpO.create({promise})
		},
		promiseFire(method){
			var ref =	this.get('firebase.base').ref(method),
					promise = new Ember.RSVP.Promise((res,rej) =>{
						ref.once('value',function(val){
							res(val.val())
						})
					}),
					proxy	=	RsvpO.create({promise});

			

			proxy.then(function(){
				ref.on('value',function(val){
					console.log('content', this, 'content of the thing')
					this.set('content',val.val())	
				},proxy)	
			})	

			return proxy
				//RsvpO.create({promise})
		},
    promise(method){
      var promise = new Ember.RSVP.Promise((res,rej) =>{
              Ember.run(this,this.get('content.' + method  ),res,rej)
          })
          return RsvpE.create({promise})
    }, 

    promiseAsObject(method){
      console.log ( 'promise as object' , method)

      var promise = new Ember.RSVP.Promise((res,rej)=>{
      
        Ember.run(this,this.get('content.' + method),res,rej)
      })

      return RsvpO.create({promise})
    },    
     
    promiseWithContextAsObject(method){
      
      console.log(method,"debug")
      var context = this.get('auth.uid') ? "firebase" : "local";
      var promise = new Ember.RSVP.Promise((res,rej)=>{
              Ember.run(this.get(context),this.get( context+"."+method    ) ,res  ,rej) 
          });
      console.log(method,"debug _ 2")
          return RsvpO.create({promise})
    },

    promiseWithContext(method){
      
      console.log(method,"debug")
      var context = this.get('auth.uid') ? "firebase" : "local";
      console.log ( this.get('local'),context, method, "new")
      var promise = new Ember.RSVP.Promise((res,rej)=>{
              Ember.run(this.get(context),this.get( context+"."+method    ) ,res  ,rej) 
          });
      console.log(method,"debug _ 2")

          return RsvpE.create({promise})
    },

    promiseWithSelection(method,selection){

      console.log( ' selection ',selection )

			var promise = new Ember.RSVP.Promise((res,rej) =>{
			console.log('content object local/firebase', this.get('content'), method)

      	Ember.run(this,this.get('content' )
           .get(  method  ),res,rej,selection)
      })

      return RsvpE.create({promise,selection});

    }, 

    promiseWithSelectionAsObject(method,selection){

      console.log( ' selection object',selection )

      var promise = new Ember.RSVP.Promise((res,rej) =>{
             Ember.run(this, this.get( 'local.' + method ),
                          res,  rej,  selection )
          });

        return RsvpO.create({promise,selection});

    }
})


