export function initialize(App) {

  console.log( 'pre init auth' )

  var isLogged = App.__container__.lookup('service:auth')
										.get('uid'),
      type = isLogged ? "auth" : "side";

  console.log( 'post init auth' , isLogged)

    App.inject('route:song'   ,'settings', `settings:${type}`)
		 
  console.log( 'pre init song to route service')


	 App.inject('route:song', 'song', `service:song`)

//	 App.inject('component:action-names', 'router', 'router:main')

    // isLogged = true ->
/*
    App.inject('route:song'        ,'settings', `settings:${type}`)
    App.inject('component:pa-nels' ,'settings', `settings:${type}`)
    App.inject('component:tool-bar','settings', `settings:${type}`)
*/
    /*
     * config
     * user.config
     * user.options
     */
    
    //set online {storage.isOnline}

}

export default {
  name: 'auth',
  after:"firebase-compile",
	initialize
}

