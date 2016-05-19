import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('song',{path:'/song/:x/:y'}, function() {
    this.route('chordEdit');
  });
  this.route('about');
  this.route('config', function() {
    this.route('instruments');
    this.route('panels');
  });
  this.route('user');
});

export default Router;
