App.FirebaseService = Em.Service.extend({ 

     auth:Em.inject.service(),
     selected:function(_,selected = "fizz"){
        console.log(selected,"AUTH SELECTED") 
       this.get('auth.user')
         .child('songs')
         .child(selected)
         .on("value",(snapshot) => {
           console.log(snapshot.val(),snapshot.key())
           snapshot.forEach(e=>{console.log("snappy",e.val(),e.key())})
           this.set('songSelection',snapshot.val())
         })
       return selected

     }.property('names'),
 


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
               
     }

 })


