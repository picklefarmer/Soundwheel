App.AuthService = Em.Service.extend({ 
     init(){
        var base = new Firebase('http://acroeven.firebaseio.com/music');
        this.set('base',base) 
     },
     uid:function(){
       var uid = this.get('base').getAuth()
           uid = uid ? uid.uid : null
        return uid || "Personal"
     }.property('base'),
     user:function(){
       var user = this.get('uid')
        return this.get('base').child(user)
     }.property('uid'),
     songList:Em.A([]),
     baseList:function(){
        //this.get('base').child(this.get('uid')).on("value",(snapshot) => {
        this.get('base').on("value",(snapshot) => {
          console.log("ASDFASDF",snapshot.val())
//            var newPost = snapshot.val().map(e => e.key());
  //            this.set('songList',newPost)
        });
     }.observes('uid'),
     login:function(){
        this.get('base')
          .authWithOAuthPopup("facebook", (error, authData) => {
             if(error){
               console.log( error, "error")
             }else{
               console.log ( authData, authData.uid )
               this.set('uid',authData.uid)
               this.set('user',this.get('base').child(authData.uid))
             }
           }, {
//             remember: "sessionOnly",
             scope: "email,user_likes"
           }
         )
     },
     logout:function(){
        console.log('logout')
        this.get('base').unauth()
        this.set('uid',"Personal")
     },
     update(){
       
     },
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


