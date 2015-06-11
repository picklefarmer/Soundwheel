App.FirebaseService = Em.Service.extend({ 

     selected(res,rej,selection){
      var root = this.get('auth.user')
         .child('songs')
         .child(selection);

         root.on("value",(snapshot) => {

          res(snapshot.val())

         })

    },
 


     chords(res,rej){
        this.get('auth.user')
          .child('chords')
          .on('value',(snapshot) => {  
            res(snapshot.val())
          })
     },

     names:function(res,rej){
        this.get('auth.user')
          .child('songs')
          .on("value",(snapshot) => {
            var names = Object.keys(snapshot.val())
            res( names)
            })
               
     },


     auth:Em.inject.service(),
 })


