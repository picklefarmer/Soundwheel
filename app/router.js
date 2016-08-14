import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
})

//const lessons(){};

Router.map(function() {
  this.route(
          'song',	{	
                  path:'/song/:isOnline/:y'
              },
      
              function() {
                  this.route('chordEdit');
              },
  
              function(){
                  this.route('edit')
              }
  );

  this.route('about');

  this.route('config', function() {
    this.route('instruments');
    this.route('panels');
  });

  this.route('user');

  this.route('isOnline');
});

export default Router;
