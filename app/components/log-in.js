import Ember from 'ember';

export default Ember.Component.extend({
  auth:Ember.inject.service(),
  variab:"TRICK:",
  actions:{
    logout(){
      this.sendAction('logout')
    },
    login(){
      this.sendAction('login')
    }
  }

});
