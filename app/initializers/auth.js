export function initialize(App) {

  console.log( 'pre init auth' )
	let auth = App.__container__.lookup('service:auth');
	auth.login.call(auth,auth.get('log'))

	let isLogged = false,
      type = isLogged ? "auth" : "side";

  console.log( 'post init auth' , isLogged)

  App.inject('route:song'   ,'settings', `settings:${type}`)
	console.log( 'pre init song to route service')
	App.inject('route:song', 'song', `service:song`)
}

export default {
  name: 'auth',
  after:"firebase-compile",
	initialize
}

