Em.Application.initializer({
  name:"auth",
  after:"firebase-compile",
  initialize(App){
    var isLogged = App.__container__.lookup('service:auth').get('uid'),
        type = isLogged ? "auth" : "side";
   
//    App.inject('component:menu-bar', 'logger', `login:${type}`)

    // isLogged = true ->

    App.inject('route:song'        ,'settings', `settings:${type}`)
    App.inject('component:pa-nels' ,'settings', `settings:${type}`)
    App.inject('component:tool-bar','settings', `settings:${type}`)



    /*
     * config
     * user.config
     * user.options
     */
    
    //set online {storage.isOnline}

  }
})



