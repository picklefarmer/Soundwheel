export function initialize(App) {

        //  mix each one of these out //
        App.inject('component:menu-bar',    'song',   'service:song')
        App.inject('component:tool-bar',    'song',   'service:song')
        App.inject('component:pa-nels',     'song',   'service:song')
        App.inject('component:selection-panel', 'song',   'service:song')
        App.inject('component:index-panel', 'song',   'service:song')
        //chord dash
        //*                         *//

        App.inject('component:option-panel' ,'song',   'service:song')
        App.inject('component:phrase-bar'   ,'song',   'service:song')
        App.inject('component:play-bar'     ,'song',   'service:song')
        App.inject('component:measure-bar'  ,'song',   'service:song')
        App.inject('component:fret-board'   ,'song',   'service:song')
        App.inject('controller:song'        ,'song',   'service:song')


        App.inject('route:user',            'auth',   'service:auth')
        App.inject('component:log-in',      'auth',   'service:auth')

        App.inject('component:fret-board',  'options','service:options')


       //  App.inject('component:pa-nels','_actions', 'settings:actions')
       //  App.inject('view:song','song', 'service:song')

}

export default {
  name: 'firebase-compile',
  initialize
};
