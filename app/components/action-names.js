import Ember from 'ember';

export default Ember.Component.extend({
 actions:{
    execute(name){
      
      Ember.run(this.get('options'),name)
    }  
  },
 options:Ember.inject.service()
});


