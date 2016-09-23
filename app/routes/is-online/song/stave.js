import Ember from 'ember';

export default Ember.Route.extend({
  actions:{
    previewImage(a){
      this.controller.model.url = a
      this.transitionTo(this.routeName+'.preview')
    }
  }
});
