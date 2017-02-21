import Ember from 'ember';
export default Ember.Service.extend({

	song:Ember.inject.service(),
	log:firebase.auth(),

	userNew(base,object,res){
		base = this.get('song.firebase.user')
		console.log('newUser',base)
		this.get('song.firebase.base').ref('leaders')
			.update({[this.get('uid')]:this.get('photoURL')})

		let Hash = Ember.RSVP.hash;

    Hash({
      settings:Hash({
    		panels:Ember.$.getJSON('./json/panelsAuth.json'),
        routes:Ember.$.getJSON('./json/routesAuth.json'),
        main:Ember.$.getJSON('./json/mainDefault.json')
      }),
      chords:Ember.$.getJSON('./json/chordsDefault.json'),
      instruments:Ember.$.getJSON('./json/instrumentsAuth.json'),
      songs:Hash({
      	destiny:Ember.$.getJSON('./scores/destiny.json'),
    //  	mighty:Ember.$.getJSON('./scores/mighty.json'),
      })
    })
		.then((hash)=>{
			base.set(hash)
			if(res){
				console.log( ' hash is born ',hash.get(object) ) 

				res(hash)

			}	
  	})

	},

		userNewCheck(user){
			console.log('newUserCheck',user)
    	this.get('song.firebase.user')
      	.once('value',(value) => { 
					if( !value.exists() ){
          	Ember.run(this,'userNew')
          }
      })
    },

    loginDebug:false,

    login(auth,router){
				console.log('login checkpoint', auth.currentUser)
				auth.onAuthStateChanged(user=>{
					console.log('user onAuthChange' , user)
						let uid, photoURL, displayName;
					if(!user){
						auth.signInAnonymously()
					}else{
						if( user.isAnonymous){
							uid = 'wVyyPVSNVbTz6hZcu6xUDLoKDv73'
							photoURL = './images/dino.ico'
							displayName = 'Anonymous'
						}else{

						({uid,photoURL,displayName} = user);
						}
					}
					this.setProperties({uid,photoURL,displayName})
					Ember.run(this,'userNewCheck',uid)
				})
     },

     logout(){
        console.log('logout')
        this.get('base').unauth()
        this.set('uid',null)
     },
	init(){
		console.log('init auth', this.get('log'))
			let storageName = "songs",//this.get('storageName'),
					storage 		=	localStorage[storageName],hydraStore;
					if(storage){
						hydraStore	=	JSON.parse(storage);
					}else{
						hydraStore = {songs:{}}
					}

					if(!hydraStore.settings){
						hydraStore.settings = {
							main:{	
							},
							instrumentNames:[
							],
							panels:[
							],
							chords:[
							]
						}
					}
			localStorage[storageName] = JSON.stringify(hydraStore);
		},


});

