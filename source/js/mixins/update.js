
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
        proxy = this.promiseWithSelectionAsObject(_,selection)
        return proxy
      }
    }.property(),

    instrumentNames:function(_){
      console.log( ' instrument Names in mixin' ) 
      var proxy = this.promiseWithContext(_),
          _this = this;

        proxy.then((rawNames)=>{
          proxy.reopen({
            filtered:function(){
              return this.filterBy('enabled').getEach('name')
            }.property('@each.enabled'),
            update(hash){
               console.log( ' got content observe ' )  
               Em.run(  _this.get('firebase'),
                        "updateInstruments",
                        hash  )
            }
          })
        })

        return proxy

    }.property('auth.uid'),
    
    main:function(_){
      var proxy = this.promiseWithContext(_);
      var _this = this;

      if(this.get('auth.uid')){

        proxy.then(()=>{
          proxy.reopen({
            isLeft:function(){
              console.log('proxy isLeft')
              return this.findBy('name','isLeft').enabled
            }.property('@each.enabled'),
             update(hash){
               console.log( ' got main observe ' )  
                  Em.run( _this.get('firebase'),
                          "updateMain",
                          hash )
               }
          })
        })

      }

      return proxy

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
                update(hash){
                  console.log( ' got content observe ' )  
                  Em.run( _this.get('firebase'),
                          "updateOptions",
                          hash )
                 }
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
              lyrics:function(_,I,II){
                console.log(I,II)
                if(I){
            Em.run.throttle(this,'updator',I,12)
//                  this.set('measure.lyric',I)
                }
                return this.get('measure.lyric')
              }.property('measure'),
              updator(I,J,K){
                console.log(I,J,K,"ASDF")
                this.set('measure.lyric',I)
              },
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
    
    promiseWithSelectionAsObject(method,selection){

      console.log( ' selection object',selection )

      var promise = new Em.RSVP.Promise((res,rej) =>{
             Em.run(this, this.get( 'local.' + method ),
                          res,  rej,  selection )
          });

        return App.RsvpO.create({promise,selection});

    }, 
})
