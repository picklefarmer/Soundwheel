
App.RsvpE = Em.ArrayProxy.extend(Em.PromiseProxyMixin)

App.UpdateMethods = Ember.Mixin.create({
    firebase:Em.inject.service(),
    local:Em.inject.service(),
   
    chords:function(_){
      return this.promise(_)
    }.property('onLine'),
  
    names:function(_){
      return this.promise(_)
    }.property('onLine'),
  
    selected:function(_,selection){
      console.log(selection)
      if(selection)
      return this.promiseWithSelection(_,selection)
    }.property('onLine'),

    chordSave(){
      var chords = this.get('chordBank');
      var chords = JSON.stringify(this.get('chordBank'));
          
          localStorage.chords = chords 
    },
  
    promise(method){
      var promise = new Em.RSVP.Promise((res,rej) =>{
              Em.run(this.get('content'),method,res,rej)
          })
          return App.RsvpE.create({promise})
    }, 
  
    promiseWithSelection(method,selection){
      console.log( ' selection ',selection )
      var promise = new Em.RSVP.Promise((res,rej) =>{
              
             Em.run(this.get('content'),method,res,rej,selection)
          }),
          proxy = App.RsvpE.create({promise,selection});
  
          if(this.get('onLine'))
          proxy.reopen({
              salve:function(index,value){
                this.get('content.root')
                  .child(index)
                  .child("notes")
                  .update(value)
              }
          })
          return proxy
    }, 
})
