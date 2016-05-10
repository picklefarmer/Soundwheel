import Ember from 'ember';

export default Ember.Component.extend({
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
