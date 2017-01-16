export function initialize(App) {

  console.log( 'pre init auth' )
	let auth = App.__container__.lookup('service:auth');
	auth.login.call(auth,auth.get('log'))

	let isLogged = false,
      type = isLogged ? "auth" : "side";

  console.log( 'post init auth' , isLogged)
  App.register('panels:chord',Ember.Object.extend({
    size:{
      width:800,
      height:200,
    },
    list:[
      { "name":"chat-pane","options":"bottom","enabled":true}
    ]
  }))
  App.inject('route:song'   ,'settings', `settings:${type}`)
	console.log( 'pre init song to route service')
	App.inject('controller:is-online.song.chord', 'panels','panels:chord') 
	App.inject('controller:is-online.song.lyrics', 'panels','panels:chord') 
	App.inject('controller:is-online.song.edit', 'song', 'service:song')
}

export default {
  name: 'auth',
  after:"firebase-compile",
	initialize
}

