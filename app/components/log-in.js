import Ember from 'ember';

export default Ember.Component.extend({
  auth:Ember.inject.service(),
  displayName:Ember.computed('auth.displayName',function(){
    return this.get('auth.displayName').split(' ')[0]
  }),
  actions:{
    logout(){
      this.sendAction('logout')
    },
    login(){
      this.sendAction('login')
    }
  }

});
