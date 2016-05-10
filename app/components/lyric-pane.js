import Ember from 'ember';

export default Ember.Component.extend({
	classNames:"lyrics",
    song:Ember.inject.service(),
    actions:{
      update(data){
        console.log(data)
      }
    }


});
