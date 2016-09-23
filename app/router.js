import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
})

//const lessons(){};

Router.map(function() {
  this.route(
      'isOnline',{
          path:'/:isOnline/'
  },
  function(){
      this.route('song',	{	
      path:'/song/:y'
      },
          function(){
              this.route('edit')
              this.route('lyrics');
              this.route('stave',function(){
                  this.route('preview')
              });
              this.route('chord');
    })
  });

  /*  this.route(
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
  */
  this.route('about');

  this.route('config', function() {
    this.route('instruments');
    this.route('panels');
  });

  this.route('user');

  this.route(	'catchall',	{	path:'/*wildcard'}	)

});

export default Router;
