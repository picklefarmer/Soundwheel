
App.RsvpE = Em.ArrayProxy.extend(Em.PromiseProxyMixin)
App.RsvpO = Em.ObjectProxy.extend(Em.PromiseProxyMixin)

App.UpdateMethods = Ember.Mixin.create({

    firebase:Em.inject.service(),
    local:Em.inject.service(),
    auth:Em.inject.service(),

    instrument:function(_,  selection){

      console.log( ' instrument in mixin' ) 
      var proxy;
      if(selection){
        proxy = this.promiseWithContextAndSelection(_,selection)
        return proxy
      }
    }.property(),

    instrumentNames:function(_){
      console.log( ' instrument Names in mixin' ) 
         return this.promiseWithContext(_)
    }.property('auth.uid'),

    options:function(_){
      return this.promiseWithContext(_)
    }.property('auth.uid'),

    panels:function(_){
      var promise = this.promiseWithContext(_),
          _this = this;

      if(this.get('auth.uid'))
          promise.then(()=>{;
              promise.reopen({
                menuBars:["right",
                          "left",
                          "middle",
                          "center",
                          "top",
                          "bottom"],
                contentObserver:function(){
                  console.log( ' got content observe ' )  
                  Em.run(_this.get('firebase'),"updateOptions",
                              this.get('content'))
                 }.observes('@each.panel','@each.checked')
              })
          })

          return promise
    }.property('auth.uid'), 

    chords:function(_){
      return this.promise(_)
    }.property('onLine'),
  
    names:function(_){
      return this.promise(_)
    }.property('onLine'),
  
    selected:function(_,selection){
      console.log(selection)
      var proxy;

      if(selection){
      
        proxy =  this.promiseWithSelection(_,selection)

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
      }

    }.property('onLine'),

    chordSave(){
      var chords = this.get('chordBank');
      var chords = JSON.stringify(this.get('chordBank'));
          
          localStorage.chords = chords 
    },
 
    promise(method){
      var promise = new Em.RSVP.Promise((res,rej) =>{
              Em.run(this,this.get('content.' + method  ),res,rej)
          })
          return App.RsvpE.create({promise})
    }, 
     
    promiseWithContext(method){
      
      console.log(method,"debug")
      var context = this.get('auth.uid') ? "firebase" : "local";
      var promise = new Em.RSVP.Promise((res,rej)=>{
              Em.run(this,this.get( context+"."+method    ) ,res  ,rej) 
          });
      console.log(method,"debug _ 2")
          return App.RsvpE.create({promise})
    },

    promiseWithSelection(method,selection){

      console.log( ' selection ',selection )

      var promise = new Em.RSVP.Promise((res,rej) =>{
             Em.run(this,this.get('content' )
                             .get(  method  ),res,rej,selection)
          })

        return App.RsvpE.create({promise,selection});

    }, 
    
    promiseWithContextAndSelection(method,selection){

      console.log( ' selection context',selection )

      var context = this.get('auth.uid') ? "firebase" : "local",
          promise = new Em.RSVP.Promise((res,rej) =>{
             Em.run(this, this.get( context + '.' + method ),
                          res,  rej,  selection )
          });

        return App.RsvpO.create({promise,selection});

    }, 
})
