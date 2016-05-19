import Ember from 'ember';

export default Ember.Service.extend({
    /* init(){
				console.log( 'init auth') 
        var base = new Firebase('http://acroeven.firebaseio.com/music');
        this.set('base',base) 

     },*/

     base: new Firebase('http://acroeven.firebaseio.com/music'),

     uid:Ember.computed('base',{
       get(){
						console.log( ' check if user is logged in  ' ) 

        var uid = this.get('base').getAuth()
            console.log ( this.get('base') )
            uid = uid ? uid.uid : null
            
            return uid 
       }
     }),

     user:Ember.computed('uid',{
       get(){
       var user = this.get('uid')
        return this.get('base').child(user)
       }
     }),

     userNew(user){
       var base = this.get('base')
                      .child(user.uid),
          settings = base.child('settings'),
          Hash = Ember.RSVP.hash;

          Hash({
            settings:Hash({
              panels:Ember.$.getJSON('./json/panelsAuth.json'),
              options:Ember.$.getJSON('./json/routesAuth.json'),
              main:Ember.$.getJSON('./json/mainDefault.json')
            }),
            chords:Ember.$.getJSON('./json/chordsDefault.json'),
            instruments:Ember.$.getJSON('./json/instrumentsAuth.json'),
            songs:Hash({
              golden:Ember.$.getJSON('./scores/over.json'),
              promise:Ember.$.getJSON('./scores/some.json')
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

              Ember.run(this,'userNew',user)

            }
          })
     },

    loginDebug:true,

    login(){

      if(!this.get('loginDebug')){ 
              this.get('base')
                  .authWithOAuthPopup("facebook", (error, authData) => {
                     console.log ( authData, authData.uid )
                     Ember.run(this,'userNewCheck',authData)
                   }, {
                     remember:  "sessionOnly",
                     scope:     "email,user_likes"
                   })
        }else{
             var authData = {};
                 authData.uid = "testingLogin"; 

                 Ember.run(this,'userNewCheck',authData)
        }
     },

     logout(){
        console.log('logout')
        this.get('base').unauth()
        this.set('uid',null)
     }

});
