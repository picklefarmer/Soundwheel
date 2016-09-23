import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model){
//    console.log(model,this.routeName,' model of preview ' ) 
    if(!model.url){
      this.transitionTo('isOnline.song.stave')
    } 
  }
});
