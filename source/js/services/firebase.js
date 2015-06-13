App.FirebaseService = Em.Service.extend({ 

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
           try{
this.get('selected.content')
.objectAt(snapshot.key()).notes
.replace(0,6,snapshot.val().notes)
           }catch(e){
           console.log(e)
           }

//this.set('selected['+snapshot.key()+"].notes",snapshot.val().notes )
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


