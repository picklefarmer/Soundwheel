App.FirebaseService = Em.Service.extend({ 
   /* 
    instrument(res,rej,selection){
      var root = this.get('auth.base')
                     .child('instruments')
                     .child(selection);

          root.on("value",(snapshot)  =>{
            res(snapshot.val())
          })
    },
    */

    instrumentNames(res,rej){
      console.log ( 'instrument Names Auth ' ) 
      var root = this.get('auth.user')
                     .child('instruments'),
          instruments = [];

        root.on("value",(snapshot) =>{
          snapshot.forEach(instrument => {
          
            instruments.push({"name":instrument.key(),
                              "enabled":instrument.val()})
          })

          res(instruments)

        }) 
    },

    main(res,rej){
      var root = this.get('auth.user')
                     .child('settings/main');

          root.on("value", (snapshot) => {
            res(snapshot.val())
          })
    },

    panels(res,rej){
      var root = this.get('auth.user')
                  .child('settings/panels');

         root.on("value",(snapshot) => {
            res(snapshot.val())
         })
    },

    options(res,rej){
      var root = this.get('auth.user')
                  .child('settings/options');

          root.on("value",(snapshot) => {
            res(snapshot.val())
         })
    },

    updateInstruments(menuData){
      console.log( ' observation got _2 ' )
      var menuObject = {};

      menuData.forEach(data => {
        menuObject[data.name] = data.enabled
      })
        console.log(this.get('auth'),menuData)
        this.get('auth.user')
            .child('instruments')
            .update(menuObject,
                ()=>{
                  console.log('success')
                }) 
    
    },
    
    updateMain(menuData){
      console.log( ' main observation got _2 ' ) 
        this.get('auth.user')
            .child('settings/main')
            .update(menuData,
                ()=>{
                  console.log('success')
                }) 
    
    },

    updateOptions(menuData){
      console.log( ' observation got _2 ' ) 
        this.get('auth.user')
            .child('settings/panels')
            .update(menuData,
                ()=>{
                  console.log('success')
                }) 
    
    },

     selected(res,rej,selection){
      var root = this.get('auth.user')
         .child('songs')
         .child(selection);
         

         root.on("value",(snapshot) => {
          res(snapshot.val())
         })
         root.off('value')
         root.on('child_changed',((snapshot) => {

          console.log('returned') 
          this.get('selected.content')
            .objectAt(snapshot.key()).notes
            .replace(0,6,snapshot.val().notes)

         }))

    },
 
    update(value){
          console.log("socket update",value)
     
     var base = this.get('auth.user'),
         song = this.get('selected.selection'),
         index = this.get('selected.index');
          
      console.log( base, song, index ) 

     var ref = base
             .child('songs')
              .child(song)
              .child(index)

      if(value.length === 6) { 
    
         ref.update({notes:value})
    
      }else{
        let [fret,string] = value;
        ref.child('notes')
       update({[string]:fret})  
       } 
    },

     chords(res,rej){
        this.get('auth.user')
          .child('chords')
          .on('value',(snapshot) => {  
            res(snapshot.val())
          })
     },

     names(res,rej){
        this.get('auth.user')
          .child('songs')
          .on("value",(snapshot) => {
            var names = Object.keys(snapshot.val())
            res( names)
            })
     },


     auth:Em.inject.service(),
 })


