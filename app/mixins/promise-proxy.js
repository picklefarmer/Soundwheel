import Ember from 'ember';

const RsvpE = Em.ArrayProxy.extend(Em.PromiseProxyMixin);
const RsvpO = Em.ObjectProxy.extend(Em.PromiseProxyMixin);

export default Ember.Mixin.create({

    promise(method){
      var promise = new Em.RSVP.Promise((res,rej) =>{
              Em.run(this,this.get('content.' + method  ),res,rej)
          })
          return App.RsvpE.create({promise})
    }, 

    promiseAsObject(method){
      console.log ( 'promise as object' , method)

      var promise = new Em.RSVP.Promise((res,rej)=>{
      
        Em.run(this,this.get('content.' + method),res,rej)
      })

      return App.RsvpO.create({promise})
    },    
     
    promiseWithContextAsObject(method){
      
      console.log(method,"debug")
      var context = this.get('auth.uid') ? "firebase" : "local";
      var promise = new Em.RSVP.Promise((res,rej)=>{
              Em.run(this,this.get( context+"."+method    ) ,res  ,rej) 
          });
      console.log(method,"debug _ 2")
          return App.RsvpO.create({promise})
    },

    promiseWithContext(method){
      
      console.log(method,"debug")
      var context = this.get('auth.uid') ? "firebase" : "local";
      console.log ( context, method, "new")
      var promise = new Em.RSVP.Promise((res,rej)=>{
              Em.run(this,this.get( context+"."+method    ) ,res  ,rej) 
          });
      console.log(method,"debug _ 2")

          return App.RsvpE.create({promise})
    },

    promiseWithSelection(method,selection){

      console.log( ' selection ',selection )

			var promise = new Em.RSVP.Promise((res,rej) =>{
			console.log('content object local/firebase', this.get('content'), method)

      	Em.run(this,this.get('content' )
           .get(  method  ),res,rej,selection)
      })

      return App.RsvpE.create({promise,selection});

    }, 

    promiseWithSelectionAsObject(method,selection){

      console.log( ' selection object',selection )

      var promise = new Em.RSVP.Promise((res,rej) =>{
             Em.run(this, this.get( 'local.' + method ),
                          res,  rej,  selection )
          });

        return App.RsvpO.create({promise,selection});

    }
})


