App.FirebaseService = Em.Service.extend({ 

     selected:function(_,selected = "fizz"){
        console.log(selected,"AUTH SELECTED") 
       this.get('user')
         .child('songs')
         .child(selected)
         .on("value",(snapshot) => {
           console.log(snapshot.val(),snapshot.key())
           snapshot.forEach(e=>{console.log("snappy",e.val(),e.key())})
           this.set('songSelection',snapshot.val())
         })
       return selected

     }.property('names'),
     
     chords:function(){
        this.get('user')
          .child('chords')
          .on('value',(snapshot) => {  
           this.set("chordCache",snapshot.val())
          })

     }.property(),
     names:Em.A([]),
     namesList:function(){
       console.log('names')
          this.get('user')
               .child('songs')
               .on("value",(snapshot) => {
                 this.set('names',Em.A(Object.keys(snapshot.val())))
               })
               
     }.property('names')

 })


