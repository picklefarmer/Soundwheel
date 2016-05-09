import Ember from 'ember';

export default Ember.Route.extend({
  auth:Em.inject.service(),
  actions:{
    login: function(){
      this.auth.login() 
    },
    logout: function(){
      this.auth.logout() 
    }

  }
})


