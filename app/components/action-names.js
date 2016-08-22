import Ember from 'ember';

export default Ember.Component.extend({
 actions:{
    execute(name){
      console.log ( 'executing.',name)
      Ember.run(this.get('options'),name)
    }  
  },
 options:Ember.inject.service()
});


