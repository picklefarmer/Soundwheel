import Ember from 'ember';

export default Ember.Route.extend({
  auth:Ember.inject.service(),
  actions:{
    login: function(){
      this.auth.login() 
    },
    logout: function(){
      this.auth.logout() 
    }

  }
})


