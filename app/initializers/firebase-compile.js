export function initialize(App) {

  var config = {
     apiKey: "AIzaSyCxvW0b58v6Nmn0FhdM-ZMWKequ4P2-tDo",
     authDomain: "overlap-4468c.firebaseapp.com",
     databaseURL: "https://overlap-4468c.firebaseio.com",
     storageBucket: "overlap-4468c.appspot.com",
     messagingSenderId: "359400789124"
  };

 firebase.initializeApp(config);

//	console.log(localStorage['firebase:authUser:AIzaSyCxvW0b58v6Nmn0FhdM-ZMWKequ4P2-tDo:[DEFAULT]'])

  App.inject('component:pa-nels',     'song',   'service:song')
  App.inject('component:selection-panel', 'song',   'service:song')
  App.inject('component:index-panel', 'song',   'service:song')
}

export default {
  name: 'firebase-compile',
  initialize
};
