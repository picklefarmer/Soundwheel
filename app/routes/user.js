import Ember from 'ember';

export default Ember.Route.extend({
  auth:Ember.inject.service(),
  actions:{
    login: function(){
			let auth = this.get('auth.log');
			var provider = new firebase.auth.GoogleAuthProvider()
		
			auth.signInWithPopup(provider);   
			Ember.run(this.get('auth'),this.get('auth.login'),auth) 
    },
    logout: function(){
			this.get('auth.log').signOut()
    }

  }
})


