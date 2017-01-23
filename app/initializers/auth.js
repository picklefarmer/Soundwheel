export function initialize(App) {

  console.log( 'pre init auth' )
	let auth = App.__container__.lookup('service:auth');
	auth.login.call(auth,auth.get('log'))

	let isLogged = false,
      type = isLogged ? "auth" : "side";

  console.log( 'post init auth' , isLogged)

  App.register('settings:size',Ember.Object.extend({
      width:1400,
      height:300
  }))

  App.register('panels:chord',Ember.Object.extend({
    list:[
      { "name":"chat-pane","options":"bottom","enabled":true}
    ]
  }))
  App.inject('route:song'   ,'settings', `settings:${type}`)
	console.log( 'pre init song to route service')
	App.inject('controller:is-online.song','song','service:song')
	App.inject('controller:is-online.song.chord', 'panels','panels:chord') 
	App.inject('controller:is-online.song.lyrics', 'panels','panels:chord') 
//	App.inject('controller:is-online.song.edit', 'size', 'settings:size')
	App.inject('controller:is-online.song.edit', 'song', 'service:song')
}

export default {
  name: 'auth',
  after:"firebase-compile",
	initialize
}

