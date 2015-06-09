Em.Application.initializer({

  name:"firebase-init",

  before:'firebase-compile',



  initialize:function(container ,App){

//default . routes

   App.register('login:side',Ember.Object.extend({
        menuBar:function(){
          return $.getJSON("./json/routes.json")
      }.property()
   }));

//user . routes

   App.register('login:auth',Ember.Object.extend({
        menuBar:function(){
          return $.getJSON("./json/routesAuth.json")
      }.property()
   }));


//user . config
   
   App.register('settings:side',Ember.Object.extend({

        menuBars:["left","right","bottom","top","center","middle"],
	      datas:function(){
          console.log('fetch panel-data' )
		    	this.get('data').then(data => this.set('datas',data));
    	  }.property(),
        data:function(){
	  	  	  return $.getJSON('./json/panelsAuth.json',function(err){
            });
        }.property()
   }));   

  }

})

/*
 * user is looged in
 *
 *
 */

Em.Application.initializer({
  name:"auth",
  after:"firebase-compile",
  initialize(container,App){
    var isLogged = App.__container__.lookup('service:auth').get('uid'),
        type = isLogged ? "auth" : "side";
   
    App.inject('component:menu-bar', 'logger', `login:${type}`)

    // isLogged = true ->


    /*
     * config
     * user.config
     * user.options
     */
    
    //set online {storage.isOnline}
    




  }
})


Em.Application.initializer({
  name:"firebase-compile",

  initialize(container,App){

    		App.inject('route:song',	 'settings', 'settings:side')
        App.inject('component:pa-nels','settings', 'settings:side')
        App.inject('component:tool-bar','settings', 'settings:side')

        App.inject('component:option-panel','song', 'service:song')
        App.inject('component:play-bar','song', 'service:song')
        App.inject('component:measure-bar','song', 'service:song')
        App.inject('component:fret-board','options', 'service:options')
        App.inject('component:fret-board','song', 'service:song')
        App.inject('controller:song','song', 'service:song')

        //        App.inject('view:song','song', 'service:song')

  //      App.inject('component:pa-nels','_actions', 'settings:actions')
        App.inject('route:user', 'auth', 'service:auth')
        App.inject('component:log-in', 'auth', 'service:auth')

    }

})


