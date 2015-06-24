App.AuthService = Em.Service.extend({ 
     init(){
        var base = new Firebase('http://acroeven.firebaseio.com/music');
        this.set('base',base) 
     },

     uid:function(){
       console.log( ' user id ' ) 
       var uid = this.get('base').getAuth()
           uid = uid ? uid.uid : null
        return uid 
     }.property('base'),

     user:function(){
       var user = this.get('uid')
        return this.get('base').child(user)
     }.property('uid'),

     userNew(user){
       var base = this.get('base')
                      .child(user.uid),
          settings = base.child('settings'),
          Hash = Em.RSVP.hash;

          Hash({
            settings:Hash({
              panels:$.getJSON('./json/panelsAuth.json'),
              options:$.getJSON('./json/routesAuth.json'),
              main:$.getJSON('./json/mainDefault.json')
            }),
            chords:$.getJSON('./json/chordsDefault.json'),
            instruments:$.getJSON('./instruments/instrumentsAuth.json'),
            songs:Hash({
              golden:$.getJSON('./scores/over.json'),
              promise:$.getJSON('./scores/some.json')
            })
            
          }).then((hash)=>{
            base.set(hash,(hash)=>{
              this.set('uid',user.uid)
              this.set('user',base)
            })
          })
     },
     userNewCheck(user){
        this.get('base')
          .child(user.uid)
          .on('value',(value) => { if( value.exists() ){

              this.set('uid',user.uid)
              this.set('user',  this.get('base').child(user.uid) )

            }else{

              Em.run(this,'userNew',user)

            }
          })
     },

    loginDebug:true,

    login(){

      if(!this.get('loginDebug')){ 
              this.get('base')
                  .authWithOAuthPopup("facebook", (error, authData) => {
                     console.log ( authData, authData.uid )
                     Em.run(this,'userNewCheck',authData)
                   }, {
                     remember:  "sessionOnly",
                     scope:     "email,user_likes"
                   })
        }else{
             var authData = {};
                 authData.uid = "testingLogin"; 

                 Em.run(this,'userNewCheck',authData)
        }
     },

     logout(){
        console.log('logout')
        this.get('base').unauth()
        this.set('uid',null)
     }

})
