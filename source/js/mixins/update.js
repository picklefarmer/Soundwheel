
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

             Em.run(this,this.get('content').get(method),res,rej,selection)

          }),

          proxy = App.RsvpE.create({promise,selection});


          proxy.then((e)=>{

          proxy.reopen({
            
              measure:function(){
                  console.log(  'measure ' ) 
                  return this.objectAt(this.get('index'))
               }.property('index','content.@each.notes'),
              
              index:function(a,b){
                  console.log(b,"index of proxy")
                  if(b < 0){
                    b = this.get('length')-1
                  }
                    a = b%this.get('length') || 0;
                  return a
               }.property('[]'),
              })
          })
          return proxy
    }, 
})
